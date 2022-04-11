module.exports = {
  extends: ['gitmoji', '@gitmoji/commit-types'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feature',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'chore',
        'wip',
      ],
    ],
  },
}
