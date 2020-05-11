import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RemovableListItemComponent extends Component {
  @action
  async removeItem() {
    if (this.args.item || this.args.item === 0)
      this.args.list.removeAt(this.args.list.lastIndexOf(this.args.item))
    if (this.args.index || this.args.index === 0)
      this.args.list.removeAt(this.args.index)
    if (this.args.onChange)
      await this.args.onChange()
  }
}
