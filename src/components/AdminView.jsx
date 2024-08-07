import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";
import AddNewPost from "./AddNewPost";

export default function AdminView({ postsData, fetchData }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(postsData);

    const postsArr = postsData.map((post) => (
      <tr key={post._id}>
        <td>{post.title}</td>
        <td>{post.author.email}</td>
        <td>{post.createdOn}</td>
        <td>{post.content}</td>
        <td
          className={post.comments.length > 0 ? "text-success" : "text-danger"}
        >
          {post.comments.length > 0 ? (
            <Link to={`/posts/${post._id}`}>View Comments</Link>
          ) : (
            <>
              <span>No comments yet</span>
              <br />
              <Link to={`/posts/${post._id}`}>Add Comments</Link>
            </>
          )}
        </td>
        <td className="text-center">
          <UpdatePost post={post._id} fetchData={fetchData} />
          <DeletePost post={post._id} fetchData={fetchData} />
        </td>
      </tr>
    ));

    setPosts(postsArr);
  }, [postsData]);

  return (
    <>
      <h1 className="text-center mt-4">Admin Dashboard</h1>

      <>
        <Container className="text-center mb-4">
          <AddNewPost fetchData={fetchData} />
        </Container>

        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Author</th>
              <th>Date Created</th>
              <th>Content</th>
              <th>Comments</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>{posts}</tbody>
        </Table>
      </>
    </>
  );
}
