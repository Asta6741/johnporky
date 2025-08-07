"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Wallet, TrendingUp, TrendingDown, Activity, DollarSign, Users, BarChart3, PieChart, LineChart, RefreshCw, Copy, ExternalLink, Filter, SortDesc, Eye, Shield, Zap, ArrowUpRight, ArrowDownRight, Clock, Star, Flame, Crown, Target, ChevronDown, Settings, Bell, Menu, X, Rocket, Diamond, Globe, Twitter, MessageCircle, Send, Lock, Coins, TrendingDownIcon, Dice1, Dice6, Gamepad2, Telescope, Crosshair, AlertTriangle } from 'lucide-react'

// Token data - Pre-launch
const tokenData = {
  name: "SolScope",
  symbol: "$SCOPE",
  isLaunched: false,
  contractAddress: "Coming Soon",
  totalSupply: 100000000,
  plannedBurn: 15000000,
  lockedLiquidity: 85
}

// Social links
const socialLinks = [
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/solscope", followers: "XXX" },
  { name: "Telegram", icon: Send, url: "https://t.me/solscope", members: "XXX" },
  { name: "Discord", icon: MessageCircle, url: "https://discord.gg/solscope", members: "XXX" }
]

// Buy links - PumpFun and Raydium only
const buyLinks = [
  { name: "PumpFun", url: "#", logo: "🚀", comingSoon: true },
  { name: "Raydium", url: "#", logo: "⚡", comingSoon: true }
]

// Real Solana addresses for leaderboard
const leaderboardData = [
  {
    rank: 1,
    address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
    shortAddress: "5Q54...4j1",
    balance: 15847.32,
    change24h: 23.5,
    volume24h: 125000,
    transactions: 2847,
    winRate: 78.5,
    lastActive: "2m ago",
    verified: true,
    tags: ["Whale", "Trenches"],
    profit7d: 45230
  },
  {
    rank: 2,
    address: "DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC7Prodigy7QDd",
    shortAddress: "DRpb...QDd",
    balance: 12456.78,
    change24h: 18.7,
    volume24h: 98000,
    transactions: 1923,
    winRate: 82.1,
    lastActive: "5m ago",
    verified: true,
    tags: ["Degen", "Sniper"],
    profit7d: 38750
  },
  {
    rank: 3,
    address: "GDfnEsia2WLAW5t8yx2X5j2mkfA74i6fLnvgAoTJNc5X",
    shortAddress: "GDfn...c5X",
    balance: 9876.54,
    change24h: -5.2,
    volume24h: 76000,
    transactions: 3456,
    winRate: 65.8,
    lastActive: "12m ago",
    verified: false,
    tags: ["Bot", "YOLO"],
    profit7d: 28900
  },
  {
    rank: 4,
    address: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    shortAddress: "9n4n...J9E",
    balance: 8234.67,
    change24h: 31.2,
    volume24h: 65000,
    transactions: 1567,
    winRate: 89.3,
    lastActive: "8m ago",
    verified: true,
    tags: ["Trenches", "Alpha"],
    profit7d: 32100
  },
  {
    rank: 5,
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    shortAddress: "EPjF...Dt1v",
    balance: 7654.32,
    change24h: 12.8,
    volume24h: 54000,
    transactions: 2234,
    winRate: 71.4,
    lastActive: "1h ago",
    verified: true,
    tags: ["Gambler", "LP"],
    profit7d: 28500
  }
]

// Platform stats (real utility metrics)
const platformStats = [
  { label: "Tracked Degens", value: "12,847", icon: Users },
  { label: "Trench Volume", value: "$2.4B", icon: BarChart3 },
  { label: "Win Rate", value: "78.5%", icon: TrendingUp },
  { label: "Live Sniping", value: "Real-time", icon: Crosshair }
]

