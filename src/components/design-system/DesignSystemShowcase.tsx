"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GlassCard } from '@/components/ui/glass-card'
import { StatCard } from '@/components/ui/stat-card'
import { ProgressRing } from '@/components/ui/progress-ring'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { TrendIndicator } from '@/components/ui/trend-indicator'
import { FloatingActionButton } from '@/components/ui/floating-action-button'
import { ProfessionalLoader } from '@/components/ui/professional-loader'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  Heart, 
  Star, 
  Sparkles, 
  Zap, 
  Target,
  TrendingUp,
  Plus,
  Home,
  Settings,
  User
} from 'lucide-react'

/**
 * Design System Showcase Component
 * 
 * This component demonstrates all the design system components,
 * variants, and patterns available in the application.
 */
export function DesignSystemShowcase() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/home' },
    { label: 'Design System', current: true }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <Breadcrumb items={breadcrumbItems} className="text-blue-100 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Design System
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Comprehensive component library and design tokens for consistent, 
              professional user interfaces.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative p-8 -mt-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Typography Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                Typography
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Heading 1 - Hero Title
                  </h1>
                  <p className="text-gray-600 mt-2">text-4xl md:text-5xl font-bold</p>
                </div>
                
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                    Heading 2 - Section Title
                  </h2>
                  <p className="text-gray-600 mt-2">text-3xl md:text-4xl font-bold</p>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    Heading 3 - Subsection
                  </h3>
                  <p className="text-gray-600 mt-2">text-2xl md:text-3xl font-semibold</p>
                </div>
                
                <div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    This is a subtitle with relaxed leading and comfortable reading size. 
                    Perfect for introductory text and descriptions.
                  </p>
                  <p className="text-gray-600 mt-2">text-lg leading-relaxed</p>
                </div>
                
                <div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    This is body text with optimal readability. It maintains good contrast 
                    and comfortable line spacing for extended reading sessions.
                  </p>
                  <p className="text-gray-600 mt-2">text-base leading-relaxed</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">
                    This is caption text used for metadata, timestamps, and secondary information.
                  </p>
                  <p className="text-gray-600 mt-2">text-sm text-gray-500</p>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Colors Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                Color Palette
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Primary Colors */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Primary Blue</h3>
                  <div className="space-y-2">
                    <div className="h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 text-sm font-medium">100</div>
                    <div className="h-12 bg-blue-300 rounded-lg flex items-center justify-center text-blue-800 text-sm font-medium">300</div>
                    <div className="h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">500</div>
                    <div className="h-12 bg-blue-700 rounded-lg flex items-center justify-center text-white text-sm font-medium">700</div>
                    <div className="h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white text-sm font-medium">900</div>
                  </div>
                </div>

                {/* Secondary Colors */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Secondary Purple</h3>
                  <div className="space-y-2">
                    <div className="h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-800 text-sm font-medium">100</div>
                    <div className="h-12 bg-purple-300 rounded-lg flex items-center justify-center text-purple-800 text-sm font-medium">300</div>
                    <div className="h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">500</div>
                    <div className="h-12 bg-purple-700 rounded-lg flex items-center justify-center text-white text-sm font-medium">700</div>
                    <div className="h-12 bg-purple-900 rounded-lg flex items-center justify-center text-white text-sm font-medium">900</div>
                  </div>
                </div>

                {/* Success Colors */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Success Green</h3>
                  <div className="space-y-2">
                    <div className="h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-800 text-sm font-medium">100</div>
                    <div className="h-12 bg-green-300 rounded-lg flex items-center justify-center text-green-800 text-sm font-medium">300</div>
                    <div className="h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">500</div>
                    <div className="h-12 bg-green-700 rounded-lg flex items-center justify-center text-white text-sm font-medium">700</div>
                    <div className="h-12 bg-green-900 rounded-lg flex items-center justify-center text-white text-sm font-medium">900</div>
                  </div>
                </div>

                {/* Gray Colors */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Neutral Gray</h3>
                  <div className="space-y-2">
                    <div className="h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-800 text-sm font-medium">100</div>
                    <div className="h-12 bg-gray-300 rounded-lg flex items-center justify-center text-gray-800 text-sm font-medium">300</div>
                    <div className="h-12 bg-gray-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">500</div>
                    <div className="h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white text-sm font-medium">700</div>
                    <div className="h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white text-sm font-medium">900</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Buttons Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                Buttons
              </h2>
              
              <div className="space-y-8">
                {/* Primary Buttons */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Primary Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      <Star className="mr-2 h-4 w-4" />
                      Primary
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                      <Heart className="mr-2 h-4 w-4" />
                      Secondary
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                      Success
                    </Button>
                    <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                      Danger
                    </Button>
                  </div>
                </div>

                {/* Button Sizes */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Button Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600">
                      Small
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
                      Default
                    </Button>
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600">
                      Large
                    </Button>
                  </div>
                </div>

                {/* Button Variants */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Button Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline">
                      Outline
                    </Button>
                    <Button variant="ghost">
                      Ghost
                    </Button>
                    <Button variant="secondary">
                      Secondary
                    </Button>
                    <Button variant="destructive">
                      Destructive
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Cards Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                Cards & Components
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Standard Card */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Standard Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      This is a standard card with clean borders and subtle shadows.
                    </p>
                  </CardContent>
                </Card>

                {/* Glass Card */}
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Glass Card
                  </h3>
                  <p className="text-gray-600">
                    Glass morphism effect with backdrop blur and transparency.
                  </p>
                </GlassCard>

                {/* Stat Card */}
                <StatCard
                  title="Active Users"
                  value="2,847"
                  icon={User}
                  trend={{
                    value: 12.5,
                    label: "vs last month",
                    isPositive: true
                  }}
                />
              </div>
            </GlassCard>
          </motion.section>

          {/* Interactive Components */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                Interactive Components
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Progress Ring */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Progress Ring</h3>
                  <ProgressRing progress={75} size={120} className="mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">75% Complete</p>
                </div>

                {/* Animated Counter */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Animated Counter</h3>
                  <div className="text-4xl font-bold text-blue-600">
                    <AnimatedCounter value={1234} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Total Count</p>
                </div>

                {/* Trend Indicator */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Trend Indicator</h3>
                  <div className="space-y-2">
                    <TrendIndicator value={15.2} label="Growth Rate" />
                    <TrendIndicator value={-5.8} label="Decline Rate" />
                    <TrendIndicator value={0} label="Stable" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Form Elements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                Form Elements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Input
                    </label>
                    <Input placeholder="Enter your text..." />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Glass Input
                    </label>
                    <Input 
                      placeholder="Glass effect input..." 
                      className="bg-white/80 backdrop-blur-sm border-white/30"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badges
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Error</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatars
                    </label>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>XS</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>MD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>LG</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Loading States */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                Loading States
              </h2>
              
              <div className="text-center">
                <ProfessionalLoader />
                <p className="text-sm text-gray-600 mt-4">Professional Loading Animation</p>
              </div>
            </GlassCard>
          </motion.section>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton className="fixed bottom-8 right-8" />
    </div>
  )
}