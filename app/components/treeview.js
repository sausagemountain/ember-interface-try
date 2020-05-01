import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {A} from '@ember/array';

export default class TreeviewComponent extends Component {
  constructor() {
    super(...arguments);
    this.items = A(this.args.tree)
  }

  @tracked
  items = undefined


  get path() {
    if (this.args.parent)
      return this.args.parent.path
    return ''
  }
}
