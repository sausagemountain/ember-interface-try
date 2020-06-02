import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';
import {A} from '@ember/array'

export default class TreeviewInternalComponent extends Component {
  constructor() {
    super(...arguments);
    if (this.args.node.items)
      this.items = A(this.args.node.items)
    if (this.args.node.canAdd !== undefined)
      this.canAdd = A(this.args.node.canAdd)
    if (this.args.node.canRemove !== undefined)
      this.canRemove = A(this.args.node.canRemove)
    if(this.args.isDisplayed !== undefined)
      this.isDisplayed = this.args.isDisplayed
  }

  @tracked
  canAdd = true

  @tracked
  canRemove = true

  @tracked
  items = A([])

  @tracked
  isDisplayed=false

  get path() {
    if (this.args.parent)
      {
        let s = this.args.parent.path;
        if (this.args.node.node)
          s += this.args.node.node
        else
          s += this.args.node
        return s
      }
    return ''
  }

  @action
  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed
  }
}
