import KakaoMap from "../components/Map/KakaoMap";
import "../styles/main.css";

const MainPage = () => {
  return (
    <div className="main-container">
      <div className="map-container">
        {/* <KakaoMap searchKeyword={searchKeyword} /> */}
        <KakaoMap />
      </div>
    </div>
  );
};

export default MainPage;
