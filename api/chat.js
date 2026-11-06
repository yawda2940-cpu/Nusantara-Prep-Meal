/**
 * Fungsi serverless chatbot (Vercel). Kunci API hanya dibaca dari environment, tidak pernah ke browser.
 * Request : POST /api/chat  { messages: [{ role: 'user' | 'assistant', content: string }] }
 * Response: { reply: string }
 */
const MAX_MESSAGES = 20;
const MAX_LENGTH = 1000;

const SYSTEM_PROMPT = `Kamu adalah MinTar, admin customer service Nusantara Meal Prep.
Gaya bicara: santai tapi sopan, ramah, ringkas (maksimal 4 kalimat), bahasa mengikuti bahasa pelanggan.
Tentang bisnis: layanan meal prep (katering sehat langganan) masakan Indonesia, nutrisi terkontrol, tanpa MSG sintetis dan pengawet kimiawi, kemasan biodegradable. Berpusat di Jalan Pahlawan, Kota Madiun.
Paket: Duo Sehat (2 orang, 10 porsi) Rp 850k/minggu atau Rp 3.2M/bulan; Family Pack (4 orang, 20 porsi) Rp 1.6M/minggu atau Rp 6M/bulan; Personal Pack (1 orang, 14 porsi) Rp 1.1M/minggu atau Rp 4M/bulan.
Kontak: WhatsApp 087881485375, Instagram @yawdasaja, email yawda2940@gmail.com.
Aturan: arahkan pemesanan ke WhatsApp, Instagram, atau email. Jangan mengarang harga, diskon, atau fakta di luar informasi di atas; jika tidak tahu, arahkan ke admin lewat WhatsApp. Jangan memberi saran medis; sarankan konsultasi gizi bila perlu.`;

function sanitize(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content.slice(0, MAX_LENGTH) }] }));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server belum dikonfigurasi' });

  const contents = sanitize(req.body?.messages);
  if (!contents.length || contents[0].role !== 'user') {
    return res.status(400).json({ error: 'Pesan tidak valid' });
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 500 },
      }),
    });
    if (!response.ok) return res.status(502).json({ error: 'Layanan AI tidak tersedia' });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim();
    if (!reply) return res.status(502).json({ error: 'Balasan kosong' });
    return res.status(200).json({ reply });
  } catch {
    return res.status(502).json({ error: 'Gagal menghubungi layanan AI' });
  }
}
