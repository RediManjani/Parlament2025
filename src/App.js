
import React, { useState } from "react";

const qarqet = [
  "Tiranë", "Durrës", "Fier", "Elbasan", "Vlorë", "Shkodër",
  "Korçë", "Berat", "Lezhë", "Dibër", "Gjirokastër", "Kukës"
];

const parties = ["PS", "ASHM", "KNSHB", "PM", "LB", "KAE", "PSD", "Tjetër"];

const partyColors = {
  PS: "#E31B23",
  ASHM: "#003366",
  KNSHB: "#FFD700",
  PM: "#00BFFF",
  LB: "#9B59B6",
  KAE: "#3399FF",
  PSD: "#E75480",
  Tjetër: "#AAAAAA"
};

const initialMandates = () => {
  const data = {};
  qarqet.forEach(q => {
    data[q] = {};
    parties.forEach(p => data[q][p] = 0);
  });
  return data;
};

function App() {
  const [mandates, setMandates] = useState(initialMandates());

  const handleReset = () => {
    setMandates(initialMandates());
  };

  const getWinner = qark => {
    const partyData = mandates[qark];
    let max = -1;
    let winner = "Tjetër";
    for (const party in partyData) {
      if (partyData[party] > max) {
        max = partyData[party];
        winner = party;
      }
    }
    return winner;
  };

  const handleFocus = (e) => {
    if (e.target.value === "0") {
      e.target.select();
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: "center" }}>Zgjedhjet 2025</h1>
      <button onClick={handleReset} style={{ margin: "10px auto", display: "block", padding: "10px 20px" }}>
        🔄 Reset All Predictions
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {qarqet.map(qark => (
          <div
            key={qark}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              borderRadius: 8,
              backgroundColor: partyColors[getWinner(qark)],
              position: "relative"
            }}
          >
            <h3>{qark}</h3>
            <div
              style={{
                position: "absolute",
                top: 5,
                right: 10,
                fontSize: 12,
                background: "#fff",
                padding: "2px 6px",
                borderRadius: "4px",
                boxShadow: "0 0 2px rgba(0,0,0,0.2)"
              }}
            >
              {getWinner(qark)} ({mandates[qark][getWinner(qark)]})
            </div>
            {parties.map(party => (
              <div key={party} style={{ marginBottom: 5 }}>
                <label>{party}: </label>
                <input
                  type="number"
                  min="0"
                  value={mandates[qark][party]}
                  onFocus={handleFocus}
                  onChange={e => {
                    const newMandates = { ...mandates };
                    newMandates[qark][party] = parseInt(e.target.value) || 0;
                    setMandates(newMandates);
                  }}
                  style={{
                    width: 60,
                    MozAppearance: "textfield"
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
