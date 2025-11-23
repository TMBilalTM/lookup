export function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-24 w-24 rounded-2xl bg-white/10" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-1/3 rounded-full bg-white/10" />
          <div className="h-8 w-1/2 rounded-full bg-white/20" />
          <div className="h-4 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 rounded-2xl bg-white/10" />
        ))}
      </div>
    </div>
  );
}
