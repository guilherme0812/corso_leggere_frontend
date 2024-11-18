import Image from "next/image";
import { MdMoreVert } from "react-icons/md";

type UserInfoType = {
  open: boolean;
};

function UserInfo({ open }: UserInfoType) {
  return (
    <div
      // onClick={onClick}
      data-state={open ? "open" : "closed"}
      className={`cursor-pointer inline-flex font-medium text-sm leading-5 rounded-xl whitespace-nowrap items-center normal-case transition duration-300 w-full pr-2 hover:bg-gray-100`}
    >
      <div
        data-name="carbonfair-ui-drawer-item-icon"
        data-state={open ? "open" : "closed"}
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border-2"
      >
        <div className="relative overflow-hidden rounded-xl w-10 h-10">
          <Image
            src="https://images.pexels.com/photos/302831/pexels-photo-302831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            layout="fill"
            alt="imge"
          />
        </div>
      </div>

      <div
        data-name="carbonfair-ui-drawer-item-label"
        className={`text-ellipsis overflow-hidden pl-1 font-semibold flex-grow`}
      >
        <div className="leading-3">Escritório 1</div>
        <div className="text-sm font-normal">Steve</div>
      </div>

      <div className="h-12 pt-2">
        <div className="p-1 hover:bg-gray-200 rounded-md">
          <MdMoreVert />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
