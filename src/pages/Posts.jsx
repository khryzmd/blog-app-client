import { useState, useEffect, useContext } from "react";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import UserContext from "../context/UserContext";

export default function Posts() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/posts/getAllPosts`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "No posts found") {
          setPost([]);
        } else {
          setPosts(data.posts);
        }
      });
  };

  useEffect(() => {
    fetchData();
    console.log(posts);
  }, [user]);

  return user.isAdmin === true ? (
    <AdminView postsData={posts} fetchData={fetchData} />
  ) : (
    <UserView postsData={posts} fetch={fetchData} />
  );
}
