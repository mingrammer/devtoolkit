export const isDevelopment = () => {
  try {
    if (import.meta.env?.MODE === 'development' || import.meta.env?.DEV === true) {
      return true;
    }
    
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      return hostname === 'localhost' || 
             hostname === '127.0.0.1' || 
             hostname.startsWith('192.168.') ||
             hostname.startsWith('10.') ||
             window.location.port !== '';
    }
    
    return false;
  } catch {
    return false;
  }
};

export const isProduction = () => {
  try {
    if (import.meta.env?.MODE === 'production' || import.meta.env?.PROD === true) {
      return true;
    }
    
    return !isDevelopment();
  } catch {
    return true;
  }
};

export const isGitHubPages = () => {
  try {
    return window.location.hostname.includes('github.io');
  } catch {
    return false;
  }
};

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
