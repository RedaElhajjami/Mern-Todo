import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';

const Profile = ({ token }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFullname(response.data.fullname);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        alert('Error fetching profile data', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        '/profile',
        { fullname, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white shadow-md rounded w-full space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;