import { ToolSEO } from '../seoConfig';

export const timeDateSEO: Record<string, ToolSEO> = {
  unixtimeconverter: {
    title: "Unix Time Converter - Convert Epoch to Human-Readable Time",
    description: "Convert Unix Timestamps (Epoch) to human-readable date and time format, and vice versa. Fast, accurate, and free online tool.",
    keywords: ["Unix time converter", "Epoch converter", "timestamp converter", "Unix to date", "Epoch to datetime", "time converter", "시간 변환기", "에폭 변환기", "타임스탬프 변환"],
    ogTitle: "Unix Time Converter - Convert Epoch to Date & Time | DevToolKit",
    ogDescription: "Easily convert between Unix Timestamps and readable dates."
  },
  timezoneconverter: {
    title: "Time Zone Converter - Convert Time Across Time Zones Instantly",
    description: "Free and easy-to-use time zone converter to compare and convert time between cities and regions worldwide. Supports all time zones including UTC.",
    keywords: ["time zone converter", "world clock", "convert time zones", "time zone comparison", "UTC converter", "시간대 변환기", "세계 시간 변환", "타임존 비교"],
    ogTitle: "Time Zone Converter - Instantly Compare World Time | DevToolKit",
    ogDescription: "Compare and convert time across global time zones."
  },
  crongenerator: {
    title: "Cron Expression Generator - Build & Validate Cron Jobs Easily",
    description: "Easily generate, visualize, and validate Cron expressions for scheduling tasks in Linux, Kubernetes, CI/CD pipelines, and more.",
    keywords: ["cron expression", "cron generator", "cron job", "cron schedule", "cron validator", "스케줄 생성기", "작업 자동화", "크론 생성기", "자동화 스케줄"],
    ogTitle: "Cron Generator - Create and Validate Cron Expressions | DevToolKit",
    ogDescription: "Quickly generate and validate cron expressions for task scheduling."
  }
};