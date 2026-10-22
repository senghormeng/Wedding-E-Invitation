# Simple Local Web Server for E-INVITATION
param([int]$Port = 8080)

$root = "D:\E-INVITATION"
$endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, $Port)
$server = New-Object System.Net.Sockets.TcpListener($endpoint)
$server.Start()

$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -match 'Wi-Fi|Ethernet' -and $_.IPAddress -notmatch '^127\.' -and $_.IPAddress -notmatch '^169\.' }).IPAddress | Select-Object -First 1

Write-Host "==========================================================" -ForegroundColor Yellow
Write-Host " Wedding Invitation Live Server Started! " -ForegroundColor Green
Write-Host " Open this URL in Safari on your iPad / Phone: " -ForegroundColor Cyan
Write-Host "   http://${ip}:${Port}/ " -ForegroundColor Yellow -BackgroundColor DarkBlue
Write-Host " On this computer, open: " -ForegroundColor Cyan
Write-Host "   http://localhost:${Port}/ " -ForegroundColor White
Write-Host " Press Ctrl+C in this window to stop the server." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Yellow

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".mp3"  = "audio/mpeg"
    ".m4a"  = "audio/mp4"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($true) {
        $client = $server.AcceptTcpClient()
        [System.Threading.ThreadPool]::QueueUserWorkItem({
            param($state)
            $tcpClient = $state.Client
            $stream = $tcpClient.GetStream()
            $reader = New-Object System.IO.StreamReader($stream)
            
            $reqLine = $reader.ReadLine()
            if ([string]::IsNullOrEmpty($reqLine)) {
                $tcpClient.Close()
                return
            }
            
            $parts = $reqLine.Split(' ')
            if ($parts.Length -lt 2) {
                $tcpClient.Close()
                return
            }
            
            $rawPath = $parts[1].Split('?')[0]
            if ($rawPath -eq '/' -or $rawPath -eq '') {
                $rawPath = '/index.html'
            }
            
            $relPath = [System.Uri]::UnescapeDataString($rawPath.TrimStart('/'))
            $filePath = [System.IO.Path]::Combine($state.Root, $relPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
            
            if ([System.IO.File]::Exists($filePath)) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = if ($state.Mime.ContainsKey($ext)) { $state.Mime[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                $header = "HTTP/1.1 200 OK`r`n" +
                          "Content-Type: $mime`r`n" +
                          "Content-Length: $($bytes.Length)`r`n" +
                          "Cache-Control: no-cache, no-store, must-revalidate`r`n" +
                          "Access-Control-Allow-Origin: *`r`n" +
                          "Connection: close`r`n`r`n"
                
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($bytes, 0, $bytes.Length)
            } else {
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($notFound.Length)`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($notFound, 0, $notFound.Length)
            }
            
            $stream.Flush()
            $tcpClient.Close()
        }, @{ Client = $client; Root = $root; Mime = $mimeMap }) | Out-Null
    }
} finally {
    $server.Stop()
}
