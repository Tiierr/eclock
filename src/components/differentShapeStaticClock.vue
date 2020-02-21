<template>
  <div id="dssc">
      <svg ref="differentShapeStaticClock" class="differentShapeStaticClock"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import baseClock from './base';

  export default {
    name: 'differentShapeStaticClock',
    extends: baseClock,
    mounted (){
      this.renderChart();
    },
    watch: {},
    methods: {
      renderChart () {
        const clocks = Object.values(this.hoursByOrientation);
        const size = 2 * this.settings.radius;

        // Create SVG that can fit all the clocks
        var svgNode = d3.select(this.$refs.differentShapeStaticClock)
          .attr('width', clocks.length * size)
          .attr('height', size);

        svgNode.selectAll("g")
          .data(clocks)
          .join("g")
          .style("transform", (d, i) => `translate(${i * size}px, 0px)`)
          .call(this.addClock)
          .call(this.updateClock);
      },
    },
  }
</script>
