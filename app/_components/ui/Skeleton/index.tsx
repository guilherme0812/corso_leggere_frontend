import { HTMLAttributes } from "react";

function Skeleton(props: HTMLAttributes<HTMLDivElement>) {
  const hasBackgroundColor = props.className?.includes("bg-");
  const customClassName = `animate-pulse  rounded-md ${props.className} ${!hasBackgroundColor ? "bg-white" : ""}`;

  return <div className={customClassName}>{props?.children}</div>;
}

export default Skeleton;
