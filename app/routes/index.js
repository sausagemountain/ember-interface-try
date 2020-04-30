import Route from '@ember/routing/route';

export default class IndexRoute extends Route {

  model() {
    return {
      'tree': {
        'node': 'head',
        'items': [
          'test 1',
          'test 2',
          {
            'node': 'test 3',
            'items': [
              '1',
              '2',
              '3'
            ]
          },
          'test 4',
          'test 5',
        ],
      },
    };
  }
}
