
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  canonicalUrl 
}: SEOHeadProps) => {
  useEffect(() => {
    // 페이지 제목 설정
    document.title = title;

    // 메타 태그 설정
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // 기본 메타 태그
    setMetaTag('description', description);
    setMetaTag('keywords', keywords.join(', '));
    
    // Open Graph 태그
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'DevToolkit', true);
    
    // Twitter Card 태그
    setMetaTag('twitter:card', 'summary');
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);

    // Canonical URL 설정
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Google Analytics 4 설정
    if (!document.querySelector('[data-ga-id]')) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // 실제 GA4 ID로 교체
      gaScript.setAttribute('data-ga-id', 'true');
      document.head.appendChild(gaScript);

      const gaConfigScript = document.createElement('script');
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX'); // 실제 GA4 ID로 교체
      `;
      document.head.appendChild(gaConfigScript);
    }

    // Google AdSense 스크립트 로드
    if (!document.querySelector('[data-ad-client]')) {
      const adScript = document.createElement('script');
      adScript.async = true;
      adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX'; // 실제 AdSense ID로 교체
      adScript.crossOrigin = 'anonymous';
      adScript.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXX'); // 실제 AdSense ID로 교체
      document.head.appendChild(adScript);
    }
  }, [title, description, keywords, ogTitle, ogDescription, canonicalUrl]);

  return null;
};

export default SEOHead;
