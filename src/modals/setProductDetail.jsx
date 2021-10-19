import React from "react";
import { Modal, Button, Input } from "antd";

class SetProductDetail extends React.Component {
  state = {
    createProductForm: {
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
          description: "Good product",
          date: "14:00 22.08.2021",
        },
      ],
    },
    visible: false,
  };
  onSubmit = () => {
    this.props.addProduct(this.state.createProductForm);
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
    const name = e.target.name.split("-");
    let value = e.target.value;
    if (name.length === 2)
      value = { ...this.state.createProductForm[name[0]], [name[1]]: value };
    this.setState({
      createProductForm: { ...this.state.createProductForm, [name[0]]: value },
    });
  };

  render() {
    console.log("Modal state", this.state);
    return (
      <div>
        <>
          <Button type="primary" onClick={this.showModal}>
            Add new
          </Button>
          <Modal
            title="Add new product"
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
                disabled={
                  !Object.values(this.state.createProductForm).every((el) => el)
                }
                type={"primary"}
              >
                Confirm
              </Button>,
            ]}
          >
            <Input
              value={this.state.createProductForm.name}
              name={"name"}
              onChange={this.onFormInputChange}
              placeholder="Enter name of product"
            />
            <Input
              value={this.state.createProductForm.count}
              name={"count"}
              onChange={this.onFormInputChange}
              placeholder="Enter count of product"
            />
            <Input
              value={this.state.createProductForm.imageUrl}
              name={"imageUrl"}
              onChange={this.onFormInputChange}
              placeholder="Enter imageUrl of product"
            />
            <Input
              value={this.state.createProductForm.weight}
              name={"weight"}
              onChange={this.onFormInputChange}
              placeholder="Enter weight of product"
            />
            <Input
              value={this.state.createProductForm.size.width}
              name={"size-width"}
              onChange={this.onFormInputChange}
              placeholder="Enter width of product"
            />
            <Input
              value={this.state.createProductForm.size.height}
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

export default SetProductDetail;
