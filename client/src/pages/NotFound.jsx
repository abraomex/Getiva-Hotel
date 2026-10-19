import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="text-center max-w-md space-y-4">
        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto">
          <Compass size={32} />
        </div>
        <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block">
          404 • PAGE NOT FOUND
        </span>
        <h1 className="font-display text-4xl font-bold text-primary">Uncharted Horizon</h1>
        <p className="text-xs text-on-surface/70 leading-relaxed">
          The highland retreat or page you requested does not exist or has been relocated within Getva Hotel.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-secondary transition-soft"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO HOME</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
