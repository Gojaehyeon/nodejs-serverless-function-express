// api/supporters.js

const allowedOrigins = [
    'https://heilocal.world',
    'http://localhost:3000',
  ];
  
  function setCorsHeaders(req, res, methods) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  
  export default async function handler(req, res) {
    // Preflight 요청 처리
    if (req.method === 'OPTIONS') {
      setCorsHeaders(req, res, 'GET, OPTIONS');
      return res.status(204).end();
    }
  
    if (req.method !== 'GET') {
      setCorsHeaders(req, res, 'GET, OPTIONS');
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const upstream = await fetch('http://teamgo.store/api/supporters');
      const data = await upstream.json();
  
      setCorsHeaders(req, res, 'GET, OPTIONS');
      return res.status(upstream.status).json(data);
    } catch (error) {
      console.error('Upstream error:', error);
      setCorsHeaders(req, res, 'GET, OPTIONS');
      return res.status(500).json({ error: 'Upstream error' });
    }
  }