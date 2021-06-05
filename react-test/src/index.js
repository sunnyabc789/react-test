import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from './components/home'
import GoodsList from "./components/goodsList";
import UserAdd from './components/input'
import {
  KeepAliveProvider,
  WithKeepAlive,
} from "./components/keepalive-react-component";

import { SagaModel } from "redux-saga-model";
import { Provider } from "react-redux";
import todoModel from "./todoModel";

const sagaModel = new SagaModel({
  initialState: {},
  // initialReducer: () => {},
  initialMiddleware: [],
  // initialModels: {},
  // history,
  // prefix,
});

const store = sagaModel.store();

sagaModel.register(todoModel);

// const KeepAliveHome = WithKeepAlive(Home, { cacheId: "Home" });
const KeepGoodsList = WithKeepAlive(GoodsList, { cacheId: "GoodsList", scroll: true });
const KeepUserAdd = WithKeepAlive(UserAdd, { cacheId: "UserAdd" });

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <KeepAliveProvider>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/list">用户列表</Link>
            </li>
            <li>
              <Link to="/add">添加用户</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/" component={Home} exact />
            {/* <Route path="/list" component={KeepGoodsList} /> */}
            <Route path="/add" component={KeepUserAdd} />
          </Switch>
        </KeepAliveProvider>
      </BrowserRouter>
    </Provider>
  );
}


ReactDOM.render(<App />, document.getElementById('root'))