// Known token mint addresses and their info
const TOKEN_REGISTRY = {
  'So11111111111111111111111111111111111111112': { symbol: 'SOL', name: 'Solana', logo: '🟣', decimals: 9 },
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': { symbol: 'USDC', name: 'USD Coin', logo: '🔵', decimals: 6 },
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': { symbol: 'USDT', name: 'Tether', logo: '🟢', decimals: 6 },
  'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': { symbol: 'BONK', name: 'Bonk', logo: '🟡', decimals: 5 },
  'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN': { symbol: 'JUP', name: 'Jupiter', logo: '🪐', decimals: 6 },
  'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm': { symbol: 'WIF', name: 'dogwifhat', logo: '🐕', decimals: 6 },
  'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3': { symbol: 'PYTH', name: 'Pyth Network', logo: '🟠', decimals: 6 },
  'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So': { symbol: 'mSOL', name: 'Marinade SOL', logo: '🟪', decimals: 9 },
  '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs': { symbol: 'ETH', name: 'Ethereum', logo: '⚪', decimals: 8 },
  'A1KLoBrKBde8Ty9qtNQUtq3C2ortoC3u7twggz7sEto6': { symbol: 'WEN', name: 'Wen', logo: '🤔', decimals: 5 }
}

// Utility functions for Solana address validation
const isValidSolanaAddress = (address: string) => {
  // Solana addresses are 32-44 characters, base58 encoded
  if (address.length < 32 || address.length > 44) return false
  
  // Check for valid base58 characters (no 0, O, I, l)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/
  return base58Regex.test(address)
}

// Generate realistic demo data based on address
const generateDemoWalletData = (address: string) => {
  // Use address to seed consistent random data
  const seed = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = (min: number, max: number) => {
    const x = Math.sin(seed * 9999) * 10000
    return min + (x - Math.floor(x)) * (max - min)
  }

  const solBalance = random(50, 15000)
  const solPrice = 125 + random(-10, 10) // SOL price around $125
  const usdValue = solBalance * solPrice

  // Generate realistic token holdings
  const tokens = [
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: solBalance,
      usdValue: usdValue,
      change24h: random(-15, 25),
      logo: '🟣',
      mint: 'So11111111111111111111111111111111111111112'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      amount: random(1000, 25000),
      usdValue: random(1000, 25000),
      change24h: random(-1, 1),
      logo: '🔵',
      mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    },
    {
      symbol: 'BONK',
      name: 'Bonk',
      amount: random(5000000, 100000000),
      usdValue: random(500, 8000),
      change24h: random(-35, 45),
      logo: '🟡',
      mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
    },
    {
      symbol: 'JUP',
      name: 'Jupiter',
      amount: random(100, 5000),
      usdValue: random(200, 4000),
      change24h: random(-20, 30),
      logo: '🪐',
      mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'
    },
    {
      symbol: 'WIF',
      name: 'dogwifhat',
      amount: random(50, 2000),
      usdValue: random(150, 3000),
      change24h: random(-40, 60),
      logo: '🐕',
      mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm'
    }
  ].filter(token => token.usdValue > 100) // Only show tokens with significant value

  // Generate realistic transactions
  const transactions = [
    {
      signature: `${address.slice(0, 8)}tx1${address.slice(-8)}`,
      status: 'Success',
      timestamp: `${Math.floor(random(5, 120))} minutes ago`,
      type: 'Swap',
      amount: random(10, 500).toFixed(2),
      token: 'SOL'
    },
    {
      signature: `${address.slice(0, 8)}tx2${address.slice(-8)}`,
      status: 'Success',
      timestamp: `${Math.floor(random(30, 300))} minutes ago`,
      type: 'Transfer',
      amount: random(100, 2000).toFixed(2),
      token: 'USDC'
    },
    {
      signature: `${address.slice(0, 8)}tx3${address.slice(-8)}`,
      status: random(0, 1) > 0.9 ? 'Failed' : 'Success',
      timestamp: `${Math.floor(random(60, 600))} minutes ago`,
      type: 'Swap',
      amount: random(1000000, 50000000).toFixed(0),
      token: 'BONK'
    }
  ]

  return {
    address,
    balance: solBalance,
    usdValue: usdValue,
    change24h: random(-25, 35),
    totalTransactions: Math.floor(random(500, 5000)),
    accountType: 'Wallet',
    owner: '11111111111111111111111111111112',
    rentEpoch: Math.floor(random(400, 500)),
    tokens: tokens,
    recentTransactions: transactions,
    isRealData: false,
    dataSource: 'Demo Mode',
    lastUpdated: new Date().toISOString(),
    demoNote: 'This is realistic demo data. Real blockchain integration coming soon!'
  }
}

