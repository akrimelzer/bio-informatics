<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Array,
      default: null
    },
    label_names: {
      type: Array,
      default: null
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.label_names,
        datasets: [
          {
            label: "Probability",
            data: this.chartdata,
            backgroundColor: ["rgba(230, 126, 34,0.4)"],
            borderColor: [
              "rgba(52, 152, 219,1.0)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>

<style></style>
