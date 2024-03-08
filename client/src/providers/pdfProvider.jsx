import React, { useCallback, useState } from 'react'
import { useContext, createContext } from 'react';

const PdfContext = createContext();
const API_URL = process.env.REACT_APP_SERVER_URL;

const PdfProvider = ({ children }) => {

    const [pdf, setPdf] = useState(null);

    const uploadPdf = useCallback(async args => {
        try {
            const res = await fetch(`${API_URL}/api/v1/pdf/upload`, {
                method: 'POST',
                credentials: 'include',
                body: args
            });

            const { success, message, pdfDoc } = await res.json();
            if (!success) throw new Error(message);
            setPdf(pdfDoc);
        } catch (e) {
            throw new Error(e.message);
        }
    }, []);

    const downloadPdf = useCallback(async args => {
        try {
            const res = await fetch(`${API_URL}/api/v1/pdf/${args.pdfId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!res.ok) {
                const { success, message } = await res?.json();
                if (!success) throw new Error(message);
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.target = '_blank';
            link.href = url;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (e) {
            console.log(e);
            throw new Error(e.message);
        }
    }, []);

    const editPdf = useCallback(async args => {
        try {
            const res = await fetch(`${API_URL}/api/v1/pdf/edit/${args.pdfId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pageNums: args.pageNums
                }),
            });

            const { success, message } = await res.json();
            if (!success) throw new Error(message);
        } catch (e) {
            console.log(e);
            throw new Error(e.message);
        }
    }, []);

    return (
        <PdfContext.Provider
            value={{
                pdf,
                downloadPdf,
                uploadPdf,
                editPdf
            }}>
            {children}
        </PdfContext.Provider>
    )
}

export default PdfProvider;

export const usePdf = () => {
    return useContext(PdfContext);
}