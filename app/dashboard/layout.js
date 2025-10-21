'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaDumbbell, 
  FaUsers, 
  FaEnvelope, 
  FaChartBar, 
  FaSignOutAlt,
  FaBars,
  FaTimes 
} from 'react-icons/fa'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token && pathname !== '/dashboard/login') {
      router.push('/dashboard/login')
    } else if (token) {
      setIsAuthenticated(true)
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/dashboard/login')
  }

  const navItems = [
    { name: 'Tổng Quan', href: '/dashboard', icon: FaChartBar },
    { name: 'Hội Viên', href: '/dashboard/members', icon: FaUsers },
    { name: 'Tin Nhắn', href: '/dashboard/messages', icon: FaEnvelope },
  ]

  if (pathname === '/dashboard/login') {
    return children
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-100 border-r border-dark-300 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-dark-300">
            <Link href="/" className="flex items-center space-x-2">
              <FaDumbbell className="text-primary text-3xl" />
              <div>
                <span className="font-display text-xl text-gradient block">
                  FITNET
                </span>
                <span className="text-gray-400 text-xs">Quản Trị Viên</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-primary text-white'
                      : 'text-gray-400 hover:bg-dark-200 hover:text-white'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="text-xl" />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-dark-300">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-200 hover:text-red-500 transition-all w-full"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-semibold">Đăng Xuất</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-dark/80 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-dark-100 border-b border-dark-300 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white text-2xl"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold">
                {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
