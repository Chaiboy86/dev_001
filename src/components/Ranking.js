import React from "react";
import PropTypes from "prop-types";
import Card, { CardMedia, CardContent, CardActions } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

// ライフサイクルメソッドを使うのでclassに変更
export default class Ranking extends React.Component {
  // componentDidMount, componentWillRecievePropsを追加
  componentDidMount() {
    this.props.onMount(this.props.categoryId);
  }
  componentWillReciveProps(nextProps) {
    if (this.props.categoryId !== nextProps.categoryId) {
      // props.categoryIdに変化があるので、ページ遷移が発生している
      this.props.onUpdate(nextProps.categoryId);
    }
  }

  render() {
    const { category, ranking, error } = this.props;

    return (
      <div>
        {/* ランキングのタイトル（2の機能） */}
        <h2>
          {typeof category !== "undefined"
            ? `${category.name}のランキング`
            : ""}
        </h2>
        {(() => {
          if (error) {
            // エラーを表示
            return <p>エラーが発生しました。リロードしてください。</p>;
          } else if (typeof ranking === "undefined") {
            // リクエスト完了前
            return <p>読み込み中...</p>;
          } else {
            // ランキングの表示（3の機能)
            return ranking.map((item, i) => (
              <Card
                key={`ranking-item-${item.code}`}
                style={{ maxWidth: "500px", margin: "32px auto" }}
              >
                <CardMedia
                  image={item.imageUrl}
                  title={`${i + 1}位 ${item.name}`}
                  style={{ height: "200px" }}
                />
                <CardContent>
                  <Typography type="title">
                    {`${i + 1}位 ${item.name}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button raised color="secondary" fullWidth href={item.url}>
                    商品ページへ
                  </Button>
                </CardActions>
              </Card>
            ));
          }
        })()}
      </div>
    );
  }
}

Ranking.propTypes = {
  categoryId: PropTypes.string.isRequired,
  // onMount, onUpdateを追加
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,

  // category, ranking, errorの方を追加
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ),
  error: PropTypes.bool.isRequired
};
Ranking.defaultProps = {
  // categoryId=1は総合ランキング
  categoryId: "1"
};
