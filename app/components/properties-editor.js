import Component from '@glimmer/component';

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
            a.options = val;
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

  update(props, key, event){
    props[key] = event.target.value
  }
}
