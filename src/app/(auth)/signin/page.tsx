'use client'

import { motion } from 'framer-motion'
import { SignInForm } from "@/components/auth/SignInForm"
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft, Sparkles, BookOpen, Brain, Target } from 'lucide-react'
import Link from "next/link"

export default function SignInPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/home')
    }
  }, [session, router])

  const benefits = [
    { icon: <BookOpen className="h-5 w-5" />, text: "Personalized study plans" },
    { icon: <Brain className="h-5 w-5" />, text: "AI-powered learning" },
    { icon: <Target className="h-5 w-5" />, text: "Progress tracking" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-8 w-fit">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Learning
            </Badge>

            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight mb-6">
              Welcome back to
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Mind Mentor
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Continue your learning journey with personalized AI-powered study plans and advanced progress tracking.
            </p>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">What you&apos;ll get:</h3>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {benefit.icon}
                  </div>
                  <span className="font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md"
          >
            {/* Mobile back button */}
            <div className="lg:hidden mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>

            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Learning
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Sign in to continue your learning journey
              </p>
            </div>

            <GlassCard className="p-8 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-center mb-2">Sign In</h2>
                <p className="text-center text-muted-foreground text-sm">
                  Enter your credentials to access your account
                </p>
              </div>

              <SignInForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link 
                    href="/register" 
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </GlassCard>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-xs text-muted-foreground mb-4">
                Trusted by 10,000+ students worldwide
              </p>
              <div className="flex justify-center items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-primary/30 rounded-full" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
