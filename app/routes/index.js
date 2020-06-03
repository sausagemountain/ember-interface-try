import Route from '@ember/routing/route'
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import {get, set} from 'idb-keyval'
import App from "../app";

export default class IndexRoute extends Route {
  async model() {
    this.last = this.last.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)

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

    return this;
  }

  //region markerTreeView

  markerDataKey = "markerDataKey"

  @action
  async saveMarkerTreeViewCookie() {
    await set(this.markerDataKey, this.markers)
  }

  markers = [
    {
      node: 'test 0',
      canAdd: true,
      items: [
        {
          node: '0',
        },
      ],
    },
  ]

  @action
  addToMarkers() {
    return App.sleep(0).then(async () => {
      this.editableProperty = {
        name: '',
        index: null,
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

  characteristics = [
    {
      node: 'characteristic 0',
      canAdd: false
    },
  ]

  @action
  addToCharacteristics() {
    return App.sleep(0).then(async () => {
      this.editableProperty = {
        name: '',
        index: 0,
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
            canAdd: false,
            items: [],
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

  //@action
  toggleSidebar() {
    this.markersOpen = !this.markersOpen
    this.optionsOpen = !this.optionsOpen
  }

  //endregion

  //region graphs

  graphsDataKey = 'graphsDataKey'

  async saveGraphsDataCookie(){
    await set(this.graphsDataKey, this.graphsData).then(() => {})
  }

  @tracked
  graphsData = [
    {
      data: [
        ['Kek Data', 'Lorem ipsum', 'Dolor sit', 'Sit amet'],
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
        ['Kek Data', 'Lorem ipsum', 'Dolor sit', 'Sit amet'],
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
        ['Kek Data', 'Lorem ipsum', 'Dolor sit', 'Sit amet'],
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
  ]

  addGraph(){

  }

  debug() {
    console.log(1)
  }

  last() {
    this.toggleSidebar()
  }

  //endregion
}
