<template>
  <div>
      <svg ref="singleStaticClock" class="singleStaticClock"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import baseClock from './base';

  export default {
    name: 'singleStaticClock',
    extends: baseClock,
    mounted (){
      this.renderChart();
    },
    watch: {},
    methods: {
      renderChart () {
        const hours = 2;
        // Create SVG that can fit a clock with the configured radius
        const size = 2 * this.settings.radius;
        const svgNode = d3.select(this.$refs.singleStaticClock)
          .attr('width', size)
          .attr('height', size);

        // Add the clock and set the time
        svgNode
          .call(this.addClock)
          .datum(hours)
          .call(this.updateClock);
      },
    },
  }
</script>
