import Route from '@ember/routing/route';

export default class IndexRoute extends Route {

  model() {
    return {
      'tree': [
        'test 1',
        'test 2',
        {
          'node': 'test 3',
          'items': [
            '1',
            {
              'node': '2',
              'items': [
                'node 1',
                'node 2',
                'node 3'
              ]
            },
            '3'
          ]
        },
        'test 4',
        'test 5',
      ],
    };
  }
}
