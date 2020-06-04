import Route from '@ember/routing/route'
import {action} from '@ember/object';
import {tracked} from "@glimmer/tracking";
import {get, set} from 'idb-keyval'
import App from "../app";
import {A} from '@ember/array'
import {readData} from "../excel-transformer";

export default class IndexRoute extends Route {
  async model() {
    await get(this.markerDataKey).then(val => {
      if (val) {
        this.markers = val
      }
    })
    await get(this.charsDataKey).then(val => {
      if (val) {
        this.characteristics = val
      }
    })
    await get(this.graphsDataKey).then(val => {
      if (val) {
        this.graphsData = val
      }
    })

    App.repeat(10000, async   () => {
      await this.saveMarkerTreeViewCookie()
      await this.saveCharTreeViewCookie()
      await this.saveGraphsDataCookie()
    })

    return this;
  }

  //region markerTreeView

  markerDataKey = "markerDataKey"

  @action
  async saveMarkerTreeViewCookie() {
    await set(this.markerDataKey, this.markers)
  }

  @tracked
  markers = A([
    {
      node: 'aspect 1',
      items: [
        {
          node: 'marker 1',
          items:[
            {
              node: 'corpus 1',
              items:[],
              canAdd: false,
              canEdit: true,
              data:[[]],
            },
          ],
        },
      ],
    },
  ])

  @action
  async waitForOptions(){
    this.toggleSidebar()
    while (this.optionsOpen){
      await App.sleep(100)
    }
  }

  @action
  addToMarkers(defaultVal) {
    this.propName = 'Add List Item'
    return App.sleep(0).then(async () => {
      this.editableProperty = {
        name: '',
        index: defaultVal.index + 1,
        data: [[]],
      }
      await this.waitForOptions()
    }).then(() => {
      const { name, index, data } = this.editableProperty
      this.editableProperty = null
      const level = defaultVal.path.split('').filter(e => e === '/').length
      if(name.trim() !== '') {
        let res = {
          index: index - 1,
          data: {
            node: name,
            canAdd: level < 3,
            canEdit: level === 3,
            items: [],
          },
        }
        if (level === 3) {
          res.data.data = data
        }
        return res
      }
      else {
        return null
      }
    })
  }

  @action
  editMarker(defaultVal){
    this.propName = 'Edit List Item'
    return App.sleep(0).then(async () => {
      const { name, index, data } = defaultVal;
      this.editableProperty = {
        name: name,
        index: index + 1,
        data: data,
      }
      await this.waitForOptions()
    }).then(() => {
      const { name, index, data } = this.editableProperty
      this.editableProperty = null
      const level = defaultVal.path.split('').filter(e => e === '/').length
      if(name.trim() !== '') {
        return {
          index: index - 1,
          data: {
            node: name,
            canAdd: level < 3,
            canEdit: level === 3,
            data: data,
            items: [],
          },
        }
      }
      else {
        return null
      }
    })
  }

  @tracked
  propName = ''

  @tracked
  editableProperty = null

  //endregion

  //region characteristicsTreeView

  charsDataKey = "charsDataKey"

  @action
  async saveCharTreeViewCookie() {
    await set(this.charsDataKey, this.characteristics).then(() => {})
  }

  @tracked
  characteristics = A([
    {
      node: 'characteristics',
      addButton: true,
      canAdd: false,
      canRemove: false,
      isDisplayed: true,
      items:[
        {
          node: 'Uses',
          items:[],
        },
        {
          node: 'Mode',
          items:[],
        },
        {
          node: 'Median',
          items:[],
        },
        {
          node: 'Average',
          items:[],
        },
      ],
    },
  ])

  //endregion

  //region sidebar sync

  @tracked
  markersOpen = true

  @tracked
  optionsOpen = false

  toggleSidebar = () => {
    this.markersOpen = !this.markersOpen
    this.optionsOpen = !this.optionsOpen
  }

  //endregion

  //region graphs

  graphsDataKey = 'graphsDataKey'

  @action
  async saveGraphsDataCookie() {
    await set(this.graphsDataKey, this.graphsData).then(() => {})
  }

  @tracked
  graphsData = A([
    {
      data: [
        ['', 'Lorem ipsum', 'Dolor sit', 'Sit amet'],
        ['a', 240, 150, 60],
        ['b', 140, 250, 160],
        ['c', 340, 50, 260]
      ],
      options: {
        title: 'Kek chart',
        height: '100%',
        width: '100%',
      },
      type: 'Table'
    },
    {
      data: [
        ['', 'Lorem ipsum', 'Dolor sit', 'Sit amet'],
        ['a', 240, 150, 60],
        ['b', 140, 250, 160],
        ['c', 340, 50, 260]
      ],
      options: {
        title: 'Kek chart',
        height: '100%',
        width: '100%',
        seriesType: 'scatter',
        series:{
          0:{type:'line', curveType: 'function'},
          1:{type:'area'},
          2:{type:'bars'}
        }
      },
      type: 'Combo'
    },
    {
      data: [
        ['', 'Lorem ipsum', 'Dolor sit', 'Sit amet'],
        ['a', 240, 150, 60],
        ['b', 140, 250, 160],
        ['c', 340, 50, 260]
      ],
      options: {
        title: 'Kek chart',
        height: '100%',
        width: '100%',
      },
      type: 'Bar'
    }
  ])

  @action
  addData(event) {
    const files = event.target.files;
    const reader = new FileReader()
    reader.readAsArrayBuffer(files[0])
    reader.onloadend = () => {
      const data = readData(reader.result)
      for (let key in data) {
        this.graphsData.pushObject(
          {
            data: data[key],
            options: {
              title: key,
              height: '100%',
              width: '100%',
            },
            type: 'Table'
          })
      }
      this.saveGraphsDataCookie()
    }
  }

  @action
  addGraph(event){

  }

  @action
  debug() {
    console.log(1)
  }

  @action
  last() {
    this.toggleSidebar()
  }

  //endregion
}
