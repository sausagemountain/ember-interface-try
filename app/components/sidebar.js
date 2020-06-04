import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SidebarComponent extends Component {
  constructor() {
    super(...arguments);
  }

  @action
  toggleOpen() {
    this.args.onToggle()
  }
}
