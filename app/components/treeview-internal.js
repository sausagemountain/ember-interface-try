import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {A} from '@ember/array'
import { action } from '@ember/object';

export default class TreeviewInternalComponent extends Component {
  constructor() {
    super(...arguments);
    if (this.args.node.items)
      this.items = A(this.args.node.items)

    if (this.args.node.canAdd !== undefined)
      this.canAdd = this.args.node.canAdd

    if (this.args.node.canEdit !== undefined)
      this.canEdit = this.args.node.canEdit

    if (this.args.node.canRemove !== undefined)
      this.canRemove = this.args.node.canRemove

    if(this.args.isDisplayed !== undefined)
      this.isDisplayed = this.args.isDisplayed

    if(this.args.node.isDisplayed !== undefined)
      this.isDisplayed = this.args.node.isDisplayed
  }

  @tracked
  canAdd = true

  @tracked
  canEdit = false

  @tracked
  canRemove = true

  @tracked
  items = A([])

  @tracked
  isDisplayed=false

  get newItem(){
    return {
      index: this.items.length,
      path: this.path
    }
  }

  get currentItem(){
    return {
      data:{
        name: this.args.node.node,
        path: this.args.parent.path,
        data: this.args.node.data,
        index: this.args.index,
      },
      index: this.args.index,
      list: this.args.parent.items,
    }
  }

  get path() {
    if (this.args.parent)
      {
        let s = this.args.parent.path;
        if (this.args.node.node)
          s += this.args.node.node
        else
          s += this.args.node
        s += '/'
        return s
      }
    return ''
  }

  @action
  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed
  }
}
