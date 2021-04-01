import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

class initialModel extends React.Component {
  state = {
    ImageUploaded: false,
    file: null,
    spinner: false,
  };

  fileDrop = (e) => {
    console.log(e);
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      const file = e.target.files[0];
      this.setState({
        file: file,
      });
    }
  };

  ImageUploadhandler = () => {
    console.log("Hello")
    this.setState({
      ImageUploaded: true,
      spinner: true,
    });
    var image = this.state.file;
    console.log(this.state.file)
    let data = new FormData();
    data.append("image", image);
    fetch("http://127.0.0.1:5000/dehaze", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ spinner: false });
        let imgOP = document.getElementById("output");
        let imgIP = document.getElementById("input");

        imgOP.src = data.out_img;
        imgIP.src = URL.createObjectURL(image);
      });
  };

  render() {
    return (
      <div>
        <div style={styles.logo}>
          <div style={styles.flex}>
            <div style={styles.logoTitle}>UNET DEHAZING</div>
            <div style={styles.logoSubtitle}>Group 1 Major Project</div>
          </div>

          <div>
            {this.state.ImageUploaded ? null : (
              <button
                class="button is-info btn"
                onClick={this.ImageUploadhandler}
              >
                Process
              </button>
            )}
          </div>
        </div>
        {this.state.ImageUploaded ? (
          <div>
            {this.state.spinner ? (
              <div class="d-flex justify-content-center">
                <div
                  class="spinner-border"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}

            <div className="OutputSection">
              <div className="cardd">
                <div style={styles.images}>
                  <img id="input" width="450px" />
                </div>
                <p style={styles.text}>Input Image</p>
              </div>
              <div className="cardd">
                <div style={styles.images}>
                  <img id="output" width="450px" />
                </div>
                <p style={styles.text}>Output Image</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <input
              ref="file"
              type="file"
              id="actual-btn"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateX(-50%)",
              }}
              onChange={this.fileDrop}
            />
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  images: {
    padding: "10px",
    backgroundColor: "#E2ECED",
  },
  text: {
    padding: "25px",
    textDecoration: "Underline",
  },
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
};

export default initialModel;
