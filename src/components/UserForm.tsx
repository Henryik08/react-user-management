import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addUser, updateUser } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type FormFields = {
  name: string;
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

const emptyForm: FormFields = {
  name: "",
  username: "",
  email: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
};

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isEditMode = Boolean(id);

  const existingUser = useAppSelector((state) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  const [formData, setFormData] = useState<FormFields>(() => {
    if (isEditMode && existingUser) {
      return {
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        street: existingUser.address.street,
        suite: existingUser.address.suite,
        city: existingUser.address.city,
        zipcode: existingUser.address.zipcode,
      };
    }
    return emptyForm;
  });

  // Edit mode: user not found in state
  if (isEditMode && !existingUser) {
    return (
      <div className="user-form user-form--not-found">
        <p>User not found.</p>
        <button className="btn btn--back" onClick={() => navigate("/users")}>
          Back to Users
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userPayload = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
      },
    };

    if (isEditMode && existingUser) {
      dispatch(updateUser({ ...userPayload, id: existingUser.id }));
    } else {
      dispatch(addUser(userPayload));
    }

    navigate("/users");
  };

  return (
    <div className="user-form">
      <div className="user-form__card">
        <h1 className="user-form__title">
          {isEditMode ? "Edit User" : "Add New User"}
        </h1>

        <div className="user-form__group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            name="street"
            type="text"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="suite">Suite</label>
          <input
            id="suite"
            name="suite"
            type="text"
            value={formData.suite}
            onChange={handleChange}
            placeholder="Suite / Apt"
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="zipcode">Zipcode</label>
          <input
            id="zipcode"
            name="zipcode"
            type="text"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="Zipcode"
          />
        </div>

        <div className="user-form__actions">
          <button className="btn btn--cancel" onClick={() => navigate("/users")}>
            Cancel
          </button>
          <button className="btn btn--submit" onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;