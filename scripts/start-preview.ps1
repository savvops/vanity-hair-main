$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$previewPort = 4341
$previewDirectory = Join-Path $projectRoot '.preview'
New-Item -ItemType Directory -Path $previewDirectory -Force | Out-Null

$listener = Get-NetTCPConnection -LocalPort $previewPort -State Listen -ErrorAction SilentlyContinue
if ($listener) {
    $previewProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($listener[0].OwningProcess)"
    if ($previewProcess.CommandLine -notlike '*astro*preview*') {
        throw "Port $previewPort is already in use. No process was changed."
    }
    Write-Output "Preview already listening at http://127.0.0.1:$previewPort"
    exit 0
}

if (-not (Test-Path (Join-Path $projectRoot 'dist/index.html'))) {
    throw 'Run npm run build before starting the preview.'
}
$previewNode = (Get-Command node.exe).Source
$previewProcess = Start-Process -FilePath $previewNode `
    -ArgumentList 'node_modules/astro/astro.js', 'preview', '--host', '127.0.0.1', '--port', "$previewPort" `
    -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru `
    -RedirectStandardOutput (Join-Path $previewDirectory 'preview.log') `
    -RedirectStandardError (Join-Path $previewDirectory 'preview-error.log')
$previewProcess.Id | Set-Content (Join-Path $previewDirectory 'preview.pid')
Write-Output "Started preview process $($previewProcess.Id) at http://127.0.0.1:$previewPort"
