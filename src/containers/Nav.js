import { connect } from "react-redux";
import { push } from "connected-react-router";
import Nav from "../components/Nav";

const mapStateToProps = state => ({
  //  state.shopping.categoriesをprops.categoriesに紐づけ
  categories: state.shopping.categories
});

const mapDispatchToProps = dispatch => ({
  onClick(path) {
    // onClick字にconnected-react-routerのpushでページ遷移を発生させる
    dispatch(push(path));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
