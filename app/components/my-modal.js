import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";

export default class MyModalComponent extends Component {
  @tracked
  hidden = true

  @action
  hide() {
    this.hidden = true
  }

  @action
  show() {
    this.hidden = false
  }
}
