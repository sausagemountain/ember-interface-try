import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class TreeviewInternalComponent extends Component {
  @tracked
  isDisplayed=true

  @action
  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed
  }
}
