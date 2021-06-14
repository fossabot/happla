// @ts-nocheck
import { Board, InterpolationMode, PanEventFunction, ZoomEventFunction } from '@d2phap/happla';

const elBoard = document.getElementById('board');
const elBoardContent = document.getElementById('boardContent');
const elZoom = document.getElementById('elZoom');
const elX = document.getElementById('elX');
const elY = document.getElementById('elY');
const elWidth = document.getElementById('elWidth');
const elHeight = document.getElementById('elHeight');


const onAfterZoomChanged: ZoomEventFunction = (factor: number, x: number, y: number) => {
  elZoom.innerText = factor;
  elX.innerText = x;
  elY.innerText = y;
  elWidth.innerText = elBoardContent.clientWidth * factor;
  elHeight.innerText = elBoardContent.clientHeight * factor;
};

const onPanning: PanEventFunction = (x: number, y: number) => {
  elX.innerText = x;
  elY.innerText = y;
};


const board = new Board(elBoard, elBoardContent, {
  onAfterZoomChanged,
  onPanning,
});


board.imageRendering = InterpolationMode.Pixelated;
board.waitForContentReady()
  .then(async () => {
    board.enable();

    const w = elBoardContent.scrollWidth;
    const h = elBoardContent.scrollHeight;

    const widthScale = elBoard.clientWidth / w;
    const heightScale = elBoard.clientHeight / h;
    const scale = Math.min(widthScale, heightScale);

    const x = (elBoard.offsetWidth - (w * scale)) / 2;
    const y = (elBoard.offsetHeight - (h * scale)) / 2;

    await board.zoomTo(scale, x, y);
  });

// const img = document.getElementById('img');

// var poll = new Promise((resolve) => {
//   setInterval(function () {
//     if (img.naturalWidth) {
//       clearInterval(poll);

//       resolve({
//         width: img.naturalWidth,
//         height: img.naturalHeight,
//       });
//     }
//   }, 5);
// });

// poll.then(async ({ width, height }) => {
//   board.imageRendering = InterpolationMode.Pixelated;
//   console.log(board.imageRendering);

//   board.enable();

//   const w = elBoardContent.scrollWidth;
//   const h = elBoardContent.scrollHeight;

//   const widthScale = elBoard.clientWidth / w;
//   const heightScale = elBoard.clientHeight / h;
//   const scale = Math.min(widthScale, heightScale);

//   const x = (elBoard.offsetWidth - (w * scale)) / 2;
//   const y = (elBoard.offsetHeight - (h * scale)) / 2;

//   console.log(`${x}, ${y}`);
//   await board.zoomTo(scale, x, y);

//   // board.panTo(0, 0);
// });

