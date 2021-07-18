import { User } from "@prisma/client";
import { Link } from "react-router-dom";

type UsersProps = {
  users: User[];
};

export const Users = ({ users }: UsersProps) => (
  <div className="flex flex-col gap-8 max-w-1/2 mx-auto">
    {users.map((user) => (
      <div
        key={user.firstName + user.lastName}
        className="border p-8 rounded-lg shadow-md bg-white"
      >
        <h2 className="font-medium text-xl">{`${user.firstName} ${user.lastName}`}</h2>
        <h3 className="text-lg">{user.email}</h3>
        <button className="bg-blue-500 p-2 hover:bg-blue-400 rounded-lg text-gray-100 font-bold mt-4 shadow-md">
          <Link to={{ pathname: `/booking/${user.id}`, state: { user: user } }}>
            Book
          </Link>
        </button>
      </div>
    ))}
  </div>
);
