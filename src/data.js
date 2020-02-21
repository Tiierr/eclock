import {pixelsToHours} from './helpers';

export const spriteStrings = [
  `111
   101
   101
   101
   111`,
  `001
   001
   001
   001
   001`,
  `111
   001
   111
   100
   111`,
  `111
   001
   111
   001
   111`,
  `101
   101
   111
   001
   001`,
  `111
   100
   111
   001
   111`,
  `111
   100
   111
   101
   111`,
  `111
   001
   001
   001
   001`,
  `111
   101
   111
   101
   111`,
  `111
   101
   111
   001
   111`,
  `1
   0
   1`
];

// [ [ 1, 1, 1 ], [ 1, 0, 1 ], [ 1, 1, 1 ], [ 0, 0, 1 ], [ 1, 1, 1 ] ]
export const spritePixels = spriteStrings.map(spriteString =>
  spriteString.split('\n').map(row => [...row.trim()].map(pixel => +pixel))
);


export const spriteGrids = spritePixels.map(pixelsToHours);

export const separatorGrid = spriteGrids[10];

export const ticks = [
  [1, 10],
  [0, 10],
  [0, 11],
  [0, 12],
  [0, 13],
  [0, 14],
  [0, 15],
  [0, 16],
  [0, 17],
  [0, 18],
  [0, 19],
  [1, 19],
  [2, 19],
  [3, 19],
  [4, 19],
  [5, 19],
  [6, 19],
  [7, 19],
  [7, 18],
  [7, 17],
  [7, 16],
  [7, 15],
  [7, 14],
  [7, 13],
  [7, 12],
  [7, 11],
  [7, 10],
  [6, 10],
  [6, 9],
  [7, 9],
  [7, 8],
  [7, 7],
  [7, 6],
  [7, 5],
  [7, 4],
  [7, 3],
  [7, 2],
  [7, 1],
  [7, 0],
  [6, 0],
  [5, 0],
  [4, 0],
  [3, 0],
  [2, 0],
  [1, 0],
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [0, 9],
  [1, 9]
];

export const settings = ({
  fadeSeconds: 4,
  previewDate: new Date("2020-01-01T12:24"),
  radius: 30,
  speedup: 1
});

export const hoursByOrientation = {
  empty: 0,
  horizontal: 9.25,
  vertical: 6,
  topLeft: 6.25,
  topRight: 5.75,
  bottomLeft: 3,
  bottomRight: 9,
};
