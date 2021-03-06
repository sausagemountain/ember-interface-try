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

  Bubble(element, data, options){
    let func = () => {
      let dataTable = GoogleCharts.api.visualization.arrayToDataTable(this.args.data)
      const chart = new GoogleCharts.api.visualization.BubbleChart(element)
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

  static get __gridlines__() {
    return {
      count: -1,
      color: '#'
    }
  }

  static get __axis__() {
    const res = {
      textPosition: ['out', 'in', 'none'],
      direction: [1, -1],
      title: '',
      logScale: true,
      format: ['none', 'short', 'long', 'decimal', 'percent', 'currency', 'scientific'],
      gridlines: GraphOptions.__gridlines__,
      minorGridlines: GraphOptions.__gridlines__,
    }
    return res
  }

  static get __legend__() {
    return {
      alignment: ['start', 'center', 'end'],
      position: ['none', 'out', 'in', 'top', 'bottom', 'left', 'right'],
    }
  }

  static get __pointSize__(){
    let res = []
    for (let i = 0; i < 16; i++){
      res.push(i)
    }
    return res;
  }

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
    lineWidth: [0, 1, 2, 3, 4, 5],
    pointsVisible: false,
    pointSize: GraphOptions.__pointSize__,
    orientation: ['vertical', 'horizontal'],
    pointShape: ['circle', 'triangle', 'square', 'diamond', 'star', 'polygon'],
    colors: ['#'],
    legend: GraphOptions.__legend__,
    hAxis: GraphOptions.__axis__,
    vAxis: GraphOptions.__axis__,
  }
  Line = { ...this.Scatter }
  Bar = { ...this.Scatter }
  Column = { ...this.Scatter }
  Histogram = { }
  Table = {
    title: '',
    alternatingRowStyle: true,
    sort: true,
    sortAscending: true,
    sortColumn: -1
  }
  Pie = (() => {
    let psa = new Number(0)
    psa._min = -180
    psa._max = 180
    psa._step = 1
    return {
      title: '',
      fontName: GraphOptions.__webSafeFonts__,
      fontSize: GraphOptions.__fontSizes__,
      is3D: false,
      pieHole: GraphOptions.__opacity__,
      pieSliceText: ['percentage', 'value', 'label', 'none'],
      pieStartAngle: psa,
      reverseCategories: false,
      legend: GraphOptions.__legend__
    }
  })()
  Area = {
    title: '',
    fontName: GraphOptions.__webSafeFonts__,
    fontSize: GraphOptions.__fontSizes__,
    dataOpacity: GraphOptions.__opacity__,
    areaOpacity: GraphOptions.__opacity__,
    backgroundColor: '#',
    theme: [null, 'maximized'],
    titlePosition: ['out', 'in','none'],
    axisTitlesPosition: ['out', 'in','none'],
    curveType: ['none', 'function'],
    lineWidth: [0, 1, 2, 3, 4, 5],
    pointsVisible: false,
    pointSize: GraphOptions.__pointSize__,
    pointShape: ['circle', 'triangle', 'square', 'diamond', 'star', 'polygon'],
    colors: ['#'],
    isStacked: [false, true, 'percent', 'relative', 'absolute'],
    interpolateNulls: false,
    legend: GraphOptions.__legend__,
    hAxis: GraphOptions.__axis__,
    vAxis: GraphOptions.__axis__,
  }
  Bubble = { }
  Combo = { }
}
