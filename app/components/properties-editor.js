import Component from '@glimmer/component';
import {readData} from "../excel-transformer";
import { action, set } from '@ember/object';

export default class PropertiesEditorComponent extends Component {
  constructor() {
    super(...arguments);
    for (let key in this.args.properties){
      const val = this.args.properties[key]
      let a = {
        val: val
      }
      if (this.args.value[key] !== undefined && this.args.value[key] !== null){
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
          if (val.min !== undefined && val.max !== undefined) {
            a.range = a.type = 'range'
            a.min = val.min
            a.max = val.max
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
                a.options = val;
              }
            }
          } else {
            a.object = val
            if (this.args.value[key] === undefined || this.args.value[key] === null) {
              this.args.value[key] = {}
            }
          }

        }
      }
      this.props[key] = a
    }
  }

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
    //const name = files[0].name
    reader.onloadend = () => {
      const data = readData(reader.result)
      for (let key1 in data) {
        props[key] = data[key1]
      }
    }
  }
}
