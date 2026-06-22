import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";

export default function Profile() {
  const { backendUrl, token } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}api/user/profile`, {
          headers: { token },
        });
        if (res.data.success) {
          const user = res.data.user;
          setName(user.name || "");
          setEmail(user.email || "");
          if (user.address) {
            setAddress({
              firstName: user.address.firstName || "",
              lastName: user.address.lastName || "",
              street: user.address.street || "",
              city: user.address.city || "",
              state: user.address.state || "",
              zipcode: user.address.zipcode || "",
              country: user.address.country || "",
              phone: user.address.phone || "",
            });
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message || "Failed to load profile details");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token, backendUrl, navigate]);

  function handleAddressChange(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}api/user/update-profile`,
        { name, address },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Profile updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred while saving profile");
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="pt-16 max-w-2xl mx-auto min-h-[80vh] px-4">
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="PROFILE" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-gray-700">
        {/* Personal Details */}
        <div className="flex flex-col gap-4 border-b pb-6 border-gray-300">
          <h3 className="text-lg font-medium text-black">Personal Details</h3>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Email Address (Read-only)</label>
            <input
              type="email"
              value={email}
              disabled
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-100 cursor-not-allowed text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Full Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
        </div>

        {/* Saved Address Details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-black">Delivery Address</h3>
          
          <div className="flex gap-3">
            <div className="w-1/2 flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-semibold">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                value={address.firstName}
                onChange={handleAddressChange}
                placeholder="First Name"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-semibold">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                value={address.lastName}
                onChange={handleAddressChange}
                placeholder="Last Name"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Street</label>
            <input
              required
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              placeholder="Street"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>

          <div className="flex gap-3">
            <div className="w-1/2 flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-semibold">City</label>
              <input
                required
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-semibold">State</label>
              <input
                required
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/2 flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-semibold">ZipCode</label>
              <input
                required
                type="number"
                name="zipcode"
                value={address.zipcode}
                onChange={handleAddressChange}
                placeholder="ZipCode"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-semibold">Country</label>
              <input
                required
                type="text"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                placeholder="Country"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Phone</label>
            <input
              required
              type="number"
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
              placeholder="Phone"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-black text-white px-10 py-3 text-sm cursor-pointer hover:bg-gray-800 transition">
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
}
