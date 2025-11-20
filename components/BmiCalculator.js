'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  FaWeight,
  FaRulerVertical,
  FaHeartbeat,
  FaInfoCircle,
  FaAppleAlt,
  FaDrumstickBite,
  FaCarrot,
  FaFish
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import AiAdvisor from './AiAdvisor'

const statusColors = {
  underweight: 'text-blue-400',
  normal: 'text-green-400',
  overweight: 'text-yellow-400',
  obese: 'text-red-500'
}

const mealPlanIcons = {
  breakfast: FaAppleAlt,
  lunch: FaDrumstickBite,
  snack: FaCarrot,
  dinner: FaFish
}

const mealPlanKeys = ['breakfast', 'lunch', 'snack', 'dinner']

const BmiCalculator = () => {
  const { t } = useTranslation()
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const parsedHeight = parseFloat(height)
    const parsedWeight = parseFloat(weight)

    if (!parsedHeight || !parsedWeight) {
      setError(t('bmi.validation.completeFields'))
      setBmi(null)
      setStatus(null)
      return
    }

    if (parsedHeight <= 0 || parsedWeight <= 0) {
      setError(t('bmi.validation.positiveValues'))
      setBmi(null)
      setStatus(null)
      return
    }

    if (parsedHeight < 90 || parsedHeight > 250 || parsedWeight < 30 || parsedWeight > 250) {
      setError(t('bmi.validation.realisticValues'))
      setBmi(null)
      setStatus(null)
      return
    }

    const meters = parsedHeight / 100
    const bmiValue = Number((parsedWeight / (meters * meters)).toFixed(1))

    if (!isFinite(bmiValue)) {
      setError(t('bmi.validation.realisticValues'))
      setBmi(null)
      setStatus(null)
      return
    }

    setBmi(bmiValue)
    setStatus(getStatusKey(bmiValue))
    setError(null)
  }

  const getStatusKey = (value) => {
    if (value < 18.5) return 'underweight'
    if (value < 25) return 'normal'
    if (value < 30) return 'overweight'
    return 'obese'
  }

  const statusDescription = status
    ? t(`bmi.statusDescriptions.${status}`)
    : t('bmi.statusLabels.pending')

  const mealPlan = useMemo(() => {
    if (!status) return null
    return mealPlanKeys.map((key) => {
      const Icon = mealPlanIcons[key]
      const details = t(`bmi.mealPlan.${status}.items.${key}.details`, { returnObjects: true }) || []
      return {
        key,
        icon: Icon,
        title: t(`bmi.mealPlan.${status}.items.${key}.title`),
        calories: t(`bmi.mealPlan.${status}.items.${key}.calories`),
        details
      }
    })
  }, [t, status])

  const workoutPlan = useMemo(() => {
    if (!status) return null
    const exercises = t(`bmi.workoutPlan.${status}.exercises`, { returnObjects: true }) || []
    return {
      goal: t(`bmi.workoutPlan.${status}.goal`),
      duration: t(`bmi.workoutPlan.${status}.duration`),
      frequency: t(`bmi.workoutPlan.${status}.frequency`),
      exercises
    }
  }, [t, status])

  return (
    <section id="bmi" className="section-padding bg-dark-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-bold tracking-widest uppercase">
            {t('bmi.title')}
          </span>
          <h2 className="heading-2 my-4">
            {t('bmi.heading')} <span className="text-gradient">{t('bmi.headingHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg">
            {t('bmi.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-dark rounded-2xl p-8 shadow-2xl shadow-black/30 space-y-6"
          >
            <div className="flex items-center space-x-3 text-gray-300">
              <FaInfoCircle className="text-primary text-xl" />
              <p className="text-sm">{t('bmi.helper')}</p>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-300 font-semibold mb-2">
                {t('bmi.heightLabel')}
              </label>
              <div className="flex items-center bg-dark-100 rounded-xl px-4 border border-dark-200 focus-within:border-primary transition-colors">
                <FaRulerVertical className="text-gray-400 mr-3" />
                <input
                  type="number"
                  min="90"
                  max="250"
                  step="0.5"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  placeholder={t('bmi.heightPlaceholder')}
                  className="w-full bg-transparent py-4 text-white placeholder:text-gray-500 focus:outline-none appearance-none"
                  inputMode="decimal"
                />
                <span className="text-gray-400 text-sm font-semibold">cm</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-300 font-semibold mb-2">
                {t('bmi.weightLabel')}
              </label>
              <div className="flex items-center bg-dark-100 rounded-xl px-4 border border-dark-200 focus-within:border-primary transition-colors">
                <FaWeight className="text-gray-400 mr-3" />
                <input
                  type="number"
                  min="30"
                  max="250"
                  step="0.5"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder={t('bmi.weightPlaceholder')}
                  className="w-full bg-transparent py-4 text-white placeholder:text-gray-500 focus:outline-none appearance-none"
                  inputMode="decimal"
                />
                <span className="text-gray-400 text-sm font-semibold">kg</span>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm font-semibold">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full text-center">
              {t('bmi.calculate')}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-dark rounded-2xl p-8 flex flex-col justify-between shadow-2xl shadow-black/30"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <FaHeartbeat className="text-primary text-3xl" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-400">
                    {t('bmi.result')}
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {t('bmi.bmiValue')}
                  </h3>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-6xl font-display text-gradient">
                  {bmi ?? '--'}
                </p>
                <p className={`mt-4 text-xl font-bold uppercase tracking-wide ${status ? statusColors[status] : 'text-gray-400'}`}>
                  {status ? t(`bmi.statusLabels.${status}`) : t('bmi.statusLabels.pending')}
                </p>
              </div>

              <div className="bg-dark-100 rounded-xl p-6">
                <p className="text-gray-300 font-semibold mb-2">
                  {t('bmi.recommendation')}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {statusDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {status && mealPlan && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-dark rounded-2xl p-8 shadow-2xl shadow-black/30 mb-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                  <p className="text-primary font-semibold tracking-widest uppercase">
                    {t('bmi.mealPlan.title')}
                  </p>
                  <h3 className="heading-3 mt-2">
                    <span className="text-gradient">{t(`bmi.mealPlan.${status}.headingHighlight`)}</span> {t(`bmi.mealPlan.${status}.heading`)}
                  </h3>
                </div>
                <p className="text-gray-400 max-w-2xl">
                  {t(`bmi.mealPlan.${status}.description`)}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mealPlan.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.key} className="bg-dark-100 rounded-2xl p-6 border border-dark-200 hover:border-primary/60 transition-colors">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-2xl">
                          <Icon />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg">{item.title}</p>
                          <p className="text-gray-400 text-sm">{item.calories}</p>
                        </div>
                      </div>
                      <ul className="text-gray-300 space-y-2 list-disc list-inside">
                        {item.details.map((detail, index) => (
                          <li key={index} className="text-sm">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-dark rounded-2xl p-8 shadow-2xl shadow-black/30"
            >
              <div className="mb-8">
                <p className="text-primary font-semibold tracking-widest uppercase">
                  {t('bmi.workoutPlan.title')}
                </p>
                <h3 className="heading-3 mt-2">
                  <span className="text-gradient">{t(`bmi.workoutPlan.${status}.headingHighlight`)}</span> {t(`bmi.workoutPlan.${status}.heading`)}
                </h3>
                <p className="text-gray-400 mt-4">
                  {t(`bmi.workoutPlan.${status}.description`)}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-dark-100 rounded-xl p-6 border border-dark-200">
                  <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Mục Tiêu</p>
                  <p className="text-white font-bold text-lg">{workoutPlan.goal}</p>
                </div>
                <div className="bg-dark-100 rounded-xl p-6 border border-dark-200">
                  <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Thời Gian</p>
                  <p className="text-white font-bold text-lg">{workoutPlan.duration}</p>
                </div>
                <div className="bg-dark-100 rounded-xl p-6 border border-dark-200">
                  <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Tần Suất</p>
                  <p className="text-white font-bold text-lg">{workoutPlan.frequency}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold text-xl mb-4">{t('bmi.workoutPlan.exerciseTitle')}</h4>
                {workoutPlan.exercises.map((exercise, index) => (
                  <div key={index} className="bg-dark-100 rounded-xl p-6 border border-dark-200 hover:border-primary/60 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="text-white font-semibold text-lg mb-2">{exercise.name}</h5>
                        <p className="text-gray-400 text-sm mb-3">{exercise.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 bg-dark rounded-lg text-primary text-xs font-semibold">
                            {exercise.sets}
                          </span>
                          <span className="px-3 py-1 bg-dark rounded-lg text-gray-300 text-xs">
                            {exercise.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* AI Advisor */}
        {bmi && status && (
          <AiAdvisor 
            bmi={bmi} 
            status={status} 
            height={height} 
            weight={weight} 
          />
        )}
      </div>
    </section>
  )
}

export default BmiCalculator


