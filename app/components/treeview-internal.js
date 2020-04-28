import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class TreeviewInternalComponent extends Component {
  @tracked
  isDisplayed=true

  get path() {
    let a = this.parent.path + '/' + this.node
    console.log(a)
    return a
  }

  @action
  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed
  }
}
