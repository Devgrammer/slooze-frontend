import { API_URLS } from "@/constant/api";
import  { Dispatch, SetStateAction } from "react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { UploadIcon } from "lucide-react";
import { ProductType } from "@/pages/product/AddProduct";
interface ImageUploaderPropType {
    name:string;
    formData:ProductType
  setFormData: Dispatch<SetStateAction<ProductType>>;
}

interface ImageKitResponseType {
  fileId: string;
  name: string;
  size: number;
  versionInfo: {
    id: string;
    name: string;
  };
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  orientation: number;
  thumbnailUrl: string;
  description?: string | null;
}
// UploadExample component demonstrates file uploading using ImageKit's React SDK.
const ImageUploader = ({name,formData, setFormData}:ImageUploaderPropType) => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [uploadingResponse, setUploadingResponse] = useState<Partial<ImageKitResponseType | undefined>>();

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */
  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch(API_URLS.IMAGEKIT_AUTH);
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */
  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];
    if(file){
        setUploadStarted(true)
    }

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      setUploadingResponse(uploadResponse)
      const imgURl =
        name === "productThumbnail"
          ? uploadResponse?.thumbnailUrl
          : [uploadResponse?.url];
     
      setFormData({ ...formData, [name]: imgURl});

      console.log("Upload response:", uploadResponse, name, setFormData);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };





  return (
    <div className="image-uploader relative flex justify-center items-center h-48  rounded-lg border p-4">
      {/* File input element using React ref */}
      <Input
        type="file"
        id="file-input"
        className="h-48 absolute w-full border-none opacity-0"
        ref={fileInputRef}
        onChange={handleUpload}
      />
      {/* Button to trigger the upload process */}
      {!uploadStarted && (
        <div
          onClick={handleUpload}
          className="upload place-items-center space-y-2 text-neutral-500 mx-auto"
        >
          <UploadIcon /> <span className="text-sm ">Drag and drop Here</span>
        </div>
      )}
      <br />
      {/* Display the current upload progress */}
      {uploadStarted && !uploadingResponse && (
        <Progress value={progress} max={100} className="w-[60%]" />
      )}
      {uploadingResponse && (
        <div
          className="bg-cover bg-center w-24 h-24 rounded-xl"
          style={{ backgroundImage: `url(${uploadingResponse.url})` }}
        >
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
