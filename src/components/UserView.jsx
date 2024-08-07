import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostSearch from "./PostSearch";
import { Container, Row, Col } from "react-bootstrap";
import AddNewPost from "./AddNewPost";

export default function UserView({ postsData, fetchData }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(postsData);

    const postsArr = postsData.map((post) => {
      if (post) {
        return (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex align-items-stretch my-3"
            key={post._id}
          >
            <div className="d-flex flex-column h-100">
              <PostCard postProp={post} fetchData={fetchData} />
            </div>
          </Col>
        );
      } else {
        return null;
      }
    });

    setPosts(postsArr);
  }, [postsData]);

  return (
    <>
      <PostSearch />
      <h3>Blog Posts:</h3>
      <AddNewPost fetchData={fetchData} />
      <Container>
        <Row>{posts}</Row>
      </Container>
    </>
  );
}
