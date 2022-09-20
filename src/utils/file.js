/**
 * use_iframe_download function - 通过 iframe 下载文件
 * @param download_path 需下载文件的链接
 */
export function use_iframe_download(download_path) {
  const $iframe = document.createElement("iframe");
  $iframe.style.height = "0px";
  $iframe.style.width = "0px";
  document.body.appendChild($iframe);
  $iframe.setAttribute("src", download_path);
  setTimeout(() => {
    node_remove($iframe);
  }, 20000);
}

/**
 * use_iframe_download function - 通过 a标签下载文件
 * @param download_path 需下载文件的链接
 */
export function use_a_download(download_path) {
  const $a = document.createElement("a");
  document.body.appendChild($a);
  $a.href = download_path;
  $a.download = "download";
  $a.click();
  setTimeout(() => {
    node_remove($a);
  }, 20000);
}
export function use_blob_download(url, fileName, method = "get") {
  axios({
    url,
    responseType: "blob",
    method,
  }).then((res) => {
    const link = document.createElement("a");
    let blob = new Blob([res.data]);
    link.style.display = "none";
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
/** 删除节点 */
export function node_remove(dom) {
  try {
    if (dom.remove) {
      dom.remove();
    } else if (dom.removeNode) {
      dom.removeNode();
    }
  } catch (e) {
    console.worn(e);
  }
}
