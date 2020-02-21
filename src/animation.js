import * as d3 from 'd3';
import {clamp} from './helpers';
import {settings, ticks} from './data';
import {spriteGrids, separatorGrid} from './data';

export function interpolateHours(from, to, normalizedTime) {
  from %= 12;
  to %= 12;


  if (Math.abs(from - to) > 6){
    if (from > to) to += 12;
    else from += 12
  }

  if (to === from) {
    return from;
  }
  const speedup = Math.sqrt(6 / Math.abs(to - from));
  const delay = speedup - 1;
  normalizedTime = clamp(normalizedTime * speedup - delay);
  return from + d3.easeCubic(normalizedTime) * (to - from);
}

export function interpolateGrid(from, to, normalizedTime) {
  return from.map((row, i) =>
    row.map((cell, j) => interpolateHours(cell, to[i][j], normalizedTime))
  );
}


export function* run(stopPromise, isGeneratingThumbnail) {
  const startTime = new Date().getTime();

  let running = true;
  stopPromise.then(() => (running = false));

  while (running) {
    const elapsed = settings.speedup * (new Date() - startTime);
    const date = new Date(startTime + elapsed);
    if (isGeneratingThumbnail) {
      yield gridForTime(settings.previewDate, 5000);
    } else {
      yield gridForTime(date, elapsed);
    }
  }
}

export function gridForTime(date, elapsed) {
  const seconds = (date % (60 * 1000)) / 1000;
  const transitionStart = ticks.length;
  const transitionSeconds = 60 - transitionStart;
  const normalizedTime = clamp((seconds - transitionStart) / transitionSeconds);

  const timeGrid = makeGrid();
  drawGrid(timeGrid, separatorGrid, [2, 9]);
  digits.forEach(({ fromDate, column }) => {
    const from = fromDate(date);
    const to = fromDate(new Date(date.getTime() + 60 * 1000));
    const digitGrid = interpolateGrid(
      spriteGrids[from],
      spriteGrids[to],
      normalizedTime
    );
    drawGrid(timeGrid, digitGrid, [1, column]);
  });

  ticks.forEach(([row, column], delay) => {
    let minutes = date.getMinutes() + delay / 60;
    if (delay >= date.getSeconds()) {
      minutes -= 1;
    }
    timeGrid[row][column] = date.getHours() + minutes / 60;
  });

  const fade = 1000 * settings.fadeSeconds;
  if (Math.abs(elapsed) < fade) {
    if (elapsed > 0) {
      // Fade in
      return interpolateGrid(makeGrid(), timeGrid, elapsed / fade);
    } else {
      // Fade out
      return interpolateGrid(timeGrid, makeGrid(), 1 + elapsed / fade);
    }
  } else {
    return timeGrid;
  }
}

export function makeGrid() {
  return Array.from({ length: 8 }, () => Array.from({ length: 20 }, () => 0));
}

export function drawGrid(target, source, [row, column]) {
  source.forEach((sourceRow, i) => {
    sourceRow.forEach((cell, j) => {
      target[row + i][column + j] = cell;
    });
  });
}

const digits = [
  {
    fromDate: date => Math.floor(date.getHours() / 10),
    column: 1
  },
  {
    fromDate: date => date.getHours() % 10,
    column: 5
  },
  {
    fromDate: date => Math.floor(date.getMinutes() / 10),
    column: 11
  },
  {
    fromDate: date => date.getMinutes() % 10,
    column: 15
  }
];


