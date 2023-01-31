import React, { Component } from "react";
import Pagin from "./Pagin";
// import axios from "axios";
// import Users from "../Users";
// import techlistlink from "../data/data.json";

import finaldata from "../data/finaldata.json";
import "./Newtechlist.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

export default class Newtechlist extends Component {
  constructor() {
    super();

    this.state = {
      eylelsFilter: "",
      serviceFilter: "",
      funcFilter: "",
      subfuncFilter: "",
      tableData: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 10,
      selectedRow: [],
      show: false,
    };
  }

  componentDidMount() {
    const result = [];
    for (let i = 0; i < finaldata.length; i++) {
      const obj = finaldata[i];
      const swapValue = (obj) => {
        Object.keys(obj).forEach((key) => {
          if (!obj[key]) {
            obj[key] = "";
          }
        });
      };
      swapValue(obj);
      result.push(obj);
    }
    this.setState({
      tableData: result,
    });
  }

  handleeylelsFilterChange = (event) => {
    this.setState({ eylelsFilter: event.target.value, currentPage: 1 });
  };

  handleserviceFilterChange = (event) => {
    this.setState({ serviceFilter: event.target.value, currentPage: 1 });
  };
  handlefuncFilterChange = (event) => {
    this.setState({ funcFilter: event.target.value, currentPage: 1 });
  };
  handlesubfuncFilterChange = (event) => {
    this.setState({ subfuncFilter: event.target.value, currentPage: 1 });
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  logging = (e, row) => {
    this.setState({ selectedRow: row });
    this.setState({ show: true });
  };

  // techlog = () => {
  //   const detectedUrl =
  //     techlistlink[this.state.selectedRow.TechnologySolutions];
  //   if (detectedUrl !== undefined) {
  //     window.open(detectedUrl, "_blank");
  //   }
  // };

  techlog = (e, row) => {
    const detectedUrl = row.MoreDetails;
    if (detectedUrl !== "None") {
      window.open(detectedUrl, "_blank");
    }

    console.log(row.MoreDetails);
    console.log(detectedUrl);
    // window.open(detectedUrl, "_blank");
  };

  clearSearch = () => {
    this.setState({
      eylelsFilter: "",
      subfuncFilter: "",
      funcFilter: "",
      serviceFilter: "",
    });
  };

  filterTableData = (
    tableData,
    eylelsFilter,
    serviceFilter,
    funcFilter,
    subfuncFilter
  ) => {
    return tableData.filter((row) => {
      return (
        row.EYLEnterprLegalSer.includes(eylelsFilter) &&
        row.Service.includes(serviceFilter) &&
        row.Functionality.includes(funcFilter) &&
        row.SubFunctionality.includes(subfuncFilter)
      );
    });
  };

  render() {
    const {
      tableData,
      eylelsFilter,
      serviceFilter,
      funcFilter,
      subfuncFilter,
      currentPage,
      postsPerPage,
    } = this.state;
    const filteredData = this.filterTableData(
      tableData,
      eylelsFilter,
      serviceFilter,
      funcFilter,
      subfuncFilter,
      currentPage,
      postsPerPage
    );

    const dropDownData = {
      EYLEnterprLegalSer: [
        ...new Set(filteredData.map((a) => a.EYLEnterprLegalSer)),
      ],
      Service: [...new Set(filteredData.map((a) => a.Service))],
      Functionality: [...new Set(filteredData.map((a) => a.Functionality))],
      SubFunctionality: [
        ...new Set(filteredData.map((a) => a.SubFunctionality)),
      ],
    };

    let uniqueData = filteredData.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.TechnologySolutions === item.TechnologySolutions &&
            t.UnderlyingTechnology === item.UnderlyingTechnology &&
            t.TorS === item.TorS &&
            t.Contact === item.Contact &&
            t.AreaCountry === item.AreaCountry
        )
    );

    // console.log(uniqueData);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = uniqueData.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <>
        <div className="container-fluid">
          <div className="InputSearch">
            <div className="inputsearch">
              <label htmlFor="data1">
                <strong>EY Law Enterprise Legal Services</strong>
              </label>
              <input
                list="data1"
                value={eylelsFilter}
                placeholder="Technology Search..."
                onChange={this.handleeylelsFilterChange}
              />
              <datalist id="data1">
                {dropDownData.EYLEnterprLegalSer.map((itm) => {
                  return (
                    <>
                      <option>{itm}</option>
                    </>
                  );
                })}
              </datalist>
            </div>
            <div className="inputsearch">
              <label htmlFor="data2">
                <strong>Service</strong>
              </label>

              <input
                list="data2"
                value={serviceFilter}
                placeholder="Service Search...."
                onChange={this.handleserviceFilterChange}
              />
              <datalist id="data2">
                {dropDownData.Service.map((itm) => {
                  return (
                    <>
                      <option>{itm}</option>
                    </>
                  );
                })}
              </datalist>
            </div>
            <div className="inputsearch">
              <label htmlFor="data3">
                <strong>Functionality</strong>
              </label>

              <input
                list="data3"
                value={funcFilter}
                placeholder="Functionality Search...."
                onChange={this.handlefuncFilterChange}
              />
              <datalist id="data3">
                {dropDownData.Functionality.map((itm) => {
                  return (
                    <>
                      <option>{itm}</option>
                    </>
                  );
                })}
              </datalist>
            </div>
            <div className="inputsearch">
              <label htmlFor="data4">
                <strong>Sub Functionality</strong>
              </label>

