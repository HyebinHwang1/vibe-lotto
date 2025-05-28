import { test, expect } from "@playwright/test";

test.describe("앱 기본 페이지", () => {
  test("페이지가 정상적으로 로드되고 제목이 표시되어야 합니다.", async ({
    page,
  }) => {
    // baseURL은 playwright.config.ts에 정의되어 있음
    await page.goto("/");

    // 페이지 제목 확인 (HTML title 태그)
    await expect(page).toHaveTitle(/Lotto App/);

    // 메인 헤딩 텍스트 확인
    const mainHeading = page.getByRole("heading", {
      name: "행운의 로또 번호 생성기",
    });
    await expect(mainHeading).toBeVisible();
  });

  test("초기 로드 시 번호 생성 안내 문구가 표시되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/");

    // NumberDisplay 영역의 초기 메시지 확인
    const initialMessage = page.getByText("생성 버튼을 눌러주세요.");
    await expect(initialMessage).toBeVisible();
  });

  test("기본 번호 생성 시 한 세트의 번호(6개)가 표시되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/");

    const generateButton = page.getByRole("button", { name: "번호 생성하기!" });
    await generateButton.click();

    // 초기 메시지 숨김 확인
    const initialMessage = page.getByText("생성 버튼을 눌러주세요.");
    await expect(initialMessage).not.toBeVisible();

    // 한 개의 번호 세트가 표시되는지 확인
    const numberSetElements = await page
      .locator('[data-testid="lotto-set"]')
      .count();
    expect(numberSetElements).toBe(1);

    // 해당 세트 안에 6개의 LottoBall이 있는지 확인
    const lottoBallsInSet = await page
      .locator('[data-testid="lotto-set"] [data-testid="lotto-ball"]')
      .count();
    expect(lottoBallsInSet).toBe(6);
  });

  test("여러 조합 생성 시 지정한 수만큼 번호 세트가 표시되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/");

    const setCountInput = page.locator("#sets");
    await setCountInput.fill("3");

    const generateButton = page.getByRole("button", { name: "번호 생성하기!" });
    await generateButton.click();

    // 3개의 번호 세트가 표시되는지 확인
    const numberSetElements = await page
      .locator('[data-testid="lotto-set"]')
      .count();
    expect(numberSetElements).toBe(3);

    // 각 세트당 6개의 LottoBall이 있는지, 총 18개가 맞는지 확인
    const totalLottoBalls = await page
      .locator('[data-testid="lotto-set"] [data-testid="lotto-ball"]')
      .count();
    expect(totalLottoBalls).toBe(18);
  });

  test("포함할 숫자 지정 후 생성 시 해당 숫자가 포함된 번호가 표시되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/");

    const includeNumbersInput = page.locator("#include");
    const numberToInclude1 = "7";
    const numberToInclude2 = "17";
    await includeNumbersInput.fill(`${numberToInclude1},${numberToInclude2}`);

    const generateButton = page.getByRole("button", { name: "번호 생성하기!" });
    await generateButton.click();

    // 생성된 번호 세트 (기본 1세트) 가져오기
    const numberSet = page.locator('[data-testid="lotto-set"]').first();

    // 세트 내의 모든 LottoBall 숫자 가져오기
    const displayedNumbers = await numberSet
      .locator('[data-testid="lotto-ball"]')
      .allTextContents();

    expect(displayedNumbers).toContain(numberToInclude1);
    expect(displayedNumbers).toContain(numberToInclude2);
  });

  test("제외할 숫자 지정 후 생성 시 해당 숫자가 포함되지 않은 번호가 표시되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/");

    const excludeNumbersInput = page.locator("#exclude");
    const numberToExclude1 = "10";
    const numberToExclude2 = "20";
    await excludeNumbersInput.fill(`${numberToExclude1},${numberToExclude2}`);

    const generateButton = page.getByRole("button", { name: "번호 생성하기!" });
    await generateButton.click();

    // 생성된 번호 세트 (기본 1세트) 가져오기
    const numberSet = page.locator('[data-testid="lotto-set"]').first();

    // 세트 내의 모든 LottoBall 숫자 가져오기
    const displayedNumbers = await numberSet
      .locator('[data-testid="lotto-ball"]')
      .allTextContents();

    expect(displayedNumbers).not.toContain(numberToExclude1);
    expect(displayedNumbers).not.toContain(numberToExclude2);
  });

  test("포함 및 제외 숫자 동시 지정 후 생성 시 조건을 만족하는 번호가 표시되어야 합니다.", async ({
    page,
  }) => {
    await page.goto("/");

    const includeNumbersInput = page.locator("#include");
    const numberToInclude = "5";
    await includeNumbersInput.fill(numberToInclude);

    const excludeNumbersInput = page.locator("#exclude");
    const numberToExclude = "15";
    await excludeNumbersInput.fill(numberToExclude);

    // 여러 번 생성하여 포함/제외 조건이 일관되게 적용되는지 확인 (선택적)
    // 여기서는 1회 생성으로 단순화
    const generateButton = page.getByRole("button", { name: "번호 생성하기!" });
    await generateButton.click();

    const numberSet = page.locator('[data-testid="lotto-set"]').first();
    const displayedNumbers = await numberSet
      .locator('[data-testid="lotto-ball"]')
      .allTextContents();

    expect(displayedNumbers).toContain(numberToInclude);
    expect(displayedNumbers).not.toContain(numberToExclude);
  });
});
