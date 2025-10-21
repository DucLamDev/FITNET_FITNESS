'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { memberAPI } from '@/lib/api'
import { FaUsers, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [recentMembers, setRecentMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, membersRes] = await Promise.all([
        memberAPI.getStats(),
        memberAPI.getAll({ limit: 5, page: 1 })
      ])
      setStats(statsRes.data.data)
      setRecentMembers(membersRes.data.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Tổng Hội Viên',
      value: stats?.total || 0,
      icon: FaUsers,
      color: 'from-blue-600 to-blue-800',
      textColor: 'text-blue-500'
    },
    {
      title: 'Đang Hoạt Động',
      value: stats?.active || 0,
      icon: FaCheckCircle,
      color: 'from-green-600 to-green-800',
      textColor: 'text-green-500'
    },
    {
      title: 'Chờ Xử Lý',
      value: stats?.pending || 0,
      icon: FaClock,
      color: 'from-yellow-600 to-yellow-800',
      textColor: 'text-yellow-500'
    },
    {
      title: 'Hết Hạn',
      value: stats?.expired || 0,
      icon: FaTimesCircle,
      color: 'from-red-600 to-red-800',
      textColor: 'text-red-500'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-dark-100 rounded-xl p-6 border border-dark-300 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="text-white text-2xl" />
              </div>
              <span className={`text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </span>
            </div>
            <h3 className="text-gray-400 font-semibold">{card.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Membership Plans Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-dark-100 rounded-xl p-6 border border-dark-300"
      >
        <h2 className="text-xl font-bold mb-6">Phân Bố Gói Hội Viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats?.byPlan?.map((plan, index) => (
            <div key={index} className="bg-dark-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">{plan._id}</span>
                <span className="font-bold text-xl text-primary">{plan.count}</span>
              </div>
              <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary"
                  style={{ width: `${(plan.count / stats.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-dark-100 rounded-xl p-6 border border-dark-300"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Hội Viên Mới</h2>
          <a href="/dashboard/members" className="text-primary hover:underline">
            Xem Tất Cả
          </a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-300">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Họ Tên</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Gói</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Trạng Thái</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Ngày Tham Gia</th>
              </tr>
            </thead>
            <tbody>
              {recentMembers.map((member) => (
                <tr key={member._id} className="border-b border-dark-300 hover:bg-dark-200 transition-colors">
                  <td className="py-3 px-4">{member.fullName}</td>
                  <td className="py-3 px-4 text-gray-400">{member.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {member.membershipPlan}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      member.membershipStatus === 'Active' ? 'bg-green-500/20 text-green-500' :
                      member.membershipStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {member.membershipStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
