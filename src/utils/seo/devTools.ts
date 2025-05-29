import { ToolSEO } from '../seoConfig';

export const devToolsSEO: Record<string, ToolSEO> = {
  regextester: {
    title: "Regex Tester - Test & Validate Regular Expressions Online",
    description: "Real-time regex tester and debugger. Validate and highlight regular expression matches against your input string instantly.",
    keywords: ["regex tester", "regular expression tester", "regex online", "regex debugger", "pattern matching", "정규식 테스트", "정규표현식", "실시간 정규식 검증"],
    ogTitle: "Regex Tester - Real-Time Regex Debugger | DevToolKit",
    ogDescription: "Test and validate regular expressions in real-time with instant match highlighting."
  },
  markdownviewer: {
    title: "Markdown Viewer - Live Preview Markdown Editor",
    description: "Free markdown editor with instant preview. Edit and visualize markdown (.md) documents in real time.",
    keywords: ["markdown viewer", "live markdown editor", "markdown preview", "edit markdown online", "마크다운 에디터", "마크다운 미리보기", "markdown 작성기"],
    ogTitle: "Markdown Viewer - Live Markdown Preview Tool | DevToolKit",
    ogDescription: "Preview and edit markdown content in real-time with our online markdown viewer."
  },
  cidrcalculator: {
    title: "CIDR Calculator - IP Address & Subnet Calculator Online",
    description: "Calculate IP ranges, subnets, and CIDR blocks. Visualize your IP allocations with our free online CIDR calculator.",
    keywords: ["CIDR calculator", "IP subnet calculator", "CIDR to IP range", "network calculator", "IP 계산기", "CIDR 변환기", "서브넷 계산기", "네트워크 도구"],
    ogTitle: "CIDR Calculator - IP & Subnet Calculator | DevToolKit",
    ogDescription: "Calculate IP address ranges and subnets using CIDR notation instantly."
  }
};