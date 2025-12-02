"use client"

import { SignupPanel } from "@/components/signup-panel"
import type { User } from "@/components/auth-context"

interface HomepageMobileProps {
  onSignupSuccess: (user: User) => void
  onShowLogin: () => void
}

export function HomepageMobile({ onSignupSuccess, onShowLogin }: HomepageMobileProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 space-y-8">
      {/* Signup Panel */}
      <div className="w-full max-w-sm flex-shrink-0">
        <SignupPanel
          onSignupSuccess={onSignupSuccess}
          onShowLogin={onShowLogin}
        />
      </div>

      {/* Video Animation */}
      <div className="w-full max-w-sm flex-shrink-0">
        <div className="aspect-square rounded-2xl shadow-2xl overflow-hidden border border-blue-700/30">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="/homepage-animation.mp4"
            poster="/placeholder.jpg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}
