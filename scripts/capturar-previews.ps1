# Captura previews reais dos projetos do portfólio (headless Edge).
# Uso: powershell -ExecutionPolicy Bypass -File scripts\capturar-previews.ps1
# Para adicionar/editar projetos, altere a lista abaixo e rode novamente.

$projetos = @(
  @{ slug = "hub-agendamento-saude";      url = "https://hub-agendamento-saude.marianamello0406.workers.dev/" },
  @{ slug = "maison-sucre-confeitaria";   url = "https://catalago-confeitaria.marianamello0406.workers.dev/" },
  @{ slug = "hub-agendamento-vet";        url = "https://hub-agendamento-vet.marianamello0406.workers.dev/" },
  @{ slug = "camilla-ferreira-ugc";       url = "https://portfolio-camilla-ferreira.marianamello0406.workers.dev/" },
  @{ slug = "meus-achadinhos-afiliados";  url = "https://vitrine-modelo-afiliados.marianamello0406.workers.dev/" }
)

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root "assets\portfolio"
New-Item -ItemType Directory -Force -Path $out | Out-Null

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "C:\Program Files\Google\Chrome\Application\chrome.exe" }

$profileDir = Join-Path $env:TEMP "portfolio-preview-profile"

foreach ($p in $projetos) {
  $file = Join-Path $out ($p.slug + ".png")
  Write-Host "Capturando $($p.url) -> $file"
  & $edge --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$profileDir" `
    --window-size=1280,900 --virtual-time-budget=8000 `
    --screenshot="$file" $p.url 2>$null | Out-Null
  Start-Sleep -Milliseconds 500
  if (Test-Path $file) { Write-Host "  OK ($((Get-Item $file).Length) bytes)" } else { Write-Host "  FALHOU" }
}

