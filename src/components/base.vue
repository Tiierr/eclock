
<script>
  import {settings, hoursByOrientation} from '../data'
  export default {
    name: 'baseClock',
    data () {
      return {
        settings: settings,
        hoursByOrientation: hoursByOrientation,
      }
    },
    watch: {},
    methods: {
      addClock(cell) {
        const clock = cell
          .append("g")
          .style(
            "transform",
            `translate(${this.settings.radius}px, ${this.settings.radius}px)`
          );

        const circleStrokeWidth = this.settings.radius / 12;
        const handStrokeWidth = this.settings.radius / 6;
        clock
          .append("circle")
          .attr("r", this.settings.radius - circleStrokeWidth / 2)
          .attr("fill", "none")
          .attr("stroke", "#eee")
          .attr("stroke-width", circleStrokeWidth);

        clock
          .append("line")
          .attr("class", "hour-hand")
          .attr("y2", -4 * handStrokeWidth)
          .attr("stroke", "#333")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", handStrokeWidth);

        clock
          .append("line")
          .attr("class", "minute-hand")
          .attr("y2", -5 * handStrokeWidth)
          .attr("stroke", "#333")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", handStrokeWidth);
      },
      updateClock(cell) {
        cell
          .select(".hour-hand")
          .style("transform", hours => `rotate(${(hours / 12) * 360}deg`);

        cell.select(".minute-hand").style("transform", hours => {
          const minutes = (hours - Math.floor(hours)) * 60;
          return `rotate(${(minutes / 60) * 360}deg`;
        });
      },
      updateSvg(svgNode, grid) {
        const width = 2 * this.settings.radius * grid[0].length;
        const height = 2 * this.settings.radius * grid.length;

        const rows = svgNode.attr("viewBox", `0, 0, ${width}, ${height}`)
          .selectAll(".row")
          .data(grid)
          .join(enter =>
            enter
              .append("g")
              .attr("class", "row")
              .style(
                "transform",
                (d, row) => `translate(0px, ${2 * this.settings.radius * row}px)`
              )
          );

        rows
          .selectAll(".column")
          .data(d => d)
          .join(enter =>
            enter
              .append("g")
              .attr("class", "column")
              .style(
                "transform",
                (d, column) => `translate(${2 * this.settings.radius * column}px, 0px)`
              )
              .call(this.addClock)
          )
          .call(this.updateClock);
      },
    },
  }
</script>
