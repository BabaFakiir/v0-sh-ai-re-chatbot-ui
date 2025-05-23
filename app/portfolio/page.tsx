"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MenuIcon, PlusIcon, TrashIcon } from "lucide-react"
import { ChatSidebar } from "@/components/chat-sidebar"

// Sample portfolio data
const initialPortfolio = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 10,
    avgPrice: 175.23,
    currentPrice: 187.32,
    change: 1.25,
    changePercent: 0.67,
  },
  {
    id: 2,
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 5,
    avgPrice: 390.12,
    currentPrice: 415.56,
    change: 2.78,
    changePercent: 0.67,
  },
  {
    id: 3,
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 8,
    avgPrice: 190.45,
    currentPrice: 177.89,
    change: -3.45,
    changePercent: -1.9,
  },
]

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(initialPortfolio)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [newStock, setNewStock] = useState({ symbol: "", shares: "", avgPrice: "" })
  const [isAdding, setIsAdding] = useState(false)

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newStock.symbol || !newStock.shares || !newStock.avgPrice) return

    const newId = Math.max(0, ...portfolio.map((stock) => stock.id)) + 1

    // In a real app, you would fetch the current price and other details from an API
    setPortfolio([
      ...portfolio,
      {
        id: newId,
        symbol: newStock.symbol.toUpperCase(),
        name: `${newStock.symbol.toUpperCase()} Inc.`, // Placeholder
        shares: Number.parseInt(newStock.shares),
        avgPrice: Number.parseFloat(newStock.avgPrice),
        currentPrice: Number.parseFloat(newStock.avgPrice) * 1.05, // Placeholder
        change: Number.parseFloat(newStock.avgPrice) * 0.05, // Placeholder
        changePercent: 5, // Placeholder
      },
    ])

    setNewStock({ symbol: "", shares: "", avgPrice: "" })
    setIsAdding(false)
  }

  const handleRemoveStock = (id: number) => {
    setPortfolio(portfolio.filter((stock) => stock.id !== id))
  }

  // Calculate portfolio value and performance
  const totalInvestment = portfolio.reduce((sum, stock) => sum + stock.shares * stock.avgPrice, 0)
  const currentValue = portfolio.reduce((sum, stock) => sum + stock.shares * stock.currentPrice, 0)
  const totalGainLoss = currentValue - totalInvestment
  const totalGainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="border-b border-gray-200">
          <div className="container flex items-center justify-between h-16 px-4 mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <MenuIcon className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <Link href="/">
                <h1 className="text-2xl font-bold">
                  sh<span className="text-black">AI</span>re
                </h1>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Portfolio</h2>
              <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Investment</CardDescription>
                  <CardTitle className="text-2xl">${totalInvestment.toFixed(2)}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Current Value</CardDescription>
                  <CardTitle className="text-2xl">${currentValue.toFixed(2)}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Gain/Loss</CardDescription>
                  <CardTitle className={`text-2xl ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {totalGainLoss >= 0 ? "+" : ""}
                    {totalGainLoss.toFixed(2)} ({totalGainLossPercent.toFixed(2)}%)
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Number of Stocks</CardDescription>
                  <CardTitle className="text-2xl">{portfolio.length}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Add Stock Form */}
            {isAdding && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Stock</CardTitle>
                  <CardDescription>Enter the details of the stock you want to add to your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddStock} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label htmlFor="symbol" className="block mb-2 text-sm font-medium">
                        Stock Symbol
                      </label>
                      <Input
                        id="symbol"
                        placeholder="e.g., AAPL"
                        value={newStock.symbol}
                        onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="shares" className="block mb-2 text-sm font-medium">
                        Number of Shares
                      </label>
                      <Input
                        id="shares"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="e.g., 10"
                        value={newStock.shares}
                        onChange={(e) => setNewStock({ ...newStock, shares: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="avgPrice" className="block mb-2 text-sm font-medium">
                        Average Price
                      </label>
                      <Input
                        id="avgPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 150.00"
                        value={newStock.avgPrice}
                        onChange={(e) => setNewStock({ ...newStock, avgPrice: e.target.value })}
                        required
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddStock}>Add Stock</Button>
                </CardFooter>
              </Card>
            )}

            {/* Portfolio Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Avg. Price</TableHead>
                      <TableHead className="text-right">Current Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Market Value</TableHead>
                      <TableHead className="text-right">Gain/Loss</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolio.map((stock) => {
                      const marketValue = stock.shares * stock.currentPrice
                      const gainLoss = marketValue - stock.shares * stock.avgPrice
                      const gainLossPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100

                      return (
                        <TableRow key={stock.id}>
                          <TableCell className="font-medium">{stock.symbol}</TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell className="text-right">{stock.shares}</TableCell>
                          <TableCell className="text-right">${stock.avgPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                          <TableCell className={`text-right ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </TableCell>
                          <TableCell className="text-right">${marketValue.toFixed(2)}</TableCell>
                          <TableCell className={`text-right ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {gainLoss >= 0 ? "+" : ""}
                            {gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveStock(stock.id)}>
                              <TrashIcon className="w-4 h-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {portfolio.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                          Your portfolio is empty. Add some stocks to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