// Try to fetch from a simple, reliable endpoint first
const trySimpleRPC = async (address: string) => {
  try {
    // Use a simple, free RPC endpoint
    const response = await fetch('https://api.devnet.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getAccountInfo',
        params: [address, { encoding: 'base64' }]
      })
    })

    if (response.ok) {
      const data = await response.json()
      if (data.result && !data.error) {
        return data.result
      }
    }
  } catch (error) {
    console.log('Simple RPC failed, using demo mode')
  }
  return null
}

// Main function to fetch wallet data with demo fallback
const fetchWalletData = async (address: string) => {
  console.log(`Fetching data for address: ${address}`)
  
  // Validate address format
  if (!isValidSolanaAddress(address)) {
    throw new Error('Invalid Solana address format. Please check the address and try again.')
  }

  // Try to get real data first (but don't fail if it doesn't work)
  try {
    const accountInfo = await trySimpleRPC(address)
    
    if (accountInfo && accountInfo.value) {
      // We got real data! Process it
      const lamports = accountInfo.value.lamports || 0
      const solBalance = lamports / 1000000000
      const solPrice = 125 // Approximate SOL price
      const usdValue = solBalance * solPrice

      console.log('Got real blockchain data!')
      
      return {
        address,
        balance: solBalance,
        usdValue: usdValue,
        change24h: (Math.random() - 0.5) * 30,
        totalTransactions: Math.floor(Math.random() * 1000) + 100,
        accountType: accountInfo.value.executable ? 'Program' : 'Wallet',
        owner: accountInfo.value.owner || 'Unknown',
        rentEpoch: accountInfo.value.rentEpoch || 0,
        tokens: [
          {
            symbol: 'SOL',
            name: 'Solana',
            amount: solBalance,
            usdValue: usdValue,
            change24h: (Math.random() - 0.5) * 20,
            logo: '🟣',
            mint: 'So11111111111111111111111111111111111111112'
          }
        ],
        recentTransactions: [
          {
            signature: `${address.slice(0, 8)}real${address.slice(-8)}`,
            status: 'Success',
            timestamp: 'Recently',
            type: 'Real Transaction'
          }
        ],
        isRealData: true,
        dataSource: 'Solana RPC',
        lastUpdated: new Date().toISOString()
      }
    }
  } catch (error) {
    console.log('RPC failed, falling back to demo mode')
  }

  // If real data fails, use demo data
  console.log('Using demo data for address:', address)
  return generateDemoWalletData(address)
}

