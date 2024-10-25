import { ReactNode } from "react";

export type HeaderType = {
  title?: string | ReactNode;
};

function Header({ title }: HeaderType) {
  return (
    <div>
      <div className="text-2xl font-medium min-h-[40px] border-b">{title}</div>
    </div>
  );
}

export default Header;
