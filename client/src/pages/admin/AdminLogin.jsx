import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Info } from 'lucide-react'
import { useAuth } from '../../services/authContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail('admin@getvahotel.com')
    setPassword('Admin@Getva2026')
  }

  return (
    <div className="min-h-screen bg-primary-container text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex flex-col items-center group">
          <span className="font-display text-3xl font-semibold tracking-tight text-white group-hover:text-secondary-container transition-colors">
            GETVA
          </span>
          <span className="text-[9px] tracking-[0.25em] font-medium text-secondary-container uppercase">
            HOTEL • MANAGEMENT PORTAL
          </span>
        </Link>
        <h2 className="mt-4 text-xs tracking-widest text-white/60 uppercase">
          Administrative Authentication
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white/5 border border-white/10 p-8 rounded-md shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-6 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-[10px] font-medium text-white/60 tracking-wider uppercase">
                ADMINISTRATOR EMAIL
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@getvahotel.com"
                  className="w-full pb-2 pt-1 text-sm bg-transparent border-b border-white/30 focus:border-secondary-container focus:outline-none transition-colors text-white placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-medium text-white/60 tracking-wider uppercase">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pb-2 pt-1 text-sm bg-transparent border-b border-white/30 focus:border-secondary-container focus:outline-none transition-colors text-white placeholder:text-white/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-white text-xs tracking-widest uppercase py-3.5 hover:bg-secondary-container hover:text-primary transition-soft cursor-pointer font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock size={14} />
              <span>{loading ? 'AUTHENTICATING...' : 'ACCESS PORTAL'}</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3">
            <p className="text-[11px] text-white/50 flex items-center justify-center gap-1.5">
              <Info size={13} />
              <span>Client Demonstration Mode</span>
            </p>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[11px] text-secondary-container hover:underline tracking-wider uppercase font-medium cursor-pointer"
            >
              Fill Demo Admin Credentials
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-white/40 hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  )
}
