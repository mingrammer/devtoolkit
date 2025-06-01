import { useEffect, useRef } from 'react';
import analyticsConfig from '@/config/analytics';
import { isDevelopment, ScriptLoader, safeLog, isAdBlockerActive } from '@/utils/environment';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid';
  responsive?: boolean;
  layoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  layoutKey = '',
  className = '',
  style = {},
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdSenseLoaded = useRef(false);
  const initAttempted = useRef(false);

  useEffect(() => {
    // Only load AdSense if enabled and publisher ID is set
    if (!analyticsConfig.adsense.enabled || !analyticsConfig.adsense.publisherId) {
      return;
    }

    // 개발 환경에서는 실제 광고 로드하지 않음
    if (isDevelopment()) {
      safeLog.info('AdSense disabled in development environment');
      return;
    }

    const loadAdSense = async () => {
      if (initAttempted.current) return;
      initAttempted.current = true;

      try {
        // 광고 차단기 확인
        const adBlockerActive = await isAdBlockerActive();
        if (adBlockerActive) {
          safeLog.warn('Ad blocker detected, AdSense will not load');
          return;
        }

        const scriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${analyticsConfig.adsense.publisherId}`;
        
        const loaded = await ScriptLoader.loadScript(scriptSrc, {
          crossOrigin: 'anonymous',
          timeout: 10000,
          onLoad: () => {
            isAdSenseLoaded.current = true;
            safeLog.info('AdSense script loaded successfully');
          },
          onError: (error) => {
            safeLog.warn('AdSense script failed to load:', error);
            isAdSenseLoaded.current = false;
          }
        });

        if (loaded && window.adsbygoogle && adRef.current) {
          // 광고 초기화 시도
          try {
            // 이미 초기화된 광고인지 확인
            const existingAd = adRef.current.querySelector('.adsbygoogle');
            if (existingAd && existingAd.getAttribute('data-adsbygoogle-status')) {
              safeLog.info('Ad already initialized for slot:', slot);
              return;
            }

            (window.adsbygoogle = window.adsbygoogle || []).push({});
            safeLog.info('AdSense ad initialized for slot:', slot);
          } catch (error) {
            safeLog.warn('AdSense initialization error:', error);
          }
        }
      } catch (error) {
        safeLog.warn('AdSense loading error:', error);
      }
    };

    // 약간의 지연 후 로드 (페이지 로드 완료 후)
    const timer = setTimeout(loadAdSense, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [slot]);

  // Don't render if AdSense is disabled
  if (!analyticsConfig.adsense.enabled || !analyticsConfig.adsense.publisherId) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${className}`} style={style}>
        <p className="text-gray-500 text-sm">Advertisement Space</p>
        <p className="text-xs text-gray-400 mt-1">AdSense: {analyticsConfig.adsense.enabled ? 'Enabled' : 'Disabled'}</p>
        <p className="text-xs text-gray-400">Publisher ID: {analyticsConfig.adsense.publisherId ? 'Set' : 'Not Set'}</p>
      </div>
    );
  }

  // 개발 환경에서는 플레이스홀더 표시
  if (isDevelopment()) {
    return (
      <div className={`bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center ${className}`} style={style}>
        <p className="text-blue-600 text-sm font-medium">📺 AdSense Placeholder</p>
        <p className="text-xs text-blue-500 mt-1">Slot: {slot}</p>
        <p className="text-xs text-blue-500">Format: {format}</p>
        <p className="text-xs text-blue-400 mt-2">개발 환경에서는 실제 광고가 표시되지 않습니다</p>
      </div>
    );
  }

  // 유효한 슬롯 ID인지 확인 (AdSense에서 생성한 슬롯 ID는 숫자로만 구성됨)
  const isValidSlot = /^\d+$/.test(slot);
  if (!isValidSlot) {
    safeLog.warn(`Invalid AdSense slot format: ${slot}. Slot should be numeric.`);
    return (
      <div className={`bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-4 text-center ${className}`} style={style}>
        <p className="text-yellow-600 text-sm">⚠️ Invalid Ad Slot</p>
        <p className="text-xs text-yellow-500 mt-1">Slot: {slot}</p>
        <p className="text-xs text-yellow-400 mt-2">AdSense 슬롯 ID는 숫자여야 합니다</p>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={analyticsConfig.adsense.publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default AdBanner;