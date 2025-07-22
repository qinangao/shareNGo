import { useState, useRef, useEffect } from "react";

function ImageUploader({ onFileSelect, value }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragAccept, setIsDragAccept] = useState(false);
  const fileInputRef = useRef(null);

  // Sync with form value
  useEffect(() => {
    if (!value) {
      // Form was reset or value was cleared externally
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
      setUploadedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [value, imagePreview]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);

    // Check if dragged items contain files
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const item = e.dataTransfer.items[0];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        setIsDragAccept(true);
      }
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragAccept(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragAccept(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const file = imageFiles[0];

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setUploadedFiles([file]);
      onFileSelect?.(file); // Pass file to parent
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        // console.log("File uploaded via file input:", file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setUploadedFiles([file]);
        onFileSelect?.(file); // Pass file to parent
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setUploadedFiles([]);
    onFileSelect?.(null); // Clear file in parent
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`w-full p-6 rounded-2xl transition-all duration-200 cursor-pointer border-2 border-dashed ${
        isDragAccept
          ? "border-blue-500 bg-blue-50"
          : isDragActive
          ? "border-gray-400 bg-gray-50"
          : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center gap-2 text-center">
        {isDragAccept ? (
          <div className="text-sm font-medium text-blue-600">
            Drop your image here!
          </div>
        ) : (
          <div className="flex items-center flex-col gap-1.5">
            <div className="text-sm font-medium text-gray-600">
              Upload Image
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Drag & drop or click to browse files
            </p>
          </div>
        )}

        <div className="text-xs text-gray-400 font-medium mt-2">
          {uploadedFiles.length} file{uploadedFiles.length !== 1 && "s"}{" "}
          uploaded
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg object-cover border border-gray-300 shadow"
            />
            <button
              onClick={handleRemove}
              className="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
