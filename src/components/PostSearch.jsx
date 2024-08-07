import React, { useState } from "react";
import PostCard from "./PostCard";

const PostSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/search-by-name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postTitle: searchQuery }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for posts:", error);
    }
  };

  return (
    <div>
      <h2>Blog Post Search</h2>
      <div className="form-group">
        <label htmlFor="postName" className="mb-2">
          Blog Post Name:
        </label>
        <input
          type="text"
          id="postName"
          className="form-control"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary my-3" onClick={handleSearch}>
        Search
      </button>
      <ul>
        {searchResults.length > 0 && (
          <>
            <h3>Search Results:</h3>
            {searchResults.map((post) =>
              post ? <PostCard postProp={post} key={post._id} /> : null
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default PostSearch;
