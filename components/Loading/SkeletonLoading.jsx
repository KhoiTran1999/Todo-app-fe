export default function SkeletonLoading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-fit ml-[300px] p-4 flex justify-start items-start flex-wrap">
      {[...Array(8).keys()].map((val, idx) => (
        <div
          key={idx}
          className="border border-slate-200 bg-slate-50 w-[240px] h-[150px] mr-3 mb-3 p-4 shadow rounded-md"
        >
          <div className="animate-pulse">
            <div className="h-7 bg-slate-400 rounded-sm mb-2"></div>
            <div className="h-[80px] bg-slate-400 rounded-sm "></div>
          </div>
        </div>
      ))}
    </div>
  );
}
