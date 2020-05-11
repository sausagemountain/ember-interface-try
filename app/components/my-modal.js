import Component from '@glimmer/component';

export default class MyModalComponent extends Component {
  constructor() {
    super(...arguments);
    if (this.args.onOpen) {
      setTimeout(() => {
        this.args.onOpen()
      }, 100)
    }
  }
}
