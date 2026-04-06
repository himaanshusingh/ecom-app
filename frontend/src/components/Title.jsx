export default function Title({ text1, text2 }) {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {text1}&nbsp;
        <span className="text-gray-700 font-medium">{text2}</span>
      </p>
      &nbsp;
      <span className="w-12 h-0.5 bg-gray-600"></span>
    </div>
  );
}
