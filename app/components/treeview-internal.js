import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class TreeviewInternalComponent extends Component {

  @tracked
  isDisplayed=true

  get path() {
    if (this.args.parent)
      {
        let s = this.args.parent.path + '/';
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
