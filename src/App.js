// React.jsを使用するためのライブラリをインポート
// React.Componentを書く手間を省くために、Componentのみを名前指定でインポート
import React, { Component } from "react";
// 画面遷移を可能にしてくれるライブラリ
import { Route, Redirect, Switch } from "react-router-dom";
import Ranking from "./containers/Ranking";
import Nav from "./containers/Nav";
// ベースのスタイルとなるRebootコンポーネントをインポート
import Reboot from "material-ui/Reboot";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ paddingLeft: 240 }}>
        <Reboot />
        <AppBar style={{ left: 240 }}>
          <Toolbar>
            <Typography type="title" color="inherit">
              Yahoo!ショッピングランキング
            </Typography>
          </Toolbar>
        </AppBar>
        <Nav />
        <div style={{ marginTop: 64, padding: 32 }}>
          <Switch>
            <Route path="/all" component={Ranking} />
            <Route path="/category/1" render={() => <Redirect to="/all" />} />
            <Route
              path="/category/:id"
              render={({ match }) => <Ranking categoryId={match.params.id} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
