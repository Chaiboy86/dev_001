import fetchJsonp from "fetch-jsonp";
import qs from "qs";
import { replace } from "react-router-redux";

const API_URL =
  "https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking";

// さきほど取得したアプリケーションIDを記述
const APP_ID = "dj00aiZpPVcwT0U3bWxoelRzaSZzPWNvbnN1bWVyc2VjcmV0Jng9NTk-";

// リクエスト開始
const startRequest = category => ({
  type: "START_REQUEST",
  payload: { category }
});

// レスポンス受信
const recieveData = (category, error, response) => ({
  type: "RECIEVE_DATA",
  payload: { category, error, response }
});

// リクエスト完了
const finishRequest = category => ({
  type: "FINISH_REQUEST",
  payload: { category }
});

// ランキングを取得する
export const fetchRanking = categoryId => {
  // getState関数でstate.shopping.categoriesにアクセスする
  // redux-thunkを使った非同期処理
  return async (dispatch, getState) => {
    //   カテゴリIDに対応するstate.shopping.categoriesの要素を取得
    const categories = getState().shopping.categories;
    const category = categories.find(category => category.id === categoryId);
    // 対応するデータがない場合はトップページへリダイレクト
    if (typeof category === "undefined") {
      dispatch(replace("/"));
      return;
    }

    dispatch(startRequest(category));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId
    });

    try {
      const response = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await response.json();
      dispatch(recieveData(category, null, data));
    } catch (err) {
      dispatch(recieveData(category, err));
    }
    dispatch(finishRequest(category));
  };
};
