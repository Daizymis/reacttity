import { IndexBar } from "antd-mobile";
import Upload from "./upload";
import { useCallback, useEffect, useRef, useState } from "react";
import { UploadList } from "./uploadList";
import "./upload.scss";
const httpRequest = {
  type: Function,
  default: function (e) {
    if ("undefined" != typeof XMLHttpRequest) {
      var t = new XMLHttpRequest(),
        i = e.action;
      t.upload &&
        (t.upload.onprogress = function (t) {
          t.total > 0 && (t.percent = (t.loaded / t.total) * 100),
            e.onProgress(t);
        });
      var n = new FormData();
      e.data &&
        Object.keys(e.data).forEach(function (t) {
          n.append(t, e.data[t]);
        }),
        n.append(e.filename, e.file, e.file.name),
        (t.onerror = function (t) {
          e.onError(t);
        }),
        (t.onload = function () {
          if (t.status < 200 || t.status >= 300)
            return e.onError(
              (function (e, t, i) {
                var n = void 0;
                n = i.response
                  ? "" + (i.response.error || i.response)
                  : i.responseText
                  ? "" + i.responseText
                  : "fail to post " + e + " " + i.status;
                var r = new Error(n);
                return (
                  (r.status = i.status), (r.method = "post"), (r.url = e), r
                );
              })(i, 0, t)
            );
          e.onSuccess(
            (function (e) {
              var t = e.responseText || e.response;
              if (!t) return t;
              try {
                return JSON.parse(t);
              } catch (e) {
                return t;
              }
            })(t)
          );
        }),
        t.open("post", i, !0),
        e.withCredentials && "withCredentials" in t && (t.withCredentials = !0);
      var r = e.headers || {};
      for (var s in r)
        r.hasOwnProperty(s) && null !== r[s] && t.setRequestHeader(s, r[s]);
      return t.send(n), t;
    }
  },
};
const Index = (props) => {
  const {
    onProgress,
    onSuccess,
    onChange,
    onError,
    action,
    name,
    multiple,
    children,
    handlePreview,
  } = props;

  const [uploadFiles, setUploadFiles] = useState([]);
  let tempIndex = 1;
  useEffect(() => {
    console.log(uploadFiles);
  }, [uploadFiles]);
  const handleStart = (rawFile) => {
    rawFile.uid = Date.now() + tempIndex++;
    let file = {
      status: "ready",
      name: rawFile.name,
      size: rawFile.size,
      percentage: 0,
      uid: rawFile.uid,
      raw: rawFile,
    };
    // uploadFiles.push(file);
    setUploadFiles((prev) => [...prev, file]);
    onChange && onChange(file, uploadFiles);
    console.log(uploadFiles);
  };
  const handleProgress = (ev, rawFile) => {
    const file = getFile(rawFile);
    onProgress && onProgress(ev, file, uploadFiles);
    file.status = "uploading";
    file.percentage = ev.percent || 0;
  };
  const handleSuccess = (res, rawFile) => {
    const file = getFile(rawFile);

    if (file) {
      file.status = "success";
      file.response = res;

      onSuccess && onSuccess(res, file, uploadFiles);
      onChange && onChange(file, uploadFiles);
    }
  };
  const handleError = (err, rawFile) => {
    const file = getFile(rawFile);
    const fileList = uploadFiles;
    file.status = "fail";
    fileList.splice(fileList.indexOf(file), 1);
    onError && onError(err, file, uploadFiles);
    onChange && onChange(file, uploadFiles);
  };
  const getFile = (rawFile) => {
    let fileList = uploadFiles;
    let target;
    fileList.every((item) => {
      target = rawFile.uid === item.uid ? item : null;
      return !target;
    });
    return target;
  };
  const handleRemove = (item) => {};
  const uploadList = useCallback(() => {
    return (
      <UploadList
        files={uploadFiles}
        handlePreview={handlePreview}
        remove={handleRemove}
      ></UploadList>
    );
  }, [uploadFiles]);
  return (
    <>
      <Upload
        {...props}
        handleProgress={handleProgress}
        handleError={handleError}
        handleSuccess={handleSuccess}
        handleStart={handleStart}
        action={action}
        name={name}
        multiple={multiple}
      >
        {children}
      </Upload>
      {uploadList()}
    </>
  );
};
export default Index;
