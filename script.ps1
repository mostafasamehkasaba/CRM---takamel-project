$targets = @(
  "app/(dashboard)/data/products.ts",
  "app/(dashboard)/(02-products)/products/page.tsx"
)
$marker = [regex]'[\u00A0-\u00FF\u0192\u02C6\u201A\u201E\u2020\u2021\u2026\u2030]'
$cp1256 = [Text.Encoding]::GetEncoding(1256)

foreach ($path in $targets) {
  if (-not (Test-Path $path)) { continue }
  $lines = Get-Content -Path $path
  $changed = $false
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($marker.IsMatch($line)) {
      $bytes = $cp1256.GetBytes($line)
      $fixed = [Text.Encoding]::UTF8.GetString($bytes)
      if ($fixed -ne $line) {
        $lines[$i] = $fixed
        $changed = $true
      }
    }
  }
  if ($changed) {
    Set-Content -Path $path -Value $lines -Encoding utf8
  }
}
