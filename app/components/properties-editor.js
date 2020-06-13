import Component from '@glimmer/component';
import {readData} from "../excel-transformer";
import { action, set } from '@ember/object';
import {tracked} from "@glimmer/tracking";

export default class PropertiesEditorComponent extends Component {
  constructor() {
    super(...arguments);
    for (let key in this.args.properties){
      const val = this.args.properties[key]
      let a = {
        val: undefined
      }
      if (this.args.value && this.args.value[key] !== undefined && this.args.value[key] !== null){
        a.val = this.args.value[key]
      }
      if (typeof val === "boolean") {
        {
          a.checkbox = a.type = 'checkbox'

        }
      } else if (typeof val === "undefined" || typeof val === "symbol" || typeof val === "string") {
        {
          if (val === '#') {
            a.type = 'color'
          } else {
            a.type = 'text'
          }

        }
      } else if (typeof val === "bigint" || typeof val === "number" || val instanceof Number) {
        {
          if (!a.val) {
            a.val = val
          }
          if (val._min !== undefined && val._max !== undefined && val._step !== undefined) {
            a.range = a.type = 'range'
            a.min = val._min
            a.max = val._max
            a.step = val._step
          } else {
            a.regex = '(-)?\\d+(\\.\\d+)?'
            a.type = 'number'
          }
        }
      } else if (typeof val === "object") {
        {
          if (Array.isArray(val)) {
            if (val.length >= 0) {
              if (Array.isArray(val[0])) {
                a.data = val
              } else {
                a.options = [...val].map((value) => {
                  return {
                    val: value,
                    sel: a.val == value
                  }
                });
              }
            }
          } else {
            a.object = val
            if (!a.val) {
              a.val = {}
            }
            if (!this.args.value[key]) {
              this.args.value[key] = a.val
            }
          }

        }
      }
      this.props[key] = a
    }
  }

  @tracked
  props = {}

  @action
  update(props, key, event){
    set(props, key, event.target.value)
  }

  @action
  addData(props, key, event) {
    const files = event.target.files;
    const reader = new FileReader()
    reader.readAsArrayBuffer(files[0])
    const name = files[0].name
    this.props.options.val.title = name
    this.args.value.options.title = name
    reader.onloadend = () => {
      const data = readData(reader.result)
      for (let key1 in data) {
        data[key1][0][0] = name
        props[key] = data[key1]
      }
    }
  }

  @tracked
  collapsed = false

  @action
  toggleCollapse(){
    this.collapsed = !this.collapsed
  }
}
