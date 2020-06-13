import Component from '@glimmer/component';
import {GoogleCharts} from 'google-charts';
import {tracked} from '@glimmer/tracking';

export default class GraphComponent extends Component {
  constructor() {
    super(...arguments);
    this.graph.classList.add('hundred')
    this.graph.classList.add('reset-font')
    this.graph.className += ' ' + this.args.class
    this.resize = () => {
      this.graph.innerHTML = ''
    this[this.args.type](
      this.graph,
      this.args.data,
        {
          ...this.args.options,
          forceIFrame: true,
          width:'100%',
          height:'100%'
        }
    )
  }
    window.addEventListener('resize', () => {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.resize, 100)
    })
    this.resize()
  }

  willDestroy() {
    window.removeEventListener('resize', this.resize)
    super.willDestroy();
  }

  timeout;
  resize;

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
  static get __webSafeFonts__() {
    let array = ['Georgia', 'Times New Roman', 'Arial', 'Helvetica', 'Impact',
      'Lucida Sans Unicode', 'Tahoma', 'Verdana', 'Courier New', 'Lucida Console', 'serif', 'sans-serif', 'monospace']
    array.sort()
    array = ['', ...array]
    return array
  }
  static get __fontSizes__(){
    const res = []
    for (let i = 5; i < 30; i++){
      res.push(i)
    }
    return res
  }

  static get __opacity__(){
    // Number.prototype._min = null;
    // Number.prototype._max = null;
    // Number.prototype._step = null;
    let opacity = new Number(1)
    opacity._min = 0;
    opacity._max = 1;
    opacity._step = 0.01;
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

  static get __axis__() {
    const res = {
      title: '',
      logScale: true,
      textPosition: ['out', 'in', 'none'],
      format: ['none', 'short', 'long', 'decimal', 'percent', 'currency', 'scientific'],
      direction: [1, -1],
      gridlines: {
        count: -1,
        color: '#'
      }
    }
    return res
  }

  static get __pointSize__(){
    let res = []
    for (let i = 0; i < 16; i++){
      res.push(i)
    }
    return res;
  }

  Line = { }
  Bar = { }
  Column = { }
  Histogram = { }
  Table = { }
  Pie = { }
  Scatter = {
    title: '',
    fontName: GraphOptions.__webSafeFonts__,
    fontSize: GraphOptions.__fontSizes__,
    dataOpacity: GraphOptions.__opacity__,
    backgroundColor: '#',
    theme: [null, 'maximized'],
    titlePosition: ['out', 'in','none'],
    axisTitlesPosition: ['out', 'in','none'],
    curveType: ['none', 'function'],
    lineWidth: [0, 1, 2],
    pointsVisible: false,
    pointSize: GraphOptions.__pointSize__,
    pointShape: ['circle', 'triangle', 'square', 'diamond', 'star', 'polygon'],
    legend: {
      alignment: ['start', 'center', 'end'],
      position: ['none', 'out', 'in', 'top', 'bottom', 'left', 'right'],
    },
    hAxis: GraphOptions.__axis__,
    vAxis: GraphOptions.__axis__,
  }
  Area = { }
  Candlestick = { }
  Annotation = { }
  Bubble = { }
  Gauge = { }
  Calendar = { }
  Combo = { }
}
