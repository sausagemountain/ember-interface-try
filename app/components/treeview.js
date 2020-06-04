import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {A} from '@ember/array';

export default class TreeviewComponent extends Component {
  constructor() {
    super(...arguments);
    if (this.args.tree)
      this.items = A(this.args.tree)
  }

  @tracked
  items = A([])

  get newItem(){
    return {
      index: this.items.length,
      path: this.path
    }
  }

  get path() {
    if (this.args.parent)
      return this.args.parent.path
    return '/'
  }
}
