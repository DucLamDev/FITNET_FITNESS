'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaCheckCircle, FaRegClock, FaUserFriends } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.language?.startsWith('vi')

  const proofPoints = isVietnamese
    ? [
        {
          title: 'Tư vấn đầu vào kỹ',
          description: 'Đo chỉ số cơ thể, hỏi lịch sinh hoạt, mức vận động và mục tiêu trước khi xếp lộ trình.',
          icon: FaCheckCircle
        },
        {
          title: 'Theo sát theo tuần',
          description: 'Huấn luyện viên cập nhật bài tập, tải tập và mức hồi phục để điều chỉnh kịp thời.',
          icon: FaRegClock
        },
        {
          title: 'Môi trường dễ hòa nhập',
          description: 'Đội ngũ hỗ trợ người mới, dân văn phòng, người nước ngoài và khách cần theo sát 1-1.',
          icon: FaUserFriends
        }
      ]
    : [
        {
          title: 'Thorough onboarding',
          description: 'We assess body metrics, schedule, activity level, and goals before building a plan.',
          icon: FaCheckCircle
        },
        {
          title: 'Weekly follow-up',
          description: 'Trainers adjust exercises, training load, and recovery based on real weekly progress.',
          icon: FaRegClock
        },
        {
          title: 'Welcoming community',
          description: 'A supportive environment for beginners, office workers, expats, and one-on-one coaching clients.',
          icon: FaUserFriends
        }
      ]

  const brandStory = isVietnamese
    ? {
        eyebrow: 'Cảm giác của một thương hiệu thật',
        title: 'Không chỉ là nơi tập, mà là nơi có người đồng hành cùng mục tiêu của bạn.',
        description:
          'FitNet được xây dựng cho những người cần kết quả rõ ràng: giảm mỡ an toàn, tăng cơ đúng kỹ thuật, cải thiện sức bền và tạo thói quen tập luyện bền vững giữa lịch sống bận rộn ở Hà Nội.'
      }
    : {
        eyebrow: 'A brand that feels real',
        title: 'More than a gym, it is a place where someone stays with your goal.',
        description:
          'FitNet is built for people who want measurable outcomes: safe fat loss, proper muscle gain, better endurance, and sustainable habits that fit a busy life in Hanoi.'
      }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-section/thiet-ke-phong-gym-10.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10 px-4">
        <div className="max-w-6xl grid lg:grid-cols-[1.25fr_0.85fr] gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block text-primary font-bold text-lg md:text-xl mb-4 tracking-wider"
            >
              {t('hero.welcome')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="heading-3 mb-6 text-white"
            >
              <span className="block leading-tight">{t('hero.title')}</span>
              <span className="text-gradient animate-gradient-x block mt-2">
                {t('hero.titleHighlight')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/register" className="btn-primary group">
                {t('hero.bookNow')}
                <FaArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16"
            >
              <StatItem number="1.3K+" label={t('hero.stats.members')} />
              <StatItem number="8+" label={t('hero.stats.experience')} />
              <StatItem number="50+" label={t('hero.stats.trainers')} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="grid md:grid-cols-3 gap-4 mt-10"
            >
              {proofPoints.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                  <item.icon className="text-primary text-2xl mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-6">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="hidden lg:block"
          >
            <div className="rounded-[28px] border border-white/10 bg-black/35 backdrop-blur-md p-7 shadow-2xl shadow-black/40">
              <span className="inline-flex rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold tracking-wide text-primary">
                {brandStory.eyebrow}
              </span>
              <h3 className="mt-5 text-3xl font-display leading-tight text-white">
                {brandStory.title}
              </h3>
              <p className="mt-4 text-gray-300 leading-7">
                {brandStory.description}
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-primary/90">
                    {isVietnamese ? 'Hành trình điển hình' : 'Typical journey'}
                  </p>
                  <p className="mt-2 text-white leading-7">
                    {isVietnamese
                      ? 'Tuần 1 đánh giá thể trạng, tuần 2-4 làm quen kỹ thuật và nhịp tập, từ tuần 5 bắt đầu tăng tải theo mục tiêu giảm mỡ hoặc tăng cơ.'
                      : 'Week 1 focuses on assessment, weeks 2-4 on technique and routine, and week 5 onward on progressive training toward fat loss or muscle gain.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-primary/90">
                    {isVietnamese ? 'Điều khách hàng nhớ nhất' : 'What members remember most'}
                  </p>
                  <p className="mt-2 text-white leading-7">
                    {isVietnamese
                      ? '"HLV nhớ rõ chấn thương cũ của mình, nhắc kỹ từng buổi và luôn điều chỉnh bài khi mình làm việc quá tải."'
                      : '"My trainer remembered my old injury, checked in every session, and kept adjusting workouts when work got overwhelming."'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

const StatItem = ({ number, label }) => (
  <div className="text-center">
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', duration: 0.6 }}
      className="font-display text-4xl md:text-5xl text-gradient mb-2"
    >
      {number}
    </motion.div>
    <div className="text-gray-400 font-semibold">{label}</div>
  </div>
)

export default Hero
