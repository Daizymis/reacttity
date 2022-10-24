import { useRef } from "react";

export function httpRequest(option) {
  if (typeof XMLHttpRequest === "undefined") {
    return;
  }
  var xhr = new XMLHttpRequest();
  var action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }

  var formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(function (key) {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file, option.file.name);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open("post", action, true);

  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {};

  for (var item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
const upload = ({
  children,
  multiple = true,
  accept,
  name,
  action,
  data = null,
  withCredentials = true,
  handleProgress,
  handleError,
  handleSuccess,
  handleStart,
}) => {
  const reqs = useRef([]);
  const input = useRef();

  const onChange = (ev) => {
    const files = ev.target.files;
    if (!files) return;
    console.log("target-------");
    console.log(ev.target.files);
    uploadFiles(files);
  };
  const handleClick =() =>{
    input.current.click();
  }
  /**
   * 判断文件长度限制
   * @param {*} files
   */
  const uploadFiles = (files) => {
    let postFiles = Array.prototype.slice.call(files);
    postFiles.forEach((rawFile) => {
      handleStart(rawFile);
      console.log("start-------");
      console.log(rawFile);
      // rawFile = new File([rawFile], rawFile.name, {
      //   type: rawFile.type,
      // });
      console.log("raw-------");
      console.log(rawFile);
      // post(rawFile);
    });
  };
  const post = (rawFile) => {
    const { uid } = rawFile;
    const options = {
      headers: {},
      withCredentials: withCredentials,
      file: rawFile,
      data: data,
      filename: name,
      action: action,
      onProgress: (e) => {
        rawFile.status = "uploading";
        handleProgress(e, rawFile);
      },
      onSuccess: (res) => {
        rawFile.status = "success";
        handleSuccess(res, rawFile);
        delete reqs.current[uid];
      },
      onError: (err) => {
        rawFile.status = "error";
        handleError(err, rawFile);
        delete reqs.current[uid];
      },
    };
    const req = httpRequest(options);
    reqs.current[uid] = req;
    if (req && req.then) {
      req.then(options.onSuccess, options.onError);
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
      <input
      ref={input}
        style={{ display: 'none' }}
        type="file"
        onChange={onChange}
        multiple={multiple}
        accept={accept}
      />
    </div>
  );
};
export default upload;
