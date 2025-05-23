import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { NextResponse } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Mock function to analyze stock - in a real app, this would call a Python backend
async function analyzeStock(symbol: string) {
  // Simulate API call to Python backend
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const stockData = {
    AAPL: {
      price: 187.32,
      change: 1.25,
      changePercent: 0.67,
      recommendation: "Buy",
      analysis:
        "Strong fundamentals, consistent growth in services revenue, and upcoming product launches make AAPL an attractive investment.",
    },
    MSFT: {
      price: 415.56,
      change: 2.78,
      changePercent: 0.67,
      recommendation: "Strong Buy",
      analysis:
        "Cloud business growth, AI initiatives, and strong enterprise presence position MSFT well for continued growth.",
    },
    TSLA: {
      price: 177.89,
      change: -3.45,
      changePercent: -1.9,
      recommendation: "Hold",
      analysis:
        "Facing increased competition in the EV market, but strong innovation pipeline and energy business provide long-term potential.",
    },
    AMZN: {
      price: 178.75,
      change: 1.23,
      changePercent: 0.69,
      recommendation: "Buy",
      analysis:
        "AWS growth, retail dominance, and expanding advertising business create multiple revenue streams with strong growth potential.",
    },
    GOOGL: {
      price: 142.65,
      change: 0.87,
      changePercent: 0.61,
      recommendation: "Buy",
      analysis:
        "Search dominance, YouTube growth, and AI initiatives provide strong competitive advantages and revenue diversification.",
    },
  }

  // Return data for the requested symbol or a default message
  return (
    stockData[symbol as keyof typeof stockData] || {
      price: 0,
      change: 0,
      changePercent: 0,
      recommendation: "Unknown",
      analysis: "I don't have data for this symbol. Please try a major stock like AAPL, MSFT, TSLA, AMZN, or GOOGL.",
    }
  )
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Extract potential stock symbols from the last user message
    const lastUserMessage = messages.findLast((m: any) => m.role === "user")?.content || ""
    const stockSymbolMatch = lastUserMessage.match(/[A-Z]{1,5}/g)
    let stockData = null

    // If we found potential stock symbols, analyze the first one
    if (stockSymbolMatch && stockSymbolMatch.length > 0) {
      const symbol = stockSymbolMatch[0]
      stockData = await analyzeStock(symbol)
    }

    // Create a system message that includes stock data if available
    let systemMessage = "You are a helpful AI assistant that specializes in stock analysis."

    if (stockData) {
      systemMessage += `\n\nHere is the latest data for the requested stock:
      - Symbol: ${stockSymbolMatch?.[0]}
      - Current Price: $${stockData.price}
      - Change: ${stockData.change > 0 ? "+" : ""}${stockData.change} (${stockData.changePercent > 0 ? "+" : ""}${stockData.changePercent}%)
      - Recommendation: ${stockData.recommendation}
      - Analysis: ${stockData.analysis}
      
      Incorporate this information into your response in a helpful way. Format the data nicely and provide additional context or advice if appropriate.`
    } else {
      systemMessage +=
        "\n\nIf the user asks about a specific stock, ask them to provide a valid stock symbol (like AAPL, MSFT, TSLA, etc.)."
    }

    // Stream the response
    const result = streamText({
      model: openai("gpt-4-turbo"),
      system: systemMessage,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "There was an error processing your request" }, { status: 500 })
  }
}