              <input
                list="data4"
                value={subfuncFilter}
                placeholder="Sub Functionality Search...."
                onChange={this.handlesubfuncFilterChange}
              />
              <datalist id="data4">
                {dropDownData.SubFunctionality.map((itm) => {
                  return (
                    <>
                      <option>{itm}</option>
                    </>
                  );
                })}
              </datalist>
            </div>
          </div>
          <div className="pagination">
            <button onClick={this.clearSearch}>Clear Search</button>

            <Pagin
              postsPerPage={postsPerPage}
              totalPosts={uniqueData.length}
              paginate={paginate}
            />
          </div>
          <Table bordered hover className="tablestyle">
            <thead>
              <tr className="tableheader">
                <th>
                  <center>Technology/Solutions</center>
                </th>
                <th>Underlying Technology</th>
                <th>Key Information</th>
                <th>Contact</th>
                <th>Licenses</th>
                <th>Configuration</th>
                <th>More Information</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((row) => (
                <tr className="tablebody" key={row.Id}>
                  <td
                    onClick={(e) => {
                      this.logging(e, row);
                    }}
                  >
                    {row.TechnologySolutions}
                  </td>
                  <td
                    onClick={(e) => {
                      this.logging(e, row);
                    }}
                  >
                    {row.UnderlyingTechnology}
                  </td>
                  <td
                    onClick={(e) => {
                      this.logging(e, row);
                    }}
                  >
                    {row.KeyInformation}
                  </td>
                  <td
                    onClick={(e) => {
                      this.logging(e, row);
                    }}
                    className="contactclm"
                  >
                    {row.Contact}
                  </td>
                  <td
                    onClick={(e) => {
                      this.logging(e, row);
                    }}
                  >
                    {row.Licenses}
                  </td>
                  <td
                    onClick={(e) => {
                      this.logging(e, row);
                    }}
                  >
                    {row.Configuration}
                  </td>
                  <td>
                    {row.MoreDetails !== "None" ? (
                      <Button
                        variant="secondary"
                        onClick={(e) => {
                          this.techlog(e, row);
                        }}
                      >
                        Click Here
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div
            className="modal-dialog modal-xl"
            style={{ display: "block", position: "initial" }}
          >
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              size="xl"
              className="modal-diaaalog"
              style={{
                content: {
                  maxHeight: "calc(100vh - 210px)",
                  overflowY: "auto",
                },
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title className="modal-title">
                  GLINT Technologies & Solutions
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  <>
                    <Row className="modalrowdetails">
                      <Col xs={6}>
                        <strong>EY Law Enterprise Legal Services: </strong>
                        {this.state.selectedRow.EYLEnterprLegalSerT}
                      </Col>
                      <Col xs={6}>
                        <strong>Service: </strong>
                        {this.state.selectedRow.ServiceT}
                      </Col>
                      <Col xs={6}>
                        <strong>Functionality: </strong>
                        {this.state.selectedRow.FunctionalityT}
                      </Col>
                      <Col xs={6}>
                        <strong>Technology/Solutions: </strong>
                        {this.state.selectedRow.SubFunctionalityT}
                      </Col>
                      <Col xs={6}>
                        <strong>T or S: </strong>
                        {this.state.selectedRow.TorS}
                      </Col>
                      <Col xs={6}>
                        <strong> Underlying Technology: </strong>
                        {this.state.selectedRow.UnderlyingTechnology}
                      </Col>
                      <Col xs={6}>
                        <strong>Key Information: </strong>
                        {this.state.selectedRow.KeyInformation}
                      </Col>
                      <Col xs={6}>
                        <strong>Relationship status: </strong>
                        {this.state.selectedRow.Relationshipstatus}
                      </Col>
                      <Col xs={6}>
                        <strong>Contact: </strong>
                        {this.state.selectedRow.Contact}
                      </Col>
                      <Col xs={6}>
                        <strong>Area / Country: </strong>
                        {this.state.selectedRow.AreaCountry}
                      </Col>
                      <Col xs={6}>
                        <strong>Notes: </strong>
                        {this.state.selectedRow.Notes}
                      </Col>
                      <Col xs={6}>
                        <strong>Build: </strong>
                        {this.state.selectedRow.Build}
                      </Col>
                      <Col xs={6}>
                        <strong>Servers: </strong>
                        {this.state.selectedRow.Servers}
                      </Col>
                      <Col xs={6}>
                        <strong>Licenses: </strong>
                        {this.state.selectedRow.Licenses}
                      </Col>
                      <Col xs={6}>
                        <strong>Configuration: </strong>
                        {this.state.selectedRow.Configuration}
                      </Col>
                      <Col xs={6}>
                        <strong>Processing & Storage: </strong>
                        {this.state.selectedRow.ProcessingStorage}
                      </Col>
                    </Row>
                  </>
                }
              </Modal.Body>
              <Modal.Footer>
                {/* {techlistlink[this.state.selectedRow.TechnologySolutions] !==
                undefined ? (
                  <Button
                    // href=""
                    onClick={this.techlog}
                  >
                    More information for Teachnologies & Solutions
                  </Button>
                ) : null} */}
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Pagin
            postsPerPage={postsPerPage}
            totalPosts={uniqueData.length}
            paginate={paginate}
            className="pagination"
          />
        </div>
      </>
    );
  }
}
