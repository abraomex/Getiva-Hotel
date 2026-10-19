import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BedDouble,
  Image as ImageIcon,
  Inbox,
  FileText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  User,
} from 'lucide-react'
import { useAuth } from '../services/authContext'

export default function AdminLayout() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Room Management', path: '/admin/rooms', icon: BedDouble },
    { name: 'Gallery Management', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Inquiries Review', path: '/admin/inquiries', icon: Inbox },
    { name: 'Website Content', path: '/admin/content', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-container text-white flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-white">GETVA</span>
              <span className="text-[8px] tracking-[0.25em] font-medium text-secondary-container uppercase">
                ADMINISTRATION
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xs text-xs uppercase tracking-wider font-medium transition-colors ${
                      isActive
                        ? 'bg-secondary text-white shadow-xs'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-secondary-container">
              <User size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-white/50 truncate">{user?.email || 'admin@getvahotel.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-[11px] uppercase tracking-wider text-white/70 hover:text-white py-2 px-2.5 bg-white/5 rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink size={12} />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-[11px] uppercase tracking-wider text-red-300 hover:text-white py-2 px-3 bg-red-950/40 hover:bg-red-900/60 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-outline-variant/20 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-on-surface/70 hover:text-primary focus:outline-none"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <span className="text-xs uppercase tracking-widest text-on-surface/50 font-medium">
              Management Console • Debre Birhan
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>View Public Hotel</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
