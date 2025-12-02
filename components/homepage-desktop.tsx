"use client"

import { SignupPanel } from "@/components/signup-panel"
import type { User } from "@/components/auth-context"

interface HomepageDesktopProps {
  onSignupSuccess: (user: User) => void
  onShowLogin: () => void
}

export function HomepageDesktop({ onSignupSuccess, onShowLogin }: HomepageDesktopProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Signup Panel */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <SignupPanel
                onSignupSuccess={onSignupSuccess}
                onShowLogin={onShowLogin}
              />
            </div>
          </div>

          {/* Video Animation */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-xl aspect-video rounded-2xl shadow-2xl overflow-hidden border border-blue-700/30">
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
      </div>
    </div>
  )
}
