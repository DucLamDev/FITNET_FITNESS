import Link from 'next/link'
import { FaDumbbell } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="text-center">
        <FaDumbbell className="text-primary text-6xl mx-auto mb-6 animate-pulse-slow" />
        
        <h1 className="font-display text-9xl text-gradient mb-4">404</h1>
        
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-gray-400 text-lg mb-8 max-w-md">
          Looks like you've wandered into uncharted territory. 
          Let's get you back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
