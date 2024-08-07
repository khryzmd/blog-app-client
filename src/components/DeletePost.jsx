import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function DeletePost({ post, isActive, fetchData }) {
  const deletePost = (postId) => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/deletePost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Post deleted successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Post deleted successfully",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please Try again",
          });
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => deletePost(post)}
        className="mt-2 mx-2"
      >
        Delete
      </Button>
    </>
  );
}
