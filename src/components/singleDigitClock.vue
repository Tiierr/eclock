<template>
  <div id="sdc">
    <svg ref="singleDigitClock" class="singleDigitClock"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import baseClock from './base';
  import {spriteGrids} from '../data';
  import {interpolateGrid} from '../animation';

  export default {
    name: 'singleDigitClock',
    extends: baseClock,
    mounted (){
      this.renderChart();
    },
    watch: {},
    methods: {
      renderChart(){
        // Prepare SVG with width
        const size = 5 * this.settings.radius;
        const svgNode = d3.select(this.$refs.singleDigitClock)
          .attr('width', size);

        // Update the SVG 60 times per second
        const framesPerSecond = 60;

        setInterval(() => {
          this.transitByIntervalForDigitClock(svgNode)
        }, 1000 / framesPerSecond)

      },
      transitByIntervalForDigitClock(svgNode){
        // Change to the next digit every 4000 milliseconds
        const interval = 4000;

        // Calculate current and next digit and normalized time
        const time = new Date().getTime();
        const digit = Math.floor(time / interval) % 10;
        const nextDigit = (digit + 1) % 10;
        const normalizedTime = (time % interval) / interval;

        // Update with interpolation between current and next digit
        this.updateSvg(
          svgNode,
          interpolateGrid(
            spriteGrids[digit],
            spriteGrids[nextDigit],
            normalizedTime
          )
        );
      },
    },
  }
</script>
