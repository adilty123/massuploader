//Displays video upload form and handles events related to form.
import React, {useState} from "react";
import "./uploadForm.css"
import ActionBar from "../Components/actionBar";
import ReactPlayer from 'react-player';
import {useNavigate} from "react-router-dom";

const UploadForm = (props) =>{
    const [email] = useState(props.email)
    const [loggedIn] = useState(props.loggedIn);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [fileName, setFileName] = useState("");
    const [filePath, setFilePath] = useState(null);
    const [fileContent, setFileContent] = useState("");

    console.log("UPLOAD FORM PROPS:" + email);

    const navigate = useNavigate();
    //Sets file name
    //Sets file path
    //Sets file content 
    const handleVideoUpload = (event) => {
        setFileName(event.target.files[0].name);
        setFilePath(URL.createObjectURL(event.target.files[0]));
        const data = readFileData(event);

        data.then(function(result){
            var arr = result.split(",")
            setFileContent(arr[1])
        });
    }

    //Converts file to binary array and returns a promise.
    const readFileData = (event) =>{
        const file = event.target.files[0];
        return new Promise((resolve, reject) =>{
            const reader = new FileReader();

            reader.onload = (event) =>{
                resolve(event.target.result);
            }

            reader.onerror = (err) => {
                reject(err);
            }
            reader.readAsDataURL(file);
        });
    }

    //Post API call to add clip to Clips SQL table.
    const onButtonClick = () =>{
        const apiUrl = 'https://massuploaderapi.azurewebsites.net/api/Clips';

        const postData = {
            id: 0,
            email: email,
            title: title,
            descriptionText: desc,
            fileName: fileName,
            fileContent: fileContent,
        };

        console.log("POST DATA: " + postData)

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(response => {
          // Handle the response data
          console.log(response);
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
        });
    }

    //Checks if user is already logged in or not using local machine storage.

    return(
        <div id = "content">
            <ActionBar email = {email} loggedIn = {loggedIn}/>
            <div className="form-container">
            <form className = "uploadForm">
                <div className="text-container">
                    <input 
                        type="text"
                        className = "textInput" 
                        placeholder="Title" 
                        value={title} 
                        onChange={ev => setTitle(ev.target.value)}>
                    </input>
                    <br/>
                    <textarea
                        type="text"  
                        placeholder="Description"
                        id = "description"
                        value = {desc} 
                        onChange={ev => setDesc(ev.target.value)}
                    />
                    <br/>
                    <input 
                        type="file" 
                        accept=".mp4" 
                        className="fileInput" 
                        placeholder="Choose File" 
                        value = {fileName}
                        onChange={handleVideoUpload}
                    />
                    <br/>
                </div>
                <div className = "player-container">
                    <ReactPlayer
                        className='react-player'
                        url = {filePath}
                        controls = {true}
                        width='100%'
                        height='100%'
                    />
                </div>
                <input
                    type = "button"
                    className="uploadButton"
                    onClick={onButtonClick}
                    value = {"Upload"}
                />
            </form>
            </div>
        </div>
        
    );
}

export default UploadForm;