import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '#/routers/router';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '#/assets/sass/GlobalStyles';
import { ToastProvider } from 'react-toast-notifications';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/rootReducer';
import { load, save } from 'redux-localstorage-simple';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, load(), composeWithDevTools(applyMiddleware(thunk, save())));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* bọc scss */}
    <GlobalStyles>
      {/* bọc redux */}
      <Provider store={store}>
        {/* bọc thông báo */}
        <ToastProvider placement="bottom-left">
          <App />
        </ToastProvider>
      </Provider>
    </GlobalStyles>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
