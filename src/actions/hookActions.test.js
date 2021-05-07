import moxios from 'moxios';
import { getSecretWord } from './hookActions';

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('secretWord is returned', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    });

    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord);

    expect(mockSetSecretWord).toHaveBeenCalledWith('party');
  });
});

describe('api returns 5xx error', () => {
  const mockSetSecretWord = jest.fn();
  const mockSetServerError = jest.fn();

  beforeEach(async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
      });
    });

    await getSecretWord(mockSetSecretWord, mockSetServerError);
  });

  test('dont call getSecretWord and call SetServerError', async () => {
    expect(mockSetServerError).toHaveBeenCalledWith(true);
    expect(mockSetSecretWord).not.toHaveBeenCalled();
  });
});

describe('api returns 4xx error', () => {
  const mockSetSecretWord = jest.fn();
  const mockSetServerError = jest.fn();

  beforeEach(async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
      });
    });

    await getSecretWord(mockSetSecretWord, mockSetServerError);
  });

  test('dont call getSecretWord and call SetServerError', async () => {
    expect(mockSetServerError).toHaveBeenCalledWith(true);
    expect(mockSetSecretWord).not.toHaveBeenCalled();
  })
})


