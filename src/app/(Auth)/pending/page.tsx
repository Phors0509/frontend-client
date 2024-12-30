"use client"
import { ArrowLeft, Clock, ShieldAlert, } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const PendingPage = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-10 to-white
 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <ArrowLeft className='text-gray-600 cursor-pointer hover:text-orange-400 'onClick={() => router.push("/signin")}/>
      <div className="relative mb-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center animate-pulse">
          <ShieldAlert className="h-8 w-8 text-orange-600" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Clock className="h-8 w-8 text-orange-600 animate-spin-slow" />
      </div>
    </div>

        <h1 className="text-2xl font-bold text-orange-400 mb-4">
          Verification Pending
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your account is currently under review. Our admin team will verify your information shortly.
        </p>
        
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="font-semibold text-gray-500 mb-2">What happens next?</p>
            <ul className="text-sm text-gray-400 text-left space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Our admin team reviews your application</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{"You'll receive an email notification once verified"}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You can then access all features</span>
              </li>
            </ul>
          </div>
          
          <div className="text-sm text-gray-500">
            This usually takes 1-2 business days. Thank you for your patience.
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingPage