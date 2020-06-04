import Route from '@ember/routing/route'
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import {get, set} from 'idb-keyval'
import App from "../app";
import {A} from '@ember/array'
import {readData} from "../excel-transformer";

export default class IndexRoute extends Route {
  model = async () => {
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

    App.repeat(30000, () => {
      this.saveMarkerTreeViewCookie()
      this.saveCharTreeViewCookie()
      this.saveGraphsDataCookie()
    })

    return this;
  }

  //region markerTreeView

  markerDataKey = "markerDataKey"

  saveMarkerTreeViewCookie = async () => {
    await set(this.markerDataKey, this.markers)
  }

  @tracked
  markers = A([
    {
      node: 'test 0',
      data: [],
      items: [
        {
          canAdd: false,
          node: 'item 0',
          data:[]
        },
      ],
    },
  ])

  addToMarkers = (defaultVal) => {
    console.log(defaultVal.path)
    console.log(defaultVal.path.split('').filter(e => e === '/').length <= 1)
    return App.sleep(0).then(async () => {
      this.editableProperty = {
        name: '',
        index: defaultVal.index,
      }
      this.propName = 'Edit List Item'
      this.toggleSidebar()
      while (this.optionsOpen){
        await App.sleep(100)
      }
    }).then(() => {
      const { name, index } = this.editableProperty
      this.editableProperty = null
      if(name.trim() !== '') {
        return {
          index: index,
          data: {
            node: name,
            canAdd: defaultVal.path.split('').filter(e => e === '/').length <= 1,
            data: [],
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

  saveCharTreeViewCookie = async () => {
    await set(this.charsDataKey, this.characteristics).then(() => {})
  }

  @tracked
  characteristics = A([
    {
      node: 'characteristic 0',
      data: [],
      canAdd: false
    },
  ])


  addToCharacteristics = (defaultVal) => {
    return App.sleep(0).then(async () => {
      this.editableProperty = {
        name: '',
        index: defaultVal.index,
      }
      this.propName = 'Edit List Item'
      this.toggleSidebar()
      while (this.optionsOpen){
        await App.sleep(100)
      }
    }).then(() => {
      const { name, index } = this.editableProperty
      this.editableProperty = null
      if(name.trim() !== '') {
        return {
          index: index,
          data: {
            node: name,
            data: [],
            canAdd: false,
          },
        }
      }
      else {
        return null
      }
    })
  }

  //endregion

  //region sidebar sync

  @tracked
  markersOpen = true

  @tracked
  optionsOpen = false

  //
  toggleSidebar = () => {
    this.markersOpen = !this.markersOpen
    this.optionsOpen = !this.optionsOpen
  }

  //endregion

  //region graphs

  graphsDataKey = 'graphsDataKey'

  saveGraphsDataCookie = async () => {
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

  addGraph = (event) => {
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
    }
  }

  debug = () => {
    console.log(1)
  }

  last = () => {
    this.toggleSidebar()
  }

  //endregion
}
