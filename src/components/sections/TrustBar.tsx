const stats = [
  { value: '100%',    label: 'Digital · No shipping ever' },
  { value: 'Instant', label: 'Download after purchase' },
  { value: 'ES + EN', label: 'Bilingual store' },
  { value: 'Canva',   label: 'Ready to customize' },
]

export default function TrustBar() {
  return (
    <section className="bg-ivory border-b border-dusk">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <p className="font-display text-2xl font-bold text-night mb-1">{s.value}</p>
              <p className="font-body text-xs text-earth">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
