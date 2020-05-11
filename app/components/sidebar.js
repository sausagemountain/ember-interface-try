import Component from '@glimmer/component';

export default class SidebarComponent extends Component {
  constructor() {
    super(...arguments);
  }

  toggleOpen() {
    this.args.onToggle()
  }
}
