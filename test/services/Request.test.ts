import { expect, init, reset, stub } from '@sandbox';
import { Injector } from 'tabris-decorators';
import { CustomError } from '@models/CustomError';
import * as fetchMock from 'fetch-mock';
import Request from '@services/Request';

describe('App', () => {

  let injector: Injector;
  let request: Request;

  const response = { bar: 'baz' };

  beforeEach(() => {
    init();
    injector = new Injector();
    injector.shared(Request);
    request = injector.resolve(Request);
  });

  afterEach(() => {
    reset();
    fetchMock.restore();
  });

  describe('get', () => {

    it('sets request options', async () => {
      fetchMock.mock('foo', response);

      await request.get({ url: 'foo' });

      expect(fetchMock.lastUrl()).to.equal('/foo');
      const options = fetchMock.lastOptions();
      expect(options.method).to.equal('GET');
      expect(options.headers).to.deep.equal({});
    });

    it('gets json response', async () => {
      fetchMock.mock('foo', response);

      const result = await request.get({ url: 'foo' });

      expect(result).to.deep.equal(response);
    });

    it('gets text response', async () => {
      fetchMock.mock('foo', 'bar');

      const result = await request.get({ url: 'foo', responseType: 'text' });

      expect(result).to.deep.equal('bar');
    });

    it('throws timeout error', async () => {
      let error: CustomError = null;
      fetchMock.mock('foo', response, { delay: 1000 });

      try {
        await request.get({ url: 'foo', requestTimeout: 500 });
      } catch (_error) {
        error = _error;
      }

      expect(error.message).to.equal('* Timeout');
      expect(error.type).to.equal('network');
      expect(error.url).to.equal('foo');
    });

    it('throws server error', async () => {
      let error: CustomError = null;
      const response = new Response('server error', { status: 503 });
      stub(response, 'ok').returns(false);
      fetchMock.mock('foo', response);

      try {
        await request.get({ url: 'foo' });
      } catch (_error) {
        error = _error;
      }

      expect(error.message).to.equal('* Request failed:\n* Status: 503\n* Status text: Service Unavailable');
      expect(error.type).to.equal('server');
      expect(error.url).to.equal('foo');
    });

  });

  describe('post', () => {

    it('sets request options', async () => {
      fetchMock.mock('foo', response);

      await request.post({ url: 'foo', body: 'baz' });

      expect(fetchMock.lastUrl()).to.equal('/foo');
      const options = fetchMock.lastOptions();
      expect(options.method).to.equal('POST');
      expect(options.headers).to.deep.equal({});
      expect(options.body).to.equal('"baz"');
    });

    it('gets json response', async () => {
      fetchMock.mock('foo', response);

      const result = await request.post({ url: 'foo', body: 'baz' });

      expect(result).to.deep.equal(response);
    });

    it('gets text response', async () => {
      fetchMock.mock('foo', 'bar');

      const result = await request.post({ url: 'foo', body: 'baz', responseType: 'text' });

      expect(result).to.deep.equal('bar');
    });

    it('throws timeout error', async () => {
      let error: CustomError = null;
      fetchMock.mock('foo', response, { delay: 1000 });

      try {
        await request.post({ url: 'foo', body: 'baz', requestTimeout: 500 });
      } catch (_error) {
        error = _error;
      }

      expect(error.message).to.equal('* Timeout');
      expect(error.type).to.equal('network');
      expect(error.url).to.equal('foo');
    });

    it('throws server error', async () => {
      let error: CustomError = null;
      const response = new Response('server error', { status: 503 });
      stub(response, 'ok').returns(false);
      fetchMock.mock('foo', response);

      try {
        await request.post({ url: 'foo', body: 'baz' });
      } catch (_error) {
        error = _error;
      }

      expect(error.message).to.equal('* Request failed:\n* Status: 503\n* Status text: Service Unavailable');
      expect(error.type).to.equal('server');
      expect(error.url).to.equal('foo');
    });

  });

});
