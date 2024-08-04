import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const MovieView = ({ users }) => {
  const { userId } = useParams();
  const user = users.find((b) => b.id === Number(userId)); // Convert userId to number if necessary

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
        <span>username: </span>
        <span>{user.username}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};