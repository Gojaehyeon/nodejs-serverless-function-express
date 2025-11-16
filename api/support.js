// api/support.js

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
    // Preflight 처리
    if (req.method === 'OPTIONS') {
      setCorsHeaders(req, res, 'POST, OPTIONS');
      return res.status(204).end();
    }
  
    if (req.method !== 'POST') {
      setCorsHeaders(req, res, 'POST, OPTIONS');
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const upstream = await fetch('http://teamgo.store/api/support', {
        method: 'POST',
      });
  
      const data = await upstream.json();
  
      setCorsHeaders(req, res, 'POST, OPTIONS');
      return res.status(upstream.status).json(data);
    } catch (error) {
      console.error('Upstream error:', error);
      setCorsHeaders(req, res, 'POST, OPTIONS');
      return res.status(500).json({ error: 'Upstream error' });
    }
  }