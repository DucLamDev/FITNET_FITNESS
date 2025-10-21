'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { contactAPI } from '@/lib/api'
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa'

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await contactAPI.getAll()
      setMessages(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    try {
      await contactAPI.delete(id)
      toast.success('Message deleted successfully')
      setSelectedMessage(null)
      fetchMessages()
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await contactAPI.update(id, { status: newStatus, isRead: true })
      toast.success('Status updated successfully')
      fetchMessages()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message)
    
    if (!message.isRead) {
      try {
        await contactAPI.update(message._id, { isRead: true })
        fetchMessages()
      } catch (error) {
        console.error('Failed to mark as read')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-dark-100 rounded-xl border border-dark-300 overflow-hidden">
          <div className="p-4 border-b border-dark-300">
            <h2 className="font-bold">Inbox</h2>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                No messages yet
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => handleSelectMessage(message)}
                  className={`p-4 border-b border-dark-300 cursor-pointer transition-colors ${
                    selectedMessage?._id === message._id
                      ? 'bg-dark-200'
                      : 'hover:bg-dark-200'
                  } ${!message.isRead ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {message.isRead ? (
                        <FaEnvelopeOpen className="text-gray-400" />
                      ) : (
                        <FaEnvelope className="text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold truncate ${!message.isRead ? 'text-primary' : ''}`}>
                          {message.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          message.status === 'New' ? 'bg-green-500/20 text-green-500' :
                          message.status === 'Read' ? 'bg-blue-500/20 text-blue-500' :
                          message.status === 'Replied' ? 'bg-purple-500/20 text-purple-500' :
                          'bg-gray-500/20 text-gray-500'
                        }`}>
                          {message.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{message.email}</p>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {message.message}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-100 rounded-xl border border-dark-300 p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-dark-300">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedMessage.name}</h2>
                  <p className="text-gray-400">{selectedMessage.email}</p>
                  {selectedMessage.subject && (
                    <p className="text-sm text-gray-500 mt-2">
                      Subject: {selectedMessage.subject}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusUpdate(selectedMessage._id, e.target.value)}
                    className="bg-dark border border-dark-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="New">New</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Message:</h3>
                <div className="bg-dark-200 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="btn-primary">
                  Reply via Email
                </button>
                <button className="btn-secondary">
                  Archive
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-dark-100 rounded-xl border border-dark-300 p-12 flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <FaEnvelope className="text-6xl mx-auto mb-4 opacity-20" />
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
