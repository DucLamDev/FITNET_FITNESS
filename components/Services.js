'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FaDumbbell, 
  FaRunning, 
  FaHeartbeat, 
  FaAppleAlt, 
  FaUsers, 
  FaYinYang 
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Services = () => {
  const { t } = useTranslation()
  const services = [
    {
      icon: FaDumbbell,
      title: t('services.items.personalTraining.title'),
      description: t('services.items.personalTraining.description'),
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1170',
      slug: 'personal-training'
    },
    {
      icon: FaUsers,
      title: t('services.items.groupClasses.title'),
      description: t('services.items.groupClasses.description'),
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1170',
      slug: 'group-classes'
    },
    {
      icon: FaAppleAlt,
      title: t('services.items.nutrition.title'),
      description: t('services.items.nutrition.description'),
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1153',
      slug: 'nutrition'
    },
    {
      icon: FaYinYang,
      title: t('services.items.yoga.title'),
      description: t('services.items.yoga.description'),
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220',
      slug: 'yoga'
    },
    {
      icon: FaRunning,
      title: t('services.items.cardio.title'),
      description: t('services.items.cardio.description'),
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1170',
      slug: 'cardio'
    },
    {
      icon: FaHeartbeat,
      title: t('services.items.weightManagement.title'),
      description: t('services.items.weightManagement.description'),
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1170',
      slug: 'weight-management'
    }
  ]

  return (
    <section id="services" className="section-padding bg-dark">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg tracking-wider">
            {t('services.title')}
          </span>
          <h2 className="heading-2 my-4">
            {t('services.heading')} <span className="text-gradient">{t('services.headingHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-dark-100 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/50"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="bg-gradient-primary w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="text-white text-3xl" />
                </div>
                
                <h3 className="font-display text-2xl mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 flex-grow">
                  {service.description}
                </p>

                <Link 
                  href={`/services/${service.slug}`}
                  className="mt-6 text-primary font-bold flex items-center group-hover:translate-x-2 transition-transform"
                >
                  {t('services.learnMore')}
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
