import s from "./App.module.css";
import { Col, Layout, Row } from "antd";
import Products from "./components/Products/Products";
import ProductView from "./components/ProductView/ProductView";
import "antd/dist/antd.css";

function App() {
  return (
    <Layout>
      <div className={s.app}>
        <Row>
          <Col span={12}>
            <Products />
          </Col>
          <Col span={12}>
            <ProductView />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default App;
