
import { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  className?: string;
  style?: React.CSSProperties;
}

const AdBanner = ({ slot, className = "", style }: AdBannerProps) => {
  useEffect(() => {
    try {
      // Google AdSense 광고 로드
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Ad loading error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <div className="text-xs text-gray-400 text-center mb-2">광고</div>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXXX" // 실제 Google AdSense 퍼블리셔 ID로 교체
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
