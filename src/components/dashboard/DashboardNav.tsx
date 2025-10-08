"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  Home, 
  Timer, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  Search,
  StickyNote,
  Target,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  label: string;
  icon:  React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  badge?: string;
  onClick?: () => void;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {
  onCollapse?: (collapsed: boolean) => void;
}

export function DashboardNav({ className, onCollapse }: DashboardNavProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse?.(!isCollapsed);
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navSections: NavSection[] = [
    {
      title: "Dashboard",
      items: [
        {
          label: 'Home',
          icon: Home,
          href: '/home',
          badge: 'New'
        },
        {
          label: 'Profile',
          icon: Users,
          href: '/profile',
        },
      ]
    },
    {
      title: "AI Study Tools", 
      items: [
        {
          label: 'AI Planner',
          icon: Target,
          href: '/study-plan',
          badge: 'AI'
        },
        {
          label: 'Resources',
          icon: Search,
          href: '/resources',
          badge: 'Curated'
        },
        {
          label: 'PDF Chat',
          icon: FileText,
          href: '/pdf',
          badge: 'Pro'
        },
        {
          label: 'Focus Timer',
          icon: Timer,
          href: '/timer',
        },
        {
          label: 'Smart Notes',
          icon: StickyNote,
          href: '/notes',
        },
      ]
    },
    {
      title: "System",
      items: [
        {
          label: 'Design System',
          icon: Sparkles,
          href: '/design-system',
          badge: 'New'
        },
      ]
    },
    {
      title: "Account",
      items: [
        {
          label: 'Sign Out',
          icon: LogOut,
          href: '#',
          onClick: () => signOut({ callbackUrl: '/signin' })
        }
      ]
    }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <MobileNavContent />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <motion.nav 
        className={cn(
          "hidden md:flex flex-col h-full bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl border-r border-white/20 shadow-2xl transition-all duration-500 ease-in-out overflow-hidden",
          isCollapsed ? "w-20" : "w-80",
          className
        )}
        initial={false}
        animate={{ width: isCollapsed ? 80 : 320 }}
      >
        {/* Header Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className="flex items-center gap-3"
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.3, delay: isCollapsed ? 0 : 0.2 }}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-blue-500/20 shadow-lg">
                  <AvatarImage 
                    src={session?.user?.image || "/images/default-avatar.png"} 
                    alt={session?.user?.name || '@user'} 
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {session?.user?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900 leading-tight">
                    {session?.user?.name || 'Welcome'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Premium Member
                  </p>
                </div>
              )}
            </motion.div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={toggleCollapse}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-4 pb-6 space-y-2 overflow-y-auto">
          {navSections.map((section, idx) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-2"
            >
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 mb-3">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {section.title}
                      </h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (idx * 0.1) + (itemIdx * 0.05) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      onClick={item.onClick}
                      className={cn(
                        "group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out",
                        pathname === item.href 
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                          : "text-gray-700 hover:bg-white/60 hover:text-gray-900 hover:shadow-md backdrop-blur-sm",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <div className={cn(
                        "relative p-2 rounded-lg transition-all duration-300",
                        pathname === item.href 
                          ? "bg-white/20 text-white" 
                          : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                      )}>
                        <item.icon className="h-4 w-4" />
                        {pathname === item.href && (
                          <motion.div
                            className="absolute inset-0 bg-white/10 rounded-lg"
                            layoutId="activeNav"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex items-center justify-between flex-1 overflow-hidden"
                          >
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge
                                variant={pathname === item.href ? "secondary" : "default"}
                                className={cn(
                                  "text-xs px-2 py-1 font-semibold",
                                  pathname === item.href 
                                    ? "bg-white/20 text-white border-white/30" 
                                    : "bg-blue-100 text-blue-700 border-blue-200"
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </>
  )
}

// Mobile Navigation Component
function MobileNavContent() {
  const pathname = usePathname()
  const { data: session } = useSession()
  
  const navSections: NavSection[] = [
    {
      title: "Dashboard",
      items: [
        { label: 'Home', icon: Home, href: '/home', badge: 'New' },
        { label: 'Profile', icon: Users, href: '/profile' },
      ]
    },
    {
      title: "AI Study Tools", 
      items: [
        { label: 'AI Planner', icon: Target, href: '/study-plan', badge: 'AI' },
        { label: 'Resources', icon: Search, href: '/resources', badge: 'Curated' },
        { label: 'PDF Chat', icon: FileText, href: '/pdf', badge: 'Pro' },
        { label: 'Focus Timer', icon: Timer, href: '/timer' },
        { label: 'Smart Notes', icon: StickyNote, href: '/notes' },
      ]
    },
    {
      title: "Account",
      items: [
        { 
          label: 'Sign Out', 
          icon: LogOut, 
          href: '#',
          onClick: () => signOut({ callbackUrl: '/signin' })
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Mobile Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
        <Avatar className="h-12 w-12 ring-2 ring-blue-500/20">
          <AvatarImage 
            src={session?.user?.image || "/images/default-avatar.png"} 
            alt={session?.user?.name || '@user'} 
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
            {session?.user?.name?.[0] || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">
            {session?.user?.name || 'Welcome'}
          </p>
          <p className="text-sm text-gray-500">Premium Member</p>
        </div>
      </div>

      {/* Mobile Navigation */}
      {navSections.map((section) => (
        <div key={section.title} className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              {section.title}
            </h3>
          </div>
          <div className="space-y-2 pl-6">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={item.onClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === item.href 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={pathname === item.href ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}