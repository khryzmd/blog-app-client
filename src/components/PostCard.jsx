import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PostCard({ postProp }) {
  // console.log(postProp);
  const { _id, title, author, content, createdOn } = postProp;

  return (
    <Card className="d-flex flex-column h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{title}</Card.Title>
        <Card.Text className="fw-semibold mb-3">{author.email}</Card.Text>
        <Card.Text className="fw-semibold mb-3">{createdOn}</Card.Text>
        <Card.Text className="fw-semibold mb-3">{content}</Card.Text>
        <div className="mt-auto">
          <Link className="btn btn-primary" to={`/posts/${_id}`}>
            Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postProp: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
  }),
};
