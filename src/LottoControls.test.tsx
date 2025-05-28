import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LottoControls from "./LottoControls";

const MAX_SETS_ALLOWED = 10; // 동일한 상수를 테스트에서도 사용

describe("LottoControls 컴포넌트", () => {
  const mockOnIncludeNumbersChange = vi.fn();
  const mockOnExcludeNumbersChange = vi.fn();
  const mockOnCountOfSetsChange = vi.fn();

  const defaultProps = {
    includeNumbers: "",
    excludeNumbers: "",
    countOfSetsToGenerate: 1,
    onIncludeNumbersChange: mockOnIncludeNumbersChange,
    onExcludeNumbersChange: mockOnExcludeNumbersChange,
    onCountOfSetsChange: mockOnCountOfSetsChange,
  };

  beforeEach(() => {
    // 각 테스트 전에 mock 함수 호출 기록을 초기화합니다.
    mockOnIncludeNumbersChange.mockClear();
    mockOnExcludeNumbersChange.mockClear();
    mockOnCountOfSetsChange.mockClear();
  });

  it("포함할 숫자 입력 변경 시 onIncludeNumbersChange가 올바른 값으로 호출되어야 합니다.", () => {
    render(<LottoControls {...defaultProps} />);
    const includeInput = screen.getByLabelText(/포함할 숫자/);
    fireEvent.change(includeInput, { target: { value: "1,2,3" } });
    expect(mockOnIncludeNumbersChange).toHaveBeenCalledWith("1,2,3");
  });

  it("제외할 숫자 입력 변경 시 onExcludeNumbersChange가 올바른 값으로 호출되어야 합니다.", () => {
    render(<LottoControls {...defaultProps} />);
    const excludeInput = screen.getByLabelText(/제외할 숫자/);
    fireEvent.change(excludeInput, { target: { value: "4,5,6" } });
    expect(mockOnExcludeNumbersChange).toHaveBeenCalledWith("4,5,6");
  });

  it("유효한 조합 수 입력 시 onCountOfSetsChange가 올바른 값으로 호출되어야 합니다.", () => {
    render(<LottoControls {...defaultProps} />);
    const countInput = screen.getByLabelText(/생성할 조합 수/);
    fireEvent.change(countInput, { target: { value: "5" } });
    expect(mockOnCountOfSetsChange).toHaveBeenCalledWith(5);
  });

  it("조합 수 입력이 1 미만일 때 onCountOfSetsChange가 1로 호출되어야 합니다.", () => {
    render(<LottoControls {...defaultProps} />);
    const countInput = screen.getByLabelText(/생성할 조합 수/);

    fireEvent.change(countInput, { target: { value: "0" } });
    expect(mockOnCountOfSetsChange).toHaveBeenCalledWith(1);

    mockOnCountOfSetsChange.mockClear(); // 다음 fireEvent.change에 대한 호출만 확인하기 위해 초기화

    fireEvent.change(countInput, { target: { value: "" } }); // 빈 문자열도 1로 처리
    expect(mockOnCountOfSetsChange).toHaveBeenCalledWith(1);
  });

  it("조합 수 입력이 MAX_SETS_ALLOWED를 초과할 때 onCountOfSetsChange가 MAX_SETS_ALLOWED로 호출되어야 합니다.", () => {
    render(<LottoControls {...defaultProps} />);
    const countInput = screen.getByLabelText(/생성할 조합 수/);
    fireEvent.change(countInput, {
      target: { value: (MAX_SETS_ALLOWED + 1).toString() },
    });
    expect(mockOnCountOfSetsChange).toHaveBeenCalledWith(MAX_SETS_ALLOWED);
  });

  it("조합 수 입력이 숫자가 아닐 때 onCountOfSetsChange가 1로 호출되어야 합니다.", () => {
    render(<LottoControls {...defaultProps} />);
    const countInput = screen.getByLabelText(/생성할 조합 수/);
    fireEvent.change(countInput, { target: { value: "abc" } });
    expect(mockOnCountOfSetsChange).toHaveBeenCalledWith(1); // 컴포넌트 로직은 NaN일 경우 1로 처리
  });
});
