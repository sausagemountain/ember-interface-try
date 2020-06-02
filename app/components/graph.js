import Component from '@glimmer/component';
import {GoogleCharts} from "google-charts";
import {tracked} from "@glimmer/tracking";

export default class GraphComponent extends Component {
  constructor() {
    super(...arguments);
    this.graph.classList.add('hundred')
    this[this.args.type](
      this.graph,
      this.args.data,
      {...this.args.options}
    )
  }

  @tracked
  graph = document.createElement('div');

  Line(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.LineChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Bar(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.BarChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Histogram(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.Histogram(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Table(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.Table(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Pie(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.PieChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Scatter(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.ScatterChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Area(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.AreaChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Candlestick(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.CandlestickChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Annotation(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.AnnotationChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Bubble(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.BubbleChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Gauge(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.Gauge(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Calendar(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.Calendar(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }

  Combo(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.ComboChart(element)
      chart.draw(dataTable, options)
    }
    GoogleCharts.load(func);
  }
}

export class GraphOptions {

}
