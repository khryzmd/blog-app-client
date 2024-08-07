import { Row, Col, Card } from "react-bootstrap";

export default function Highlight() {
  return (
    <Row className="mt-3 mb-3">
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Latest Blog Posts</h2>
            </Card.Title>
            <Card.Text>
              Explore our most recent blog posts covering a variety of topics.
              Stay updated with the latest trends, insights, and expert
              opinions. Dive into articles that cater to your interests and
              expand your knowledge.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Expert Insights</h2>
            </Card.Title>
            <Card.Text>
              Gain valuable insights from industry experts. Our blog features
              in-depth articles and interviews that provide unique perspectives
              and practical advice. Learn from the best and apply their wisdom
              to your own pursuits.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Join the Conversation</h2>
            </Card.Title>
            <Card.Text>
              Become part of our vibrant blog community. Share your thoughts,
              participate in discussions, and connect with like-minded readers.
              Sign up today to get notifications on new posts and engage with
              content that matters to you.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
