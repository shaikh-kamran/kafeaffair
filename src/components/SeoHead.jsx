import { useEffect } from 'react';

export default function SeoHead({ title, description, keywords, canonical, jsonLd }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMeta = (name, content, attributeName = 'name') => {
      if (!content) return;
      let element = document.querySelector(`meta[${attributeName}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, 'property');
      setMeta('twitter:description', description);
    }

    if (title) {
      setMeta('og:title', title, 'property');
      setMeta('twitter:title', title);
    }

    if (keywords) {
      setMeta('keywords', keywords);
    }

    if (canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    if (jsonLd) {
      const scriptId = 'page-json-ld';
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    window.scrollTo(0, 0);
  }, [title, description, keywords, canonical, jsonLd]);

  return null;
}
