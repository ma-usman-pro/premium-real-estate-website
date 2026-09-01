import { useState } from 'react';
import { Home } from 'lucide-react';

/**
 * Wraps a plain <img> with lazy loading and a branded fallback so that a
 * broken or rate-limited source never shows the browser's broken-image icon.
 */
export default function SmartImage({ src, alt, className = '', eager = false, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-forest to-deep-forest text-sage/70 ${className}`}
      >
        <Home className="w-8 h-8" strokeWidth={1} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
