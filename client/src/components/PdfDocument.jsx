import { useState } from 'react';
import { pdfjs, Document } from 'react-pdf';
import styles from '../styles/PdfDocument.module.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import PdfPage from './PdfPage';
import { usePdf } from '../providers/pdfProvider';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



const PdfDocument = ({ file }) => {

  const { pdf, editPdf } = usePdf();

  const navigate = useNavigate();

  const [numPages, setNumPages] = useState();
  const [pageNumIndexMap, setPageNumIndexMap] = useState(localStorage.getItem('sorted-pages') || {});
  const [count, setCount] = useState(0); // starting page index is 0



  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }


  /**
   * An array of page numbers, sorted in ascending order and adjusted for 0-indexing. 
   * @returns {Array} 
 */
  const getSortedPageNums = () => {

    //swap key and value positions
    const swappedEntries = Object.keys(pageNumIndexMap).map(key => [pageNumIndexMap[key], key]);

    // sort based on selected page order
    const sortedEntries = swappedEntries.sort((a, b) => a[0] - b[0]);

    //pageNumbers based on sorted keys
    //reduces page numbers by 1 to account for the 0-indexed page numbers in the backend
    const result = sortedEntries.map((e) => { return e[1] - 1; });

    return result;

  }

  const handlePdfEdit = async () => {
    const pageNums = getSortedPageNums();
    if (!pdf) {
      return;
    }
    if (!pageNums || pageNums.length <= 0) {
      swal({
        text: 'Pages Not Selelcted',
        icon: "info"
      });
      return;
    }

    try {
      const pdfId = pdf.id;
      await editPdf({ pdfId, pageNums });
      swal({
        text: "Pdf Edited and Uploaded SuccessFully",
        icon: "success",
        timer: 3000, // Time in milliseconds before the alert closes
        button: false
      }).then((result) => {
        navigate("/user/files");
      })

    } catch (error) {
      swal({
        text: error.message,
        icon: "error"
      });
    }
  }

  const clearSelelctedPages = () => {
    setPageNumIndexMap({});
    setCount(0);
  }


  return (
    <div className={styles.container}>
      {numPages &&
        <div className={styles.documentControl}>
          <div className={styles.documentInfo}>
            <div className={styles.pageInfo}>
              <div className={styles.totalPages}>Total Pages: <span id="totalPages">{numPages}</span></div>
              <div className={styles.selectedPages}>Selected Pages: <span id="selectedPages">{count}</span></div>
            </div>
            <button className={`${styles.clearBtn} ${styles.btn}`} onClick={clearSelelctedPages}>
              Clear All
            </button>
          </div>
          <button className={`${styles.doneBtn} ${styles.btn}`} onClick={handlePdfEdit}>
            Done
          </button>
        </div>
      }
      <div className={styles.containerDocument} >
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} >
          {Array.from(new Array(numPages), (el, index) => (
            <PdfPage
              key={`page_${index + 1}`}
              index={index + 1}
              pageNumIndexMap={pageNumIndexMap}
              setPageNumIndexMap={setPageNumIndexMap}
              count={count}
              setCount={setCount}
              styles={styles}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}

export default PdfDocument;