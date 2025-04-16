
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
              backgroundColor: partyColors[getWinner(qark)]
            }}
          >
            <h3>{qark}</h3>
            {parties.map(party => (
              <div key={party} style={{ marginBottom: 5 }}>
                <label>{party}: </label>
                <input
                  type="number"
                  value={mandates[qark][party]}
                  onChange={e => {
                    const newMandates = { ...mandates };
                    newMandates[qark][party] = parseInt(e.target.value) || 0;
                    setMandates(newMandates);
                  }}
                  style={{ width: 60 }}
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
