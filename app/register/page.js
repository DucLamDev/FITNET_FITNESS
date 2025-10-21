'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { memberAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaDumbbell, FaCreditCard } from 'react-icons/fa'

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await memberAPI.create(data)
      toast.success(response.data.message || 'Đăng ký thành công! Chào mừng đến với FitNet Fitness!')
      reset()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="heading-2 mb-4">
              ĐĂNG KÝ <span className="text-gradient">TẬP THỬ MIỄN PHÍ</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Điền vào biểu mẫu dưới đây để đặt lịch tập thử miễn phí tại Fitnet Fitness - Hà Nội
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-dark-100 rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaUser className="text-primary" />
                  Họ và Tên *
                </label>
                <input
                  type="text"
                  {...register('fullName', { 
                    required: 'Vui lòng nhập họ và tên',
                    minLength: { value: 2, message: 'Tên phải có ít nhất 2 ký tự' }
                  })}
                  className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Nguyễn Văn A"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  Địa Chỉ Email *
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
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaPhone className="text-primary" />
                  Số Điện Thoại *
                </label>
                <input
                  type="tel"
                  {...register('phoneNumber', { 
                    required: 'Vui lòng nhập số điện thoại',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Vui lòng nhập số điện thoại hợp lệ (10-15 chữ số)'
                    }
                  })}
                  className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="0346676169"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaVenusMars className="text-primary" />
                  Giới Tính *
                </label>
                <select
                  {...register('gender', { required: 'Vui lòng chọn giới tính' })}
                  className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>

              {/* Membership Plan */}
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaDumbbell className="text-primary" />
                  Gói Hội Viên *
                </label>
                <select
                  {...register('membershipPlan', { required: 'Vui lòng chọn gói hội viên' })}
                  className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Chọn gói tập</option>
                  <option value="Basic">Cơ Bản - 299,000 VND/tháng</option>
                  <option value="Premium">Cao Cấp - 799,000 VND/6 tháng</option>
                  <option value="VIP">VIP - 1,499,000 VND/năm</option>
                </select>
                {errors.membershipPlan && (
                  <p className="text-red-500 text-sm mt-1">{errors.membershipPlan.message}</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaCreditCard className="text-primary" />
                  Phương Thức Thanh Toán (Tùy chọn)
                </label>
                <select
                  {...register('paymentMethod')}
                  className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="Not Selected">Chọn phương thức thanh toán</option>
                  <option value="Cash">Tiền mặt</option>
                  <option value="Credit Card">Thẻ tín dụng</option>
                  <option value="Debit Card">Thẻ ghi nợ</option>
                  <option value="Bank Transfer">Chuyển khoản</option>
                  <option value="E-Wallet">Ví điện tử</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Ghi Chú Thêm (Tùy chọn)
                </label>
                <textarea
                  {...register('notes')}
                  rows="4"
                  className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Có yêu cầu đặc biệt hoặc câu hỏi nào không?"
                ></textarea>
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
                    Đang xử lý...
                  </>
                ) : (
                  'Hoàn Tất Đăng Ký'
                )}
              </motion.button>

              <p className="text-sm text-gray-400 text-center">
                Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
