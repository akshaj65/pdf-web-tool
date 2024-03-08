import React, { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { Page } from 'react-pdf';

const resizeObserverOptions = {};

const maxWidth = 800;

const PdfPage = ({ setPageNumIndexMap, pageNumIndexMap, setCount, count, index, styles }) => {

    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();

    const onResize = useCallback((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);
    const handleClick = () => {
        // checking the existence of a page number in pageNumIndexMap.
        if (pageNumIndexMap && pageNumIndexMap.hasOwnProperty(index)) {
            // Store the value associated with the index and delete key-value pair
            console.log(' map before operation ', pageNumIndexMap);
            console.log('count Before operation', count);
            console.log('deleting');
            const deletableValue = pageNumIndexMap[index];
            delete pageNumIndexMap[index];
            console.log('deleted');
            updateValuesAfterKeyRemoval(pageNumIndexMap, deletableValue);;
            console.log('current map ', pageNumIndexMap);
            //update current count of page 
            setCount(count - 1);
            console.log('count After operation', count);
        } else {
            console.log(' map before operation ', pageNumIndexMap);
            console.log('count Before operation', count);
            console.log('creating');
            //add a new key value pair to the object 
            setPageNumIndexMap({ ...pageNumIndexMap, [index]: count + 1 });
            console.log('operation ', { ...pageNumIndexMap, [index]: count + 1 });
            console.log('current map ', pageNumIndexMap);
            setCount(count + 1);
            console.log('count After operation', count);
        }

        console.log(pageNumIndexMap);

    }

    const updateValuesAfterKeyRemoval = (obj, startValue) => {
        // If the count is equal to the startValue, startValue is the last count
        if (count === startValue) {
            setPageNumIndexMap(obj);
            return;
        }
        Object.keys(obj).forEach(key => {
            // If the value is greater than the startValue, decrement it
            if (obj[key] > startValue) {
                obj[key]--;
            }
        })

        setPageNumIndexMap(obj);
    };
    return (
        <div className={styles.testing} onClick={handleClick} ref={setContainerRef}>
            {pageNumIndexMap[index] &&
                <p className={styles.pageNum}>{pageNumIndexMap[index]}</p>
            }
            <Page
                key={`page_${index}`}
                pageNumber={index}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                onClick={() => console.log("hi")}
            />
        </div>
    )
}

export default PdfPage