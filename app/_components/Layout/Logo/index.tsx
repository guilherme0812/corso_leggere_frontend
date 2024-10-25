import Image from "next/image";

function Logo() {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
      <div className="relative w-6 h-6">
        <Image src="/logo/balance.png" fill className="" alt="Logo" />
      </div>
    </div>
  );
}

export default Logo;
