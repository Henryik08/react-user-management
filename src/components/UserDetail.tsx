import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  if (!user) {
    return (
      <div className="user-detail user-detail--not-found">
        <p>User not found.</p>
        <button className="btn btn--back" onClick={() => navigate("/users")}>
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="user-detail">
      <div className="user-detail__card">
        <h1 className="user-detail__name">{user.name}</h1>

        <div className="user-detail__section">
          <h3>Contact</h3>
          <p><span className="user-detail__label">Username:</span> @{user.username}</p>
          <p><span className="user-detail__label">Email:</span> {user.email}</p>
        </div>

        <div className="user-detail__section">
          <h3>Address</h3>
          <p><span className="user-detail__label">Street:</span> {user.address.street}</p>
          <p><span className="user-detail__label">Suite:</span> {user.address.suite}</p>
          <p><span className="user-detail__label">City:</span> {user.address.city}</p>
          <p><span className="user-detail__label">Zipcode:</span> {user.address.zipcode}</p>
        </div>

        <div className="user-detail__actions">
          <button className="btn btn--back" onClick={() => navigate("/users")}>
            Back to Users
          </button>
          <button className="btn btn--edit" onClick={() => navigate(`/edit-user/${user.id}`)}>
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;