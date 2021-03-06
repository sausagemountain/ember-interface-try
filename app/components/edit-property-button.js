import Component from '@glimmer/component';
import { action } from '@ember/object';
import App from "../app";

export default class EditPropertyButtonComponent extends Component {
  get editData(){
    if (this.args.value){
      return this.args.value
    }
    else {
      return {
        data: this.args.data,
        index: this.args.index,
        list: this.args.list
      }
    }
  }

  @action
  async editItem() {
    const result = await this.args.action(this.editData.data, this.editData.index)
    if (result) {
      App.sleep(0).then(async () => {
        this.editData.list.removeAt(this.editData.index)
        await App.sleep(1)
        this.editData.list.insertAt(result.index, result.data)
      })
    }
  }
}
