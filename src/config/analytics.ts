// Analytics and advertising configuration
// 환경 변수 안전하게 가져오기
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  try {
    return import.meta.env?.[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  try {
    const value = import.meta.env?.[key];
    return value === 'true' || (value === undefined && defaultValue);
  } catch {
    return defaultValue;
  }
};

export const analyticsConfig = {
  // Google Analytics 4 Configuration
  ga4: {
    measurementId: getEnvVar('VITE_GA4_MEASUREMENT_ID', 'G-Y8CJ897DR7'),
    propertyId: getEnvVar('VITE_GA4_PROPERTY_ID', ''),
    enabled: getBooleanEnvVar('VITE_GA4_ENABLED', true),
    apiEnabled: getBooleanEnvVar('VITE_GA4_API_ENABLED', false), // API 호출 비활성화
  },

  // Google AdSense Configuration
  adsense: {
    publisherId: getEnvVar('VITE_ADSENSE_PUBLISHER_ID', 'ca-pub-9436560391944255'),
    enabled: getBooleanEnvVar('VITE_ADSENSE_ENABLED', true),
  },
};

// Environment validation
export const validateConfig = () => {
  const warnings: string[] = [];
  
  if (analyticsConfig.ga4.enabled && !analyticsConfig.ga4.measurementId) {
    warnings.push('GA4 is enabled but VITE_GA4_MEASUREMENT_ID is not set');
  }
  
  if (analyticsConfig.adsense.enabled && !analyticsConfig.adsense.publisherId) {
    warnings.push('AdSense is enabled but VITE_ADSENSE_PUBLISHER_ID is not set');
  }
  
  if (warnings.length > 0) {
    console.warn('Analytics Configuration Warnings:', warnings);
  }
  
  return warnings.length === 0;
};

// 설정 로그 출력 (개발 환경에서만)
if (typeof window !== 'undefined' && getEnvVar('NODE_ENV') !== 'production') {
  console.log('🔧 Analytics Config:', {
    ga4: {
      enabled: analyticsConfig.ga4.enabled,
      measurementId: analyticsConfig.ga4.measurementId,
      apiEnabled: analyticsConfig.ga4.apiEnabled,
    },
    adsense: {
      enabled: analyticsConfig.adsense.enabled,
      publisherId: analyticsConfig.adsense.publisherId ? 'Set' : 'Not Set',
    }
  });
}

export default analyticsConfig;
