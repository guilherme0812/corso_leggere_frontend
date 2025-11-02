import { UserDataType } from "@/app/_types/login";
import { LuClock, LuEllipsis } from "react-icons/lu";
import moment from "moment";

type UserCardType = {
  data: UserDataType;
  handleEdit: (data: UserDataType) => void;
};
function UserCard({ data, handleEdit }: UserCardType) {
  return (
    <div className="rounded-md bg-white h-16 p-2 px-4 border shadow-custom hover:shadow-lg transition duration-300 grid grid-cols-12 text-sm">
      <div className="col-span-8 flex flex-col justify-center">
        <div className="font-semibold">
          {data.firstName} {data.lastName}
        </div>
        <div className="text-xs">{data.email}</div>
      </div>

      <div className="col-span-4 flex items-center gap-2 text-xs justify-between">
        <div className="p-2 py-1 rounded-md bg-purple-200 font-semibold">status pendente</div>
        <div className="font-semibold flex gap-1 items-center">
          <LuClock />
          <div>{moment(data.createAt).format("DD/MM/YYYY")}</div>
        </div>

        <div>
          <div
            className="cursor-pointer p-4 rounded-full hover:bg-gray-100 transition"
            onClick={() => handleEdit(data)}
          >
            <LuEllipsis />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
