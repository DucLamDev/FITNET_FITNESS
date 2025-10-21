'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCheck, FaStar } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Pricing = () => {
  const { t } = useTranslation()
  const plans = [
    {
      name: t('pricing.plans.basic.name'),
      price: '299,000',
      period: t('pricing.plans.basic.period'),
      description: t('pricing.plans.basic.description'),
      features: t('pricing.plans.basic.features', { returnObjects: true }),
      popular: false,
      color: 'from-gray-600 to-gray-800'
    },
    {
      name: t('pricing.plans.premium.name'),
      price: '799,000',
      period: t('pricing.plans.premium.period'),
      description: t('pricing.plans.premium.description'),
      features: t('pricing.plans.premium.features', { returnObjects: true }),
      popular: true,
      color: 'from-primary to-primary-dark'
    },
    {
      name: t('pricing.plans.vip.name'),
      price: '1,499,000',
      period: t('pricing.plans.vip.period'),
      description: t('pricing.plans.vip.description'),
      features: t('pricing.plans.vip.features', { returnObjects: true }),
      popular: false,
      color: 'from-yellow-600 to-yellow-800'
    }
  ]

  return (
    <section id="pricing" className="section-padding bg-dark-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
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
            {t('pricing.title')}
          </span>
          <h2 className="heading-2 my-4">
            {t('pricing.heading')} <span className="text-gradient">{t('pricing.headingHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('pricing.description')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular 
                  ? 'ring-2 ring-primary transform lg:scale-105 shadow-2xl shadow-primary/50' 
                  : 'bg-dark-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-primary text-white px-6 py-2 rounded-bl-2xl font-bold flex items-center gap-2">
                  <FaStar /> {t('pricing.popular')}
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="font-display text-3xl mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-2">
                    <span className={`font-display text-5xl bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-400 mb-2">VNĐ</span>
                  </div>
                  <div className="text-gray-500">{t('pricing.per')} {plan.period}</div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheck className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/register"
                  className={`block text-center py-4 rounded-lg font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-primary text-white hover:shadow-2xl hover:shadow-primary/50 hover:scale-105'
                      : 'bg-dark-300 text-white hover:bg-dark-100 border border-primary'
                  }`}
                >
                  {t('pricing.signUp')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 text-gray-400"
        >
          <p>{t('pricing.note')}</p>
          <p className="mt-2">
            {t('pricing.contactNote')}{' '}
            <a href="tel:0346676169" className="text-primary hover:underline font-bold">
              034 667 6169
            </a>
            {' '}{t('pricing.contactNote2')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
