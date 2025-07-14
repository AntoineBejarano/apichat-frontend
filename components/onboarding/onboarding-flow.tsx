"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "./auth-modal"
import { useAuth } from "@/contexts/auth-context"
import {
  Sparkles,
  MessageSquare,
  Database,
  Bot,
  ArrowRight,
  CheckCircle,
  Globe,
  Brain,
  ExternalLink,
  FileText,
  Zap,
  Network,
  Command,
} from "lucide-react"

export function OnboardingFlow() {
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"signin" | "signup">("signin")
  const { signInAsGuest, isLoading } = useAuth()

  const handleGetStarted = () => {
    setAuthMode("signup")
    setShowAuthModal(true)
  }

  const handleSignIn = () => {
    setAuthMode("signin")
    setShowAuthModal(true)
  }

  const handleGuestAccess = async () => {
    try {
      await signInAsGuest()
    } catch (error) {
      console.error("Guest access failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apichat-darker via-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-apichat-lime/10 to-apichat-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* MCP Universal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-apichat-lime/20 to-apichat-accent/20 border border-apichat-lime/30 mb-8">
              <Sparkles className="h-4 w-4 text-apichat-lime" />
              <span className="text-sm font-medium text-apichat-lime">Universal MCP Server</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Conversational MCP Server for
              <span className="block bg-gradient-to-r from-apichat-lime to-apichat-accent bg-clip-text text-transparent">
                API Automation & Intelligent Agents
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Upload your OpenAPI specs, connect any database, and control everything through natural language. APIchat
              is your AI-first API orchestrator that turns conversations into automated function executions across any
              system or service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-apichat-lime to-apichat-accent text-slate-900 hover:from-apichat-lime/90 hover:to-apichat-accent/90 font-semibold px-8"
              >
                Start Automating with AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={handleSignIn}
                variant="outline"
                size="lg"
                className="border-slate-600 text-white hover:bg-slate-800 px-8 bg-transparent"
              >
                Sign In
              </Button>
              <Button
                onClick={handleGuestAccess}
                disabled={isLoading}
                variant="ghost"
                size="lg"
                className="text-slate-400 hover:text-white hover:bg-slate-800 px-8"
              >
                {isLoading ? "Loading..." : "Try Demo"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Conversational Control Plane for Everything
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            APIchat transforms how you interact with APIs and databases. Simply chat to automate, integrate, and
            orchestrate any system through our universal MCP server powered by intelligent agents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-apichat-lime/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-slate-900" />
              </div>
              <CardTitle className="text-white">Integrate Any API via OpenAPI</CardTitle>
              <CardDescription className="text-slate-400">
                Upload your OpenAPI specifications and instantly connect to any REST API. Our MCP server automatically
                generates function calls from your API documentation.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-apichat-lime/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white">Conversational Control Plane</CardTitle>
              <CardDescription className="text-slate-400">
                Control your entire infrastructure through natural language. Chat to execute functions, query databases,
                and orchestrate complex automation sequences in real-time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-apichat-lime/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white">Intelligent Agents for Automation</CardTitle>
              <CardDescription className="text-slate-400">
                Deploy AI agents that reason about your requests, execute multi-step processes, and handle complex
                automation scenarios without manual intervention.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-apichat-lime/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white">Query Databases with Natural Language</CardTitle>
              <CardDescription className="text-slate-400">
                Connect SQL, NoSQL, and GraphQL databases. Ask questions in plain English and get instant results with
                our AI-powered query generation and execution.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-apichat-lime/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
                <Command className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white">Function Calling with AI</CardTitle>
              <CardDescription className="text-slate-400">
                Define strategies as sequences of function executions. Trigger complex automation flows through simple
                chat commands with intelligent parameter handling.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-apichat-lime/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center mb-4">
                <Network className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white">Universal MCP Server</CardTitle>
              <CardDescription className="text-slate-400">
                One platform to rule them all. Our Modular Control Plane connects to any system, service, or API through
                a unified conversational interface.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How APIchat Works</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From API specs to automation in minutes. See how our AI-first API orchestrator transforms your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Upload & Connect</h3>
              <p className="text-slate-300">
                Upload your OpenAPI specifications and connect your databases. Our MCP server automatically maps all
                available functions and endpoints.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Chat & Command</h3>
              <p className="text-slate-300">
                Use natural language to execute functions, query data, and define automation strategies. Our AI
                understands context and intent.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Automate & Scale</h3>
              <p className="text-slate-300">
                Deploy intelligent agents that execute your strategies autonomously. Scale from simple tasks to complex
                multi-system orchestration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Modern API Automation</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            From simple integrations to complex orchestration, APIchat adapts to your automation needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-apichat-lime" />
                API Automation Platform
              </CardTitle>
              <CardDescription className="text-slate-400">
                Transform any OpenAPI specification into a conversational interface. Execute complex API workflows
                through natural language commands.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-apichat-lime" />
                  Instant OpenAPI integration and function mapping
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-apichat-lime" />
                  Real-time API orchestration through chat
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-apichat-lime" />
                  Intelligent error handling and retry logic
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-400" />
                Database Query Automation
              </CardTitle>
              <CardDescription className="text-slate-400">
                Connect any database and query with natural language. Our AI generates optimized queries and presents
                results in conversational format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  Natural language to SQL/NoSQL conversion
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  Multi-database query orchestration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  Intelligent data analysis and insights
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                Strategy-Based Automation
              </CardTitle>
              <CardDescription className="text-slate-400">
                Define automation strategies as sequences of function executions. Trigger complex workflows with simple
                chat commands.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400" />
                  Multi-step function execution sequences
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400" />
                  Conditional logic and decision trees
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400" />
                  Real-time strategy monitoring and adjustment
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5 text-emerald-400" />
                AI-First API Orchestrator
              </CardTitle>
              <CardDescription className="text-slate-400">
                Deploy intelligent agents that understand context, make decisions, and execute complex automation
                scenarios across multiple systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Context-aware function calling with AI
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Autonomous multi-system orchestration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Intelligent parameter inference and validation
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Integration Section */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Universal Integration Capabilities</h2>
            <p className="text-slate-300">
              APIchat's MCP server connects to any system through standardized protocols and intelligent adaptation
            </p>
          </div>

          <Tabs defaultValue="openapi" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
              <TabsTrigger
                value="openapi"
                className="data-[state=active]:bg-apichat-lime data-[state=active]:text-slate-900"
              >
                OpenAPI
              </TabsTrigger>
              <TabsTrigger
                value="databases"
                className="data-[state=active]:bg-apichat-lime data-[state=active]:text-slate-900"
              >
                Databases
              </TabsTrigger>
              <TabsTrigger
                value="functions"
                className="data-[state=active]:bg-apichat-lime data-[state=active]:text-slate-900"
              >
                Functions
              </TabsTrigger>
              <TabsTrigger
                value="agents"
                className="data-[state=active]:bg-apichat-lime data-[state=active]:text-slate-900"
              >
                Agents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="openapi" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">OpenAPI Specification Integration</CardTitle>
                  <CardDescription className="text-slate-400">
                    Upload any OpenAPI spec and instantly create a conversational interface for your APIs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        REST APIs
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        GraphQL
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        WebSockets
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        gRPC
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">
                      Our MCP server automatically parses OpenAPI specifications, generates function signatures, and
                      creates conversational interfaces for immediate API interaction and automation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="databases" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Universal Database Connectivity</CardTitle>
                  <CardDescription className="text-slate-400">
                    Connect and query any database using natural language through our intelligent query engine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        PostgreSQL
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        MongoDB
                      </Badge>
                      <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                        Redis
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Neo4j
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">
                      Query databases with natural language and get intelligent responses. Our AI understands schema
                      relationships and generates optimized queries for any database type.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="functions" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Intelligent Function Calling</CardTitle>
                  <CardDescription className="text-slate-400">
                    Execute complex function sequences through conversational commands with AI-powered parameter
                    handling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        Auto-mapping
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Parameter inference
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Chain execution
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        Error handling
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">
                      Define strategies as sequences of function calls. Our AI handles parameter mapping, execution
                      order, and error recovery automatically through conversational interaction.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Autonomous Intelligent Agents</CardTitle>
                  <CardDescription className="text-slate-400">
                    Deploy AI agents that reason about your systems and execute complex automation autonomously
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        Context reasoning
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Multi-step planning
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Real-time adaptation
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        Self-correction
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">
                      Our intelligent agents understand your infrastructure, reason about complex scenarios, and execute
                      multi-system automation with minimal human intervention.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-900">API</span>
                </div>
                <span className="text-xl font-bold text-white">ApiChat</span>
              </div>
              <p className="text-slate-400 text-sm">
                The conversational MCP server for API automation, intelligent agents, and universal system
                orchestration.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>Powered by</span>
                <a
                  href="https://deevlylabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apichat-lime hover:text-apichat-accent transition-colors font-medium flex items-center gap-1"
                >
                  Deevly Labs
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    MCP Server
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    OpenAPI Integration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Function Calling
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Intelligent Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integration Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Automation Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2024 ApiChat. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}
