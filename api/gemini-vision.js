export default async function handler(request, response) {
    const { base64Image, mimeType, prompt } = request.body;
    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL_NAME = 'gemini-2.5-flash-preview-05-20';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
    const payload = {
        "contents": [{
            "parts": [
                { "text": prompt },
                { "inlineData": { "mimeType": mimeType, "data": base64Image } }
            ]
        }],
        "generationConfig": { "temperature": 0.4, "topK": 32, "topP": 1, "maxOutputTokens": 4096 }
    };
    try {
        const apiResponse = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await apiResponse.json();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: 'Gemini Vision API 중계 실패' });
    }
}