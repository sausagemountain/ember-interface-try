import Component from '@glimmer/component';
import {readData} from "../excel-transformer";
import { action } from '@ember/object';

export default class PropertiesEditorComponent extends Component {
  constructor() {
    super(...arguments);
    for(let key in this.args.properties){
      const val = this.args.properties[key]
      let a = {
        val: val
      }
      switch (typeof val) {
        case "bigint":
        case "number": {
          a.regex = '(-)?\\d+(\\.\\d+)?'
          a.type = 'number'
          break
        }

        case "boolean":{
          a.type = 'checkbox'
          a.checkbox = true
          break
        }

        case "undefined":
        case "symbol":
        case "string":{
          a.regex = '.*'
          a.type = 'text'
          break
        }
        case "object":{
          if (Array.isArray(val)) {
            if(val.length >= 0){
              if (Array.isArray(val[0])){
                a.data = val
              }
              else {
                a.options = val;
              }
            }
          }
          else {
            a.object = true;
          }
          break
        }
      }
      this.props[key] = a
    }
  }

  props = {}

  @action
  update(props, key, event){
    props[key] = event.target.value
  }

  @action
  addData(props, key, event) {
    const files = event.target.files;
    const reader = new FileReader()
    reader.readAsArrayBuffer(files[0])
    reader.onloadend = () => {
      const data = readData(reader.result)
      for (let key1 in data) {
        props[key] = data[key1]
      }
    }
  }
}
