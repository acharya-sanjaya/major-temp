import {useState, useEffect} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import HTMLFlipBook from "react-pageflip";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const RenderPdf = ({coverImageUrl, pdfUrl}: {coverImageUrl: string; pdfUrl: string}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pages, setPages] = useState<JSX.Element[]>([]);

  const onDocumentLoadSuccess = ({numPages}: {numPages: number}): void => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const pageElements: JSX.Element[] = [];
    for (let i = 1; i <= numPages; i++) {
      pageElements.push(
        <div
          key={`page_${i}`}
          className="border-2 border-primary/20 flex justify-center items-center"
        >
          <Page pageNumber={i} width={394} />
        </div>
      );
    }
    setPages(pageElements);
  }, [numPages]);

  return (
    <div className="select-none flex justify-center items-center border-2 border-secondary/50">
      <Document file={"http://localhost:4000/" + pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <HTMLFlipBook
          autoSize={true}
          className=""
          clickEventForward
          showCover={true}
          mobileScrollSupport={false}
          startPage={0}
          flippingTime={1000}
          drawShadow={true}
          disableFlipByClick={false}
          height={560}
          maxHeight={560}
          minHeight={560}
          width={400}
          maxWidth={400}
          minWidth={400}
          size="stretch"
          maxShadowOpacity={0.5}
          startZIndex={100}
          showPageCorners={false}
          style={{}}
          swipeDistance={100}
          useMouseEvents
          usePortrait
        >
          <div className="size-full">
            <img src={"http://localhost:4000/" + coverImageUrl} className="size-full" />
          </div>
          {pages}
          <div className="flex justify-center items-center bg-gray-300 h-full w-full">
            <h1 className="text-2xl">Back Cover</h1>
          </div>
        </HTMLFlipBook>
      </Document>
    </div>
  );
};

export default RenderPdf;
