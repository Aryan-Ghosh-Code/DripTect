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
  MessageSquare
} from 'lucide-react'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handlePredictNow = () => {
    router.push('/dashboard')
  }

  const handleViewDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-cyan-400 text-lg font-medium mb-4">Advanced Flood Detection & Prevention</p>
          </div>

          {/* Main Title */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl md:text-8xl font-bold text-cyan-400 mb-6 relative">
              DRIPTECT
              {/* 3D Globe Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-3xl transform scale-150 -z-10"></div>
            </h1>
          </div>

          {/* Tagline */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-cyan-300 text-xl md:text-2xl font-medium mb-8">Intelligent Flood Detection System</p>
          </div>

          {/* Description Card */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
              <p className="text-gray-300 text-lg leading-relaxed">
                Transform early flood signals into life-saving action with our AI-powered monitoring system combining edge sensors, computer vision, machine learning, and real-time risk assessment.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
                Explore Workflow
                <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group relative px-8 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white font-semibold text-lg hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
              
              <button 
                onClick={handlePredictNow}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white font-semibold text-lg hover:from-red-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
              >
                <Bell className="inline mr-2" />
                Predict Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Intelligent flood prediction and rapid response system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Edge Sensors */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Satellite className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Edge Sensors</h3>
                <p className="text-gray-300">Collect water level, rainfall, and soil moisture data in real-time</p>
              </div>
            </div>

            {/* Vision AI */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Vision AI</h3>
                <p className="text-gray-300">Camera systems detect flood patterns and water levels visually</p>
              </div>
            </div>

            {/* ML Engine */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-pink-500/20 to-rose-600/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8 text-center hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">ML Engine</h3>
                <p className="text-gray-300">Fuses sensor and vision data to predict flood risk levels</p>
              </div>
            </div>

            {/* Alerts & Dashboard */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center hover:border-red-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Grid3X3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Alerts & Dashboard</h3>
                <p className="text-gray-300">Sends SMS/email alerts and displays on 3D globe dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">System Architecture</h2>
            <p className="text-gray-400 text-lg">Built with cutting-edge technology for reliable, scalable flood monitoring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Edge Sensors */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Edge Sensors</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• ESP32 Microcontrollers</li>
                  <li>• DHT11 Temperature/Humidity</li>
                  <li>• Soil Moisture Sensors</li>
                  <li>• Rain Detection Modules</li>
                </ul>
              </div>
            </div>

            {/* Edge Vision */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Edge Vision</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Raspberry Pi 4</li>
                  <li>• NVIDIA Jetson Nano</li>
                  <li>• OpenCV Processing</li>
                  <li>• Real-time Analysis</li>
                </ul>
              </div>
            </div>

            {/* ML Backend */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-pink-500/20 to-rose-600/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">ML Backend</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• FastAPI Framework</li>
                  <li>• Random Forest ML</li>
                  <li>• CNN Vision Models</li>
                  <li>• Real-time Processing</li>
                </ul>
              </div>
            </div>

            {/* Dashboard */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-red-500/20 to-purple-600/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Dashboard</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Next.js Frontend</li>
                  <li>• Three.js 3D Globe</li>
                  <li>• Real-time Updates</li>
                  <li>• Mobile Responsive</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-gray-400 text-lg">Comprehensive flood monitoring with cutting-edge technology and intelligent alerts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Real-time Detection */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Satellite className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Real-time Detection</h3>
                <p className="text-gray-300">Detect floods in &lt;10s latency with continuous monitoring</p>
              </div>
            </div>

            {/* Hyperlocal Risk Mapping */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Hyperlocal Risk Mapping</h3>
                <p className="text-gray-300">Interactive 3D globe dashboard with flood hotspot visualization</p>
              </div>
            </div>

            {/* AI-Powered Accuracy */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">AI-Powered Accuracy</h3>
                <p className="text-gray-300">Advanced sensor fusion with computer vision and machine learning</p>
              </div>
            </div>

            {/* Instant Alerts */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Instant Alerts</h3>
                <p className="text-gray-300">SMS, email, and dashboard notifications for immediate response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Deploy?</h2>
            <p className="text-gray-300 text-lg mb-8">Start monitoring your area with the most advanced flood detection system</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleViewDashboard}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                <Smartphone className="inline mr-2" />
                View Dashboard
                <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white font-semibold text-lg hover:from-red-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25">
                <Mail className="inline mr-2" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
