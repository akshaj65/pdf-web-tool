import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useAuth } from '../providers/AuthProvider';
import { usePdf } from '../providers/pdfProvider';

import styles from '../styles/FileList.module.css';

const FileList = () => {

    const { downloadPdf } = usePdf();


    const { user, fetchMe } = useAuth();
    const downloadFile = async (pdfId, fileName) => {
        if (!pdfId) {
            return;
        }
        try {
            await downloadPdf({ pdfId });
        } catch (error) {
            swal({
                text: error.message,
                icon: "error"
            });
        }
    };
    
    // This ensures the page can react based on the updated pdf's in the user object.
    useEffect(() => {
        fetchMe();
    }, [])


    return (
        <div className={styles.fileList}>
            <div className={styles.heading}>User Files</div>
            {user?.pdfs?.map((file, index) => (
                <div key={index} className={styles.fileItem}>
                    <p className={styles.fileName}>{file.fileName}</p>
                    <button className={styles.downloadBtn} onClick={() => downloadFile(file.pdfId, file.fileName)}>
                        Download
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FileList;
