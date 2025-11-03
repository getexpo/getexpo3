'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  FileText, 
  Briefcase, 
  Image, 
  MessageSquare, 
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Home Content', href: '/admin/home', icon: Home },
  { name: 'Positions', href: '/admin/positions', icon: FileText },
  { name: 'Case Studies', href: '/admin/case-studies', icon: Briefcase },
  { name: 'Solutions', href: '/admin/solutions', icon: FileText },
  { name: 'Contact', href: '/admin/contact', icon: MessageSquare },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (loggingOut) return
    
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
      setLoggingOut(false)
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 bg-gradient-to-b from-[#0a0a0a] to-black border-r border-white/10">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-white/10 px-6">
          <h1 className="text-xl font-bold text-white font-poppins">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600/20 text-white border-l-2 border-purple-500'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-5 h-5" />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0a0a0a] to-black border-b border-white/10 z-50 flex items-center justify-between px-4">
        <h1 className="text-lg font-bold text-white font-poppins">
          Admin Panel
        </h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-16 left-0 right-0 bottom-0 bg-gradient-to-b from-[#0a0a0a] to-black border-t border-white/10 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="py-4 px-3">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-purple-600/20 text-white border-l-2 border-purple-500'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" />
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

