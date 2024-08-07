import { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  ButtonGroup,
  Row,
  Col,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UpdatePost from "../components/UpdatePost";
import DeletePost from "../components/DeletePost";

import UserContext from "../context/UserContext";

export default function PostView() {
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  console.log(user);

  const navigate = useNavigate();

  //data
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [createdOn, setCreatedOn] = useState(null);
  const [content, setContent] = useState("");

  //comments
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [showComments, setShowComments] = useState(false);

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getComments = (postId) => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/getComments/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const item = data.map((comment) => {
          console.log(comment);

          return (
            <ListGroup.Item
              key={comment._id}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{comment.email}</div>
                {comment.comment}
              </div>
              {user.isAdmin && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteComment(postId, comment._id)}
                  className="mt-2 mx-2"
                >
                  Delete
                </Button>
              )}
            </ListGroup.Item>
          );
        });
        setComments(item);
        setShowComments(true);
      });
  };

  const deleteComment = (postId, commentId) => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/posts/deleteComment/${postId}/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Comment deleted successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Comment deleted successfully",
          });
          setShowComments(false);
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please Try again",
          });
          setShowComments(false);
        }
      });
  };

  const addComment = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/posts/addComment/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "comment added successfully") {
          Swal.fire({
            title: "Success!",
            text: "Comment added successfully!",
            icon: "success",
          });
          setShowComments(false);
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
          });
        }
        setComment("");
        handleClose();
      });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/getPost/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.post);
        setTitle(data.post.title);
        setAuthor(data.post.author.email);
        setCreatedOn(data.post.createdOn);
        setContent(data.post.content);
      });
  }, [postId]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            addComment(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="Form.ControlTextarea">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Comment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Container className="mt-5">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-4 text-center">{title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {author}
                </Card.Text>
                <Card.Text>
                  <strong>createdOn:</strong> {createdOn}
                </Card.Text>
                <Card.Text>
                  <strong>content:</strong> {content}
                </Card.Text>
                <div className="text-center">
                  {user.id !== null && user.id !== undefined ? (
                    <>
                      {showComments ? (
                        <Button
                          className="mt-2 mx-2"
                          variant="dark"
                          onClick={() => setShowComments(false)}
                        >
                          Hide Comments
                        </Button>
                      ) : (
                        <Button
                          className="mt-2 mx-2"
                          variant="outline-dark"
                          onClick={() => getComments(postId)}
                        >
                          Show Comments
                        </Button>
                      )}
                      <Button
                        className="mt-2 mx-2"
                        variant="outline-primary"
                        onClick={handleShow}
                      >
                        Add Comment
                      </Button>
                      {user.isAdmin ? (
                        <>
                          <br />
                          <br />
                          <Link to="/posts">Back to Dashboard</Link>
                        </>
                      ) : (
                        <>
                          <div>
                            <UpdatePost post={postId} />
                            <DeletePost post={postId} />
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <Link className="btn btn-danger btn-block mt-2" to="/login">
                      Log in to view comments
                    </Link>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className={`mt-5 ${showComments ? "d-block" : "d-none"}`}>
          <Col lg={{ span: 6, offset: 3 }}>
            <ListGroup as="ol" numbered>
              {comments}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
