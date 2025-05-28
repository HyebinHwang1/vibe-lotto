import { useState } from "react";
import NumberDisplay from "./NumberDisplay";
import LottoControls from "./LottoControls";

const LOTTO_MAX_NUMBER = 45;
const LOTTO_NUMBERS_COUNT = 6;

function App() {
  const [generatedNumberSets, setGeneratedNumberSets] = useState<number[][]>(
    []
  );
  const [includeNumbersStr, setIncludeNumbersStr] = useState<string>("");
  const [excludeNumbersStr, setExcludeNumbersStr] = useState<string>("");
  const [countOfSetsToGenerate, setCountOfSetsToGenerate] = useState<number>(1);

  const handleCountOfSetsChange = (newCount: number) => {
    setCountOfSetsToGenerate(newCount);
  };

  const parseNumbers = (str: string): number[] => {
    return str
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= LOTTO_MAX_NUMBER);
  };

  const generateSingleSet = (
    include: Set<number>,
    exclude: Set<number>
  ): number[] | null => {
    if (include.size > LOTTO_NUMBERS_COUNT) {
      alert(`포함할 숫자는 ${LOTTO_NUMBERS_COUNT}개 이하로 입력해주세요.`);
      return null;
    }
    for (const num of include) {
      if (exclude.has(num)) {
        alert("포함할 숫자와 제외할 숫자가 겹칠 수 없습니다.");
        return null;
      }
    }

    const initialAvailablePool = Array.from(
      { length: LOTTO_MAX_NUMBER },
      (_, i) => i + 1
    ).filter((n) => !exclude.has(n) && !include.has(n));

    if (initialAvailablePool.length < LOTTO_NUMBERS_COUNT - include.size) {
      alert(
        "제외할 숫자가 너무 많아 번호를 생성할 수 없습니다. (단일 조합 기준)"
      );
      return null;
    }

    const resultNumbers = new Set<number>(include);
    let pickFromPool = [...initialAvailablePool];

    while (resultNumbers.size < LOTTO_NUMBERS_COUNT) {
      if (pickFromPool.length === 0) {
        alert("더 이상 유효한 번호를 생성할 수 없습니다. (조건 확인 필요)");
        return null;
      }
      const randomIndex = Math.floor(Math.random() * pickFromPool.length);
      const selectedNumber = pickFromPool[randomIndex];
      resultNumbers.add(selectedNumber);

      pickFromPool = pickFromPool
        .slice(0, randomIndex)
        .concat(pickFromPool.slice(randomIndex + 1));
    }
    return Array.from(resultNumbers).sort((a, b) => a - b);
  };

  const handleGenerateNumbers = () => {
    const includeSet = new Set(parseNumbers(includeNumbersStr));
    const excludeSet = new Set(parseNumbers(excludeNumbersStr));

    const newSets: number[][] = [];
    for (let i = 0; i < countOfSetsToGenerate; i++) {
      const singleSet = generateSingleSet(includeSet, excludeSet);
      if (singleSet) {
        newSets.push(singleSet);
      } else {
        setGeneratedNumberSets([]);
        return;
      }
    }
    setGeneratedNumberSets(newSets);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            행운의 로또 번호 생성기
          </h1>
        </header>

        <LottoControls
          includeNumbers={includeNumbersStr}
          excludeNumbers={excludeNumbersStr}
          countOfSetsToGenerate={countOfSetsToGenerate}
          onIncludeNumbersChange={setIncludeNumbersStr}
          onExcludeNumbersChange={setExcludeNumbersStr}
          onCountOfSetsChange={handleCountOfSetsChange}
        />

        {/* Number Display Section */}
        <NumberDisplay numberSets={generatedNumberSets} />

        {/* Action Button */}
        <section>
          <button
            onClick={handleGenerateNumbers}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
          >
            번호 생성하기!
          </button>
        </section>

        {/* Footer - Optional */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} 로또 번호 생성기.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
