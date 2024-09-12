import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuLan from "./components/menuLan/Language";
import "./App.scss";

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
    <div className="lan-menu">
      <MenuLan />
    </div>
      <div className="app-container">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="card" onClick={() => handleCardClick("/layout")}>
              <h3>{t("tests.test1.title")}</h3>
              <p>{t("tests.test1.description")}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="card" onClick={() => handleCardClick("/page2")}>
              <h3>{t("tests.test2.title")}</h3>
              <p>{t("tests.test2.description")}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="card" onClick={() => handleCardClick("/form")}>
              <h3>{t("tests.test3.title")}</h3>
              <p>{t("tests.test3.description")}</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
