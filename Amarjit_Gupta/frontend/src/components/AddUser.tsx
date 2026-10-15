import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserFormData {
  name: string;
  email: string;
  role: "user" | "admin" | "manager";
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const AddUser = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "user",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError(false);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.role.trim()
    ) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const response = await axios.post<ApiResponse>(
        "http://localhost:5000/api/createUser",
        {
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      console.log("data:", data);

      if (data.success) {
        console.log("data inserted");
        navigate("/");
      }
    } catch (err: unknown) {
      console.log("something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto w-[320px] max-w-full md:w-[400px]">
        <div className="mb-8">
          <h1 className="mt-2 text-3xl font-bold">
            Add New User
          </h1>
        </div>

        <div className="rounded-xl border bg-white p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* name */}
            <div>
              <label htmlFor="name" className="mb-2 block font-bold">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full rounded border px-4 py-2 transition"
              />

              {error && !formData.name.trim() && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter your full name
                </p>
              )}
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="mb-2 block font-bold">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full rounded border px-4 py-2 transition"
              />

              {error && !formData.email.trim() && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter your email address
                </p>
              )}
            </div>

            {/* role */}
            <div>
              <label htmlFor="role" className="mb-2 block font-bold">
                Select Role
              </label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded border px-4 py-2 transition"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>

              {error && !formData.role.trim() && (
                <p className="mt-1 text-sm text-red-500">
                  Please select a role
                </p>
              )}
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-red-500 px-4 py-2.5 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating User..." : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;