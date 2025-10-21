'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaAward, FaUsers, FaDumbbell, FaHeart } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()
  const features = [
    {
      icon: FaDumbbell,
      title: t('about.features.equipment.title'),
      description: t('about.features.equipment.description')
    },
    {
      icon: FaUsers,
      title: t('about.features.trainers.title'),
      description: t('about.features.trainers.description')
    },
    {
      icon: FaAward,
      title: t('about.features.results.title'),
      description: t('about.features.results.description')
    },
    {
      icon: FaHeart,
      title: t('about.features.community.title'),
      description: t('about.features.community.description')
    }
  ]

  return (
    <section id="about" className="section-padding bg-dark-100">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=975"
                    alt="Gym equipment"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1170"
                    alt="Group training"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1170"
                    alt="Personal training"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1169"
                    alt="Cardio zone"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-gradient-primary p-6 rounded-lg shadow-2xl"
            >
              <div className="text-center">
                <div className="font-display text-4xl text-white">8+</div>
                <div className="text-white text-sm">{t('about.years')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold text-lg tracking-wider">
              {t('about.title')}
            </span>
            <h2 className="heading-3 my-6 leading-tight whitespace-nowrap">
              {t('about.heading')} <span className="text-gradient">{t('about.headingHighlight')}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {t('about.description1')}
            </p>
            <p className="text-gray-400 text-lg mb-8">
              {t('about.description2')}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="bg-gradient-primary p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
