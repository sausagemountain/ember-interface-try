import Component from '@glimmer/component';
import {GoogleCharts} from 'google-charts';
import {tracked} from '@glimmer/tracking';

export default class GraphComponent extends Component {
  constructor() {
    super(...arguments);
    this.graph.classList.add('hundred')
    this.graph.classList.add('reset-font')
    this.graph.className += ' ' + this.args.class
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

  Column(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.ColumnChart(element)
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
  static __webSafeFonts__ = ['', 'Georgia', 'Palatino', 'Times New Roman', 'Arial', 'Helvetica', 'Impact', 'Charcoal',
    'Lucida Sans Unicode', 'Lucida Grande', 'Tahoma', 'Geneva', 'Verdana', 'Courier New', 'Lucida Console']
  static get __fontSizes__(){
    const res = []
    for (let i = 10; i < 50; i++){
      res.push(i)
    }
    return res
  }
  static get __opacity__(){
    Number.prototype.min = null;
    Number.prototype.max = null;
    let opacity = new Number(1)
    opacity.min = 0;
    opacity.max = 1;
    return opacity
  }
  static get __textStyle__() {
    return {
      fontName: GraphOptions.__webSafeFonts__,
      fontSize: GraphOptions.__fontSizes__,
      bold: false,
      italics: false,
      color: '#',
      auraColor: '#',
      opacity:  GraphOptions.__opacity__,
    }
  }

  Line = { }
  Bar = { }
  Column = { }
  Histogram = { }
  Table = { }
  Pie = { }
  Scatter = {
    aggregationTarget: ['auto','category', 'series', 'none'],
    annotations: {
      style:['line', 'point'],
      textStyle: GraphOptions.__textStyle__,
    },
    axisTitlesPosition: ['out', 'in','none'],
    backgroundColor: '#',
    dataOpacity: GraphOptions.__opacity__,
  }
  Area = { }
  Candlestick = { }
  Annotation = { }
  Bubble = { }
  Gauge = { }
  Calendar = { }
  Combo = { }
}
