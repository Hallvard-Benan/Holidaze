import { CiGrid2H } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { cn } from "../../utils/utils";
export default function GridViewButtons({
  onClickGrid,
  onClickList,
  gridView,
}) {
  return (
    <div className=" border-muted-foreground flex items-center gap-2 rounded-md border bg-muted p-1 text-3xl">
      <button
        className={cn(
          gridView && "text-primary-foreground rounded-md bg-primary",
        )}
        onClick={onClickList}
      >
        <CiGrid41 />
      </button>
      <button
        className={cn(
          !gridView && "text-primary-foreground rounded-md bg-primary",
        )}
        onClick={onClickGrid}
      >
        <CiGrid2H />
      </button>
    </div>
  );
}
