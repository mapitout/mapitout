import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

class Author extends React.Component {
  render() {
    return (
      <Container className="author-component">
        <Row>
          <Col className="text-center author-title">MapitOut is build wiht love by Andy and Shelly</Col>
        </Row>
        <Row>
          <Col sm lg="6">
            <AuthorCard
              src="https://media-exp1.licdn.com/dms/image/C5603AQEd8wi3HLsN6w/profile-displayphoto-shrink_200_200/0?e=1591833600&v=beta&t=Ljij_omqlBIMp47POHI27eYr_tcnTcIEm0qDZjksmvU"
              name="Andy Chen"
              github="https://github.com/amazingandyyy"
              linkedIn="https://www.linkedin.com/in/amazingandyyy/"
            />
          </Col>
          <Col sm lg="6">
            <AuthorCard
              src="https://media-exp1.licdn.com/dms/image/C5603AQGuAltfA-sTjA/profile-displayphoto-shrink_200_200/0?e=1591833600&v=beta&t=pzeocypBXvNOulVepqs_x_YYHObAa0Tw9PVGa7scfoE"
              name="Shelly Cheng"
              github="https://github.com/amazingshellyyy"
              linkedIn="https://www.linkedin.com/in/amazingshellyyy/" />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Author;

const AuthorCard = (props) => {
  return (
    <Container className="author-card">
      <Row>
        <Col sm md lg={4}>
          <Image src={props.src} roundedCircle className="author-img"/>
          <div className="text-center icons">
            <a className="icon" href={props.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github fa-2x"></i></a>
            <a className="icon" href={props.linkedIn} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x"></i></a>
          </div>
        </Col>
        <Col sm md lg={8}>
          <h1>{props.name}</h1>
         
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of</p>
        </Col>
      </Row>
    </Container>
  )
}
