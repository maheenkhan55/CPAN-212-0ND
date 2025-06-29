import { useState } from "react";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");
    const [singleFile, setSingleFile] = useState(null);                     // state to hold single file selected by user
    const [displaySingleFile, setDisplaySingleFile] = useState(null);       // state to hold url of the fetched single img to display
    const [multiFiles, setMultiFiles] = useState([]);
    const [randomImages, setRandomImages] = useState([]);                   // State to store array of image URLs fetched from backend to display multiple images
    const [dogImage, setDogImage] = useState("");                           // store url of random dog img from api


    const handleSingleUpload = async (e) => {
        e.preventDefault();                                     // prevents form from reloading the page on submit 
        const formData = new FormData();                        // create FormData object to send files
        formData.append("file", singleFile);                    // append the single selected file
   
    try {
      const res = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || "Single file uploaded successfully");
    } catch (err) {
      console.log(err);
      setMessage("Single file upload failed");
      }
    };
   
    // upload multiple files
    const handleMultipleUpload = async () => {
        const formData = new FormData();
        Array.from(multiFiles).forEach(files => {
            formData.append("files", files);
        });

        try {
            const response = await fetch(`http://localhost:8000/save/multiple`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setMessage(data.message || "Multiple uplaod successful");
        } catch (error) {
            console.log(error);
            setMessage("Multiple upload failed");
        }
    };

    const fetchSingleFile = async () => {
    try {
      const res = await fetch("http://localhost:8000/fetch/single");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDisplaySingleFile(url);
    } catch (err) {
      console.log(err);
      setMessage("Fetch single file failed");
      }
    };

    // fetch multiple random files from server 
    const fetchMultipleFiles = async () => {
        try {
            const response = await fetch(`http://localhost:8000/fetch/multiple`);
            const data = await response.json();
            setRandomImages(data);  
        } catch (error) {
            console.log(error);
            setMessage("Fetch multiple files failed");
        }
    };

    const getDogImage = async () => {
        try {
            const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
            const data = await response.json();
            setDogImage(data.message);
            } catch (error) {
                console.log(error);
            }
    }

    // Upload the fetched dog image to your backend
    const uploadDogImage = async () => {
        try {
            // fetch dog image as blob 
            const response = await fetch(dogImage);
            const blob = await response.blob();
            // convert blob to a file object to send in FormData
            const file = new File([blob], "dog.jpg", {type: blob.type });

            const formData = new FormData();
            formData.append("files", file);

            // uplaod dog image to backend 
            const uploadResponse = await fetch(`http://localhost:8000/save/multiple`, {
                method: "POST",
                body: formData,
            });

            const data = await uploadResponse.json();
            setMessage(data.message || "Dog image uploaded successfully");
        } catch (error) {
            console.log(error);
            setMessage("Uplaod failed");
        }
    };

    return (
   <div>
      <h2>📤 Upload a Single File</h2>
      <form onSubmit={handleSingleUpload}>
        <input
          type="file"
          onChange={(e) => setSingleFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload Single File</button>
      </form>
      <button onClick={fetchSingleFile}>🎲 Fetch Random Uploaded File</button>
      {displaySingleFile && (
        <div>
          <img className="uploaded" src={displaySingleFile} alt="Single" />
        </div>
      )}

      <hr />

      <h2>📤 Upload Multiple Files</h2>
      <input
        type="file"
        multiple
        onChange={(e) => setMultiFiles(e.target.files)}
      />
      <button onClick={handleMultipleUpload}>Upload Selected Files</button>

      <h2>🎲 View Random Uploaded Files</h2>
      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      <div className="flex-wrap">
        {randomImages.map((src, i) => (
          <img key={i} className="uploaded" src={src} alt={`Random ${i}`} />
        ))}
      </div>

      <hr />

      <h2>🐶 Get a Random Dog Image</h2>
      <button onClick={getDogImage}>Fetch Dog Image</button>
      {dogImage && (
        <div>
          <img className="uploaded" src={dogImage} alt="Dog" />
          <button onClick={uploadDogImage}>Upload Dog Image</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;