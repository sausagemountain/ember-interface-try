import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class TreeviewInternalComponent extends Component {
  @tracked
  isDisplayed=true

  get path() {
    return this.args.parent.path + '/' + this.args.node
  }

  @action
  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed
  }
}
