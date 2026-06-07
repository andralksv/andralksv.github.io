/* Logo data — light and dark versions for Bonify/Yandex              */
/* Dark versions have white text so accents (green tick, red Y) show  */
/* correctly on the dark background.                                  */
const logos = [
  { name: 'Skoove', src: '/logos/skoove.png' },
  { name: 'Bonify', src: '/logos/bonify.svg', darkSrc: '/logos/bonify-dark.svg' },
  { name: 'Yandex', src: '/logos/yandex.png', darkSrc: '/logos/yandex-dark.png' },
]

const LogoBar = () => (
  <div className="logo-bar">
    {logos.map((logo) => (
      <span key={logo.name} className="logo-bar-wrap">
        {/* Light version — only gets "logo-light" class if a dark variant exists */}
        <img
          src={logo.src}
          alt={logo.name}
          className={`logo-bar-img${logo.darkSrc ? ' logo-light' : ''}`}
        />
        {/* Dark version (white text) — hidden in light, shown in dark */}
        {logo.darkSrc && (
          <img src={logo.darkSrc} alt={logo.name} className="logo-bar-img logo-dark" />
        )}
      </span>
    ))}
  </div>
)

export default LogoBar
