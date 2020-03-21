// React.jsを使用するためのライブラリをインポート
import React from "react";
// TODO:説明記載
import ReactDOM from "react-dom";
// TODO:説明記載
import { Provider } from "react-redux";
// TODO:説明記載
import { ConnectedRouter } from "connected-react-router";

// TODO:説明記載
// import { createBrowserHistory } from "history";
// Githubに公開するために一旦上記をコメントアウト、代わりに以下を使う

// Browser Historyの代わりに Hash Historyを利用
import { createHashHistory } from "history";

// TODO:説明記載
import createStore from "./createStore";
// TODO:説明記載
import App from "./App";
// TODO:説明記載
import * as serviceWorker from "./serviceWorker";
// TODO:説明記載
import "./index.css";

// historyのインスタンスを生成
// ルーティングするための履歴情報を保持するインスタンス
const history = createHashHistory();

// Storeの生成
// アプリ全体の状態(state)を管理するストア(store)を生成する
// storeには履歴情報(history)を引数として渡す
const store = createStore(history);

ReactDOM.render(
  // StoreをAppコンポーネントに紐付け
  /*  アプリ全体のためのストア(store)を使えるようにするために、
   Providerコンポーネントにstoreを渡し、
   AppコンポーネントをProviderコンポーネントでラップする */
  <Provider store={store}>
    {/* TODO: 説明を記載 */}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
