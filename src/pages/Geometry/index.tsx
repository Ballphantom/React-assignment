import React, { useState } from 'react';
import { Row, Col } from "antd";
import "./style.scss";
import { useTranslation } from "react-i18next";
import MenuLan from "../../components/menuLan/Language";

const initialShapes = ['square', 'circle', 'ellipse', 'trapezoid', 'rectangle', 'parallelogram'];

export default function Index() {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState(initialShapes);

  const shiftLeft = () => {
    setShapes(prevShapes => {
      const [first, ...rest] = prevShapes;
      return [...rest, first];
    });
  };

  const shiftRight = () => {
    setShapes(prevShapes => {
      const last = prevShapes[prevShapes.length - 1];
      const rest = prevShapes.slice(0, -1);
      return [last, ...rest];
    });
  };

  const shiftUpDown = () => {
    setShapes(prevShapes => {
      const chunkSize = 3;
      const [firstChunk, secondChunk] = [
        prevShapes.slice(0, chunkSize),
        prevShapes.slice(chunkSize)
      ];
      return [...secondChunk, ...firstChunk];
    });
  };

  // Function to randomize shapes
  const randomizeShapes = () => {
    setShapes(prevShapes => {
      const shuffled = [...prevShapes].sort(() => Math.random() - 0.5);
      return shuffled;
    });
  };

  return (
    <>
      <div className="lan-menu">
        <MenuLan />
      </div>
      
      {/* move controll */}
      <div className="app-container">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="card card-left" onClick={shiftLeft}>
              <div className="triangle-left"></div>
              <p className="description">{t("moves.shave")}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="card card-up-down" onClick={shiftUpDown}>
              <div className='triangle-up-down'>
                <div className="triangle-up"></div>
                <div className="triangle-down"></div>                
              </div>
              <p className="description">{t("moves.position")}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="card card-right" onClick={shiftRight}>
              <div className="triangle-right"></div>
              <p className="description">{t("moves.shave")}</p>
            </div>
          </Col>
        </Row>

        <hr />

        {/* moveable index shape */}
        <Row gutter={16}>
          <div className="shape-container">
            {shapes.map((shape, index) => (
              <Col key={index} xs={8}>
                <div className="card" onClick={randomizeShapes}>
                  <div className={`shape ${shape}`}></div>
                </div>
              </Col>
            ))}
          </div>
        </Row>
      </div>
    </>
  );
}
