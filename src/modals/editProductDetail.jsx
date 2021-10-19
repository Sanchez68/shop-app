import React from "react";
import { Modal, Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

class EditProductDetail extends React.Component {
  state = {
    editProductForm: {
      name: "",
      count: "",
      imageUrl: "",
      size: {
        width: "",
        height: "",
      },
      weight: "",
      comments: [
        {
          productId: null,
          description: "",
          date: "",
        },
      ],
    },
    visible: false,
  };

  componentDidMount() {
    this.setState({
      editProductForm: this.props.item,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.item.id !== prevProps.item.id) {
      this.setState({
        editProductForm: this.props.item,
      });
    }
  }

  onSubmit = () => {
    this.props.editProduct(this.props.item.id, this.state.editProductForm);
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  onFormInputChange = (e) => {
    //this.setState({editProductForm: {...this.state.editProductForm, [e.target.name]: e.target.value}})

    const name = e.target.name.split("-");
    let value = e.target.value;
    if (name.length === 2)
      value = { ...this.state.editProductForm[name[0]], [name[1]]: value };
    this.setState({
      editProductForm: { ...this.state.editProductForm, [name[0]]: value },
    });
  };

  render() {
    console.log("Modal state", this.props);
    return (
      <div>
        <>
          <Button type="primary" onClick={this.showModal}>
            <EditOutlined key="edit" />
          </Button>
          <Modal
            title="Modal"
            visible={this.state.visible}
            onCancel={this.hideModal}
            okText="Confirm"
            cancelText="Cancel"
            footer={[
              <Button
                onClick={() => {
                  this.onSubmit();
                  this.hideModal();
                }}
                type={"primary"}
              >
                Confirm
              </Button>,
            ]}
          >
            <Input
              value={this.state.editProductForm.name}
              name={"name"}
              onChange={this.onFormInputChange}
              placeholder="Enter name of product"
            />
            <Input
              value={this.state.editProductForm.count}
              name={"count"}
              onChange={this.onFormInputChange}
              placeholder="Enter count of product"
            />
            <Input
              value={this.state.editProductForm.imageUrl}
              name={"imageUrl"}
              onChange={this.onFormInputChange}
              placeholder="Enter imageUrl of product"
            />
            <Input
              value={this.state.editProductForm.weight}
              name={"weight"}
              onChange={this.onFormInputChange}
              placeholder="Enter weight of product"
            />
            <Input
              value={this.state.editProductForm.size.width}
              name={"size-width"}
              onChange={this.onFormInputChange}
              placeholder="Enter width of product"
            />
            <Input
              value={this.state.editProductForm.size.height}
              name={"size-height"}
              onChange={this.onFormInputChange}
              placeholder="Enter height of product"
            />
          </Modal>
        </>
      </div>
    );
  }
}

export default EditProductDetail;
