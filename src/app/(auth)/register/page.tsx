'use client'

import { motion } from 'framer-motion'
import { SignUpForm } from "@/components/auth/SignUpForm"
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft, Sparkles, Shield, Zap, Users, CheckCircle } from 'lucide-react'
import Link from "next/link"

export default function RegisterPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/home')
    }
  }, [session, router])

  const features = [
    { icon: <Zap className="h-5 w-5" />, text: "Get started in under 2 minutes" },
    { icon: <Shield className="h-5 w-5" />, text: "Your data is secure & private" },
    { icon: <Users className="h-5 w-5" />, text: "Join 10,000+ active learners" }
  ]

  const benefits = [
    "Personalized AI study plans",
    "Advanced progress tracking", 
    "Smart resource curation",
    "Time management tools",
    "Community learning features"
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
        {/* Left Side - Benefits */}
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
              Free to Get Started
            </Badge>

            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight mb-6">
              Start your
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join thousands of students who are transforming their academic success with AI-powered learning tools.
            </p>

            <div className="space-y-4 mb-12">
              <h3 className="font-semibold text-lg mb-6">Everything you need to succeed:</h3>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-1 bg-green-500/10 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-muted-foreground font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side - Sign Up Form */}
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
                Free to Get Started
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Start your AI-powered learning journey today
              </p>
            </div>

            <GlassCard className="p-8 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
                <p className="text-center text-muted-foreground text-sm">
                  Start your personalized learning experience
                </p>
              </div>

              <SignUpForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    href="/signin" 
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Terms and Privacy */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </GlassCard>

            {/* Mobile features */}
            <div className="lg:hidden mt-8 space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 