process.env.NODE_ENV = 'test';
process.env.TS_NODE_PROJECT = 'test/tsconfig.json';

module.exports = {
  require: [
    'ts-node/register',
    'tsconfig-paths/register'
  ],
  extension: [
    'ts'
  ]
}
