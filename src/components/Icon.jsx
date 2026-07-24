function Icon({ name, className = '', width = 20, height = 20 }) {
  const icons = {
    location: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-6.5-4.35-6.5-10A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.5c0 5.65-6.5 10-6.5 10Z" />
        <path d="M12 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
    ),
    garbage: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
      </svg>
    ),
    road: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 2v20" />
        <path d="M17 2v20" />
        <path d="M7 6h10" />
        <path d="M7 12h10" />
        <path d="M7 18h10" />
      </svg>
    ),
    water: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.5S6.5 9 6.5 13.5A5.5 5.5 0 0 0 18 13.5C18 9 12 3.5 12 3.5Z" />
        <path d="M12 15.5c-1.65 0-3 1.35-3 3h6c0-1.65-1.35-3-3-3Z" />
      </svg>
    ),
    electricity: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
    streetlight: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v5" />
        <path d="M8 11h8" />
        <path d="M10 11V22" />
        <path d="M14 11V22" />
        <path d="M6 22h12" />
      </svg>
    ),
    support: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 1 8 8c0 5.25-4 8-8 12-4-4-8-6.75-8-12a8 8 0 0 1 8-8Z" />
        <path d="M12 10v2" />
        <path d="M12 16h.01" />
      </svg>
    ),
    upvote: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4l-6 8h4v8h4v-8h4l-6-8Z" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M7 9h10" />
        <path d="M7 15h10" />
        <path d="M9 4v4" />
        <path d="M15 4v4" />
        <path d="M9 20v-4" />
        <path d="M15 20v-4" />
      </svg>
    ),
    dashboard: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2" />
        <path d="M12 21v2" />
        <path d="M4.22 4.22l1.42 1.42" />
        <path d="M18.36 18.36l1.42 1.42" />
        <path d="M1 12h2" />
        <path d="M21 12h2" />
        <path d="M4.22 19.78l1.42-1.42" />
        <path d="M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  };

  return (
    <span className={`icon ${className}`} aria-hidden="true">
      {icons[name] || icons.location}
    </span>
  );
}

export default Icon;
