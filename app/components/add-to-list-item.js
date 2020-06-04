import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AddToListItemComponent extends Component {
  addItem = async () => {
    if (this.args.action) {
      let result = await this.args.action(this.args.defaultVal)
      if (result) {
        if(result.index !== undefined && result.index !== null) {
          this.args.list.insertAt(result.index, result.data)
        }
        else {
          this.args.list.pushObject(result.data)
        }

        if (this.args.onChange)
          await this.args.onChange()
      }
      return
    }
    if (this.args.item) {
      this.args.list.pushObject(this.args.item)
    }

    let ev = new CustomEvent('getNewName', { bubbles: true, cancelable: false, detail: null })
    window.dispatchEvent(ev)
  }


}
