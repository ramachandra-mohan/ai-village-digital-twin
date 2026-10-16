import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import ProposalDocument from './pages/ProposalDocument';
import { getDashboard, runAnalysis, generateReport, uploadImage } from './services/api';
import { MOCK_DASHBOARD } from './mockData';

const MOCK_REPORT = {
  refNo: 'GVA/CSR/202610/104', date: 'offline demo', village: MOCK_DASHBOARD.village,
  overallScore: MOCK_DASHBOARD.overallScore, summary: MOCK_DASHBOARD.insight,
  recommendations: MOCK_DASHBOARD.recommendations, projectedImpact: MOCK_DASHBOARD.projectedImpact,
  totalInvestment: '₹115 Lakhs', preparedBy: 'GramVision AI — Multi-Agent Digital Twin Platform',
};

const STEPS = [
  'Upload village photos & surveys',
  'Gemini extracts structured insights',
  'Agents collaborate and assess risks',
  'Digital Twin generated',
  'Impact recommendations created',
  'CSR / Government proposal exported',
];

function DemoWorkflow({ onComplete }) {
  const [fileName, setFileName] = useState('');
  const [stepIdx, setStepIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [report, setReport] = useState(null);

  async function run() {
    setRunning(true);
    setReport(null);
    setResult(null);
    for (let i = 0; i < STEPS.length - 1; i++) {
      setStepIdx(i);
      await new Promise(r => setTimeout(r, 450));
      if (i === 0 && fileName) await uploadImage(new File([''], fileName));
    }
    const analysis = (await runAnalysis()) || { ...MOCK_DASHBOARD, overallScore: MOCK_DASHBOARD.overallScore + 1 };
    setResult(analysis);
    onComplete(analysis);
    setStepIdx(4);
    await new Promise(r => setTimeout(r, 300));
    const rep = (await generateReport()) || MOCK_REPORT;
    setReport(rep);
    setStepIdx(5);
    setRunning(false);
  }

  return (
    <div className="workflow">
      <div className="card">
        <h3>🚀 End-to-End Demo Workflow</h3>
        <p className="muted">Simulates: photo/survey upload → Gemini extraction → multi-agent analysis → digital twin → recommendations → exportable proposal.</p>
        <div className="upload-box">
          📷 Drop village photos / survey PDF here (optional for demo)
          <br />
          <input type="file" onChange={e => setFileName(e.target.files[0]?.name || '')} />
          {fileName && <p className="muted">Selected: {fileName}</p>}
        </div>
        <div style={{ marginTop: 16 }}>
          <button className="btn" disabled={running} onClick={run}>
            {running ? 'Running AI Agents…' : '▶ Run AI Analysis'}
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Pipeline Status</h3>
        <div className="step-list">
          {STEPS.map((s, i) => (
            <div key={i} className={`step ${i < stepIdx ? 'done' : i === stepIdx ? 'active' : ''}`}>
              <div className="dot">{i < stepIdx ? '✓' : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {result && (
        <div className="card">
          <h3>✅ Digital Twin Generated — Overall Score {result.overallScore}/100</h3>
          <p className="muted">Switch to the Overview tab to explore the full dashboard, or view the exported proposal below.</p>
        </div>
      )}

      {report && (
        <div>
          <h3 style={{ margin: '4px 0 14px' }}>📄 Exported CSR / Government Proposal</h3>
          <ProposalDocument data={report} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState(MOCK_DASHBOARD);

  useEffect(() => {
    getDashboard().then(d => { if (d) setData(d); });
  }, []);

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          🌾 GramVision AI
          <span className="sub">AI-Powered Rural Digital Twin · Built with Google Cloud</span>
        </div>
        <div className="tabs">
          <div className={`tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</div>
          <div className={`tab ${tab === 'demo' ? 'active' : ''}`} onClick={() => setTab('demo')}>Live Demo</div>
        </div>
      </div>
      <div className="content">
        {tab === 'overview' ? <Dashboard data={data} /> : <DemoWorkflow onComplete={setData} />}
      </div>
    </div>
  );
}
