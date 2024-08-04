import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProfileView = ({ users = [] }) => {
  const { userId } = useParams();

  // Debugging: Log userId and users array
  console.log('userId:', userId);
  console.log('users:', users);

  // Ensure IDs are compared correctly
  const user = users.find((u) => u.userId === userId); 


  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div>
        <span>Name: </span>
        <span>{user.name}</span>
      </div>
      <div>
        <span>Username: </span>
        <span>{user.username}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};