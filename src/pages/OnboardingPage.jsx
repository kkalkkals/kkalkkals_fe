import React, { useState } from "react";
import "../styles/onboarding.css";
import { useNavigate } from "react-router-dom";
import jejuSign from "../asset/jeju-sign.png";
import trash from "../asset/trash.png";
import peopleTrash from "../asset/peaple-trash.png";

const OnboardingPage = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const slides = [
        {
            image: jejuSign,
            title: "제주도에서 쓰레기를 버리려면?",
            description: "클린하우스 & 재활용 도움센터에 배출해야 해요.",
        },
        {
            image: peopleTrash,
            title: "쓰레기 배출, 너무 복잡하지 않나요?",
            description: "월·수·금 → 플라스틱\n화·토 → 종이류, 불에 안 타는 쓰레기\n목 → 종이류, 비닐류\n일 → 플라스틱류, 비닐류...",
        },
        {
            image: trash,
            title: "이제 고민하지 마세요!\n깔깔쓰에서는",
            description: "📍 나에게 가장 가까운 배출 장소를 보여주고\n📍 분리배출 대행 서비스를 신청할 수 있어요!",
        },
    ];

    const handlePrev = () => {
        if (index > 0) setIndex(index - 1);
    };

    const handleNext = () => {
        if (index < slides.length - 1) setIndex(index + 1);
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-slides">
                <div
                    className="onboarding-slide-wrapper"
                    style={{ transform: `translateX(-${index * 100}%)`, display: "flex", width: `${slides.length * 100}%` }}
                >
                    {slides.map((slide, i) => (
                        <div key={i} className="onboarding-slide">
                            <img src={slide.image} alt="onboarding" className="onboarding-image" />
                            <h2 className="onboarding-title">{slide.title}</h2>
                            <p className="onboarding-description">{slide.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 슬라이드 인디케이터 */}
            <div className="onboarding-indicators">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`indicator ${i === index ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                    ></button>
                ))}
            </div>

            {/* 좌우 이동 버튼 */}
            <div className="onboarding-controls">
                <button
                    className="arrow left"
                    onClick={handlePrev}
                    style={{ visibility: index === 0 ? "hidden" : "visible" }}
                >
                    ❮
                </button>
                <button
                    className="arrow right"
                    onClick={handleNext}
                    style={{ visibility: index === slides.length - 1 ? "hidden" : "visible" }}
                >
                    ❯
                </button>
            </div>

            {/* 하단 고정 버튼 */}
            <button className="onboarding-button" onClick={() => navigate("/map")}>
                배출 지도 바로가기
            </button>
        </div>
    );
};

export default OnboardingPage;
