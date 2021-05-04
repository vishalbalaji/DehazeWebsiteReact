import React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import DragAndDrop from "./DragAndDrop";
import SampleImage from "./SampleImage";
import OutputSection from "./OutputSection";
import close from "./images/close.svg";
import "./bootstrap.css";
import "./index.css";
// import "../node_modules/bootstrap/js/dist/popper.js";
// import "../node_modules/jquery/dist/jquery.js";
import { Dropdown } from "react-bootstrap";

// import "../node_modules/bootstrap/dist/js/bootstrap.js";

class FinalModel extends React.Component {
  state = {
    SampleImageViewer: false,
    SampleImageTaken: 0,
    file: null,
    in_img: null,
    out_img: null,
    processed: false,
    intensity: 5,
    spinner: false,
  };

  SetFile = (file) => {
    // console.log(file);
    this.setState({
      file: file,
      in_img: URL.createObjectURL(file),
    });
    // this.state.file = file;
  };

  dehazeImage = async () => {
    this.setState({
      processed: false,
      spinner: true,
    });
    let data = new FormData();
    console.log(this.state.intensity);
    data.append("image", this.state.file);
    data.append("intensity", this.state.intensity);
    const response = await fetch("https://dehaze-api.herokuapp.com/dehaze", {
      method: "POST",
      body: data,
    });
    const json = await response.json();
    this.setState({
      out_img: json.out_img,
      processed: true,
      spinner: false,
    });
    console.log(this.state.out_img);
  };

  setIntensity = (e) => {
    this.setState({ intensity: e });
  };

  SampleImageHandler = () => {
    this.setState({
      SampleImageViewer: !this.state.SampleImageViewer,
    });
  };

  SampleImagePicked = (id) => {
    console.log(id);
		if (id === 0) return;
    this.setState({ SampleImageTaken: id });
  };
  //   <Route path="/initial" component={initialModel} />
  render() {
    return (
      <Router>
        <div>
          <div style={styles.logo}>
            <div style={styles.flex} onClick={() => window.location.reload()}>
              <div style={styles.logoTitle}>UNET DEHAZING</div>
              <div style={styles.logoSubtitle}>Group 1 Major Project</div>
            </div>

            <div>
              <div>
                {this.state.file ? (
                  <div style={styles.inline}>
                    <button
                      class="button is-info btn"
                      // style={{ marginRight: "60px" }}
                      onClick={this.dehazeImage}
                    >
                      Process
                    </button>
                    <div>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="(5) Int"
                        value={this.state.intensity}
                        onChange={(e) => {
                          if (e.target.value > 10) e.target.value = 10;
                          if (e.target.value < 1) e.target.value = 1;
                          this.setState({
                            intensity: e.target.value,
                            //ImageUploaded: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <button class="button is-info btn" disabled>
                    Process
                  </button>
                )}
              </div>
            </div>
          </div>
          {this.state.spinner ? (
            <div>
              <div class="d-flex justify-content-center">
                <div
                  class="spinner-border"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {this.state.processed ? (
                <OutputSection
                  in_img={this.state.in_img}
                  out_img={this.state.out_img}
                  status="Success"
                ></OutputSection>
              ) : (
                <div>
                  {this.state.SampleImageViewer ? (
                    <SampleImage
                      SampleImagePicked={this.SampleImagePicked}
                      SampleImageHandler={this.SampleImageHandler}
                    ></SampleImage>
                  ) : (
                    <div>
                      <DragAndDrop
                        SampleImageHandler={this.SampleImageHandler}
                        SampleImageTaken={this.state.SampleImageTaken}
                        SetFile={this.SetFile}
                      ></DragAndDrop>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Router>
    );
  }
}

const styles = {
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    margin: "10px",
    marginLeft: "20px",
    cursor: "pointer",
  },
  logoTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  logoSubtitle: {
    fontSize: "0.8rem",
    fontWeight: "600",
    marginTop: "5px",
    opacity: "0.7",
  },
  link: {
    fontSize: "10px",
    fontWeight: "bold",
    textDecoration: "Underline",
  },
  close: {
    marginTop: "30px",
    marginRight: "30px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "40px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  inline: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
};

export default FinalModel;
