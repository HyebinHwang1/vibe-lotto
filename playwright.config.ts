import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests-e2e", // E2E 테스트 파일이 위치할 디렉토리
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html", // 테스트 결과 리포트 형식
  use: {
    baseURL: "http://localhost:5173", // Vite 개발 서버 주소
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  // 테스트 실행 전에 개발 서버를 시작하도록 설정
  webServer: {
    command: "pnpm dev", // Vite 개발 서버 실행 명령어
    url: "http://localhost:5173", // 개발 서버 URL
    reuseExistingServer: !process.env.CI, // CI 환경이 아니면 기존 서버 재사용
    stdout: "pipe",
    stderr: "pipe",
  },
});
