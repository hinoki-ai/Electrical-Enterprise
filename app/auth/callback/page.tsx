"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error parameters in URL
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(errorDescription || `Authentication error: ${error}`);
          return;
        }

        // Check for success parameters
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (code) {
          // OAuth callback successful
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');

          // Redirect to dashboard or home after successful auth
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          // Handle other callback scenarios or manual access
          setStatus('error');
          setMessage('Invalid callback parameters');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage('An error occurred during authentication');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  const handleRetry = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
            {status === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
            Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>

          {status === 'error' && (
            <Button onClick={handleRetry} className="w-full">
              Return to Home
            </Button>
          )}

          {status === 'loading' && (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
