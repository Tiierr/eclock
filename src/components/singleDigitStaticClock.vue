<template>
  <div id="sdsc">
      <svg ref="singleDigitStaticClock" class="singleDigitStaticClock"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import baseClock from './base';
  import {spriteGrids} from '../data';

  export default {
    name: 'singleDigitStaticClock.vue',
    extends: baseClock,
    mounted (){
      this.renderChart();
    },
    watch: {},
    methods: {
      renderChart () {
        const size = 2 * this.settings.radius;

        // Create SVG that can fit all the clocks
        var svgNode = d3.select(this.$refs.singleDigitStaticClock)
          .attr('width', size * 3);
        this.updateSvg(svgNode, spriteGrids[9]);
      },
    },
  }
</script>
