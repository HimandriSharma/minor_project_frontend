/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Fragment, useState } from "react";
import { Camera } from "./camera";
import {FaCameraRetro,FaWindowClose,FaConnectdevelop} from 'react-icons/fa'
import { Root, Preview, Footer, GlobalStyle } from "./styles.js";
import UploadComponent from "./Upload";
import "./styles.css";
import styles from "./App.css";
import Modal from "./components/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
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
    <main>
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
            <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
              <FaConnectdevelop size="40px"/>
            </button>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
          </Footer>
        </Root>
        <GlobalStyle />
      </Fragment>
      
    </main>
  );
}

export default App
