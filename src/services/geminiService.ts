import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey! });

export interface WeatherData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  condition: string;
  forecast: { day: string; temp: string; condition: string }[];
  advice: string;
  suggestedCrops: string[];
  marketTrends: { crop: string; price: string; trend: 'up' | 'down' | 'stable' }[];
  pestAlerts: { title: string; description: string; severity: 'low' | 'medium' | 'high' }[];
  soilHealth?: { ph: string; nitrogen: string; phosphorus: string; potassium: string };
}

export async function getFarmerAdvice(district: string, lang: 'en' | 'ta'): Promise<WeatherData> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Act as an expert agricultural advisor for farmers in Tamil Nadu.
    Provide real-time weather information, crop advice, and market trends for the district: ${district}.
    
    IMPORTANT: Every single string value in the JSON response (except for the keys themselves and the 'severity'/'trend' enum values) MUST be in ${lang === 'ta' ? 'Tamil' : 'English'}.
    For example, if the language is Tamil, "temperature" value should be like "32°C", "condition" should be "வெயில்", "day" should be "நாளை", etc.
    
    Return the data in the following JSON format:
    {
      "temperature": "current temp with unit",
      "humidity": "humidity percentage",
      "windSpeed": "wind speed with unit",
      "condition": "weather condition (e.g. Sunny, Rainy)",
      "forecast": [
        {"day": "tomorrow", "temp": "temp", "condition": "condition"},
        {"day": "day after", "temp": "temp", "condition": "condition"}
      ],
      "advice": "Specific agricultural advice for this weather in ${district}",
      "suggestedCrops": ["crop1", "crop2", "crop3"],
      "marketTrends": [
        {"crop": "crop name", "price": "current price", "trend": "up/down/stable"}
      ],
      "pestAlerts": [
        {"title": "pest name", "description": "prevention advice", "severity": "low/medium/high"}
      ],
      "soilHealth": {
        "ph": "6.5",
        "nitrogen": "Medium",
        "phosphorus": "High",
        "potassium": "Low"
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as WeatherData;
  } catch (error) {
    console.error("Error fetching farmer advice:", error);
    throw error;
  }
}
