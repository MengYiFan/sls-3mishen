module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'build',
        'test',
        'ci',
        'refactor',
        'improvement',
        'perf',
        'revert'
      ]
    ]
  }
}
