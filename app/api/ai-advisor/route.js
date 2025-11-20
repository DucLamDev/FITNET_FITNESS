// ❌ FILE NÀY KHÔNG DÙNG NỮA
// AI Advisor đã được chuyển sang backend Express (backend/controllers/aiAdvisorController.js)
// Giữ lại file này để tham khảo, nhưng không sử dụng

import { NextResponse } from 'next/server'

// DEPRECATED: Use backend API instead
export async function POST(request) {
  return NextResponse.json({
    success: false,
    message: 'This endpoint is deprecated. AI Advisor has been moved to backend Express API.'
  }, { status: 410 }) // 410 Gone
}

/*
// OLD CODE - KHÔNG DÙNG NỮA
// Gemini API Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export async function POST_OLD(request) {
  try {
    const { message, bmi, status, height, weight, history } = await request.json()

    // Build context for AI
    const context = `
You are a professional fitness and nutrition advisor AI assistant for FitNet Fitness gym in Hanoi.

User's Health Information:
- Height: ${height} cm
- Weight: ${weight} kg
- BMI: ${bmi}
- BMI Status: ${status}

Your role:
1. Provide personalized fitness and nutrition advice based on the user's BMI
2. Answer questions about exercises, diet, and health
3. Be supportive, motivating, and professional
4. Keep responses concise (2-3 paragraphs maximum)
5. Use Vietnamese language naturally
6. Reference the gym's services when appropriate

User's question: ${message}
`

    // Prepare conversation history
    const conversationHistory = history.slice(-4).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          ...conversationHistory,
          {
            role: 'user',
            parts: [{ text: context }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Extract AI response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      'Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.'

    return NextResponse.json({
      success: true,
      response: aiResponse
    })

  } catch (error) {
    console.error('AI Advisor Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn.'
    }, { status: 500 })
  }
}
*/
