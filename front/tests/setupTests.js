import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setLogger } from 'react-query';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

configure({ adapter: new Adapter() });

const noop = () => {};
setLogger({
  log: noop,
  warn: noop,
  error: noop,
});

// eslint-disable-next-line no-console
const originalConsoleWarn = console.warn;
// eslint-disable-next-line no-console
console.warn = (...args) => {
  const message = args[0];

  const isAntdAsyncValidatorWarning = /^async-validator/.test(message);

  if (!isAntdAsyncValidatorWarning) originalConsoleWarn(...args);
};
