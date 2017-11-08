


import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent'; 
import Game from './Sudoku';



export default class ImageInput extends React.Component {


	constructor(props) {
	    super(props);
	    this.state = {
	     	 uploadedFile: ''
	    };

	}

	onImageDrop(files) {
		this.setState({uploadedFile: files[0]});
		this.handleImageUpload(files[0]);
	}

	handleImageUpload(file) {
		//var formData = new FormData();
		//formData.append("image", file);
	    var upload = request.post('/')
	    					.field('file', file)
	    					//.set('Content-Type', 'application/json')
	    					//.send(formData)

		upload.end((err, response) => {
		    if (err) {
		      console.error(err);
		    }
		    else {
		    	this.props.updateArray(JSON.parse(response.text));

		        /*if (response['secure_url'] !== '') {
			        this.setState({
		   	            uploadedFileUrl: response['secure_url']
			        });
			    }*/
			   }
		});
	}

	render() {
		return (
			<div id = 'imndrop'>
			{this.state.uploadedFile != '' ? 
				<div id = "image">
    				<div><img src={this.state.uploadedFile.preview} /></div>
    			</div> : null}
				<div id = "drop">
					<Dropzone
						multiple = {false}
						accept = "image/jpg, image/png, image/jpeg"
						className = "dropzone"
						onDrop={this.onImageDrop.bind(this)}>
					</Dropzone>
				</div>
			</div>
		
		);
	}
}