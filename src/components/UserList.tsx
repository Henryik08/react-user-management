import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchUsers } from "../store/userSlice";
import UserCard from "./UserCard";

function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  if (loading) {
    return <p className="status-message">Loading users...</p>;
  }

  if (error) {
    return <p className="status-message status-message--error">{error}</p>;
  }

  return (
    <div className="user-list">
      <div className="user-list__header">
        <h1>Users</h1>
        <button className="btn btn--add" onClick={() => navigate("/add-user")}>
          + Add New User
        </button>
      </div>
      <div className="user-list__grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
