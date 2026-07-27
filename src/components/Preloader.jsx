import { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div id="preloader" style={{ opacity: loading ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
      <div class="jumper">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
