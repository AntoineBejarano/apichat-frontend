"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AuthModal } from "./auth-modal"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import {
  MessageSquare,
  Database,
  Bot,
  Code,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  Globe,
  Brain,
  Network,
  FileText,
  Search,
  Play,
  BarChart3,
  Workflow,
  ExternalLink,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react"

export function OnboardingFlow() {
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "register">("login")
  const { signInAsGuest } = useAuth()
  const { language, setLanguage } = useLanguage()

  const handleGuestAccess = () => {
    signInAsGuest({
      id: "guest",
      email: "guest@example.com",
      name: "Guest User",
      isGuest: true,
    })
  }

  const handleLogin = () => {
    setAuthMode("login")
    setShowAuthModal(true)
  }

  const handleRegister = () => {
    setAuthMode("register")
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apichat-darker via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-apichat-lime/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-apichat-accent/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-apichat-lime/5 to-apichat-accent/5 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-grid-move"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-apichat-lime/30 rounded-full animate-float-particle animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-apichat-accent/40 rounded-full animate-float-particle animation-delay-3000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-apichat-lime/20 rounded-full animate-float-particle animation-delay-5000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-slate-900">API</span>
            </div>
            <span className="text-2xl font-bold text-white">APIchat</span>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-apichat-lime/20 to-apichat-accent/20 backdrop-blur-sm border border-apichat-lime/30 rounded-full px-4 py-2 mb-6 animate-glow">
            <Sparkles className="h-4 w-4 text-apichat-lime" />
            <span className="text-sm font-medium text-apichat-lime">MCP Universal Protocol</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Conversational
            <br />
            <span className="bg-gradient-to-r from-apichat-lime to-apichat-accent bg-clip-text text-transparent animate-gradient-x">
              MCP Server
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform any API into intelligent, conversational automation. Upload OpenAPI specs, connect databases, and
            orchestrate complex workflows through natural language with our AI-first API orchestrator.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleRegister}
              size="lg"
              className="bg-gradient-to-r from-apichat-lime to-apichat-accent hover:from-apichat-lime/90 hover:to-apichat-accent/90 text-slate-900 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={handleGuestAccess}
              variant="outline"
              size="lg"
              className="border-slate-600 text-white hover:bg-slate-800/50 px-8 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-apichat-lime/50 bg-transparent"
            >
              Try as Guest
              <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-lime/20 to-apichat-lime/10 flex items-center justify-center mb-4 group-hover:from-apichat-lime/30 group-hover:to-apichat-lime/20 transition-all duration-300">
                <FileText className="h-6 w-6 text-apichat-lime" />
              </div>
              <CardTitle className="text-white">OpenAPI Integration</CardTitle>
              <CardDescription className="text-slate-400">
                Upload your OpenAPI specifications and instantly transform them into conversational function calls
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-accent/20 to-apichat-accent/10 flex items-center justify-center mb-4 group-hover:from-apichat-accent/30 group-hover:to-apichat-accent/20 transition-all duration-300">
                <MessageSquare className="h-6 w-6 text-apichat-accent" />
              </div>
              <CardTitle className="text-white">Conversational Control Plane</CardTitle>
              <CardDescription className="text-slate-400">
                Control your entire API ecosystem through natural language - no complex interfaces needed
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-lime/20 to-apichat-accent/20 flex items-center justify-center mb-4 group-hover:from-apichat-lime/30 group-hover:to-apichat-accent/30 transition-all duration-300">
                <Bot className="h-6 w-6 text-apichat-lime" />
              </div>
              <CardTitle className="text-white">Intelligent Agents</CardTitle>
              <CardDescription className="text-slate-400">
                Deploy AI agents that reason, execute, and automate complex multi-step processes autonomously
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-accent/20 to-apichat-accent/10 flex items-center justify-center mb-4 group-hover:from-apichat-accent/30 group-hover:to-apichat-accent/20 transition-all duration-300">
                <Database className="h-6 w-6 text-apichat-accent" />
              </div>
              <CardTitle className="text-white">Universal Database Access</CardTitle>
              <CardDescription className="text-slate-400">
                Query databases with natural language - SQL, NoSQL, GraphQL, and more through conversational interface
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-lime/20 to-apichat-lime/10 flex items-center justify-center mb-4 group-hover:from-apichat-lime/30 group-hover:to-apichat-lime/20 transition-all duration-300">
                <Zap className="h-6 w-6 text-apichat-lime" />
              </div>
              <CardTitle className="text-white">Function Calling with AI</CardTitle>
              <CardDescription className="text-slate-400">
                Advanced AI function calling with automatic parameter inference and intelligent error handling
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-accent/20 to-apichat-lime/20 flex items-center justify-center mb-4 group-hover:from-apichat-accent/30 group-hover:to-apichat-lime/30 transition-all duration-300">
                <Shield className="h-6 w-6 text-apichat-accent" />
              </div>
              <CardTitle className="text-white">Enterprise Security</CardTitle>
              <CardDescription className="text-slate-400">
                Bank-grade security with encrypted communications, role-based access, and audit trails
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why Choose APIchat as Your
            <span className="bg-gradient-to-r from-apichat-lime to-apichat-accent bg-clip-text text-transparent">
              {" "}
              Universal MCP Server
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center group">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-apichat-lime/20 to-apichat-lime/10 flex items-center justify-center mx-auto mb-4 group-hover:from-apichat-lime/30 group-hover:to-apichat-lime/20 transition-all duration-300">
                <BarChart3 className="h-8 w-8 text-apichat-lime" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">90% Faster Development</h3>
              <p className="text-slate-400">
                Transform weeks of API integration work into minutes with conversational automation
              </p>
            </div>
            <div className="text-center group">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-apichat-accent/20 to-apichat-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:from-apichat-accent/30 group-hover:to-apichat-accent/20 transition-all duration-300">
                <Globe className="h-8 w-8 text-apichat-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Any API, Any Database</h3>
              <p className="text-slate-400">
                Universal MCP server that connects to any system through OpenAPI specifications
              </p>
            </div>
            <div className="text-center group">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-apichat-lime/20 to-apichat-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:from-apichat-lime/30 group-hover:to-apichat-accent/30 transition-all duration-300">
                <Brain className="h-8 w-8 text-apichat-lime" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-First Architecture</h3>
              <p className="text-slate-400">
                Built from the ground up for intelligent agents and conversational automation
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Transform Your
            <span className="bg-gradient-to-r from-apichat-lime to-apichat-accent bg-clip-text text-transparent">
              {" "}
              API Automation Platform
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Network className="h-5 w-5 text-apichat-lime mr-2" />
                  API Integration & Orchestration
                </CardTitle>
                <CardDescription className="text-slate-400">
                  "Connect our CRM to Slack and send notifications when deals close over $10k"
                  <br />
                  <br />
                  Upload OpenAPI specs, describe your workflow in natural language, and watch intelligent agents execute
                  complex integrations automatically.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Search className="h-5 w-5 text-apichat-accent mr-2" />
                  Database Operations with Natural Language
                </CardTitle>
                <CardDescription className="text-slate-400">
                  "Show me all users who signed up last month and haven't completed onboarding"
                  <br />
                  <br />
                  Query databases with natural language - our AI translates your requests into optimized queries across
                  SQL, NoSQL, and GraphQL systems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Workflow className="h-5 w-5 text-apichat-lime mr-2" />
                  Strategy Execution & Automation
                </CardTitle>
                <CardDescription className="text-slate-400">
                  "Every morning, check our inventory, update pricing based on competitor data, and send reports to the
                  team"
                  <br />
                  <br />
                  Define strategies as sequences of function executions that intelligent agents can trigger and execute
                  autonomously.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-5 w-5 text-apichat-accent mr-2" />
                  Intelligent Agents for Automation
                </CardTitle>
                <CardDescription className="text-slate-400">
                  "Monitor our support tickets and automatically escalate urgent issues to the right team members"
                  <br />
                  <br />
                  Deploy AI agents that understand context, make decisions, and execute multi-step processes with
                  human-like reasoning.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Context Languages Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Technical Integration 
            <span className="bg-gradient-to-r from-apichat-lime to-apichat-accent bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-lime/20 to-apichat-lime/10 flex items-center justify-center mx-auto mb-4 group-hover:from-apichat-lime/30 group-hover:to-apichat-lime/20 transition-all duration-300">
                  <FileText className="h-6 w-6 text-apichat-lime" />
                </div>
                <CardTitle className="text-white text-lg">OpenAPI</CardTitle>
                <CardDescription className="text-slate-400 text-sm">REST • GraphQL • WebSockets • gRPC</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-accent/20 to-apichat-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:from-apichat-accent/30 group-hover:to-apichat-accent/20 transition-all duration-300">
                  <Database className="h-6 w-6 text-apichat-accent" />
                </div>
                <CardTitle className="text-white text-lg">Databases</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  PostgreSQL • MongoDB • Redis • Neo4j
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-lime/20 to-apichat-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:from-apichat-lime/30 group-hover:to-apichat-accent/30 transition-all duration-300">
                  <Code className="h-6 w-6 text-apichat-lime" />
                </div>
                <CardTitle className="text-white text-lg">Functions</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Auto-mapping • Parameter inference • Chain execution
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 group">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-apichat-accent/20 to-apichat-lime/20 flex items-center justify-center mx-auto mb-4 group-hover:from-apichat-accent/30 group-hover:to-apichat-lime/30 transition-all duration-300">
                  <Bot className="h-6 w-6 text-apichat-accent" />
                </div>
                <CardTitle className="text-white text-lg">Agents</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Context reasoning • Multi-step planning • Self-correction
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your API Automation Platform?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are building the future of conversational automation with our Universal
              MCP Server.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRegister}
                size="lg"
                className="bg-gradient-to-r from-apichat-lime to-apichat-accent hover:from-apichat-lime/90 hover:to-apichat-accent/90 text-slate-900 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Building for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleLogin}
                variant="outline"
                size="lg"
                className="border-slate-600 text-white hover:bg-slate-800/50 px-8 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-apichat-lime/50 bg-transparent"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-700 pt-12 pb-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-900">API</span>
                </div>
                <span className="text-xl font-bold text-white">APIchat</span>
              </div>
              <p className="text-slate-400 text-sm">
                The conversational MCP server for API automation and intelligent agents. Transform any API into
                intelligent, conversational automation.
              </p>
              <div className="pt-4">
                <p className="text-xs text-slate-500 mb-2">Powered by</p>
                <a
                  href="https://deevlylabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-apichat-lime hover:text-apichat-accent transition-colors duration-200"
                >
                  <span className="font-semibold">Deevly Labs</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-700 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">© 2024 APIchat. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-apichat-lime transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode={authMode} />
    </div>
  )
}
