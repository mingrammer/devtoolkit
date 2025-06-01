import analyticsConfig, { validateConfig } from '@/config/analytics';
import { ScriptLoader, safeLog } from '@/utils/environment';

class GoogleAnalyticsService {
  private static instance: GoogleAnalyticsService;
  private initialized = false;
  private initPromise: Promise<boolean> | null = null;

  private constructor() {}

  public static getInstance(): GoogleAnalyticsService {
    if (!GoogleAnalyticsService.instance) {
      GoogleAnalyticsService.instance = new GoogleAnalyticsService();
    }
    return GoogleAnalyticsService.instance;
  }

  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._doInitialize();
    return this.initPromise;
  }

  private async _doInitialize(): Promise<boolean> {
    try {
      validateConfig();

      if (!analyticsConfig.ga4.enabled || !analyticsConfig.ga4.measurementId) {
        safeLog.info('Google Analytics is disabled or not configured');
        return false;
      }

      const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4.measurementId}`;
      
      const loaded = await ScriptLoader.loadScript(scriptSrc, {
        timeout: 10000,
        onLoad: () => {
          this._setupGtag();
          safeLog.info('Google Analytics initialized successfully');
        },
        onError: (error) => {
          safeLog.warn('Google Analytics script failed to load:', error);
        }
      });

      this.initialized = loaded;
      return loaded;
    } catch (error) {
      safeLog.warn('Google Analytics initialization error:', error);
      return false;
    }
  }

  private _setupGtag(): void {
    try {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      
      gtag('js', new Date());
      gtag('config', analyticsConfig.ga4.measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });

      (window as any).gtag = gtag;
    } catch (error) {
      safeLog.warn('gtag setup error:', error);
    }
  }
}

const analytics = GoogleAnalyticsService.getInstance();

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      analytics.initialize();
    });
  } else {
    analytics.initialize();
  }
}

export default analytics;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
