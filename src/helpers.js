const hoursByOrientation = ({
  empty: 0,
  horizontal: 9.25,
  vertical: 6,
  topLeft: 6.25,
  topRight: 5.75,
  bottomLeft: 3,
  bottomRight: 9
});

export function clamp(normalizedTime) {
  return Math.min(Math.max(0, normalizedTime), 1);
}

// [ [ 1, 1, 1 ], [ 1, 0, 1 ], [ 1, 1, 1 ], [ 0, 0, 1 ], [ 1, 1, 1 ] ]
export function pixelsToHours(pixels) {
  const getPixel = (i, j) => {
    if (i >= 0 && i < pixels.length && j >= 0 && j < pixels[i].length) {
      return pixels[i][j];
    } else {
      return 0;
    }
  };

  const grid = [];
  // pixels.length -> 5
  for (let i = 0; i <= pixels.length; i += 1) {
    const row = [];
    // pixels[0].length -> 3
    for (let j = 0; j <= pixels[0].length; j += 1) {
      let orientation = 'empty';

      // blackPixels -> 1 (0,0)
      const blackPixels =
        getPixel(i, j) +
        getPixel(i - 1, j) +
        getPixel(i, j - 1) +
        getPixel(i - 1, j - 1);

      if (blackPixels === 2) {
        if (getPixel(i, j) === getPixel(i - 1, j)) {
          orientation = 'vertical';
        } else {
          orientation = 'horizontal';
        }
      } else if (blackPixels === 1 || blackPixels === 3) {
        const oddPixel = blackPixels === 1 ? 1 : 0;
        switch (oddPixel) {
          case getPixel(i, j):
            orientation = 'topLeft';
            break;
          case getPixel(i - 1, j):
            orientation = 'bottomLeft';
            break;
          case getPixel(i, j - 1):
            orientation = 'topRight';
            break;
          case getPixel(i - 1, j - 1):
            orientation = 'bottomRight';
            break;
        }
      }
      row.push(hoursByOrientation[orientation]);
    }
    grid.push(row);
  }
  return grid;
}

// const isGeneratingThumbnail = navigator.userAgent.match('HeadlessChrome')
//
// export function useThumnailSize() {
//   if (isGeneratingThumbnail) {
//     digitalClock.setAttribute("width", 640);
//     digitalClock.setAttribute("height", 400);
//     return true;
//   }
//   return false;
// }
