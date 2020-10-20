import React from "react";
import { Row, Col } from "react-bootstrap";
import "./index.css";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { POSTS_LIST } from "./PostList";

const UPVOTE_POST = gql`
  mutation($testId: Int!, $id: Int!) {
    insert_test(objects: [{ test_id: $testId, id: $id }]) {
      affected_rows
    }
  }
`;

function Post(props) {
  const postdate = new Date();

  const [upvotePost] = useMutation(UPVOTE_POST, {
    variables: { testId: props.post.id, id: 21 },
    refetchQueries: [{ query: POSTS_LIST }]
  });

  return (
    <Row className="post" key={props.index}>
      <Col>
        <Row>
          <li className="post-id">
              <span className="anchor cursor" onClick={upvotePost}>
                ▲
              </span>
            )}
            &nbsp;
           </li>
        </Row>
        <Row>
          <span className="post-id">
          </span>
          <span className="post-id">
            &nbsp;created at {postdate.toString()};
          </span>
        </Row>
      </Col>
    </Row>
  );
}

export default Post;