'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Globe, 
  Satellite, 
  Eye, 
  Bot, 
  Grid3X3,
  ArrowRight,
  Bell,
  Zap,
  MapPin,
  Brain,
  Smartphone,
  Mail,
  MessageSquare,
  Sparkles,
  Shield,
  Activity,
  Cloud,
  CloudRain,
  Linkedin,
  Github,
  ExternalLink
} from 'lucide-react'

import AryanImg from './Assets/Aryan.png'
import SurajitImg from './Assets/Surajit.jpg'
import AnshleyImg from './Assets/Anshley.jpg'
import DebnandaImg from './Assets/Debnanda.jpg'
import SystemArchImg from './Assets/System Architechture.png'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handlePredictNow = () => {
    router.push('/prediction_dashboard')
  }

  const handleAnalyzeWeather = () => {
    router.push('/weather')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-900 relative overflow-hidden">
      {/* Dark Rainy Background */}
      <div className="absolute inset-0">
        {/* Dark Storm Clouds */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-800/60 to-transparent"></div>
        <div className="absolute top-10 left-1/4 w-96 h-32 bg-gradient-to-b from-gray-700/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-1/3 w-80 h-24 bg-gradient-to-b from-gray-700/50 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-5 left-2/3 w-72 h-28 bg-gradient-to-b from-gray-700/30 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Rain Drops */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400/60 to-transparent animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.8 + Math.random() * 0.4}s`
            }}
          />
        ))}
        
        {/* Heavy Rain Drops */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`heavy-${i}`}
            className="absolute w-1 h-12 bg-gradient-to-b from-blue-300/80 to-transparent animate-rain-heavy"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.2 + Math.random() * 0.6}s`
            }}
          />
        ))}
        
        {/* Misty Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 via-transparent to-gray-900/30"></div>
        
        {/* Subtle Lightning Flashes */}
        <div className="absolute inset-0 bg-white/5 animate-lightning opacity-0"></div>
        
        {/* Dark Gradient Orbs (reduced opacity for rainy effect) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles (reduced for rainy atmosphere) */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>
      </div>

      {/* Mouse Follow Effect (kept as requested) */}
      <div 
        className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Floating Badge */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-500/30 rounded-full px-6 py-3 mb-8 group hover:scale-105 transition-all duration-300">
              <CloudRain className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium">AI-Powered Flood Detection</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Main Title with Enhanced Effects */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 mb-6 relative group">
              DRIPTECT
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-500/20 to-blue-600/20 blur-3xl transform scale-150 -z-10 group-hover:scale-200 transition-transform duration-700"></div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce delay-1000"></div>
            </h1>
          </div>

          {/* Enhanced Tagline */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-blue-300 text-2xl md:text-3xl font-light mb-8 tracking-wide">
              Intelligent Flood Detection System
            </p>
          </div>

          {/* Glassmorphism Description Card */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 mb-12 max-w-4xl mx-auto shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <p className="text-gray-200 text-xl leading-relaxed relative z-10">
                Transform early flood signals into life-saving action with our AI-powered monitoring system combining edge sensors, computer vision, machine learning, and real-time risk assessment.
              </p>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://youtu.be/HuC1Jaxm1tc"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 rounded-3xl text-white font-bold text-lg overflow-hidden hover:from-blue-500 hover:via-cyan-500 hover:to-cyan-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/60 border border-blue-400/30 hover:border-cyan-400/50 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center z-10">
                  Explore Workflow
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </a>
              
              <button 
                onClick={handleAnalyzeWeather}
                className="group relative px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl text-white font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center z-10">
                  Analyze Weather
                  <Shield className="ml-3 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </button>
              
              <button 
                onClick={handlePredictNow}
                className="group relative px-10 py-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-600 rounded-3xl text-white font-bold text-lg overflow-hidden hover:from-red-500 hover:via-orange-500 hover:to-orange-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/60 border border-red-500/30 hover:border-orange-400/50 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center z-10">
                  <Bell className="mr-3 group-hover:animate-pulse" />
                  Show Live Prediciton
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-6">How It Works</h2>
            <p className="text-gray-300 text-xl">Intelligent flood prediction and rapid response system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Edge Sensors */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 text-center hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 min-h-[320px] flex flex-col justify-between">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/25">
                  <Satellite className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Real-Time Data Collection</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Smart IoT sensors continuously track rainfall, soil moisture, temperature, humidity, and water levels from the field, ensuring accurate and up-to-date monitoring.</p>
              </div>
            </div>

            {/* Vision AI */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-10 text-center hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 min-h-[320px] flex flex-col justify-between">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-cyan-500/25">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Weather Dashboard</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Combines sensor data with OpenWeather API feeds and presents them in an interactive 3D globe heatmap with live stats, 24-hour trends, and 7-day and 30-day forecasts.</p>
              </div>
            </div>

            {/* ML Engine */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 text-center hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 min-h-[320px] flex flex-col justify-between">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/25">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">AI-Powered Risk Prediction</h3>
                <p className="text-gray-300 text-lg leading-relaxed">A custom machine learning model analyzes real-time and historical data to deliver precise flood risk predictions and actionable insights for better decision-making.</p>
              </div>
            </div>

            {/* Alerts & Dashboard */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 text-center hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 min-h-[320px] flex flex-col justify-between">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/25">
                  <Grid3X3 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Instant Alerts & Notifications</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Users receive instant flood risk alerts and actionable recommendations, enabling timely preventive measures and community preparedness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced System Architecture Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-6">System Architecture</h2>
            <p className="text-gray-300 text-xl">Built with cutting-edge technology for reliable, scalable flood monitoring</p>
          </div>

          {/* System Architecture Image */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur-xl"></div>
              <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <img
                  src={SystemArchImg.src}
                  alt="System Architecture Diagram"
                  className="w-full max-w-4xl h-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Edge Sensors */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 min-h-[280px] flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/25">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Edge Sensors</h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>ESP32 Microcontrollers using Wi-Fi Module</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>DHT11 Temperature/Humidity</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Soil Moisture Sensors</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Rain Detection Modules</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Water Level Sensors</li>
                </ul>
              </div>
            </div>

            {/* Edge Vision */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 min-h-[280px] flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-cyan-500/25">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Data Processing & API Layer</h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Flask API for secure data transmission</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Preprocessing and storage of incoming sensor data</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Integration with OpenWeather API</li>
                </ul>
              </div>
            </div>

            {/* ML Backend */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/25">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">AI & Risk Engine</h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Random Forest ensures precise flood predictions</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Combines historical and live weather data</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Generates real-time risk scores</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Retrains regularly for improved accuracy</li>
                </ul>
              </div>
            </div>

            {/* Dashboard */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 min-h-[280px] flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/25">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Interactive Dashboard</h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Built with Next.js and TailwindCSS</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>3D globe to visualize flood hotspots</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Instant alerts via SMS</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Real-time heatmaps and trend graphs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Key Features Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-6">Key Features</h2>
            <p className="text-gray-300 text-xl">Comprehensive flood monitoring with cutting-edge technology and intelligent alerts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Real-time Detection */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/25">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Real-time Detection</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Detect floods in &lt;10s latency with continuous monitoring</p>
              </div>
            </div>

            {/* Hyperlocal Risk Mapping */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-10 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-cyan-500/25">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Hyperlocal Risk Mapping</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Interactive 3D globe dashboard with flood hotspot visualization</p>
              </div>
            </div>

            {/* AI-Powered Accuracy */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/25">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">AI-Powered Accuracy</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Advanced sensor fusion with machine learning (random forest classifier)</p>
              </div>
            </div>

            {/* Instant Alerts */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/25">
                  <Bell className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Instant Alerts</h3>
                <p className="text-gray-300 text-lg leading-relaxed">SMS, email, and dashboard notifications for immediate response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Meet Our Team Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-6">Meet Our Team</h2>
            <p className="text-gray-300 text-xl">The brilliant minds behind DripTect's innovative flood detection system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 text-center hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/25 overflow-hidden border-4 border-blue-500/30">
                  <img 
                    src={AryanImg.src} 
                    alt="Aryan Ghosh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Aryan Ghosh</h3>
                <p className="text-blue-300 font-medium mb-4">ML and IoT Specialist</p>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  ML Engineer and IoT expert with deep knowledge in sensor networks, and real-time data processing systems.
                </p>
                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/aryan-ghosh-83a26631b"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn profile of Aryan Ghosh"
                    className="group/link relative p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/Aryan-Ghosh-Code"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub profile of Aryan Ghosh"
                    className="group/link relative p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    <Github className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 text-center hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/25 overflow-hidden border-4 border-cyan-500/30">
                  <img 
                    src={SurajitImg.src} 
                    alt="Surajit Ray" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Surajit Ray</h3>
                <p className="text-cyan-300 font-medium mb-4">ML and IoT Specialist</p>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Expert in machine learning and computer vision, specializing in flood pattern recognition and predictive modeling.
                </p>
                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/surajit-ray-0761382b9"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn profile of Surajit Ray"
                    className="group/link relative p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/surajit8100"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub profile of Surajit Ray"
                    className="group/link relative p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    <Github className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 text-center hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/25 overflow-hidden border-4 border-blue-500/30">
                  <img 
                    src={AnshleyImg.src} 
                    alt="Anshley Mukherjee" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Anshley Mukherjee</h3>
                <p className="text-blue-300 font-medium mb-4">Full Stack Dev and UI Lead</p>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Frontend and UI specialist, creating responsive dashboards and scalable APIs for real-time monitoring.
                </p>
                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/anshley-mukherjee-8b1935320"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn profile of Anshley Mukherjee"
                    className="group/link relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/anshleyy"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub profile of Anshley Mukherjee"
                    className="group/link relative p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    <Github className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 text-center hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/25 overflow-hidden border-4 border-purple-500/30">
                  <img 
                    src={DebnandaImg.src} 
                    alt="Debnanda Datta" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Debnanda Datta</h3>
                <p className="text-purple-300 font-medium mb-4">Frontend and Database Lead</p>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Analytics expert focused on environmental data analysis, risk assessment, and predictive modeling for flood events.
                </p>
                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/debnanda-datta"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn profile of Debnanada Datta"
                    className="group/link relative p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/debnanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub profile of Debnanda Datta"
                    className="group/link relative p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    <Github className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-rain {
          animation: rain linear infinite;
        }
        
        @keyframes rain-heavy {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-rain-heavy {
          animation: rain-heavy linear infinite;
        }
        
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          5%, 15% { opacity: 0.1; }
        }
        .animate-lightning {
          animation: lightning 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}