import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

class Author extends React.Component {
  render() {
    return (
      <div className="author-component">
        <Container >
          <Row>
            <Col className="text-center author-title">MapitOut is build with &#10084; by Andy and Shelly</Col>
          </Row>
          <Row>
            <Col sm md lg="6">
              <AuthorCard
                src="https://media-exp1.licdn.com/dms/image/C5603AQEd8wi3HLsN6w/profile-displayphoto-shrink_200_200/0?e=1591833600&v=beta&t=Ljij_omqlBIMp47POHI27eYr_tcnTcIEm0qDZjksmvU"
                name="Andy Chen"
                github="https://github.com/amazingandyyy"
                linkedIn="https://www.linkedin.com/in/amazingandyyy/"
                bio="dfadf"
              />
            </Col>
            <Col sm md lg="6">
              <AuthorCard
                src="https://media-exp1.licdn.com/dms/image/C5603AQGuAltfA-sTjA/profile-displayphoto-shrink_200_200/0?e=1591833600&v=beta&t=pzeocypBXvNOulVepqs_x_YYHObAa0Tw9PVGa7scfoE"
                name="Shelly Cheng"
                github="https://github.com/amazingshellyyy"
                linkedIn="https://www.linkedin.com/in/amazingshellyyy/"
                bio="dfadf"
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Author;

const AuthorCard = (props) => {
  return (
    <Container className="author-card">
      <Row>
        <Col sm={12} md={12} lg={4} className="card-left">
          <Image src={props.src} roundedCircle className="author-img" />
          <div className="text-center">
          </div>
        </Col>
        <Col sm md lg={8} className="card-right">
          <div className="author-info">
            <span className="author-name">{props.name}</span>
            <span className="icon">
              <a href={props.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github fa-2x"></i></a>
            </span>
            <span className="icon">
              <a href={props.linkedIn} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x"></i></a>
            </span>
          </div>
          <div className="author-textbox">
            <p className="author-text">{props.bio}</p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
