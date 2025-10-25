export default async function handler(request, response) {
    const { query } = request.body;
    const API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';
    const systemPrompt = "당신은 한국의 분리수거 전문가 챗봇입니다. 사용자의 질문에 친절하고 정확하게, 한국어로 간결한 한 단락으로 답하세요.";
    try {
        const apiResponse = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: query }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            })
        });
        const data = await apiResponse.json();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: 'Gemini Chat API 중계 실패' });
    }
}