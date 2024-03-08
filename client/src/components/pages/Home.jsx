import React, { useState } from 'react'
import PdfDocument from '../PdfDocument';
import { usePdf } from "../../providers/pdfProvider";
import swal from 'sweetalert';

import styles from '../../styles/Home.module.css';

const Home = () => {

  const { uploadPdf } = usePdf();

  const [file, setFile] = useState(null);



  const onFileChange = async (event) => {
    const { files } = event.target;

    if (!files || !files[0]) {
      return;
    }


    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      await uploadPdf(formData);
      setFile(files[0] || null);
    } catch (error) {
      swal({
        text: error.message,
        icon: "error"
      });
    }
  }


  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <header className={styles.header}>PDF Web Tools</header>
        <div className={styles.uploadContainer}>
          <div className={styles.chooseFile}>
            <label htmlFor="file">Load from file:</label>{' '}
            <input className={styles.input} onChange={onFileChange} type="file" />
          </div>
        </div>
      </div>
      <div className={styles.pdfContainer}>
        <PdfDocument file={file} />
      </div>
    </div>
  )
}

export default Home;