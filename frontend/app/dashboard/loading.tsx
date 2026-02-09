export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-28 bg-gray-100 rounded animate-pulse"
        />
      ))}
    </div>
  );
}
