import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";

const GitHubProfileCard = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 ">
      <h1 className="text-[#BC384A] font-poppins text-center font-bold text-2xl">
        GitHub User Card
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center  border-b-2 border-[#BC384A] py-2">
          <input
            type="text"
            placeholder="Enter GitHub username"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none bg-red-50"
            onChange={handleChange}
            value={username}
            required
          />
          <button type="submit" className="">
            <Button name="Show" />
          </button>
        </div>
      </form>

      {userData && (
        <div className="mt-5 shadow-md rounded-lg overflow-hidden bg-red-100 flex flex-col justify-center items-center h-96">
          <img
            src={userData.avatar_url}
            alt="GitHub Avatar"
            className="w-32 h-32 rounded-full object-cover "
          />
          <div className="p-4">
            <h2></h2>
            <p className="text-gray-700 font-medium">
              Username: @{userData.login}
            </p>
            <h2 className="text-2xl font-semibold ">
              {userData.name || "N/A"}
            </h2>

            <div className="mt-3">
              <p className="text-gray-700 text-lg ">
                Public Repositories: {userData.public_repos}
              </p>
              <p className="text-gray-700 text-lg">
                Public Gists: {userData.public_gists}
              </p>
              <p className="text-gray-700 text-lg">
                Joined GitHub on{" "}
                {new Date(userData.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubProfileCard;
