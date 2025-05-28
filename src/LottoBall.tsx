interface LottoBallProps {
  number: number;
}

function LottoBall({ number }: LottoBallProps) {
  return (
    <span
      data-testid="lotto-ball"
      className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full shadow-md"
    >
      {number}
    </span>
  );
}

export default LottoBall;
