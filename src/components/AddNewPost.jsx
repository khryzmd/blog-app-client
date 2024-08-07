import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddNewPost({ fetchData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [showAddNewPost, setShowAddNewPost] = useState(false);

  const closeAddNewPost = () => {
    setShowAddNewPost(false);
    setTitle("");
    setContent("");
  };

  const addNewPost = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/posts/addPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Post successfully added") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Post successfully updated",
          });
          closeAddNewPost();
          fetchData();
        } else if (data.message === "Post already exists") {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Post already exists",
          });
          closeAddNewPost();
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          closeAddNewPost();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        className="mx-1"
        variant="primary"
        size="sm"
        onClick={() => setShowAddNewPost(true)}
      >
        Add New Post
      </Button>
      <Modal show={showAddNewPost} onHide={closeAddNewPost}>
        <Form onSubmit={(e) => addNewPost(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="postName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
				placeholder="Enter blog title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="postPrice">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                required
				placeholder="Enter blog content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddNewPost}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
