import SkeletonLoading from "@/components/Loading/SkeletonLoading";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // return <SkeletonLoading />;
  return (
    <div className="w-full mt-8 flex items-center">
      <div className="animate-bounce">Loading...</div>
    </div>
  );
}
