import React, { Component } from "react";
import API from "../../utils/API";
// import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import SearchForm from "../../components/SearchForm";
// import SearchResults from "../components/SearchResults";
import { List, ListItem } from "../../components/List";
// import Alert from "../../components/Alert";
// import { Input, FormBtn } from "../../components/Form";

class Search extends Component {
  state = {
    search: "",
    zips: [],
    // results: [],
    error: ""
  };

  // When the component mounts... 
  componentDidMount() {
    console.log("happens before page loads", API)

    // function to get all zip codes (this was the first thing I tested with dummy data)
    // gets a list of all available zip codes and updates this.state.zips
    // API.getZips()
    //   .then((res) => {
    //     console.log('all our zip codes', res)
    //     this.setState({zips: res.data})
    // })
    //   .catch(err => console.log(err));
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getOneZip(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ zips: res.data, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    // shows dynamically changing 'state' value of input(s)
    console.log('state', this.state);

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              zips={this.state.zips}
            />
          </Col>

          <Col size="md-12">
            {this.state.zips.length ? (
              <List>
                {this.state.zips.map(zip => (
                  <ListItem>{/*key={book._id}*/}
                    {/*<a href={"/books/" + book._id}>*/}
                      <strong>
                        {zip.zipCode} has community ISP: {zip.hasCommunityISP.toString()} {/*by {book.author}*/}
                      </strong>
                    {/*</a>*/}
                    {/*<DeleteBtn />*/}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Zip Code Not Found</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;

