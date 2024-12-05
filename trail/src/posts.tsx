import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "./context/userContext";

type PostUser = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const Posts = () => {
  const [postUser, SetUser] = useState<PostUser[]>([]);
  const {id}=useContext(userContext);
  useEffect(() => {
    getPosts();
  }, [id]);
  const getPosts = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      SetUser(res.data);
    } catch {
      console.log("error");
    }
  };
  return (
    <ul>
      {postUser.map((x) => (
        <li>{x.title}</li>
      ))}
    </ul>
  );
};
export default Posts;
