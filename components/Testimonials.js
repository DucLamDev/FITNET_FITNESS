'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Testimonials = () => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      name: 'Nguyễn Thị Mai',
      role: 'Chủ doanh nghiệp',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170',
      rating: 5,
      text: 'FitNet Fitness đã thay đổi hoàn toàn cuộc sống của tôi! Các huấn luyện viên tuyệt vời, cơ sở đẳng cấp, và cộng đồng rất hỗ trợ. Tôi đã giảm được 15kg trong 6 tháng!'
    },
    {
      name: 'Michael Chen',
      role: 'Kỹ sư phần mềm',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287',
      rating: 5,
      text: 'Là người nước ngoài ở Hà Nội, tôi lo lắng về rào cản ngôn ngữ. Nhưng FitNet thực sự không có giới hạn ngôn ngữ! Đội ngũ nhân viên đa ngôn ngữ đã khách tôi cảm thấy như ở nhà từ ngày đầu tiên.'
    },
    {
      name: 'Trần Văn Hùng',
      role: 'Giám đốc kinh doanh',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288',
      rating: 5,
      text: 'Phòng gym tốt nhất ở Hà Nội! Các buổi huấn luyện cá nhân rất đáng tiền. Tôi đạt được mục tiêu thể hình nhanh hơn nhiều so với dự kiến. Rất khuyến nghị!'
    },
    {
      name: 'David Park',
      role: 'Doanh nhân',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287',
      rating: 5,
      text: 'Các lớp tập nhóm cực kỳ tạo động lực! Tôi đã kết bạn với nhiều người tuyệt vời ở đây và năng lượng luôn tuyệt vời. FitNet không chỉ là phòng gym, đó là lối sống.'
    }
  ]

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg tracking-wider">
            {t('testimonials.title')}
          </span>
          <h2 className="heading-2 my-4">
            {t('testimonials.heading')} <span className="text-gradient">{t('testimonials.headingHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                x: direction > 0 ? 1000 : -1000,
                opacity: 0 
              }}
              animate={{ 
                x: 0,
                opacity: 1 
              }}
              exit={{ 
                x: direction > 0 ? -1000 : 1000,
                opacity: 0 
              }}
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="bg-dark-200 rounded-2xl p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-primary text-4xl mb-6 opacity-50" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-all hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-all hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-dark-300 hover:bg-primary/50 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
