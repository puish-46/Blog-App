import { useEffect, useState } from "react";
import axios from "axios";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
  articleStatusDeleted,
  articleMeta,
  articleExcerpt,
  articleStatusActive,
} from "../styles/common.js";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    let res = await axios.get(`${import.meta.env.VITE_API_URL}/admin-api/users`,{withCredentials: true,});
    setUsers(res.data.payload);
  }

  async function deleteUser(email) {
    await axios.patch(`${import.meta.env.VITE_API_URL}/admin-api/user`,{email,isUserActive: false,},{withCredentials: true,});
    getUsers();
  }

  async function restoreUser(email) {
    await axios.patch(`${import.meta.env.VITE_API_URL}/admin-api/user`,{email,isUserActive: true,},{withCredentials: true,});
    getUsers();
  }

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {users.map((user) => (
      <div key={user._id} className={`${articleCardClass} relative flex flex-col`}>
        
        {/* Status Badge */}
        <span className={user.isUserActive ? articleStatusActive : articleStatusDeleted}>
          {user.isUserActive ? "ACTIVE" : "DELETED"}
        </span>

        <div className="flex flex-col gap-2">
          <p className={articleMeta}>{user.role}</p>

          <p className={articleTitle}>{user.firstName}</p>

          <p className={articleExcerpt}>{user.email}</p>
        </div>

        <div className="mt-auto pt-4 flex gap-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
            onClick={() => deleteUser(user.email)}
          >
            Delete
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600"
            onClick={() => restoreUser(user.email)}
          >
            Restore
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default UsersList;