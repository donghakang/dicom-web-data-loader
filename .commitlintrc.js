module.exports = {
  extends: ['@commitlint/config-conventional', 'gitmoji'],
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
