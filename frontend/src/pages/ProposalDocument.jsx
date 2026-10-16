function toText(p) {
  const lines = [
    `VILLAGE TRANSFORMATION PROPOSAL`,
    `Ref: ${p.refNo}   Date: ${p.date}`,
    `${p.village.name}, ${p.village.state}`,
    '',
    `Overall Development Score: ${p.overallScore}/100`,
    '', 'SUMMARY:', p.summary, '',
    'RECOMMENDED INTERVENTIONS:',
    ...p.recommendations.map((r, i) => `${i + 1}. ${r.title} (${r.cost}, ${r.impact} impact) — ${r.detail}`),
    '', `TOTAL ESTIMATED INVESTMENT: ${p.totalInvestment}`, '',
    'PROJECTED 3-YEAR IMPACT:',
    ...p.projectedImpact.map(i => `- ${i.label}: ${i.value}`),
    '', `Prepared by: ${p.preparedBy}`,
  ];
  return lines.join('\n');
}

function download(p) {
  const blob = new Blob([toText(p)], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${p.village.name.replace(/\s+/g, '_')}_CSR_Proposal.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ProposalDocument({ data }) {
  const p = data;
  return (
    <div className="proposal">
      <div className="proposal-head">
        <div>
          <div className="proposal-kicker">🌾 GramVision AI · Village Transformation Proposal</div>
          <h2>{p.village.name}, {p.village.state}</h2>
        </div>
        <div className="proposal-score">
          <b>{p.overallScore}</b>
          <span>/100</span>
        </div>
      </div>

      <div className="proposal-metabar">
        <div><span>Reference No.</span><b>{p.refNo}</b></div>
        <div><span>Date</span><b>{p.date}</b></div>
        <div><span>Population Impacted</span><b>{p.village.population.toLocaleString()}</b></div>
        <div><span>Total Investment Ask</span><b>{p.totalInvestment}</b></div>
      </div>

      <div className="proposal-section">
        <h4>Executive Summary</h4>
        <p className="proposal-summary">✨ {p.summary}</p>
      </div>

      <div className="proposal-section">
        <h4>Recommended Interventions</h4>
        <div className="rec-list">
          {p.recommendations.map((r, idx) => (
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

      <div className="proposal-section">
        <h4>Projected 3-Year Impact</h4>
        <div className="impact-grid">
          {p.projectedImpact.map((i, idx) => (
            <div className="impact-tile" key={idx}>
              <div className="val" style={{ color: 'var(--accent)' }}>{i.icon} {i.value}</div>
              <div className="lbl">{i.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="proposal-footer">
        <div>
          <div className="muted">Prepared by</div>
          <b>{p.preparedBy}</b>
        </div>
        <div className="proposal-actions">
          <button className="btn secondary" onClick={() => window.print()}>🖨 Print</button>
          <button className="btn" onClick={() => download(p)}>⬇ Download</button>
        </div>
      </div>
    </div>
  );
}
