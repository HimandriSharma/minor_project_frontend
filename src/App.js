import React, { Fragment, useState } from "react";
import { Camera } from "./camera";
import {FaCameraRetro,FaWindowClose} from 'react-icons/fa'
import { Root, Preview, Footer, GlobalStyle } from "./styles.js";
import UploadComponent from "./Upload";
import "./styles.css";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();
  const [state, setState] = useState({
    upload: {
      pictures: [],
      maxFileSize: 5242880,
      imgExtension: [".jpg", ".png"],
      defaultImages: [
      ]
    }
  });
  function handleChange(files) {
    const { pictures } = state;
    console.warn({ pictures, files });
  };
  return (
    <div>
      <center><h1>Text Recognizer and Translator</h1></center>
      <UploadComponent
        {...state.upload}
        handleChange={handleChange}
      />
      <Fragment>
        <Root>
          {isCameraOpen && (
            <Camera
              onCapture={blob => setCardImage(blob)}
              onClear={() => setCardImage(undefined)}
            />
          )}

          {cardImage && (
            <div>
              <h2>Preview</h2>
              <Preview src={cardImage && URL.createObjectURL(cardImage)} />
            </div>
          )}

          <Footer>
            <button onClick={() => setIsCameraOpen(true)}><FaCameraRetro size="40px"/></button>
            <button
              onClick={() => {
                setIsCameraOpen(false);
                setCardImage(undefined);
              }}
            >
             <FaWindowClose size="40px"/>
            </button>
          </Footer>
        </Root>
        <GlobalStyle />
      </Fragment>
    </div>
  );
}

export default App
