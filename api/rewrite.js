export default async function handler(req, res) {
    // 1. Enforce POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 2. Secret check
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error('Missing GROQ_API_KEY environment variable');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { data } = req.body;
        if (!data || !data.summary) {
            return res.status(400).json({ error: 'Missing summary in request' });
        }

        const expLines = (data.experience || [])
            .map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.desc}`)
            .join("\n")

        const skillsList = (data.skills || []).join(", ")

        const prompt = `You are a professional resume writer. Write a concise, powerful executive summary (2–3 sentences, max 80 words) for a resume.

Candidate info:
- Name: ${data.name || "Unknown"}
- Target Role: ${data.role || "Professional"}
- Skills: ${skillsList || "not provided"}
- Experience:
${expLines || "Not provided"}
- Current summary (improve this): ${data.summary || "none"}

Rules:
- Write in third person (e.g. "A results-driven...")
- Lead with a strong, specific hook
- Highlight impact and expertise
- Output ONLY the summary text, nothing else. No quotes, no commentary.`

        const groqReq = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!groqReq.ok) {
            console.error('Groq API Error Status:', groqReq.status);
            return res.status(502).json({ error: 'AI provider error' });
        }

        const json = await groqReq.json();
        const result = json.choices?.[0]?.message?.content?.trim() || "";

        return res.status(200).json({ result });

    } catch (err) {
        console.error('Internal Server Error:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
