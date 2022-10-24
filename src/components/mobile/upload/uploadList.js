import { CloseOutline } from "antd-mobile-icons";
import { useEffect } from "react";
/**
 *
 * @param {*} param0
 * @returns
 */
export const UploadList = ({ files = [], disabled, handlePreview, remove }) => {
  useEffect(() => {
    console.log(files);
  }, [files]);
  const handleClick = (file) => {
    handlePreview && handlePreview(file);
  };
  return (
    <>
      {/* {files?.length > 0 && ( */}
      <div className="upload-list">
        {files?.map((file) => (
          <div key={file.uid} onClick={() => handleClick(file)}>
            <div>
              <span className="upload-list--name">{file.name}</span>
              {!disabled && (
                <CloseOutline className="upload-list--delete-icon" onClick={() => remove && remove(file)} />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* )} */}
    </>
  );
};
