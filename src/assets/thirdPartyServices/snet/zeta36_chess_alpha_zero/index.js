import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

export default class Zeta36ChessAlphaZero extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getServiceMethods = this.getServiceMethods.bind(this);

    this.state = {
      users_guide:
        "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/zeta36-chess-alpha-zero.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/zeta36-chess-alpha-zero",
      reference: "https://github.com/Zeta36/chess-alpha-zero",

      serviceName: "AlphaZero",
      methodName: "play",

      uid: "",
      move: "",
      cmd: "",

      response: undefined,
    };
    this.parseProps(props);
  }

  canBeInvoked() {
    return (
      (this.state.move.length === 4 || this.state.move.length === 5) &&
      ["a", "b", "c", "d", "e", "f", "g", "h"].includes(this.state.move[0]) &&
      ["1", "2", "3", "4", "5", "6", "7", "8"].includes(this.state.move[1]) &&
      ["a", "b", "c", "d", "e", "f", "g", "h"].includes(this.state.move[2]) &&
      ["1", "2", "3", "4", "5", "6", "7", "8"].includes(this.state.move[3])
    );
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  submitAction() {
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      uid: this.state.uid,
      move: this.state.move,
      cmd: this.state.cmd,
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            UID:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="uid"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: Your Name"}
              value={this.state.uid}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Move:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="move"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: c2c4"}
              value={this.state.move}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Command:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="cmd"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: empty or restart (the game)"}
              value={this.state.cmd}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            About:{" "}
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.users_guide} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Guide
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.code_repo} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Code
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.reference} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Reference
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.submitAction}
              disabled={!this.canBeInvoked()}
            >
              Invoke
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    let status = "\n";
    let uid = "\n";
    let board = "\n";

    if (typeof this.state.response === "object") {
      status = this.state.response.status + "\n";
      uid = this.state.response.uid + "\n";
      board = "\n" + this.state.response.board;
    } else {
      status = this.state.response + "\n";
    }
    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: </p>
        <pre>
          Status: {status}
          UID : {uid}
          {board}
        </pre>
      </div>
    );
  }

  render() {
    if (this.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
