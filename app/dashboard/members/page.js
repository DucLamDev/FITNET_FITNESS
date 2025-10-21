'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { memberAPI } from '@/lib/api'
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [planFilter, setPlanFilter] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [statusFilter, planFilter])

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const params = {}
      if (statusFilter) params.status = statusFilter
      if (planFilter) params.plan = planFilter
      if (searchTerm) params.search = searchTerm
      
      const response = await memberAPI.getAll(params)
      setMembers(response.data.data)
    } catch (error) {
      toast.error('Không thể tải danh sách hội viên')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchMembers()
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ${name}?`)) return
    
    try {
      await memberAPI.delete(id)
      toast.success('Xóa hội viên thành công')
      fetchMembers()
    } catch (error) {
      toast.error('Không thể xóa hội viên')
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await memberAPI.update(id, { membershipStatus: newStatus })
      toast.success('Cập nhật trạng thái thành công')
      fetchMembers()
    } catch (error) {
      toast.error('Không thể cập nhật trạng thái')
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Quản Lý Hội Viên</h1>
        <button className="btn-primary flex items-center gap-2">
          <FaPlus /> Thêm Hội Viên
        </button>
      </div>

      {/* Filters */}
      <div className="bg-dark-100 rounded-xl p-6 border border-dark-300">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                className="w-full bg-dark border border-dark-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Active">Đang hoạt động</option>
            <option value="Pending">Chờ xử lý</option>
            <option value="Inactive">Không hoạt động</option>
            <option value="Expired">Hết hạn</option>
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">Tất cả gói</option>
            <option value="Basic">Cơ Bản</option>
            <option value="Premium">Cao Cấp</option>
            <option value="VIP">VIP</option>
          </select>
        </form>
      </div>

      {/* Members Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100 rounded-xl border border-dark-300 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Họ Tên</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Email</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Số ĐT</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Gói</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Trạng Thái</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Ngày Tham Gia</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    Không tìm thấy hội viên nào
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member._id} className="border-t border-dark-300 hover:bg-dark-200 transition-colors">
                    <td className="py-4 px-6 font-semibold">{member.fullName}</td>
                    <td className="py-4 px-6 text-gray-400">{member.email}</td>
                    <td className="py-4 px-6 text-gray-400">{member.phoneNumber}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                        {member.membershipPlan}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={member.membershipStatus}
                        onChange={(e) => handleStatusUpdate(member._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm border-0 cursor-pointer ${
                          member.membershipStatus === 'Active' ? 'bg-green-500/20 text-green-500' :
                          member.membershipStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          member.membershipStatus === 'Inactive' ? 'bg-gray-500/20 text-gray-500' :
                          'bg-red-500/20 text-red-500'
                        }`}
                      >
                        <option value="Active">Đang hoạt động</option>
                        <option value="Pending">Chờ xử lý</option>
                        <option value="Inactive">Không hoạt động</option>
                        <option value="Expired">Hết hạn</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id, member.fullName)}
                          className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
