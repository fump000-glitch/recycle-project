export default async function handler(request, response) {
    const { lat, lon } = request.body;
    const API_KEY = process.env.KAKAO_API_KEY;
    const KAKAO_URL = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`;
    try {
        const apiResponse = await fetch(KAKAO_URL, {
            headers: { 'Authorization': `KakaoAK ${API_KEY}` }
        });
        const data = await apiResponse.json();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: 'Kakao API 중계 실패' });
    }
}