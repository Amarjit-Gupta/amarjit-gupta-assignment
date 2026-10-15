import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface UserFormData {
  name: string;
  email: string;
  role: "user" | "admin" | "manager";
}

interface User {
  id: string | number;
  name: string;
  email: string;
  role: "user" | "admin" | "manager";
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: User;
  data?: User;
}

const EditUser = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "user",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // get user data
  const getUser = async () => {
    if (!id) {
      console.log("User ID not found");
      setFetching(false);
      return;
    }

    try {
      setFetching(true);

      const response = await axios.get<ApiResponse>(
        `http://localhost:5000/api/getSingleUser/${id}`
      );

      const data = response.data;
      console.log("User data:", data);

      if (data.success) {
        const user = data.user;

        if (user) {
          setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
          });
        }
      } else {
        console.log("Failed to fetch user:", data.message);
      }
    } catch (err: unknown) {
      console.log("Something went wrong:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError(false);
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.name.trim() || !formData.email.trim()) {
    setError(true);
    return;
  }

  try {
    setLoading(true);

    const response = await axios.put(
      `http://localhost:5000/api/updateUser/${id}`,
      {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
      }
    );

    console.log("Update response:", response.data);

    if (response.data.success) {
      console.log("User updated successfully");
      navigate("/");
    }
  } catch (err) {
    console.log("Something went wrong:", err);
  } finally {
    setLoading(false);
  }
};

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto w-[320px] max-w-full md:w-[400px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit User
          </h1>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {error && !formData.name.trim() && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter your full name
                </p>
              )}
            </div>

            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {error && !formData.email.trim() && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter your email address
                </p>
              )}
            </div>

            {/* role */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Select Role
              </label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-lg bg-red-500 px-4 py-2.5 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;