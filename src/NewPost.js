import React, { useState } from "react";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import {POSTS_LIST} from "./PostList";

const SUBMIT_POST = gql`
  mutation update_test($description: String!, $url: String!) {
    update_test(where: {id:{_eq: 5}}, _set: {url: $url, description: $description})
    {
      returning{
        description
        url
        id
      }
    } 
  }
`;

function NewPost() {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const [submitPost] = useMutation(SUBMIT_POST);

  const handleUpdate = () => {
    submitPost({ variables: { description: description, url: url} });
    alert('Updated Successfully')
};

  return (
    <div>
      <Container className="postlist">
      <form
        onSubmit={e => {
          e.preventDefault();
          submitPost({ 
            variables: { description, url },
            refetchQueries: [{query: POSTS_LIST}]
           })
          .catch(function(error) {
            console.log(error);
            setError(error.toString());
          });
          setDescription('');
          setUrl('');
        }
      }
      >
        <Row>
          <Col>
            <span className="post-id">Description:</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              value={description}
              onChange={e => setDescription( e.target.value )}
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="post-id">URL:</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              value={url}
              onChange={e => setUrl( e.target.value )}
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input type="submit" value="Submit" onClick={handleUpdate} />
          </Col>
        </Row>
      </form>
      {error}
      </Container>
    </div>
  );
}

export default withApollo(NewPost);