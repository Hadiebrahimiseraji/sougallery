const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_FILE = 'database.json';

function loadDatabase() {
  if (fs.existsSync(DB_FILE)) {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  }
  return {
    categories: [],
    products: [],
    images: {},
    lastUpdate: null
  };
}

function saveDatabase(data) {
  data.lastUpdate = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET' && pathname === '/api/db') {
    const db = loadDatabase();
    res.writeHead(200);
    res.end(JSON.stringify(db));
  } else if (req.method === 'POST' && pathname === '/api/db') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        saveDatabase(data);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, message: 'Database saved' }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  } else if (req.method === 'GET' && pathname === '/api/stats') {
    const db = loadDatabase();
    res.writeHead(200);
    res.end(JSON.stringify({
      totalProducts: db.products.length,
      totalCategories: db.categories.length,
      totalImages: Object.keys(db.images).length,
      lastUpdate: db.lastUpdate
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`\u0633رور در پورت ${PORT} اجرا می‌شود`);
});