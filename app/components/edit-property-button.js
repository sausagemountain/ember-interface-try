import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class EditPropertyButtonComponent extends Component {
  @action
  async editItem() {
    const editData = this.args.value
    const result = await this.args.action(editData.data)
    editData.list.removeAt(editData.index)
    editData.list.insertAt(result.index, result.data)
  }
}
