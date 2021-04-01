import React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import DragAndDrop from "./DragAndDrop";
import SampleImage from "./SampleImage";
import OutputSection from "./OutputSection";
import close from "./images/close.svg";
// import "../node_modules/bootstrap/js/dist/popper.js";
// import "../node_modules/jquery/dist/jquery.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Dropdown } from "react-bootstrap";

// import "../node_modules/bootstrap/dist/js/bootstrap.js";

class FinalModel extends React.Component {
  state = {
    ImageUploaded: false,
    SampleImageViewer: false,
    SampleImageTaken: 0,
    file: null,
    intensity: 5,
  };

  SetFile = (file) => {
    // console.log(file);
    this.setState({
      file: file,
    });
    // this.state.file = file;
  };

  ImageUploadhandler = () => {
    this.setState({
      ImageUploaded: true,
    });
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
              <Link
                style={styles.link}
                to={`/oldModel`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to old Version
              </Link>
            </div>

            <div>
              <div>
                {this.state.file ? (
                  <div style={styles.inline}>
                    <button
                      class="button is-info btn"
                      // style={{ marginRight: "60px" }}
                      onClick={this.ImageUploadhandler}
                    >
                      Process
                    </button>
                    <div>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="(5) Int"
                        onChange={(e) => {
                          if (e.target.value > 10) e.target.value = 10;
                          if (e.target.value < 1) e.target.value = 1;
                          this.setState({
                            intensity: e.target.value,
                            ImageUploaded: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    class="button is-info btn"
                    // onClick={this.ImageUploadhandler}
                    disabled
                  >
                    Process
                  </button>
                )}
              </div>
            </div>
          </div>
          {this.state.ImageUploaded ? (
            <OutputSection
              file={this.state.file}
              intensity={this.state.intensity}
            ></OutputSection>
          ) : (
            <div>
              {this.state.SampleImageViewer ? (
                <SampleImage
                  SampleImagePicked={this.SampleImagePicked}
                  SampleImageHandler={this.SampleImageHandler}
                ></SampleImage>
              ) : (
                <DragAndDrop
                  SampleImageHandler={this.SampleImageHandler}
                  SampleImageTaken={this.state.SampleImageTaken}
                  SetFile={this.SetFile}
                ></DragAndDrop>
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
