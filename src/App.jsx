import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

const [data, setData] = useState(() => {
  const saved = localStorage.getItem("gagebu-data");

  if (saved) return JSON.parse(saved);

  return {
    "2026-4-17": [
      { amount: 8000, platform: "배민" },
      { amount: 4700, platform: "쿠팡" },
    ],

    "2026-4-18": [
      { amount: 100000, platform: "쿠팡" },
      { amount: 110000, platform: "배민" },
    ],

    "2026-4-19": [
      { amount: 70000, platform: "쿠팡" },
      { amount: 160000, platform: "배민" },
    ],

    "2026-4-21": [
      { amount: 70000, platform: "배민" },
      { amount: 22000, platform: "쿠팡" },
    ],

    "2026-4-22": [
      { amount: 25000, platform: "쿠팡" },
      { amount: 55000, platform: "배민" },
    ],

    "2026-4-25": [
      { amount: 120000, platform: "배민" },
    ],

    "2026-4-28": [
      { amount: 45000, platform: "배민" },
    ],

    "2026-4-29": [
      { amount: 123950, platform: "배민" },
    ],

    "2026-5-1": [
      { amount: 30000, platform: "배민" },
    ],

    "2026-5-2": [
      { amount: 135000, platform: "배민" },
    ],

    "2026-5-3": [
      { amount: 45000, platform: "쿠팡" },
      { amount: 210000, platform: "배민" },
    ],

    "2026-5-4": [
      { amount: 90000, platform: "배민" },
    ],

    "2026-5-5": [
      { amount: 100000, platform: "배민" },
    ],

    "2026-5-6": [
      { amount: 14000, platform: "쿠팡" },
      { amount: 52000, platform: "배민" },
    ],

    "2026-5-7": [
      { amount: 150000, platform: "배민" },
      { amount: 12000, platform: "쿠팡" },
    ],

    "2026-5-8": [
      { amount: 84000, platform: "배민" },
      { amount: 114000, platform: "쿠팡" },
    ],

    "2026-5-9": [
      { amount: 140000, platform: "배민" },
      { amount: 6000, platform: "쿠팡" },
    ],

    "2026-5-10": [
      { amount: 190000, platform: "배민" },
      { amount: 38000, platform: "쿠팡" },
    ],

    "2026-5-11": [
      { amount: 117000, platform: "쿠팡" },
      { amount: 25000, platform: "배민" },
    ],

    "2026-5-12": [
      { amount: 110000, platform: "쿠팡" },
    ],

    "2026-5-13": [
      { amount: 88000, platform: "쿠팡" },
      { amount: 55000, platform: "배민" },
    ],

    "2026-5-14": [
      { amount: 80000, platform: "쿠팡" },
      { amount: 5000, platform: "배민" },
    ],

    "2026-5-15": [
      { amount: 108000, platform: "배민" },
      { amount: 57000, platform: "쿠팡" },
    ],

    "2026-5-16": [
      { amount: 68000, platform: "배민" },
      { amount: 180000, platform: "쿠팡" },
    ],

    "2026-5-17": [
      { amount: 60000, platform: "배민" },
      { amount: 7400, platform: "쿠팡" },
    ],
  };
});
  const [amount, setAmount] = useState("");
  const [platform, setPlatform] = useState("쿠팡");

  useEffect(() => {
    localStorage.setItem("gagebu-data", JSON.stringify(data));
  }, [data]);

  

  const exportToCSV = () => {
    let csvContent = "\uFEFF";
    csvContent += "날짜,플랫폼,금액\n";

    Object.keys(data)
      .sort()
      .forEach((dateKey) => {
        data[dateKey].forEach((item) => {
          csvContent += `${dateKey},${item.platform},${item.amount}\n`;
        });
      });

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `가계부_${currentYear}_${currentMonth + 1}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
  };

  const handleSave = () => {
    if (!amount) {
      alert("금액 입력!");
      return;
    }

    const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;

    const newItem = {
      platform,
      amount: Number(amount),
    };

    const updated = data[dateKey]
      ? [...data[dateKey], newItem]
      : [newItem];

    setData({
      ...data,
      [dateKey]: updated,
    });

    setAmount("");
  };

  const deleteItem = (dateKey, idx) => {
    const updated = data[dateKey].filter((_, i) => i !== idx);

    const newData = {
      ...data,
      [dateKey]: updated,
    };

    if (updated.length === 0) {
      delete newData[dateKey];
    }

    setData(newData);
  };

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const lastDate = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  for (let i = 1; i <= lastDate; i++) {
    dates.push(i);
  }

  const currentMonthKeys = Object.keys(data).filter((key) =>
    key.includes(`${currentYear}-${currentMonth + 1}-`)
  );

  let totalIn = 0;
  let baeminTotal = 0;
  let coupangTotal = 0;

  currentMonthKeys.forEach((key) => {
    data[key].forEach((item) => {
      totalIn += item.amount;

      if (item.platform === "배민") {
        baeminTotal += item.amount;
      }

      if (item.platform === "쿠팡") {
        coupangTotal += item.amount;
      }
    });
  });

  const coupangSettlement = {};
  const baeminSettlement = {};

  Object.keys(data).forEach((key) => {
    data[key].forEach((item) => {
      const parts = key.split("-");
      const year = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const day = Number(parts[2]);

      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay();

      if (item.platform === "쿠팡") {
        let diffFromWednesday;
        if (dayOfWeek >= 3) {
          diffFromWednesday = dayOfWeek - 3;
        } else {
          diffFromWednesday = dayOfWeek + 4;
        }

        const startWednesday = new Date(currentDate);
        startWednesday.setDate(currentDate.getDate() - diffFromWednesday);

        const payFriday = new Date(startWednesday);
        payFriday.setDate(startWednesday.getDate() + 9);

        const payKey = `${payFriday.getFullYear()}-${payFriday.getMonth() + 1}-${payFriday.getDate()}`;

        if (!coupangSettlement[payKey]) coupangSettlement[payKey] = 0;
        coupangSettlement[payKey] += item.amount;
      }

      if (item.platform === "배민") {
        let daysToAdd = 0;

        switch (dayOfWeek) {
          case 1: daysToAdd = 3; break;
          case 2: daysToAdd = 3; break;
          case 3: daysToAdd = 5; break;
          case 4: daysToAdd = 5; break;
          case 5: daysToAdd = 5; break;
          case 6: daysToAdd = 4; break;
          case 0: daysToAdd = 3; break;
          default: break;
        }

        const payDay = new Date(currentDate);
        payDay.setDate(currentDate.getDate() + daysToAdd);

        const payKey = `${payDay.getFullYear()}-${payDay.getMonth() + 1}-${payDay.getDate()}`;

        if (!baeminSettlement[payKey]) baeminSettlement[payKey] = 0;
        baeminSettlement[payKey] += item.amount;
      }
    });
  });

  const settlementTextContainerStyle = {
    marginTop: "2px",
    lineHeight: "1.2",
    letterSpacing: "-0.5px"
  };

  return (
    <div className="container">
      <div className="header">
        <button className="nav-btn" onClick={() => changeMonth(-1)}>◀</button>
        <h2>{currentYear}년 {currentMonth + 1}월 배달 수입</h2>
        <button className="nav-btn" onClick={() => changeMonth(1)}>▶</button>
      </div>

      <div className="calendar">
        {dates.map((d, i) => {
          const dateKey = `${currentYear}-${currentMonth + 1}-${d}`;

          const coupangAmount = coupangSettlement[dateKey] || 0;
          const baeminAmount = baeminSettlement[dateKey] || 0;

          const dayItems = data[dateKey] || [];
          const dayIn = dayItems.reduce((a, b) => a + b.amount, 0);

          const isToday =
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            today.getDate() === d;

          return (
            <div
              key={i}
              className={`day ${d === null ? "empty" : ""} ${isToday ? "today" : ""}`}
              onClick={() => d && setSelectedDate(d)}
              style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "4px" }}
            >
              <div className="date">{d}</div>

              {dayIn > 0 && (
                <div className="income">
                  +{(dayIn / 10000).toFixed(1)}만
                </div>
              )}

              {coupangAmount > 0 && (
                <div 
                  className="income" 
                  style={{ ...settlementTextContainerStyle, color: "#e67e22", fontWeight: "bold" }}
                >
                  쿠 +{(coupangAmount / 10000).toFixed(1)}
                </div>
              )}

              {baeminAmount > 0 && (
                <div 
                  className="income" 
                  style={{ ...settlementTextContainerStyle, color: "#2ecc71", fontWeight: "bold" }}
                >
                  배 +{(baeminAmount / 10000).toFixed(1)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="summary">
        <div>총 수익: <span className="income" style={{ fontSize: "22px", fontWeight: "bold" }}>{totalIn.toLocaleString()}원</span></div>
        <button className="backup-btn" onClick={exportToCSV}>💾 백업</button>
      </div>

      <div className="delivery-summary">
        <div className="delivery-card baemin-card">
          <div className="delivery-title">🛵 배민 수익</div>
          <div className="delivery-money">{baeminTotal.toLocaleString()}원</div>
        </div>
        <div className="delivery-card coupang-card">
          <div className="delivery-title">🚚 쿠팡 수익</div>
          <div className="delivery-money">{coupangTotal.toLocaleString()}원</div>
        </div>
      </div>

      {selectedDate && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedDate}일 내역</h3>
            <div className="input-group">
              <div className="radio-group" style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "15px", width: "100%" }}>
                
                {/* 💖 이 부분이 드디어 한 줄 정렬과 글씨 크기가 올바르게 반영되었습니다! */}
                <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" }}>
                  <input type="radio" value="쿠팡" checked={platform === "쿠팡"} onChange={(e) => setPlatform(e.target.value)} />🚚 쿠팡
                </label>
                
                <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" }}>
                  <input type="radio" value="배민" checked={platform === "배민"} onChange={(e) => setPlatform(e.target.value)} />🛵 배민
                </label>
                
              </div>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="금액" />
              <button className="save-btn" onClick={handleSave}>추가</button>
            </div>

            <div className="item-list">
              {(data[`${currentYear}-${currentMonth + 1}-${selectedDate}`] || []).map((item, idx) => (
                <div key={idx} className="item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderBottom: "1px solid #eee" }}>
                  <span>{item.platform} / {item.amount.toLocaleString()}원</span>
                  <button className="del-btn" style={{ width: "24px", height: "24px", minWidth: "24px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }} onClick={() => deleteItem(`${currentYear}-${currentMonth + 1}-${selectedDate}`, idx)}>x</button>
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setSelectedDate(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
