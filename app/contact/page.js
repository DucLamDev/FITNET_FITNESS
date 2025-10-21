'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { contactAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await contactAPI.create(data)
      toast.success(response.data.message || 'Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.')
      reset()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gửi tin nhắn thất bại. Vui lòng thử lại.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Địa Chỉ',
      content: 'Tầng 7, Số 23, Ngõ 89 Phạm Văn Đồng, Cầu Giấy, Hà Nội, Việt Nam'
    },
    {
      icon: FaPhone,
      title: 'Điện Thoại',
      content: '034 667 6169',
      link: 'tel:0346676169'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'info@fitnetfitness.com',
      link: 'mailto:info@fitnetfitness.com'
    },
    {
      icon: FaClock,
      title: 'Giờ Mở Cửa',
      content: 'Thứ 2 - Chủ Nhật: 6:00 SÁNG - 10:00 TỐI'
    }
  ]

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <section className="section-padding pt-32">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-2 mb-4">
              LIÊN HỆ <span className="text-gradient">VỚI CHÚNG TÔI</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Có câu hỏi? Chúng tôi muốn nghe từ bạn. Gửi tin nhắn cho chúng tôi và chúng tôi sẽ phản hồi sớm nhất có thể.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="heading-3 mb-4">Thông Tin Liên Hệ</h2>
                  <p className="text-gray-400 mb-8">
                    Liên hệ với chúng tôi qua bất kỳ kênh nào sau đây. Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn.
                  </p>
                </div>

                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-dark-100 rounded-lg hover:bg-dark-200 transition-colors"
                  >
                    <div className="bg-gradient-primary p-4 rounded-lg">
                      <info.icon className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-400">{info.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Map Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="h-64 bg-dark-100 rounded-lg overflow-hidden"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.657867393458!2d105.78270231495367!3d21.04583598599472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab2d1b0e23e3%3A0x9a2a3a4b5b8c7d6e!2sPham%20Van%20Dong%2C%20Cau%20Giay%2C%20Hanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-dark-100 rounded-2xl p-8 md:p-12"
            >
              <h2 className="heading-3 mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    {...register('name', { 
                      required: 'Vui lòng nhập họ và tên',
                      minLength: { value: 2, message: 'Tên phải có ít nhất 2 ký tự' }
                    })}
                    className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
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

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tiêu Đề
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Chúng tôi có thể giúp gì cho bạn?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nội Dung *
                  </label>
                  <textarea
                    {...register('message', { 
                      required: 'Vui lòng nhập nội dung tin nhắn',
                      minLength: { value: 10, message: 'Tin nhắn phải có ít nhất 10 ký tự' }
                    })}
                    rows="6"
                    className="w-full bg-dark border border-dark-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Nêu chi tiết thêm về câu hỏi của bạn..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
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
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Gửi Tin Nhắn
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
