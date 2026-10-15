import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: User[];
  data?: User[];
}

const AllUsers = () => {
  const [allData, setAllData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get<ApiResponse>(
        "http://localhost:5000/api/allUser"
      );

      const data = response.data;

      if (data.success) {
        console.log(data);
        setAllData(data?.user ?? []);
      } else {
        console.log("Failed to fetch users:", data.message);
      }
    } catch (err: unknown) {
      console.log("Something went wrong:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteUser/${id}`
      );

      console.log("User deleted successfully:", response.data);

      if (response.data?.success) {
        console.log("user data deleted");
        getAllUsers();
      }
    } catch (err: unknown) {
      console.log("Something went wrong:", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              All Users
            </h1>
          </div>

          <div className="w-fit rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-500">Total Users: </span>
            <span className="font-semibold text-gray-900">
              {allData.length}
            </span>
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
              <p className="text-sm text-gray-500">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                      ID
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Name
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Email
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Role
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {allData.length > 0 ? (
                    allData.map((user, i) => (
                      <tr
                        key={user.id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {i + 1}.
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="font-medium text-gray-900">
                            {user.name}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {user.email}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                            {user.role}
                        
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                               navigate(`/editUser/${user.id}`)
                              }
                              className="rounded-lg cursor-pointer border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-green-600 transition hover:bg-green-600 hover:text-white"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(user.id)}
                              className="rounded-lg cursor-pointer border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-16 text-center"
                      >
                        <p className="text-base font-medium text-gray-700">
                          No users found
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          There are no registered users to display.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;