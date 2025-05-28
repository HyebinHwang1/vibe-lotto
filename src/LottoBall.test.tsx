import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LottoBall from "./LottoBall";

describe("LottoBall 컴포넌트", () => {
  it("한 자리 숫자를 올바르게 렌더링해야 합니다.", () => {
    const testNumber = 7;
    render(<LottoBall number={testNumber} />);

    const numberElement = screen.getByText(testNumber.toString());
    expect(numberElement).toBeInTheDocument();
  });

  it("두 자리 숫자를 올바르게 렌더링해야 합니다.", () => {
    const testNumber = 42;
    render(<LottoBall number={testNumber} />);

    const numberElement = screen.getByText(testNumber.toString());
    expect(numberElement).toBeInTheDocument();
  });
});
