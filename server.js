// ====== server.js ======
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    // تحديد مسار الملف المطلوب
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // تحديد نوع الملف
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    switch (ext) {
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.json': contentType = 'application/json'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
        default: contentType = 'text/html';
    }

    // قراءة الملف
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('❌ 404 - الملف غير موجود');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`✅ السيرفر شغال على: http://localhost:${PORT}`);
    console.log(`📱 للموبايل: http://192.168.1.100:${PORT}`); // غير الرقم حسب شبكتك
});
