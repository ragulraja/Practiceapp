import React from "react";
import { Container } from "react-bootstrap";
import "./index.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import Post from "./Post";

export const POSTS_LIST = gql`
  {
    test {
      id
      url
      description
    }
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(POSTS_LIST);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Container className="postlist">
      <ol>
        {data.test.map((test, index) => (
          <Post key={index} post={test} />
        ))}
      </ol>
    </Container>
  );
}

export default withApollo(PostList);