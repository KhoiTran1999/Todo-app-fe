import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="w-16 h-16 text-slate-700"
        spin={true}
      />
    </div>
  );
}
