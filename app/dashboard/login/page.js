'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { authAPI } from '@/lib/api'
import { FaDumbbell, FaEnvelope, FaLock } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await authAPI.login(data)
      localStorage.setItem('token', response.data.data.token)
      toast.success('Đăng nhập thành công!')
      router.push('/dashboard')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaDumbbell className="text-primary text-4xl" />
            <span className="font-display text-3xl text-gradient">
              FITNET FITNESS
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Trang Quản Trị</h1>
          <p className="text-gray-400">Đăng nhập để quản lý phòng gym của bạn</p>
        </div>

        {/* Login Form */}
        <div className="bg-dark-100 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                Địa Chỉ Email
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Vui lòng nhập địa chỉ email hợp lệ'
                  }
                })}
                className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="admin@fitnetfitness.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FaLock className="text-primary" />
                Mật Khẩu
              </label>
              <input
                type="password"
                {...register('password', { 
                  required: 'Vui lòng nhập mật khẩu',
                  minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                })}
                className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner w-5 h-5 border-2"></div>
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng Nhập'
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-dark-200 rounded-lg border border-primary/20">
            <p className="text-sm text-gray-400 mb-2">Tài khoản Demo:</p>
            <p className="text-sm text-primary">Email: admin@fitnetfitness.com</p>
            <p className="text-sm text-primary">Mật khẩu: admin123</p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            ← Về Trang Chủ
          </a>
        </div>
      </motion.div>
    </div>
  )
}
