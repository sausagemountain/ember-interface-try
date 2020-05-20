import Component from '@glimmer/component';

export default class PropertiesEditorComponent extends Component {
  constructor() {
    super(...arguments);
    this.enter = this.enter.bind(this)
    for(let key in this.args.properties){
      const val = this.args.properties[key]
      let a = {
        val: val,
        type: typeof(val) === 'boolean'? 'checkbox': 'text',
      }
      switch (typeof val) {
        case "number":
        case "bigint": {
          a.regex = '(-)?\\d+(\\.\\d+)?'
          break
        }

        case "undefined":
        case "symbol":
        case "boolean":
        case "string":{
          a.regex = '.*'
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

  enter(property, key) {
    let index = 0;
    for(let i in property){
      if (key === i) {
        break
      }
      index += 1
    }

    if (index === property.length){
      if(this.args.lastEnter){
        this.args.lastEnter()
      }
      else if (this.args.enter) {
        this.args.enter()
      }
      else {

      }
    }
    else if (this.args.enter) {
      this.args.enter()
    }
  }
}
