import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NumberDisplay from "./NumberDisplay";

describe("NumberDisplay 컴포넌트", () => {
  it("번호 조합이 없을 때 메시지를 표시해야 합니다.", () => {
    render(<NumberDisplay numberSets={[]} />);
    const messageElement = screen.getByText("생성 버튼을 눌러주세요.");
    expect(messageElement).toBeInTheDocument();
  });

  it("단일 번호 조합을 올바르게 렌더링해야 합니다.", () => {
    const singleSet = [[1, 2, 3, 4, 5, 6]];
    render(<NumberDisplay numberSets={singleSet} />);

    singleSet[0].forEach((number) => {
      expect(screen.getByText(number.toString())).toBeInTheDocument();
    });

    // Check if the placeholder message is not present
    expect(
      screen.queryByText("생성 버튼을 눌러주세요.")
    ).not.toBeInTheDocument();
  });

  it("여러 번호 조합을 올바르게 렌더링해야 합니다.", () => {
    const multipleSets = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    render(<NumberDisplay numberSets={multipleSets} />);

    multipleSets.forEach((set) => {
      set.forEach((number) => {
        // getAllByText를 사용하여 같은 숫자가 여러 조합에 있을 경우도 처리
        // 여기서는 각 숫자가 유니크하다고 가정하고 getByText 사용
        expect(screen.getByText(number.toString())).toBeInTheDocument();
      });
    });
  });

  it("각 조합에 대해 올바른 수의 LottoBall 컴포넌트를 렌더링해야 합니다.", () => {
    const multipleSets = [
      [1, 2, 3, 4, 5, 6], // 6개
      [10, 20, 30, 40, 41, 42], // 6개
    ];
    const { container } = render(<NumberDisplay numberSets={multipleSets} />);

    const setsContainer = container.querySelectorAll("div.flex.space-x-3"); // 각 번호 조합을 감싸는 div의 클래스
    expect(setsContainer.length).toBe(multipleSets.length);

    setsContainer.forEach((setElement, index) => {
      const balls = setElement.querySelectorAll("span"); // LottoBall이 span으로 렌더링된다고 가정
      expect(balls.length).toBe(multipleSets[index].length);
    });
  });
});
