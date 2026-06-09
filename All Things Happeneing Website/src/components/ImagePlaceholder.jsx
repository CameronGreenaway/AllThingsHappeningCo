export default function ImagePlaceholder({ label, className = "", style = {} }) {
  return (
    <div className={`img-ph ${className}`} style={style}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="26" height="26">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      {label && <span>{label}</span>}
    </div>
  );
}
