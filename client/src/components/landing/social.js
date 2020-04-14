import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Social = () => {
  return (
    <Container className="social-component">
      <Row>
        <Col className="text-center social-title">Follow us on Facebook</Col>
      </Row>
      <Row className="text-center">
        <Col>
          <div className="fb-page pb-5" data-href="https://www.facebook.com/mapitoutapp" data-tabs="timeline" data-width="500" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/mapitoutapp" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/mapitoutapp">Mapitout</a></blockquote></div>
        </Col>
      </Row>
    </Container>

  )
}

export default Social;