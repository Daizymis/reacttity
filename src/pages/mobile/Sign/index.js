import { Button, Grid, Toast } from "antd-mobile";
import { useEffect, useState, useRef, useCallback } from "react";
import { use_a_download } from "../../../utils/file";
import "@/assets/css/sign.scss";

function Sign() {
  const myCanvas = useRef();
  let blankData;
  let ctx;
  useEffect(() => {
    let beginX, beginY;
    blankData = myCanvas.current.toDataURL();
    myCanvas.current.width = document.documentElement.clientWidth - 40;
    ctx = myCanvas.current.getContext("2d");
    const img = new Image();
    img.src = "../../../assets/img/mobile/grid-back.png";
    img.onload = () => {
      let pattern = myCanvas.current.createPattern(img, "no-repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, myCanvas.current.width, myCanvas.current.height);
    };

    myCanvas.current.addEventListener("touchstart", (e) => {
      beginX = e.touches[0].clientX - myCanvas.offsetLeft;
      beginY = e.touches[0].pageY - myCanvas.offsetTop;
    });
    myCanvas.current.addEventListener("touchmove", (event) => {
      event.preventDefault(); // 阻止在canvas画布上签名的时候页面跟着滚动
      event = event.touches[0];
      const stopX = event.clientX - myCanvas.current.offsetLeft;
      const stopY = event.pageY - myCanvas.current.offsetTop;
      writing(beginX, beginY, stopX, stopY, ctx);
      beginX = stopX; // 这一步很关键，需要不断更新起点，否则画出来的是射线簇
      beginY = stopY;
    });
  }, []);

  const writing = (beginX, beginY, stopX, stopY, ctx) => {
    ctx.beginPath(); // 开启一条新路径
    ctx.globalAlpha = 1; // 设置图片的透明度
    ctx.lineWidth = 3; // 设置线宽
    ctx.strokeStyle = "black"; // 设置路径颜色
    ctx.moveTo(beginX, beginY); // 从(beginX, beginY)这个坐标点开始画图
    ctx.lineTo(stopX, stopY); // 定义从(beginX, beginY)到(stopX, stopY)的线条（该方法不会创建线条）
    ctx.closePath(); // 创建该条路径
    ctx.stroke(); // 实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
  };

  const clearCanvas = () => {
    ctx?.clearRect(0, 0, myCanvas.current.width, myCanvas.current.height);
    ctx?.closePath();
  };
  const saveImgInfo = () => {
    if (isCanvasBlank()) {
      Toast.show({
        icon: "fail",
        content: "请签名再提交",
      });
      return;
    }
    const images = myCanvas.current.toDataURL("image/png");
    console.log(images);
    use_a_download(images);
  };
  const isCanvasBlank = useCallback(() => {
    var blank = document.createElement("canvas");
    blank.width = myCanvas.current?.width || 0;
    blank.height = myCanvas.current?.height || 0;
    return myCanvas.current?.toDataURL() == blank.toDataURL();
  }, [myCanvas]);
  return (
    <div className="sign">
      <div className="canvas-nav">
        <canvas ref={myCanvas} width={500} height={500}></canvas>
      </div>
      <Grid columns={2}>
        <Grid.Item>
          <Button size="large" block onClick={clearCanvas}>
            清除
          </Button>
        </Grid.Item>
        <Grid.Item>
          <Button size="large" color="success" block onClick={saveImgInfo}>
            提交
          </Button>
        </Grid.Item>
      </Grid>
    </div>
  );
}

export default Sign;
