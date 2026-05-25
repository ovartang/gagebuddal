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

    // 하단 로직({ items: [], workHours: 0 })에 맞춰 초기 데이터를 안전한 구조로 정의합니다.
    return {
      "2026-4-17": { items: [{ amount: 8400, platform: "배민" }, { amount: 4935, platform: "쿠팡" }], workHours: 0 },
      "2026-4-18": { items: [{ amount: 105000, platform: "쿠팡" }, { amount: 115500, platform: "배민" }], workHours: 0 },
      "2026-4-19": { items: [{ amount: 73500, platform: "쿠팡" }, { amount: 168000, platform: "배민" }], workHours: 0 },
      "2026-4-21": { items: [{ amount: 73500, platform: "배민" }, { amount: 23100, platform: "쿠팡" }], workHours: 0 },
      "2026-4-22": { items: [{ amount: 26250, platform: "쿠팡" }, { amount: 57750, platform: "배민" }], workHours: 0 },
      "2026-4-25": { items: [{ amount: 126000, platform: "배민" }], workHours: 0 },
      "2026-4-28": { items: [{ amount: 47250, platform: "배민" }], workHours: 0 },
      "2026-4-29": { items: [{ amount: 130148, platform: "배민" }], workHours: 0 },
      "2026-5-1": { items: [{ amount: 31500, platform: "배민" }], workHours: 0 },
      "2026-5-2": { items: [{ amount: 141750, platform: "배민" }], workHours: 0 },
      "2026-5-3": { items: [{ amount: 47250, platform: "쿠팡" }, { amount: 220500, platform: "배민" }], workHours: 0 },
      "2026-5-4": { items: [{ amount: 94500, platform: "배민" }], workHours: 0 },
      "2026-5-5": { items: [{ amount: 105000, platform: "배민" }], workHours: 0 },
      "2026-5-6": { items: [{ amount: 14700, platform: "쿠팡" }, { amount: 54600, platform: "배민" }], workHours: 0 },
      "2026-5-7": { items: [{ amount: 157500, platform: "배민" }, { amount: 12600, platform: "쿠팡" }], workHours: 0 },
      "2026-5-8": { items: [{ amount: 88200, platform: "배민" }, { amount: 119700, platform: "쿠팡" }], workHours: 0 },
      "2026-5-9": { items: [{ amount: 147000, platform: "배민" }, { amount: 6300, platform: "쿠팡" }], workHours: 0 },
      "2026-5-10": { items: [{ amount: 199500, platform: "배민" }, { amount: 39900, platform: "쿠팡" }], workHours: 0 },
      "2026-5-11": { items: [{ amount: 122850, platform: "쿠팡" }, { amount: 26250, platform: "배민" }], workHours: 0 },
      "2026-5-12": { items: [{ amount: 115500, platform: "쿠팡" }], workHours: 0 },
      "2026-5-13": { items: [{ amount: 92400, platform: "쿠팡" }, { amount: 57750, platform: "배민" }], workHours: 0 },
      "2026-5-14": { items: [{ amount: 84000, platform: "쿠팡" }, { amount: 5250, platform: "배민" }], workHours: 0 },
      "2026-5-15": { items: [{ amount: 113400, platform: "배민" }, { amount: 59850, platform: "쿠팡" }], workHours: 0 },
      "2026-5-16": { items: [{ amount: 71400, platform: "배민" }, { amount: 189000, platform: "쿠팡" }], workHours: 0 },
      "2026-5-17": { items: [{ amount: 63000, platform: "배민" }, { amount: 7770, platform: "쿠팡" }], workHours: 0 },
      "2026-5-19": { items: [{ amount: 49350, platform: "배민" }, { amount: 96600, platform: "쿠팡" }], workHours: 0 },
      "2026-5-20": { items: [{ amount: 17850, platform: "배민" }, { amount: 218400, platform: "쿠팡" }], workHours: 0 },
      "2026-5-21": { items: [{ amount: 84000, platform: "쿠팡" }, { amount: 4935, platform: "배민" }], workHours: 0 },
      "2026-5-23": { items: [{ amount: 99750, platform: "쿠팡" }, { amount: 15750, platform: "배민" }], workHours: 0 },
    };
  });

  const [amount, setAmount] = useState("");
  const [platform, setPlatform] = useState("쿠팡");
  const [workHours, setWorkHours] = useState("");

  useEffect(() => {
    localStorage.setItem("gagebu-data", JSON.stringify(data));
  }, [data]);

  const exportToCSV = () => {
    let csvContent = "\uFEFF";
    csvContent += "날짜,플랫폼,금액\n";

    Object.keys(data)
      .sort()
      .forEach((dateKey) => {
        const items = data[dateKey]?.items || [];
        items.forEach((item) => {
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
    const existingData = data[dateKey] || { items: [], workHours: 0 };
    const newItem = { platform, amount: Number(amount) };

    setData({
      ...data,
      [dateKey]: {
        ...existingData,
        items: [...(existingData.items || []), newItem],
      },
    });

    setAmount("");
  };

  const saveWorkHours = () => {
    const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
    const existingData = data[dateKey] || { items: [], workHours: 0 };

    setData({
      ...data,
      [dateKey]: {
        ...existingData,
        workHours: Number(workHours) || 0,
      },
    });

    setWorkHours("");
  };

  const deleteItem = (dateKey, idx) => {
    const existingData = data[dateKey] || { items: [], workHours: 0 };
    const updatedItems = (existingData.items || []).filter((_, i) => i !== idx);

    setData({
      ...data,
      [dateKey]: {
        ...existingData,
        items: updatedItems,
      },
    });
  };

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }
  for (let i = 1; i <= lastDate; i++) {
    dates.push(i);
  }

  const currentMonthKeys = Object.keys(data).filter((key) =>
    key.startsWith(`${currentYear}-${currentMonth + 1}-`)
  );

  let totalIn = 0;
  let baeminTotal = 0;
  let coupangTotal = 0;
  let totalHours = 0;

  currentMonthKeys.forEach((key) => {
    const dayData = data[key] || { items: [], workHours: 0 };
    const items = dayData.items || [];
    totalHours += dayData.workHours || 0;

    items.forEach((item) => {
      totalIn += item.amount;
      if (item.platform === "배민") baeminTotal += item.amount;
      if (item.platform === "쿠팡") coupangTotal += item.amount;
    });
  });

  const averageHourly = totalHours > 0 ? Math.round(totalIn / totalHours) : 0;
  const coupangSettlement = {};
  const baeminSettlement = {};

  Object.keys(data).forEach((key) => {
    const dayData = data[key] || { items: [], workHours: 0 };
    const items = dayData.items || [];

    items.forEach((item) => {
      const parts = key.split("-");
      const year = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const day = Number(parts[2]);

      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay();

      if (item.platform === "쿠팡") {
        let diffFromWednesday = dayOfWeek >= 3 ? dayOfWeek - 3 : dayOfWeek + 4;
        const startWednesday = new Date(currentDate);
        startWednesday.setDate(currentDate.getDate() - diffFromWednesday);

        const payFriday = new Date(startWednesday);
        payFriday.setDate(startWednesday.getDate() + 9);

        const payKey = `${payFriday.getFullYear()}-${payFriday.getMonth() + 1}-${payFriday.getDate()}`;
        if (!coupangSettlement[payKey]) coupangSettlement[payKey] = 0;
        coupangSettlement[payKey] += item.amount * 0.95;
      }

      if (item.platform === "배민") {
        let daysToAdd = 0;
        switch (dayOfWeek) {
          case 1: case 2: case 0: daysToAdd = 3; break;
          case 3: case 4: case 5: daysToAdd = 5; break;
          case 6: daysToAdd = 4; break;
          default: break;
        }

        const payDay = new Date(currentDate);
        payDay.setDate(currentDate.getDate() + daysToAdd);

        const payKey = `${payDay.getFullYear()}-${payDay.getMonth() + 1}-${payDay.getDate()}`;
        if (!baeminSettlement[payKey]) baeminSettlement[payKey] = 0;
        baeminSettlement[payKey] += item.amount * 0.95;
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
          if (d === null) return <div key={i} className="day empty"></div>;

          const dateKey = `${currentYear}-${currentMonth + 1}-${d}`;
          const coupangAmount = coupangSettlement[dateKey] || 0;
          const baeminAmount = baeminSettlement[dateKey] || 0;

          const dayData = data[dateKey] || { items: [], workHours: 0 };
          const dayItems = dayData.items || [];
          const dayIn = dayItems.reduce((a, b) => a + b.amount, 0);

          const isToday =
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            today.getDate() === d;

          return (
            <div
              key={i}
              className={`day ${isToday ? "today" : ""}`}
              onClick={() => setSelectedDate(d)}
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
      <div>
        총 근무시간: <span className="income">{totalHours.toFixed(1)}시간</span>
      </div>

      <div>
        평균 시급: <span className="income" style={{ color: "#3498db", fontWeight: "bold" }}>{averageHourly.toLocaleString()}원</span>
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

            {(() => {
              const selectedData = data[`${currentYear}-${currentMonth + 1}-${selectedDate}`] || { items: [], workHours: 0 };
              const selectedItems = selectedData.items || [];

              const baemin = selectedItems.filter((item) => item.platform === "배민").reduce((sum, item) => sum + item.amount, 0);
              const coupang = selectedItems.filter((item) => item.platform === "쿠팡").reduce((sum, item) => sum + item.amount, 0);
              const totalAmount = selectedItems.reduce((sum, item) => sum + item.amount, 0);
              const totalHours = selectedData.workHours || 0;
              const hourly = totalHours > 0 ? Math.round(totalAmount / totalHours) : 0;

              return (
                <div style={{ marginBottom: "15px" }}>
           
                  <div>⏰ 총 근무시간: {totalHours}시간</div>
                  <div style={{ color: "#3498db", fontWeight: "bold", marginTop: "5px" }}>
                    💰 평균 시급: {hourly.toLocaleString()}원
                  </div>
                </div>
              );
            })()}

            <div className="input-group">
              <div className="radio-group" style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "15px", width: "100%" }}>
                <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" }}>
                  <input type="radio" value="쿠팡" checked={platform === "쿠팡"} onChange={(e) => setPlatform(e.target.value)} />
                  🚚 쿠팡
                </label>
                <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" }}>
                  <input type="radio" value="배민" checked={platform === "배민"} onChange={(e) => setPlatform(e.target.value)} />
                  🛵 배민
                </label>
              </div>

              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="금액 입력" />
              <button className="save-btn" onClick={handleSave} style={{ marginTop: "8px" }}>금액 추가</button>

              <input type="number" value={workHours} onChange={(e) => setWorkHours(e.target.value)} placeholder="근무시간 입력" style={{ marginTop: "18px" }} />
              <button className="save-btn" onClick={saveWorkHours} style={{ marginTop: "8px" }}>근무시간 저장</button>
            </div>

            <div className="item-list">
              {(data[`${currentYear}-${currentMonth + 1}-${selectedDate}`]?.items || []).map((item, idx) => (
                <div key={idx} className="item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderBottom: "1px solid #eee" }}>
                  <span>{item.platform} / {item.amount.toLocaleString()}원</span>
                  <button
                    className="del-btn"
                    style={{ width: "24px", height: "24px", minWidth: "24px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }}
                    onClick={() => deleteItem(`${currentYear}-${currentMonth + 1}-${selectedDate}`, idx)}
                  >
                    x
                  </button>
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
