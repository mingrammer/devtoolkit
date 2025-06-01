import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isDevelopment, isProduction, isGitHubPages } from '@/utils/environment';
import analyticsConfig from '@/config/analytics';

const DevInfo = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [envInfo, setEnvInfo] = useState({
    mode: 'unknown',
    isDev: false,
    isProd: false,
    isGH: false,
  });

  useEffect(() => {
    setEnvInfo({
      mode: import.meta.env?.MODE || 'unknown',
      isDev: isDevelopment(),
      isProd: isProduction(),
      isGH: isGitHubPages(),
    });
  }, []);

  // 프로덕션 환경에서는 숨김
  if (isProduction() && !isGitHubPages()) {
    return null;
  }

  if (!showInfo) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowInfo(true)}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm border-blue-300 text-blue-600 hover:bg-blue-50"
        >
          🔧 Dev Info
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white/95 backdrop-blur-sm border-blue-300 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-blue-800">🔧 개발자 정보</CardTitle>
            <Button
              onClick={() => setShowInfo(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          {/* 환경 정보 */}
          <div>
            <div className="font-medium text-gray-700 mb-1">Environment</div>
            <div className="flex flex-wrap gap-1">
              <Badge variant={envInfo.isDev ? "default" : "secondary"}>
                {envInfo.isDev ? "🟢" : "⚪"} Dev
              </Badge>
              <Badge variant={envInfo.isProd ? "default" : "secondary"}>
                {envInfo.isProd ? "🟢" : "⚪"} Prod
              </Badge>
              <Badge variant={envInfo.isGH ? "default" : "secondary"}>
                {envInfo.isGH ? "🟢" : "⚪"} GitHub
              </Badge>
            </div>
            <div className="text-gray-500 mt-1">
              <div>Mode: {envInfo.mode}</div>
              <div>Host: {typeof window !== 'undefined' ? window.location.hostname : 'unknown'}</div>
            </div>
          </div>

          {/* Analytics 상태 */}
          <div>
            <div className="font-medium text-gray-700 mb-1">Analytics</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>GA4:</span>
                <Badge variant={analyticsConfig.ga4.enabled ? "default" : "secondary"}>
                  {analyticsConfig.ga4.enabled ? "🟢 ON" : "⚪ OFF"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>AdSense:</span>
                <Badge variant={analyticsConfig.adsense.enabled ? "default" : "secondary"}>
                  {analyticsConfig.adsense.enabled ? "🟢 ON" : "⚪ OFF"}
                </Badge>
              </div>
              <div className="text-gray-500 text-xs">
                ID: {analyticsConfig.ga4.measurementId}
              </div>
            </div>
          </div>

          {/* 성능 정보 */}
          <div>
            <div className="font-medium text-gray-700 mb-1">Performance</div>
            <div className="text-gray-500">
              <div>URL: {window.location.hostname}</div>
              <div>Protocol: {window.location.protocol}</div>
              <div>User Agent: {navigator.userAgent.split(' ')[0]}</div>
            </div>
          </div>

          {/* 빠른 액션 */}
          <div className="pt-2 border-t">
            <div className="flex gap-2">
              <Button
                onClick={() => window.open('https://analytics.google.com', '_blank')}
                variant="outline"
                size="sm"
                className="text-xs flex-1"
              >
                📊 GA4
              </Button>
              <Button
                onClick={() => console.log('Analytics Config:', analyticsConfig)}
                variant="outline"
                size="sm"
                className="text-xs flex-1"
              >
                🔍 Console
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevInfo;
