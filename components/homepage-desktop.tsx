"use client"

import { SignupPanel } from "@/components/signup-panel"
import type { User } from "@/components/auth-context"

interface HomepageDesktopProps {
  onSignupSuccess: (user: User) => void
  onShowLogin: () => void
}

export function HomepageDesktop({ onSignupSuccess, onShowLogin }: HomepageDesktopProps) {
  return (
    <div className="h-full overflow-hidden flex flex-row relative bg-black">
      {/* Signup Panel */}
      <div className="flex-1 flex items-center justify-center p-4 ml-[50px]">
        <div className="w-full max-w-md">
          <SignupPanel
            onSignupSuccess={onSignupSuccess}
            onShowLogin={onShowLogin}
          />
        </div>
      </div>

      {/* Video/Placeholder */}
      <div className="flex-1 flex items-center justify-center p-4 mr-[50px]">
        <div className="w-full max-w-2xl h-96 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Electrical Enterprise</h2>
            <p className="text-lg opacity-80">Professional Electrical Services</p>
            <div className="mt-8 flex justify-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
