import React from "react";
import "./sampleImage.css";
import image1 from "./images/image1.png";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";

class SampleImage extends React.Component {
  render() {
    return (
      <div>
        <div className="bg">
          <div
            className="close"
						onClick={() => {
							this.props.SampleImagePicked(0);
							this.props.SampleImageHandler();
						}}
          >
            X
          </div>
          <div className="columns">
            <div
              className=" column imageCard"
              onClick={() => {
                this.props.SampleImagePicked(1);
                this.props.SampleImageHandler();
              }}
            >
              <img src={image1} className="image" />
            </div>
            <div
              className=" column imageCard"
              onClick={() => {
                this.props.SampleImagePicked(2);
                this.props.SampleImageHandler();
              }}
            >
              <img src={image2} className="image" />
            </div>
            <div
              className=" column imageCard"
              onClick={() => {
                this.props.SampleImagePicked(3);
                this.props.SampleImageHandler();
              }}
            >
              <img src={image3} className="image" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SampleImage;
