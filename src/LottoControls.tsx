interface LottoControlsProps {
  includeNumbers: string;
  excludeNumbers: string;
  countOfSetsToGenerate: number;
  onIncludeNumbersChange: (value: string) => void;
  onExcludeNumbersChange: (value: string) => void;
  onCountOfSetsChange: (value: number) => void;
}

const MAX_SETS_ALLOWED = 10;

function LottoControls({
  includeNumbers,
  excludeNumbers,
  countOfSetsToGenerate,
  onIncludeNumbersChange,
  onExcludeNumbersChange,
  onCountOfSetsChange,
}: LottoControlsProps) {
  const handleSetCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const count = parseInt(inputValue, 10);

    const isEmptyInput = inputValue === "";
    const isLessThanMin = count < 1;
    const isMoreThanMax = count > MAX_SETS_ALLOWED;
    const isValidRange =
      !isNaN(count) && count >= 1 && count <= MAX_SETS_ALLOWED;

    if (isValidRange) {
      onCountOfSetsChange(count);
      return;
    }

    if (isEmptyInput || isLessThanMin) {
      onCountOfSetsChange(1);
      return;
    }

    if (isMoreThanMax) {
      onCountOfSetsChange(MAX_SETS_ALLOWED);
      return;
    }

    if (isNaN(count)) {
      onCountOfSetsChange(1);
    }
  };

  return (
    <section className="mb-6 space-y-4">
      <div>
        <label
          htmlFor="sets"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          생성할 조합 수 (1-{MAX_SETS_ALLOWED})
        </label>
        <input
          type="number"
          id="sets"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={countOfSetsToGenerate}
          onChange={handleSetCountChange}
          min="1"
          max={MAX_SETS_ALLOWED}
        />
      </div>
      <div>
        <label
          htmlFor="include"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          포함할 숫자 (쉼표로 구분)
        </label>
        <input
          type="text"
          id="include"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="예: 5, 12, 23"
          value={includeNumbers}
          onChange={(e) => onIncludeNumbersChange(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="exclude"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          제외할 숫자 (쉼표로 구분)
        </label>
        <input
          type="text"
          id="exclude"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="예: 8, 19, 30"
          value={excludeNumbers}
          onChange={(e) => onExcludeNumbersChange(e.target.value)}
        />
      </div>
    </section>
  );
}

export default LottoControls;
