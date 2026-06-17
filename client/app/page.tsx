import Link from 'next/link'

export default function Home() {
  return (
    <section className="animated-fade rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/80">Secure access</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-100 sm:text-5xl">
            Enterprise-grade authentication with polished UI and secure JWT workflows.
          </h1>
          <p className="mt-5 max-w-2xl text-slate-300 leading-8">
            Build a production-ready login and registration experience with protected dashboards, role-aware routes, and clean user flows.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="button-glow inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Start free trial
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900 px-6 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-white">
              Existing user login
            </Link>
          </div>
        </div>

        <div className="glass-card p-8 shadow-2xl shadow-slate-900/30">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Why Prodigy?</p>
          <div className="mt-6 space-y-5 text-slate-200">
            <div className="rounded-3xl bg-slate-900/80 p-5 ring-1 ring-cyan-400/10">
              <p className="font-semibold">Secure login</p>
              <p className="mt-2 text-sm text-slate-400">Passwords are hashed securely and tokens are issued safely.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 ring-1 ring-indigo-400/10">
              <p className="font-semibold">Protected routes</p>
              <p className="mt-2 text-sm text-slate-400">Dashboard access is restricted to authenticated users only.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 ring-1 ring-emerald-400/10">
              <p className="font-semibold">Admin support</p>
              <p className="mt-2 text-sm text-slate-400">Role-based endpoints let you create admin-only features easily.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
