import React from 'react';
import '../Docker/Docker.css';
import LokiPostgre from '../assets/LokiPostgre.png';
import NodeExporter from '../assets/NodeExporter.png';
import DockerMinikube from '../assets/dockerMinikube.png';
import ReactModalImage from 'react-modal-image';

const Docker: React.FC = () => {
  return (
    <div className="docker-container">
      <div className="docker-content">
        <h2 className="docker-title">容器化</h2>
        <span className="docker-description">
          為了建立監控系統以及實作將服務容器化管理
        </span>
        <span className="docker-description">
        採用 MiniKube 實作kubernates ，以 Docker 作為運行時。
        </span>
        <div className="docker-description-ul-img">
          <span className="docker-description">
            <ul>
            <li style={{ listStyleType: 'none' }}>運行 GrafanaStack : </li>
            <li>儀表板 [Grafana] </li>
              <li>Log 收集監控 [Loki , Grafana Alloy]</li>
              <li>系統指標監控 [Prometheus , Node Exporter]</li>
            </ul>
          </span>
          <img src={DockerMinikube} alt="網站架構" className="docker-image" />
        </div>
        <div className="docker-image-container">
          <div className="image-container">
            <p className="dockerimage-caption">
              LokiPostgre
              <span className="click-to-zoom">(點擊圖片放大)</span>
            </p>
            <ReactModalImage 
              small={LokiPostgre} 
              large={LokiPostgre} 
              alt="LokiPostgre" 
              className="docker-image" 
            />
          </div>
          <div className="image-container">
            <p className="dockerimage-caption">
              NodeExporter
              <span className="click-to-zoom">(點擊圖片放大)</span>
            </p>
            <ReactModalImage 
              small={NodeExporter} 
              large={NodeExporter} 
              alt="NodeExporter" 
              className="docker-image" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docker;