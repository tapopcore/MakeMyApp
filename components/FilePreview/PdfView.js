import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "./PdfViewer.css";
import { isMobile } from "react-device-detect";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(isMobile ? 1 : 1.5);
  const [containerWidth, setContainerWidth] = useState(null);

  // Handle document loading
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Update width on window resize
  useEffect(() => {
    const updateDimensions = () => {
      // For large screens, use the full width of the viewport
      const width = window.innerWidth;
      setContainerWidth(width);
      
      // Adjust scale based on screen width
      if (width < 640) {
        setScale(0.8); // Mobile phones
      } else if (width < 1024) {
        setScale(1.0); // Tablets
      } else if (width < 1280) {
        setScale(1.2); // Small desktops
      } else {
        setScale(1.5); // Large desktops
      }
    };

    // Initial call
    updateDimensions();
    
    // Add event listener
    window.addEventListener("resize", updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="pdf-viewer-wrapper w-full">
      {pdfUrl !== "" && (
        <>
          {/* Sticky header with controls */}
          {/* PDF content container - full width */}
          <div className="pdf-content w-full flex justify-center mt-4">
            <Document 
              file={pdfUrl} 
              onLoadSuccess={onDocumentLoadSuccess}
              className="w-full"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="mb-6 flex justify-center w-full">
                  <Page
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    scale={scale}
                    width={isMobile ? undefined : containerWidth * 0.9} // Use 90% of container width on large screens
                    className="shadow-xl"
                  />
                </div>
              ))}
            </Document>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfViewer;