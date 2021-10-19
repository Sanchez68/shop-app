import React, { useEffect, useState } from "react";
import notFoundPhoto from "../../assets/images/shop.png";
import styles from "./Products.module.css";
import Preloader from "../common/preloader/preloader";
import { Button, Col, Dropdown, Menu, Modal, Row } from "antd";
import SetProductDetail from "../../modals/setProductDetail";
import { connect } from "react-redux";
import {
  addProduct,
  deleteProduct,
  requestProducts,
  selectItem,
  setItems,
} from "../../store/productListReducer";

const Products = (props) => {
  useEffect(() => {
    props.requestProducts();
  }, []);

  const [sortType, setSortType] = useState("name");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onDeleteProduct = (id) => {
    props.deleteProduct(id);
  };

  const showModal = (id) => {
    setDeleteModalVisible(id);
  };

  const closeModal = () => {
    setDeleteModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a
          onClick={() => {
            setSortType("name");
          }}
        >
          Name
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a
          onClick={() => {
            setSortType("count");
          }}
        >
          Count
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a
          onClick={() => {
            setSortType("weight");
          }}
        >
          Weight
        </a>
      </Menu.Item>
    </Menu>
  );

  if (!props.items) {
    return <Preloader />;
  }

  return (
    <div className={styles.leftContainerMain}>
      <div>
        <div className={styles.addButton}>
          <div>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {sortType.toUpperCase()}
              </a>
            </Dropdown>
          </div>
          <div>
            <SetProductDetail addProduct={props.addProduct} />
          </div>
        </div>
      </div>
      <Row className={styles.leftContainer} gutter={[16, 16]}>
        {props.items
          .sort((a, b) => {
            let first =
              typeof a[sortType] === "string"
                ? a[sortType].toLowerCase()
                : a[sortType];
            let second =
              typeof b[sortType] === "string"
                ? b[sortType].toLowerCase()
                : b[sortType];

            if (
              typeof a[sortType] !== "string" ||
              typeof b[sortType] !== "string"
            )
              return a[sortType] - b[sortType];

            if (sortType === "weight") {
              first = a[sortType].substring(0, a[sortType].length - 1);
              second = b[sortType].substring(0, b[sortType].length - 1);
              return Number(first) - Number(second);
            }

            if (first === second) return b.count - a.count;
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
          })
          .map((i) => (
            <Col span={8} key={i.id}>
              <div
                className={styles.itemWindow}
                onClick={() => props.selectItem(i)}
              >
                <div className={styles.productImg}>
                  <img
                    alt="photoNotFound"
                    src={i.imageUrl ? i.imageUrl : notFoundPhoto}
                    className={styles.photoNotFound}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div>Name: {i.name}</div>
                  <div>Count: {i.count}</div>
                  <div>Weight: {i.weight}</div>
                  <div>
                    Width: {i.size.width}
                    <br />
                    Height: {i.size.height}
                  </div>
                </div>
                <div className={styles.deleteButton}>
                  {/*id={i.id}*/}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(i.id);
                    }}
                    type="primary"
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            </Col>
          ))}
      </Row>
      <Modal
        title="Are you sure? Press 'Confirm' to delete"
        visible={deleteModalVisible}
        onOk={() => {
          closeModal();
          onDeleteProduct(deleteModalVisible);
        }}
        onCancel={closeModal}
        okText="Confirm"
        cancelText="Cancel"
      ></Modal>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    items: state.products.items,
    newItemBody: state.products.newItemBody,
  };
};

export default connect(mapStateToProps, {
  setItems,
  requestProducts,
  addProduct,
  deleteProduct,
  selectItem,
})(Products);
