import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import FeaturedPosts from "../components/FeaturedPosts";

export default function Home() {
  const data = {
    title: "Welcome to Blog App",
    content: "Explore Insightful Articles and Latest Updates",
    destination: "/posts",
    buttonLabel: "Read More",
  };

  return (
    <>
      <Banner data={data} />
      <FeaturedPosts />
      <Highlights />
    </>
  );
}
