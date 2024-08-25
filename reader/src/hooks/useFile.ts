import {useState, useMemo} from "react";
import {pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const useFile = (filePath: string) => {
  const filePath1 = "https://pdfobject.com/pdf/sample.pdf";
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const memoizedFile = useMemo(() => {
    if (file) {
      return file;
    }

    const fetchFile = async () => {
      try {
        const response = await fetch(filePath1);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const blob = await response.blob();
        if (blob.type !== "application/pdf") {
          throw new Error(`Unexpected MIME type: ${blob.type}`);
        }
        const file = new File([blob], "sample.pdf", {
          type: blob.type,
        });
        setFile(file);
      } catch (error: any) {
        console.error("Error fetching the file:", error);
        setError(error?.message);
      }
    };

    fetchFile();

    return null;
  }, [filePath, file]);

  return {
    file: memoizedFile,
    error,
  };
};

export default useFile;
