import React, { Dispatch, SetStateAction } from 'react';

const SingleFileUploader = ({
  file,
  setFile,
}: {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="file"
        className="block text-sm font-medium text-gray-700"
      >
        Upload a file:
      </label>
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
      />
      {file && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700">File Details:</h2>
          <ul className="text-sm text-gray-600 mt-2">
            <li><strong>Name:</strong> {file.name}</li>
            <li><strong>Type:</strong> {file.type}</li>
            <li><strong>Size:</strong> {file.size} bytes</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleFileUploader;