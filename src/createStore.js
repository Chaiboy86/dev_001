import {
  // 名前が被ってしまうので別名でimportする
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
/* 複数のReducerをストア(store)に渡したいため、
複数のReducerが定義されている"./reducers/index.js"ファイルをインポート
 */
import * as reducers from "./reducers";

// historyはsrc/index.jsから渡すようにする
export default function createStore(history) {
  return reduxCreateStore(
    // 複数のReducerを使えるように結合(combine)する
    combineReducers({
      // スプレッド構文で全てのReducerを展開する
      ...reducers,
      router: connectRouter(history)
    }),
    applyMiddleware(
      logger,
      thunk,
      // react-router-reduxのRedux Middleware
      routerMiddleware(history)
    )
  );
}
