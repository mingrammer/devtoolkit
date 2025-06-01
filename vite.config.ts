import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // Custom domain 사용 시 base path 제거
  server: {
    host: "::",
    port: 8080,
    // SPA 라우팅을 위한 히스토리 API 폴백
    historyApiFallback: true,
  },
  build: {
    // GitHub Pages를 위한 최적화
    rollupOptions: {
      output: {
        // 청크 파일명 안정화
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
