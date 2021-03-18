import { tabris } from 'tabris';
import { expect, use } from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import ClientMock from 'tabris/ClientMock';

use(sinonChai);

const sandbox = sinon.createSandbox();
const spy = sandbox.spy.bind(sandbox) as sinon.SinonSpyStatic;
const stub = sandbox.stub.bind(sandbox) as sinon.SinonStubStatic;
const mock = sandbox.mock.bind(sandbox) as sinon.SinonMockStatic;
const reset = () => sandbox.restore();

const init = () => {
  tabris._init(new ClientMock({
    'tabris.Device': { platform: 'iOS', language: 'en' }
  }));
};
const flush = () => tabris.flush();
init();

export {
  sandbox,
  tabris,
  ClientMock,
  expect,
  spy,
  stub,
  mock,
  init,
  reset,
  flush
};
