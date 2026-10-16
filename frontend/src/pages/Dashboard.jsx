function scoreColor(score) {
  if (score < 45) return 'var(--red)';
  if (score < 70) return 'var(--amber)';
  return 'var(--green)';
}

export default function Dashboard({ data }) {
  const d = data;
  return (
    <div>
      <div className="village-strip">
        <div className="chip"><b>{d.village.population.toLocaleString()}</b>Population</div>
        <div className="chip"><b>{d.village.households}</b>Households</div>
        <div className="chip"><b>{d.village.area}</b>Total Area</div>
        <div className="chip"><b>{d.village.farmland}</b>Farmland</div>
        <div className="chip"><b>{d.village.name}</b>{d.village.state}</div>
      </div>

      <div className="grid grid-main">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <h3>Overall Development Score</h3>
            <div className="score-row">
              <div className="donut" style={{ background: `conic-gradient(${scoreColor(d.overallScore)} ${d.overallScore * 3.6}deg, #0b1836 0deg)` }}>
                <div className="donut-inner">
                  <b>{d.overallScore}</b>
                  <span>out of 100</span>
                </div>
              </div>
              <div className="sector-list">
                {d.sectors.map(s => (
                  <div className="sector-row" key={s.key}>
                    <span>{s.icon} {s.label}</span>
                    <div className="bar-bg"><div className="bar-fill" style={{ width: `${s.score}%`, background: scoreColor(s.score) }} /></div>
                    <b style={{ color: scoreColor(s.score) }}>{s.score}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3>🤖 AI Agents at Work</h3>
            <p className="muted" style={{ marginTop: -8 }}>Multiple AI agents analyze data, identify gaps, and recommend the highest-impact interventions.</p>
            <div className="agents-grid">
              {d.sectors.map(s => (
                <div className="agent-card" key={s.key}>
                  <div className="icon">{s.icon}</div>
                  <h4>{s.label} Agent</h4>
                  <p className="headline">{s.headline}</p>
                  <ul>{s.insights.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>📈 Projected Impact (3 Years)</h3>
            <div className="impact-grid">
              {d.projectedImpact.map((i, idx) => (
                <div className="impact-tile" key={idx}>
                  <div className="val" style={{ color: 'var(--accent)' }}>{i.icon} {i.value}</div>
                  <div className="lbl">{i.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <h3>✨ Key Insights from Gemini</h3>
            <div className="insight-box">{d.insight}</div>
          </div>

          <div className="card">
            <h3>🏆 Top Recommendations</h3>
            <div className="rec-list">
              {d.recommendations.map((r, idx) => (
                <div className="rec-item" key={r.id}>
                  <div className="num">{idx + 1}</div>
                  <div style={{ flex: 1 }}>
                    <h4>{r.title} <span className="muted">· {r.cost}</span></h4>
                    <p>{r.detail}</p>
                  </div>
                  <div className={`badge ${r.impact}`}>{r.impact}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>🌍 Sustainable Development Goals</h3>
            <div className="sdg-row">
              {d.sdgs.map(n => <div className="sdg" key={n}>{n}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
