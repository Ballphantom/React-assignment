import { Middleware } from 'redux';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    localStorage.setItem('reduxState', JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
  return result;
};

export default localStorageMiddleware;
