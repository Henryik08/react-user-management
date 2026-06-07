import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { deleteUser, type User } from "../store/userSlice";

type UserCardProps = {
  user: User;
};

function UserCard({user}:UserCardProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteUser(user.id));
    };

    const handleEdit = () => {
        navigate(`/edit-user/${user.id}`);
    };

    const handleNameClick = () => {
        navigate(`/users/${user.id}`);
    };

    return(
        <div className="user-card">
            <h2 className="user-card__name">
                {user.name}
            </h2>
            <p className="user-card__username">@{user.username}</p>
            <p className="user-card__email">@{user.email}</p>
            <p className="user-card__address">
                {user.address.street},
                {user.address.city},
                {user.address.zipcode}
            </p>
            <div className="user-card__actions">
                <button className="btn btn--view" onClick={handleNameClick}>
                    View Details
                </button>
                <button className="btn btn--edit" onClick={handleEdit}>
                    Edit
                </button>
                <button className="btn btn--delete" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default UserCard;