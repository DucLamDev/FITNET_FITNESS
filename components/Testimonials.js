'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Testimonials = () => {
  const { t, i18n } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isVietnamese = i18n.language?.startsWith('vi')

  const testimonials = isVietnamese
    ? [
      {
        name: 'Trần Văn Hùng',
        role: 'Giám đốc kinh doanh, 41 tuổi',
        image: '/thu-vien-anh/12-cach-tao-dang-chup-anh-gym-nam-inkythuatso-15-16-47-29.jpg',
        rating: 5,
        goal: 'Tăng cơ, cải thiện tư thế và giảm đau lưng',
        result: '+4.5kg cơ nạc sau 5 tháng, form vai lưng rõ hơn',
        timeline: 'Chu kỳ sức mạnh 12 tuần với HLV cá nhân',
        text: 'Tôi đánh giá cao việc FitNet không đẩy khách tập quá sức. HLV tập trung vào kỹ thuật, tư thế và khả năng hồi phục. Cảm giác là một nơi làm nghề nghiêm túc, không chạy theo khuyến mãi cho đẹp.'
      },
      {
        name: 'Nguyễn Thị Mai',
        role: 'Chủ doanh nghiệp, 36 tuổi',
        image: '/thu-vien-anh/hinh-nu-gymer-xinh-dep_043029028.jpg',
        rating: 5,
        goal: 'Giảm mỡ sau sinh và lấy lại sức bền',
        result: '-12kg trong 7 tháng, vòng eo giảm 14cm',
        timeline: 'Tập 4 buổi/tuần và theo dõi dinh dưỡng',
        text: 'Tôi không cần một phòng gym quá hào nhoáng, tôi cần nơi giúp mình duy trì lâu dài. FitNet làm được điều đó vì mỗi giai đoạn đều có người theo sát, nhắc kỹ thuật và điều chỉnh lịch tập theo công việc thực tế của tôi.'
      },
      {
        name: 'Lan Anh',
        role: 'Nhân sự văn phòng, 29 tuổi',
        image: '/thu-vien-anh/tao-dang-chup-anh-gym-nu__11__0bb329be1a7d409dba617e79dab5aa9d-1.jpg-1.jpg',
        rating: 5,
        goal: 'Tăng tự tin, siết cơ và duy trì thói quen tập đều',
        result: 'Giảm 6kg mỡ và giữ lịch tập ổn định suốt 4 tháng',
        timeline: 'Kết hợp lớp nhóm buổi tối và 1 buổi PT/tuần',
        text: 'Điều mình thích nhất là cảm giác thương hiệu rất thật. Từ cách chào đón ở quầy, cách HLV nhớ tên đến những buổi tập đông nhưng không hỗn loạn, mọi thứ đều cho thấy đây là một phòng gym vận hành có chăm chút.'
      }
    ]
    : [
      {
        name: 'Tran Van Hung',
        role: 'Sales director, age 41',
        image: '/thu-vien-anh/12-cach-tao-dang-chup-anh-gym-nam-inkythuatso-15-1679565206.jpg',
        rating: 5,
        goal: 'Build muscle, improve posture, reduce back pain',
        result: '+4.5kg lean mass in 5 months with visible shoulder-back improvements',
        timeline: '12-week strength cycles with a personal coach',
        text: 'I value that FitNet never pushes members recklessly. My coach focused on technique, posture, and recovery. It feels like a gym that takes the craft seriously instead of only selling promotions.'
      },
      {
        name: 'Nguyen Thi Mai',
        role: 'Business owner, age 36',
        image: '/thu-vien-anh/hinh-nu-gymer-xinh-dep_043029028.jpg',
        rating: 5,
        goal: 'Postpartum fat loss and better stamina',
        result: '-12kg in 7 months, waist down 14cm',
        timeline: '4 sessions/week with nutrition tracking',
        text: 'I did not need a flashy gym, I needed a place that could help me stay consistent. FitNet did that because every phase had someone checking in, correcting my form, and adapting training to my real work schedule.'
      },
      {
        name: 'Lan Anh',
        role: 'Office worker, age 29',
        image: '/thu-vien-anh/tao-dang-chup-anh-gym-nu__11__0bb329be1a7d409dba617c4584f362f0.jpg',
        rating: 5,
        goal: 'Build confidence, get leaner, stay consistent',
        result: 'Lost 6kg of fat and kept a steady routine for 4 months',
        timeline: 'Evening classes plus one PT session per week',
        text: 'What stood out most was how real the brand felt. From the welcome at the front desk to coaches remembering names and busy sessions still feeling organized, everything suggested a gym run with care.'
      }
    ]

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
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
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

        <div className="max-w-5xl mx-auto relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -1000 : 1000, opacity: 0 }}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="bg-dark-200 rounded-2xl p-8 md:p-12 relative"
            >
              <FaQuoteLeft className="text-primary text-4xl mb-6 opacity-50" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <InfoTile label={isVietnamese ? 'Mục tiêu' : 'Goal'} value={testimonials[currentIndex].goal} />
                <InfoTile label={isVietnamese ? 'Kết quả' : 'Result'} value={testimonials[currentIndex].result} />
                <InfoTile label={isVietnamese ? 'Lộ trình' : 'Timeline'} value={testimonials[currentIndex].timeline} />
              </div>

              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

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

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-8' : 'bg-dark-300 hover:bg-primary/50 w-3'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const InfoTile = ({ label, value }) => (
  <div className="rounded-xl border border-white/10 bg-dark-100 p-4">
    <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">{label}</p>
    <p className="text-white leading-6">{value}</p>
  </div>
)

export default Testimonials
