const ALLOWED_ORIGIN = 'https://heilocal.world';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const upstream = await fetch('http://teamgo.store/api/support', {
      method: 'POST',
    });

    const data = await upstream.json();

    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    return res.status(upstream.status).json(data);
  } catch (error) {
    console.error('Upstream error:', error);
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    return res.status(500).json({ error: 'Upstream error' });
  }
}