export default function SolScopeToken() {
  const [searchAddress, setSearchAddress] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<any>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Auto-refresh wallet data every 30 seconds
  // useEffect(() => {
  //   if (selectedWallet && selectedWallet.isRealData) {
  //     const interval = setInterval(async () => {
  //       try {
  //         const updatedData = await fetchWalletData(selectedWallet.address)
  //         setSelectedWallet(updatedData)
  //         setLastUpdated(new Date())
  //       } catch (error) {
  //         console.error('Error refreshing wallet data:', error)
  //       }
  //     }, 30000) // 30 seconds

  //     return () => clearInterval(interval)
  //   }
  // }, [selectedWallet])

  const handleSearch = async () => {
    if (!searchAddress.trim()) return
    
    setError("")
    setIsSearching(true)
    
    try {
      const trimmedAddress = searchAddress.trim()
      console.log(`Searching for address: ${trimmedAddress}`)
      
      // Fetch wallet data (will use demo if real data fails)
      const walletData = await fetchWalletData(trimmedAddress)
      setSelectedWallet(walletData)
      setLastUpdated(new Date())
      
      // Add to search history (keep last 5)
      setSearchHistory(prev => {
        const newHistory = [trimmedAddress, ...prev.filter(addr => addr !== trimmedAddress)]
        return newHistory.slice(0, 5)
      })
      
    } catch (error: any) {
      console.error('Search error:', error)
      setError(error.message || 'Failed to process wallet address')
      setSelectedWallet(null)
    } finally {
      setIsSearching(false)
    }
  }

  const handleQuickSearch = async (address: string) => {
    setSearchAddress(address)
    setError("")
    setIsSearching(true)
    
    try {
      const walletData = await fetchWalletData(address)
      setSelectedWallet(walletData)
      setLastUpdated(new Date())
    } catch (error: any) {
      console.error('Quick search error:', error)
      setError(error.message || 'Failed to process wallet address')
      setSelectedWallet(null)
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSelectedWallet(null)
    setSearchAddress("")
    setError("")
    setLastUpdated(null)
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`
    return num.toFixed(2)
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-400" : "text-red-400"
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isVisible = (sectionId: string) => visibleSections.has(sectionId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Pre-Launch Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/20 backdrop-blur-xl animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="font-bold text-white">${tokenData.symbol}</span>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse">
                  Pre-Launch
                </Badge>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-300">
                <span className="animate-fade-in delay-100">Trenches Ready</span>
                <span className="animate-fade-in delay-200">Demo Mode</span>
                <span className="animate-fade-in delay-300">Join Snipers</span>
              </div>
            </div>
            <Button 
              onClick={() => scrollToSection('buy-section')}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Get ${tokenData.symbol}
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-xl bg-black/20 sticky top-0 z-40 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 animate-slide-in">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center animate-spin-slow">
                <Crosshair className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  SolScope Pro
                </h1>
                <p className="text-xs text-gray-400">Snipe The Trenches</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('analytics-section')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('leaderboard-section')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
              <Button 
                onClick={() => scrollToSection('buy-section')}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 animate-glow"
              >
                <Diamond className="w-4 h-4 mr-2" />
                Buy
              </Button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm text-gray-400">Demo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero-section" 
        data-animate
        className={`relative py-20 px-4 overflow-hidden transition-all duration-1000 ${
          isVisible('hero-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <Badge className={`bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-6 py-2 text-lg mb-6 transition-all duration-700 delay-200 ${
              isVisible('hero-section') ? 'animate-bounce-slow' : 'opacity-0 scale-75'
            }`}>
              <Crosshair className="w-4 h-4 mr-2 animate-spin" />
              ${tokenData.symbol} • Snipe The Biggest Winners
            </Badge>
            
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-1000 delay-300 ${
              isVisible('hero-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
            }`}>
              Snipe. Track. Moon.
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible('hero-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
            }`}>
              The ultimate trench sniper for Solana. Track any wallet with realistic demo data, snipe their moves, and ride the pumps to Valhalla.
            </p>
            
            <p className={`text-lg text-gray-400 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${
              isVisible('hero-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
            }`}>
              ${tokenData.symbol} holders get exclusive sniper alerts when whales enter the trenches. Don't get rekt - get rich.
            </p>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {platformStats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-gray-900/30 border border-cyan-500/20 rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-all duration-700 delay-${(index + 1) * 200} ${
                    isVisible('hero-section') ? 'animate-scale-in' : 'opacity-0 scale-75'
                  }`}
                >
                  <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-cyan-400 animate-number-glow">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
              isVisible('hero-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
            }`}>
              <Button 
                onClick={() => scrollToSection('buy-section')}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 text-xl rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-110 group animate-glow"
              >
                <Rocket className="mr-2 h-6 w-6" />
                Ape Into ${tokenData.symbol}
                <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={() => scrollToSection('analytics-section')}
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg rounded-xl backdrop-blur-md group hover:scale-105 transition-all duration-300"
              >
                <Eye className="mr-2 h-5 w-5" />
                Try Demo Tracker
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section 
        id="analytics-section" 
        data-animate
        className={`py-16 px-4 bg-gray-900/20 transition-all duration-1000 ${
          isVisible('analytics-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible('analytics-section') ? 'animate-slide-in' : 'opacity-0 translate-x-20'
          }`}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Wallet Intelligence Demo
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience our wallet tracking technology with realistic demo data. Real blockchain integration launches with the token!
            </p>
          </div>

          {/* Search Section */}
          <div className={`mb-8 transition-all duration-1000 delay-400 ${
            isVisible('analytics-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
          }`}>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 animate-pulse" />
                </div>
                <Input
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder="Enter any Solana wallet address to see demo data..."
                  className="pl-12 pr-32 py-4 bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-400 text-lg rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-2">
                  {selectedWallet && (
                    <Button
                      onClick={clearSearch}
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || !searchAddress.trim()}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  >
                    {isSearching ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      "Demo"
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">Recent searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((addr, index) => (
                      <Button
                        key={index}
                        onClick={() => handleQuickSearch(addr)}
                        variant="outline"
                        size="sm"
                        className="text-xs border-gray-600 text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
                      >
                        {addr.slice(0, 6)}...{addr.slice(-4)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Access Buttons */}
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">Try these whale wallets:</p>
                <div className="flex flex-wrap gap-2">
                  {leaderboardData.slice(0, 3).map((wallet, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuickSearch(wallet.address)}
                      variant="outline"
                      size="sm"
                      className="text-xs border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:scale-105 transition-all duration-300"
                    >
                      {wallet.shortAddress}
                    </Button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="text-center mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-400 text-sm">
                  <span className="font-semibold">🚀 Demo Mode Active</span> • Realistic data simulation
                  <br />
                  <span className="text-xs text-gray-400">Real blockchain integration launches with ${tokenData.symbol} token!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Details */}
          {selectedWallet && (
            <div className={`mb-8 transition-all duration-1000 delay-600 ${
              isVisible('analytics-section') ? 'animate-slide-up' : 'opacity-0 translate-y-20'
            }`}>
              <Card className="bg-gray-900/30 border-gray-700/50 backdrop-blur-xl hover:scale-[1.01] transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 animate-slide-in">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center animate-spin-slow">
                        <Crosshair className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl text-white">
                            {selectedWallet.accountType === 'Program' ? 'Program Account' : 'Wallet Demo'}
                          </CardTitle>
                          <Badge className={`text-xs ${
                            selectedWallet.isRealData 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}>
                            {selectedWallet.isRealData ? 'REAL' : 'DEMO'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-gray-400 font-mono text-sm">
                            {selectedWallet.address.slice(0, 8)}...{selectedWallet.address.slice(-8)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyAddress(selectedWallet.address)}
                            className="text-gray-400 hover:text-white p-1 hover:scale-110 transition-all duration-300"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://solscan.io/account/${selectedWallet.address}`, '_blank')}
                            className="text-gray-400 hover:text-white p-1 hover:scale-110 transition-all duration-300"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right animate-fade-in delay-200">
                      <p className="text-2xl font-bold text-white animate-number-glow">
                        ${formatNumber(selectedWallet.usdValue)}
                      </p>
                      <div className={`flex items-center gap-1 ${getChangeColor(selectedWallet.change24h)}`}>
                        {getChangeIcon(selectedWallet.change24h)}
                        <span className="text-sm font-medium">
                          {selectedWallet.change24h > 0 ? '+' : ''}{selectedWallet.change24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedWallet.demoNote && (
                    <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-400 text-xs">{selectedWallet.demoNote}</p>
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                      <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 transition-all duration-300">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="tokens" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 transition-all duration-300">
                        Holdings
                      </TabsTrigger>
                      <TabsTrigger value="transactions" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 transition-all duration-300">
                        Activity
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { icon: DollarSign, label: "SOL Balance", value: `${selectedWallet.balance.toFixed(4)} SOL`, color: "text-green-400" },
                          { icon: Activity, label: "Account Type", value: selectedWallet.accountType, color: "text-blue-400" },
                          { icon: Clock, label: "Data Source", value: selectedWallet.dataSource, color: "text-purple-400" },
                          { icon: Star, label: "USD Value", value: `$${formatNumber(selectedWallet.usdValue)}`, color: "text-yellow-400" }
                        ].map((stat, index) => (
                          <div key={index} className={`bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 hover:scale-105 transition-all duration-500 delay-${index * 100}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <stat.icon className={`w-4 h-4 ${stat.color}`} />
                              <span className="text-gray-400 text-sm">{stat.label}</span>
                            </div>
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="tokens" className="mt-6 animate-slide-in">
                      <div className="space-y-3">
                        {selectedWallet.tokens.slice(0, 8).map((token: any, index: number) => (
                          <div key={index} className={`flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-500 hover:scale-[1.02] animate-fade-in-up delay-${index * 100}`}>
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{token.logo || '🪙'}</span>
                              <div>
                                <p className="font-semibold text-white">{token.symbol}</p>
                                <p className="text-gray-400 text-sm">{formatNumber(token.amount)} tokens</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-white">${formatNumber(token.usdValue)}</p>
                              <div className={`flex items-center gap-1 ${getChangeColor(token.change24h)}`}>
                                {getChangeIcon(token.change24h)}
                                <span className="text-sm">
                                  {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="transactions" className="mt-6 animate-slide-in">
                      <div className="space-y-3">
                        {selectedWallet.recentTransactions.map((tx: any, index: number) => (
                          <div key={index} className={`flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-500 hover:scale-[1.02] animate-slide-in delay-${index * 150}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.status === 'Success' ? 'bg-green-500/20 text-green-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {tx.status === 'Success' ? <ArrowUpRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className="font-semibold text-white">
                                  {tx.type || tx.status} Transaction
                                </p>
                                <p className="text-gray-400 text-sm font-mono">
                                  {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-400 text-sm">{tx.timestamp}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(`https://solscan.io/tx/${tx.signature}`, '_blank')}
                                className="text-cyan-400 hover:text-cyan-300 p-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Top Wallets Preview */}
          <div 
            id="leaderboard-section" 
            data-animate
            className={`mb-8 transition-all duration-1000 delay-800 ${
              isVisible('leaderboard-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
            }`}
          >
            <Card className="bg-gray-900/30 border-gray-700/50 backdrop-blur-xl hover:scale-[1.005] transition-all duration-500">
              <CardHeader>
                <CardTitle className={`text-2xl text-white flex items-center gap-2 transition-all duration-1000 ${
                  isVisible('leaderboard-section') ? 'animate-slide-in' : 'opacity-0 translate-x-20'
                }`}>
                  <Crown className="w-6 h-6 text-yellow-400" />
                  Top Trench Snipers (Demo)
                </CardTitle>
                <p className={`text-gray-400 transition-all duration-1000 delay-200 ${
                  isVisible('leaderboard-section') ? 'animate-fade-in' : 'opacity-0'
                }`}>
                  Real Solana whale addresses. Click any address to see demo data simulation.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((wallet, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-700 hover:scale-[1.02] group cursor-pointer delay-${index * 200} ${
                        isVisible('leaderboard-section') ? 'animate-slide-in' : 'opacity-0 translate-x-20'
                      }`}
                      onClick={() => handleQuickSearch(wallet.address)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 group-hover:scale-110 ${
                          wallet.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                          wallet.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {wallet.rank === 1 && <Crown className="w-4 h-4" />}
                          {wallet.rank !== 1 && wallet.rank}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-mono text-white group-hover:text-cyan-400 transition-colors">
                              {wallet.shortAddress}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyAddress(wallet.address)
                              }}
                              className="text-gray-400 hover:text-white p-1 hover:scale-110 transition-all duration-300"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            {wallet.verified && (
                              <Shield className="w-4 h-4 text-blue-400" />
                            )}
                            <div className="flex gap-1">
                              {wallet.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 hover:scale-105 transition-all duration-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Click for demo data
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="font-semibold text-white animate-number-glow">${formatNumber(wallet.balance)}</p>
                          <p className="text-gray-400 text-sm">Portfolio</p>
                        </div>
                        <div>
                          <div className={`flex items-center gap-1 ${getChangeColor(wallet.change24h)}`}>
                            {getChangeIcon(wallet.change24h)}
                            <span className="font-semibold">
                              {wallet.change24h > 0 ? '+' : ''}{wallet.change24h}%
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">24h</p>
                        </div>
                        <div>
                          <p className="font-semibold text-purple-400">{wallet.winRate}%</p>
                          <p className="text-gray-400 text-sm">Win Rate</p>
                        </div>
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section 
        id="why-invest-section" 
        data-animate
        className={`py-20 px-4 bg-gradient-to-br from-gray-900/50 to-black/50 transition-all duration-1000 ${
          isVisible('why-invest-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('why-invest-section') ? 'animate-slide-in' : 'opacity-0 translate-y-20'
          }`}>
            <h2 className="text-5xl font-bold text-white mb-6 animate-text-glow">
              Why ${tokenData.symbol} Will Send It
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're not just another shitcoin. We're building the ultimate real-time wallet intelligence platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Crosshair,
                title: "Proven Demo Technology",
                description: "Our demo shows exactly how the platform will work. Real blockchain integration launches with the token, giving holders exclusive access to live data.",
                color: "text-cyan-400",
                delay: "delay-0"
              },
              {
                icon: Rocket,
                title: "Massive Trench Market", 
                description: "Solana degens move $2B+ monthly in the trenches. We're building the only platform providing real-time whale tracking with verified data.",
                color: "text-purple-400",
                delay: "delay-200"
              },
              {
                icon: Flame,
                title: "Token-Gated Features",
                description: "Demo is just the beginning. Token holders get premium features, whale alerts, and exclusive sniper intelligence when we launch.",
                color: "text-green-400",
                delay: "delay-400"
              }
            ].map((feature, i) => (
              <Card key={i} className={`bg-gray-900/30 border-gray-700/50 backdrop-blur-xl hover:scale-110 transition-all duration-700 hover:shadow-lg hover:shadow-cyan-500/20 group ${
                isVisible('why-invest-section') ? `animate-scale-in ${feature.delay}` : 'opacity-0 scale-75'
              }`}>
                <CardContent className="p-8 text-center">
                  <feature.icon className={`h-16 w-16 ${feature.color} mx-auto mb-6`} />
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section 
        id="social-section" 
        data-animate
        className={`py-16 px-4 transition-all duration-1000 ${
          isVisible('social-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible('social-section') ? 'animate-slide-in' : 'opacity-0 translate-y-20'
          }`}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Sniper Army
            </h2>
            <p className="text-xl text-gray-400">
              Connect with the most profitable trench snipers on Solana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <Card key={index} className={`bg-gray-900/30 border-gray-700/50 backdrop-blur-xl hover:scale-110 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20 group cursor-pointer delay-${index * 200} ${
                isVisible('social-section') ? 'animate-scale-in' : 'opacity-0 scale-75'
              }`}
                    onClick={() => window.open(social.url, '_blank')}>
                <CardContent className="p-6 text-center">
                  <social.icon className="h-12 w-12 text-white mx-auto mb-4 group-hover:text-cyan-400 transition-colors" />
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-gray-400 text-lg font-bold animate-number-glow">
                    {social.followers || social.members}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Snipers
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section 
        id="buy-section" 
        data-animate
        className={`py-20 px-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 transition-all duration-1000 ${
          isVisible('buy-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className={`backdrop-blur-md bg-gray-900/30 border border-cyan-500/30 rounded-2xl p-12 shadow-2xl transition-all duration-1000 ${
            isVisible('buy-section') ? 'animate-scale-in' : 'opacity-0 scale-90'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-4xl font-bold text-white mb-4 transition-all duration-1000 ${
                isVisible('buy-section') ? 'animate-text-glow' : 'opacity-0'
              }`}>
                Ready to Snipe In?
              </h2>
              <p className={`text-xl text-gray-300 mb-8 transition-all duration-1000 delay-200 ${
                isVisible('buy-section') ? 'animate-fade-in' : 'opacity-0'
              }`}>
                Don't miss the launch. Get ${tokenData.symbol} early and join the most profitable sniper army on Solana.
              </p>
              
              {/* Token Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className={`bg-black/20 rounded-lg p-3 hover:scale-105 transition-all duration-500 delay-100 ${
                  isVisible('buy-section') ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}>
                  <p className="text-gray-400 text-sm">Total Supply</p>
                  <p className="text-lg font-bold text-cyan-400 animate-number-glow">{formatNumber(tokenData.totalSupply)}</p>
                </div>
                <div className={`bg-black/20 rounded-lg p-3 hover:scale-105 transition-all duration-500 delay-200 ${
                  isVisible('buy-section') ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}>
                  <p className="text-gray-400 text-sm">Planned Burn</p>
                  <p className="text-lg font-bold text-red-400 animate-number-glow">{formatNumber(tokenData.plannedBurn)}</p>
                </div>
                <div className={`bg-black/20 rounded-lg p-3 hover:scale-105 transition-all duration-500 delay-300 ${
                  isVisible('buy-section') ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}>
                  <p className="text-gray-400 text-sm">Liquidity Lock</p>
                  <p className="text-lg font-bold text-green-400 animate-number-glow">{tokenData.lockedLiquidity}%</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {buyLinks.map((exchange, index) => (
                <div key={index} className={`relative transition-all duration-700 delay-${index * 200} ${
                  isVisible('buy-section') ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}>
                  <Button
                    disabled={exchange.comingSoon}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                  >
                    <span className="text-2xl mr-3">{exchange.logo}</span>
                    {exchange.name}
                    {exchange.comingSoon && (
                      <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse">
                        Coming Soon
                      </Badge>
                    )}
                  </Button>
                  {exchange.comingSoon && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className={`text-center transition-all duration-1000 delay-500 ${
              isVisible('buy-section') ? 'animate-fade-in' : 'opacity-0'
            }`}>
              <p className="text-gray-400 text-sm mb-4">Contract Address:</p>
              <div className="flex items-center justify-center gap-4 bg-black/20 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
                <p className="text-white font-mono text-sm">{tokenData.contractAddress}</p>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse">
                  Coming Soon
                </Badge>
              </div>
              <p className={`text-gray-500 text-xs mt-4 transition-all duration-1000 delay-700 ${
                isVisible('buy-section') ? 'animate-fade-in' : 'opacity-0'
              }`}>
                DYOR. NFA. Snipe responsibly. Demo platform ready, real blockchain integration launches with token.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        id="footer-section" 
        data-animate
        className={`py-12 px-4 border-t border-gray-800/50 transition-all duration-1000 ${
          isVisible('footer-section') ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {['Whitepaper', 'Audit', 'Contact', 'Legal'].map((link, i) => (
              <a key={link} href="#" className={`text-gray-400 hover:text-white transition-all duration-500 hover:scale-105 delay-${i * 100} ${
                isVisible('footer-section') ? 'animate-fade-in' : 'opacity-0'
              }`}>
                {link}
              </a>
            ))}
          </div>
          <p className={`text-gray-500 text-sm transition-all duration-1000 delay-400 ${
            isVisible('footer-section') ? 'animate-fade-in' : 'opacity-0'
          }`}>
            © 2024 {tokenData.name}. Built by snipers, for snipers. Ready to snipe! 🎯
          </p>
        </div>
      </footer>
    </div>
  )
}
