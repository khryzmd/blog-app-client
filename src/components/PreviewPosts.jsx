import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewPosts(props) {
  console.log(props);

  const { breakPoint, data } = props;

  // Destructured the posts data
  const { _id, title, author, content, createdOn } = data;

  return (
    <Col xs={12} md={breakPoint}>
      {/*Adding the class cardHighlight for min-height*/}
      <Card className="cardHighlight mx-2">
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/posts/${_id}`}>{title}</Link>
          </Card.Title>
          <Card.Text>Author: {author.email}</Card.Text>
          <Card.Text>Created On: {createdOn}</Card.Text>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link className="btn btn-primary d-block" to={`/posts/${_id}`}>
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
