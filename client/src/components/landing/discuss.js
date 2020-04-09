import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Discuss extends React.Component {

  render() {
    return (
      <Container className="discuss-component">
        <Row>
          <Col className="text-center">
            <div className="discuss-title">Leave a Comment</div>
            <small className="pb-5">or give us any suggestions!</small>
          </Col>
        </Row>
        <Row>
          <Col sm={1}></Col>
          <Col sm>
            <div id="disqus_thread"></div>
          </Col>
          <Col sm={1}></Col>
        </Row>
      </Container>
    )
  }
}

export default Discuss;