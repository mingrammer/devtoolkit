// 개발 환경 감지 유틸리티
export const isDevelopment = () => {
  try {
    return import.meta.env?.MODE === 'development' || 
           import.meta.env?.DEV === true ||
           window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1' ||
           window.location.port !== '';
  } catch {
    return false;
  }
};

// 프로덕션 환경 감지
export const isProduction = () => {
  try {
    return import.meta.env?.MODE === 'production' && 
           import.meta.env?.PROD === true;
  } catch {
    return false;
  }
};

// GitHub Pages 환경 감지
export const isGitHubPages = () => {
  try {
    return window.location.hostname.includes('github.io');
  } catch {
    return false;
  }
};

// 광고 차단기 감지
export const isAdBlockerActive = async (): Promise<boolean> => {
  try {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-10000px';
    testAd.style.width = '1px';
    testAd.style.height = '1px';
    
    document.body.appendChild(testAd);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const blocked = testAd.offsetHeight === 0;
    document.body.removeChild(testAd);
    
    return blocked;
  } catch {
    return false;
  }
};

// 스크립트 로딩 상태 관리
class ScriptLoader {
  private static loadedScripts = new Set<string>();
  
  static async loadScript(src: string, options: {
    async?: boolean;
    crossOrigin?: string;
    onError?: (error: any) => void;
    onLoad?: () => void;
    timeout?: number;
  } = {}): Promise<boolean> {
    return new Promise((resolve) => {
      // 이미 로드된 스크립트는 다시 로드하지 않음
      if (this.loadedScripts.has(src)) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.async = options.async ?? true;
      
      if (options.crossOrigin) {
        script.crossOrigin = options.crossOrigin;
      }
      
      let timeoutId: number | undefined;
      
      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
      
      script.onload = () => {
        cleanup();
        this.loadedScripts.add(src);
        options.onLoad?.();
        resolve(true);
      };
      
      script.onerror = (error) => {
        cleanup();
        options.onError?.(error);
        resolve(false);
      };
      
      // 타임아웃 설정 (기본 10초)
      if (options.timeout) {
        timeoutId = window.setTimeout(() => {
          options.onError?.(new Error('Script loading timeout'));
          resolve(false);
        }, options.timeout);
      }
      
      document.head.appendChild(script);
    });
  }
  
  static isLoaded(src: string): boolean {
    return this.loadedScripts.has(src);
  }
  
  static markAsLoaded(src: string): void {
    this.loadedScripts.add(src);
  }
}

export { ScriptLoader };

// 안전한 console 로깅
export const safeLog = {
  info: (message: string, ...args: any[]) => {
    if (!isProduction()) {
      console.log(`[DevToolkit] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[DevToolkit] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[DevToolkit] ${message}`, ...args);
  }
};
