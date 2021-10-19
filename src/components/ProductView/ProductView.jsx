import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addComment,
  deleteComment,
  editProduct,
  selectItem,
} from "../../store/productListReducer";
import styles from "./ProductView.module.css";
import notFoundPhoto from "../../assets/images/shop.png";
import { Button, Input } from "antd";
import EditProductDetail from "../../modals/editProductDetail";

const ProductView = (props) => {
  const [addCommentInput, setAddCommentInput] = useState("");

  useEffect(() => {
    console.log("props", props);
  }, [props.item]);

  const onAddCommentClick = (id) => {
    if (addCommentInput) {
      props.addComment(id, addCommentInput);
      setAddCommentInput("");
    }
  };
  const onDeleteCommentClick = (id, commentId) => {
    props.deleteComment(id, commentId);
  };

  if (!props.item.id) return <div></div>;
  return (
    <div className={styles.main}>
      <div className={styles.editProductDetailButton}>
        <EditProductDetail editProduct={props.editProduct} item={props.item} />
      </div>
      <div className={styles.productInfoCard}>
        <div className={styles.imgInfoCard}>
          <div className={styles.imgEditWrapper}>
            <img
              alt="photoNotFound"
              src={props.item.imageUrl ? props.item.imageUrl : notFoundPhoto}
              className={styles.photoNotFound}
            />
          </div>
        </div>
        <div>Name: {props.item.name}</div>
        <div>Count: {props.item.count}</div>
        <div>Weight: {props.item.weight}</div>
        <div>
          Width: {props.item.size.width}
          <br />
          Height: {props.item.size.height}
        </div>
        <div className={styles.itemComments}>
          <a>Comments:</a>
          {props.item.comments?.map((el) => (
            <div className={styles.commentWrapper} key={el.id}>
              <div>
                Date: {el.date} <br />
                Description: {el.description}
              </div>
              <div className={styles.deleteCommentButton}>
                <Button
                  type="primary"
                  onClick={() => {
                    onDeleteCommentClick(el.productId, el.id);
                  }}
                >
                  DELETE COMMENT
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.inputWrapper}>
          <Input
            placeholder="Enter text for your comment"
            onChange={(e) => {
              setAddCommentInput(e.target.value);
            }}
            value={addCommentInput}
          />
        </div>
        <div className={styles.addCommentButton}>
          <Button
            onClick={() => {
              onAddCommentClick(props.item.id);
            }}
          >
            ADD COMMENT
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.products.item,
});

export default connect(mapStateToProps, {
  selectItem,
  addComment,
  deleteComment,
  editProduct,
})(ProductView);
