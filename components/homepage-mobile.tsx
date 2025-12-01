"use client"

import { SignupPanel } from "@/components/signup-panel"
import type { User } from "@/components/auth-context"

interface HomepageMobileProps {
  onSignupSuccess: (user: User) => void
  onShowLogin: () => void
}

export function HomepageMobile({ onSignupSuccess, onShowLogin }: HomepageMobileProps) {
  return (
    <div className="h-full overflow-hidden flex flex-col relative bg-black">
      {/* Signup Panel */}
      <div className="flex-1 flex items-center justify-center py-0 px-2 -mb-2">
        <div className="w-full max-w-xl">
          <SignupPanel
            onSignupSuccess={onSignupSuccess}
            onShowLogin={onShowLogin}
          />
        </div>
      </div>

      {/* Video/Placeholder */}
      <div className="flex-1 flex items-center justify-center py-0 px-2 -mt-4">
        <div className="w-full h-auto bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center p-8">
          <div className="text-center text-white">
            <h2 className="text-xl font-bold mb-4">Electrical Enterprise</h2>
            <p className="text-base opacity-80">Professional Electrical Services</p>
            <div className="mt-6 flex justify-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
