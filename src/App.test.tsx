import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App 컴포넌트", () => {
  it("메인 헤딩을 올바르게 렌더링해야 합니다.", () => {
    render(<App />);
    // screen.getByRole('heading', { name: /행운의 로또 번호 생성기/i, level: 1 });
    // getByText도 사용 가능, 더 구체적인 heading 역할을 사용하면 더 좋음
    const headingElement = screen.getByText(/행운의 로또 번호 생성기/i);
    expect(headingElement).toBeInTheDocument();
  });

  // 여기에 더 많은 테스트 케이스를 추가할 수 있습니다.
  // 예를 들어, 버튼 클릭 시 번호가 생성되는지, 특정 입력값을 넣었을 때 동작하는지 등
});
