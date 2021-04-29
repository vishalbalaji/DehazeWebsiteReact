import React, { Component } from "react";
import "./DragAndDrop.css";
import upload from "./images/upload.png";
import image1 from "./images/image1.png";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import close from "./images/close.svg";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";

let imageArr = [image1, image2, image3];

class DragAndDrop extends Component {
	state = {
		dragging: false,
		file: null,
		spinner: false,
	};

	componentDidMount() {
		const SampleId = this.props.SampleImageTaken;
		// console.log(SampleId, imageArr);
		if (SampleId !== 0 && SampleId <= 3) {
			this.setState({ spinner: true });

			let image = imageArr[SampleId - 1];
			fetch(image)
				.then(function(rep) {
					return rep.blob();
				})
				.then((data) => {
					this.setState({ spinner: false });
					console.log(data);
					var element = document.getElementById("output");
					if (typeof element != "undefined" && element != null) {
						this.setState({
							file: data,
						});
						this.props.SetFile(data);
					} else {
						console.log("Element doesn't exist");
					}
				});
		}
	}

	dragOver = (e) => {
		e.preventDefault();
	};

	dragEnter = (e) => {
		console.log("dragging");
		e.preventDefault();
		this.setState({
			dragging: true,
		});
	};

	dragLeave = (e) => {
		console.log("out");
		e.preventDefault();
		this.setState({
			dragging: false,
		});
	};

	UploadSampleImage = () => {
		console.log("image");
	};

	fileDrop = (e) => {
		// TODO: handle File Browsing when clicked on Browse
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (!!file.type.match('image/.*')) {
			this.setState({
				file: file,
				dragging: false
			});
			this.props.SetFile(file);
		} else {
			console.log("NOT IMAGE")
		}
	};
	// handle = (e) => {
	//   var ele = document.getElementById("upload");
	//   ele.src = URL.createObjectURL(e[0]);
	//   console.log(ele.src);
	// };

	clicked = () => {
		console.log("iii");
	};

	render() {
		return (
			<div>
				{this.state.spinner ? (
					<div class="d-flex justify-content-center">
						<div class="spinner-border" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				) : (
					<div className="container">
						<div
							className="drop-container"
							onDragOver={this.dragOver}
							onDragEnter={this.dragEnter}
							onDragLeave={this.dragLeave}
							onDrop={this.fileDrop}
						>
							{this.state.file ? (
								<div style={{ position: "relative" }}>
									<img
										id="output"
										src={URL.createObjectURL(this.state.file)}
										draggable="false"
										style={{
											color: "black",
											boxShadow:
												"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
										}}
										width={this.state.file ? "500vw" : null}
									></img>
									<div
										onClick={() => this.setState({ file: null })}
										style={{
											position: "absolute",
											top: "-20px",
											left: "-20px",
											backgroundColor: "#eb5e63",
											boxShadow:
												"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
											width: "3rem",
											height: "3rem",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: "50px",
										}}
									>
										<img src={close} height="20px" width="20px" />
									</div>
								</div>
							) : (
								<div className="drop-message">
									<img
										id="output"
										src={upload}
										draggable="false"
										style={{ color: "black" }}
									// width={this.state.file ? "500px" : null}
									></img>
									<p>Drag & Drop</p>

									<p>Or</p>

									<input
										ref="file"
										type="file"
										id="actual-btn"
										style={{ display: "none" }}
										onChange={this.fileDrop}
									/>
									<label
										style={{ marginTop: "0.4rem" }}
										htmlFor="actual-btn"
										className="button is-black"
									>
										Browse
                  </label>
								</div>
							)}
						</div>
					</div>
				)}

				<div
					className="sampleImage"
					onClick={() => this.props.SampleImageHandler()}
				>
					<div className="image-bg">
						<img
							src={image1}
							width="250px"
							height="250px"
							style={{ padding: "10px" }}
						></img>
					</div>
					<br />
					<p
						style={{
							opacity: 0.85,
							textDecoration: "underline",
						}}
					>
						*Take Images From Dataset*
          </p>
				</div>
			</div>
		);
	}
}
export default DragAndDrop;
