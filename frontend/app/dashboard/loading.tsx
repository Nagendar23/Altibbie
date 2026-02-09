export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse mb-8" />

      {/* Controls skeleton */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-12 bg-slate-200 rounded-lg animate-pulse" />
          <div className="w-full md:w-40 h-12 bg-slate-200 rounded-lg animate-pulse" />
          <div className="w-full md:w-40 h-12 bg-slate-200 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border-2 border-slate-200 rounded-xl p-6 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-slate-200 rounded" />
              <div className="w-16 h-6 bg-slate-200 rounded-full" />
            </div>
            <div className="h-6 bg-slate-200 rounded mb-3 w-3/4" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-slate-200 rounded" />
              <div className="h-6 w-20 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
