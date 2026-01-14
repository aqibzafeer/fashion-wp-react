import { Link } from "react-router-dom";

function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  align = "center", // 'center' | 'left'
  height = "md", // 'sm' | 'md' | 'lg'
  breadcrumbs,
  children,
}) {
  const heightClass =
    height === "sm"
      ? "min-h-56"
      : height === "lg"
        ? "min-h-100 sm:min-h-115"
        : "min-h-72 sm:min-h-86";

  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <section className={`relative overflow-hidden ${heightClass} bg-gray-50`}>
      {/* Background image */}
      <div className="absolute inset-0">
        {image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-indigo-700 via-purple-700 to-indigo-800" aria-hidden="true" />
        )}

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${heightClass} flex flex-col justify-center`}>
          {breadcrumbs?.length ? (
            <nav className="mb-4 text-sm text-white/80" aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-2">
                {breadcrumbs.map((b, idx) => (
                  <li key={`${b.label}-${idx}`} className="flex items-center gap-2">
                    {b.to ? (
                      <Link to={b.to} className="hover:text-white underline underline-offset-4">
                        {b.label}
                      </Link>
                    ) : (
                      <span className="text-white">{b.label}</span>
                    )}
                    {idx !== breadcrumbs.length - 1 && <span className="text-white/60">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className={`max-w-4xl mx-auto flex flex-col ${alignClass}`}>
            {eyebrow ? (
              <div className="mb-3 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white backdrop-blur">
                {eyebrow}
              </div>
            ) : null}

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-4 text-base sm:text-lg text-white/90 max-w-3xl">
                {subtitle}
              </p>
            ) : null}

            {children ? <div className="mt-6">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
