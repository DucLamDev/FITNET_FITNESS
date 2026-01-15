'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaPaperPlane, FaTimes, FaSpinner } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const AiAdvisor = ({ bmi, status, height, weight }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fitnet-fitness-be.onrender.com/api';
      const response = await fetch(`${API_URL}/ai-advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          bmi,
          status,
          height,
          weight,
          history: messages
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else {
        // Handle rate limit specifically
        const errorMessage = response.status === 429 
          ? 'AI đang bận, vui lòng đợi 1 phút và thử lại.'
          : t('aiAdvisor.error')
          
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: errorMessage
        }])
      }
    } catch (error) {
      console.error('AI Advisor Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: t('aiAdvisor.error') 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* AI Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-primary to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:shadow-primary/50 transition-shadow"
      >
        <FaRobot />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-8 z-50 w-96 h-[500px] bg-dark rounded-2xl shadow-2xl border border-dark-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-pink-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{t('aiAdvisor.title')}</h3>
                  <p className="text-white/80 text-xs">{t('aiAdvisor.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <FaRobot className="text-5xl mx-auto mb-4 text-primary" />
                  <p className="text-sm">{t('aiAdvisor.welcome')}</p>
                  {bmi && (
                    <p className="text-xs mt-2">
                      {t('aiAdvisor.bmiInfo', { bmi, status: t(`bmi.statusLabels.${status}`) })}
                    </p>
                  )}
                </div>
              )}
              
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-dark-100 text-gray-300'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-dark-100 text-gray-300 p-3 rounded-2xl">
                    <FaSpinner className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-dark-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('aiAdvisor.placeholder')}
                  className="flex-1 bg-dark-100 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-colors"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AiAdvisor
