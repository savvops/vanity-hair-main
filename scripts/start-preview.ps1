$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$previewPort = 4341
$previewDirectory = Join-Path $projectRoot '.preview'
New-Item -ItemType Directory -Path $previewDirectory -Force | Out-Null

$listener = Get-NetTCPConnection -LocalPort $previewPort -State Listen -ErrorAction SilentlyContinue
if ($listener) {
    $previewProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($listener[0].OwningProcess)"
    if ($previewProcess.CommandLine -notlike '*astro*preview*' -or $previewProcess.CommandLine -notlike "*$projectRoot*") {
        throw "Port $previewPort is already in use. No process was changed."
    }
    $previewProcess.ProcessId | Set-Content (Join-Path $previewDirectory 'preview.pid')
    Write-Output "Preview already listening at http://127.0.0.1:$previewPort"
    exit 0
}

if (-not (Test-Path (Join-Path $projectRoot 'dist/index.html'))) {
    throw 'Run npm run build before starting the preview.'
}
$previewNode = (Get-Command node.exe).Source
$astroPackage = Get-Content (Join-Path $projectRoot 'node_modules/astro/package.json') -Raw | ConvertFrom-Json
$astroCli = Join-Path $projectRoot ('node_modules/astro/' + $astroPackage.bin.astro)
Push-Location $projectRoot
try {
    & $previewNode $astroCli preview --background --host 127.0.0.1 --port $previewPort
    if ($LASTEXITCODE -ne 0) { throw 'Astro could not start the preview.' }
    $previewListener = Get-NetTCPConnection -LocalPort $previewPort -State Listen
    $previewListener[0].OwningProcess | Set-Content (Join-Path $previewDirectory 'preview.pid')
} finally {
    Pop-Location
}
Write-Output "Preview ready at http://127.0.0.1:$previewPort"
