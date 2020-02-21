<template>
  <div id="sc">
      <svg ref="singleClock" class="singleClock"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import baseClock from './base';
  import {interpolateHours} from '../animation';

  export default {
    name: 'singleClock',
    extends: baseClock,
    mounted (){
      this.renderChart();
    },
    watch: {},
    methods: {
      renderChart () {
        // Create SVG that can fit a clock with the configured radius
        const size = 2 * this.settings.radius;
        const svgNode = d3.select(this.$refs.singleClock)
          .attr('width', size * 5)
          .attr('height', size);

        // Add the clock and set the time
        svgNode.call(this.addClock);

        const counter = svgNode
          .append('text')
          .style("font-size", `${this.settings.radius / 2}px`)
          .style("transform", "translate(72px, 36px)");

        setInterval(() => {
          this.transitByIntervalForOneClock(svgNode, counter)
        }, 1000 / 60);

      },
      transitByIntervalForOneClock(svgNode, counter){
        // Set hours to transition between (01:15 => 10:30)
        const hoursFrom = 1.25;
        const hoursTo = 19.5;

        // Change to the next digit every 4000 milliseconds
        const interval = 4000;
        const delayBeforeRestart = 200;

        const intervalWithDelay = interval + delayBeforeRestart;
        let normalizedTime = Math.min(1, (new Date().getTime() % intervalWithDelay) / interval);
        let hours = interpolateHours(hoursFrom, hoursTo, normalizedTime);
        counter.text(`Normalized time: ${normalizedTime.toFixed(2)}`);
        // Add the clocks and set their times
        svgNode.datum(hours).call(this.updateClock);
      },
    },
  }
</script>
