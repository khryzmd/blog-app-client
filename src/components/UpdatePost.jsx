import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function UpdatePost({ post, fetchData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [showUpdate, setShowUpdate] = useState(false);

  const openUpdate = (postId) => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/getPost/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.post.title);
        setContent(data.post.content);
      });
    setShowUpdate(true);
  };

  const closeUpdate = () => {
    setTitle("");
    setContent("");
    setShowUpdate(false);
  };

  const updatePost = (e, postId) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/posts/updatePost/${postId}`, {
      method: "PATCH",
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
        if (data.message === "Post updated successfully") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Post successfully updated",
          });
          closeUpdate();
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          closeUpdate();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={() => openUpdate(post)}
        className="mt-2"
      >
        Update
      </Button>
      <Modal show={showUpdate} onHide={closeUpdate}>
        <Form onSubmit={(e) => updatePost(e, post)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="postName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdate}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
