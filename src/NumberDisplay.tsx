import LottoBall from "./LottoBall";

interface NumberDisplayProps {
  numberSets: number[][];
}

function NumberDisplay({ numberSets }: NumberDisplayProps) {
  const hasNumberSets = numberSets.length > 0;

  return (
    <section className="mb-6 p-4 border-2 border-dashed border-blue-300 rounded-md bg-blue-50 min-h-[80px] flex flex-col items-center justify-center space-y-3">
      {hasNumberSets ? (
        numberSets.map((set, index) => (
          <div
            key={index}
            data-testid="lotto-set"
            className="flex space-x-3 p-2 bg-white/50 rounded-md shadow"
          >
            {set.map((num) => (
              <LottoBall key={num} number={num} />
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500">생성 버튼을 눌러주세요.</p>
      )}
    </section>
  );
}

export default NumberDisplay;
