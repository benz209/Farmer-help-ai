import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface WeatherData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  condition: string;
  feelsLike: string;
  uvIndex: string;
  visibility: string;
  pressure: string;
  sunrise: string;
  sunset: string;
  detailedAnalysis: string;
  forecast: { day: string; temp: string; condition: string }[];
  advice: string;
  suggestedCrops: string[];
  marketTrends: { crop: string; price: string; trend: 'up' | 'down' | 'stable' }[];
  pestAlerts: { title: string; description: string; severity: 'low' | 'medium' | 'high' }[];
  soilHealth?: { ph: string; nitrogen: string; phosphorus: string; potassium: string };
}

export async function getFarmerAdvice(district: string, lang: 'en' | 'ta'): Promise<WeatherData> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing from environment");
    throw new Error("API key not configured");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-flash-latest";
  
  const prompt = `
    Act as an expert agricultural advisor for farmers in Tamil Nadu.
    Provide real-time weather information, detailed weather analysis, crop advice, and market trends for the district: ${district}.
    
    REAL-TIME DATA REQUIREMENT: You MUST use the googleSearch tool to find the current, real-time weather data for ${district}, Tamil Nadu. Your response MUST match the current weather results found on Google Search for this location.
    
    STRICT LANGUAGE REQUIREMENT: You MUST provide all text content in ${lang === 'ta' ? 'TAMIL' : 'ENGLISH'}. 
    If the language is English, do NOT use any Tamil characters. 
    If the language is Tamil, use Tamil characters for descriptions and advice.
    Every single string value in the JSON response (except for the keys themselves and the 'severity'/'trend' enum values) MUST be in ${lang === 'ta' ? 'Tamil' : 'English'}.
    
    Return the data in the following JSON format:
    {
      "temperature": "current temp with unit",
      "humidity": "humidity percentage",
      "windSpeed": "wind speed with unit",
      "condition": "weather condition",
      "feelsLike": "feels like temp",
      "uvIndex": "UV index value",
      "visibility": "visibility distance",
      "pressure": "atmospheric pressure",
      "sunrise": "sunrise time",
      "sunset": "sunset time",
      "detailedAnalysis": "A detailed paragraph of real-time weather analysis and its impact on farming in ${district}",
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

    let text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    // Strip markdown code blocks if present
    text = text.replace(/```json\n?|```/g, "").trim();
    
    try {
      return JSON.parse(text) as WeatherData;
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", text);
      throw new Error("Invalid response format from agricultural advisor");
    }
  } catch (error) {
    console.error("Error fetching farmer advice:", error);
    throw error;
  }
}
