import { useState, useEffect, useRef } from "react";

const monthly = {
  labels: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
  cur:  [420,480,510,560,590,650,700,720,760,810,870,940],
  prev: [360,390,440,470,500,550,580,610,640,680,720,780],
};

const quarterly = {
  labels: ["الربع الأول","الربع الثاني","الربع الثالث","الربع الرابع"],
  cur:  [1410,1800,2180,2620],
  prev: [1190,1520,1830,2180],
};

const categories = [
  { name: "إلكترونيات", cur: 3800, prev: 3100 },
  { name: "ملابس",      cur: 2900, prev: 2500 },
  { name: "مواد غذائية",cur: 2400, prev: 2200 },
  { name: "أثاث",       cur: 1700, prev: 1300 },
  { name: "رياضة",      cur: 1210, prev: 1100 },
];

const kpis = [
  { label: "إجمالي مبيعات 2024", value: "12,010", unit: "ألف ر.س", pct: "+17.4%", up: true },
  { label: "متوسط شهري",          value: "1,001",  unit: "ألف ر.س", pct: "+17.4%", up: true },
  { label: "أعلى شهر",            value: "ديسمبر", unit: "940 ألف", pct: "+20.5%", up: true },
  { label: "معدل النمو",           value: "17.4%",  unit: "سنوياً",  pct: "+5.2%",  up: true },
];

function computeGrowth(cur, prev) {
  return cur.map((v, i) => Math.round(((v - prev[i]) / prev[i]) * 100));
}

function KpiCard({ label, value, unit, pct, up }) {
  return (
    <div style={{
      background: "#f5f5f3",
      borderRadius: 8,
      padding: "1rem",
    }}>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 500 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{unit}</div>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 3,
        fontSize: 11, marginTop: 4, padding: "2px 8px",
        borderRadius: 100,
        background: up ? "#EAF3DE" : "#FCEBEB",
        color: up ? "#3B6D11" : "#A32D2D",
      }}>
        {up ? "▲" : "▼"} {pct}
      </span>
    </div>
  );
}

function BarChart({ data, filter }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.Chart) return;
    if (chartRef.current) chartRef.current.destroy();
    const d = filter === "monthly" ? monthly : quarterly;
    chartRef.current = new window.Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: d.labels,
        datasets: [
          { label: "مبيعات 2024", data: d.cur,  backgroundColor: "#185FA5", borderRadius: 4, borderSkipped: false },
          { label: "مبيعات 2023", data: d.prev, backgroundColor: "#9FE1CB", borderRadius: 4, borderSkipped: false },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} ألف ر.س` } } },
        scales: {
          x: { ticks: { font: { size: 11 }, autoSkip: false, maxRotation: 45 }, grid: { display: false } },
          y: { ticks: { callback: v => v.toLocaleString(), font: { size: 11 } }, grid: { color: "rgba(128,128,128,0.1)" } },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [filter]);

  return <canvas ref={canvasRef} />;
}

function LineChart({ filter }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.Chart) return;
    if (chartRef.current) chartRef.current.destroy();
    const d = filter === "monthly" ? monthly : quarterly;
    const growth = computeGrowth(d.cur, d.prev);
    chartRef.current = new window.Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: d.labels,
        datasets: [{
          label: "نسبة النمو %",
          data: growth,
          borderColor: "#0F6E56",
          backgroundColor: "rgba(15,110,86,0.08)",
          borderWidth: 2,
          pointBackgroundColor: growth.map(v => v >= 0 ? "#0F6E56" : "#A32D2D"),
          pointRadius: 4,
          fill: true,
          tension: 0.3,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y}%` } } },
        scales: {
          x: { ticks: { font: { size: 11 }, autoSkip: false, maxRotation: 45 }, grid: { display: false } },
          y: { ticks: { callback: v => v + "%", font: { size: 11 } }, grid: { color: "rgba(128,128,128,0.1)" } },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [filter]);

  return <canvas ref={canvasRef} />;
}

export default function SalesDashboard() {
  const [filter, setFilter] = useState("monthly");
  const [chartJsLoaded, setChartJsLoaded] = useState(!!window.Chart);

  useEffect(() => {
    if (window.Chart) { setChartJsLoaded(true); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    script.onload = () => setChartJsLoaded(true);
    document.head.appendChild(script);
  }, []);

  const cardStyle = {
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,0.12)",
    borderRadius: 12,
    padding: "1.25rem",
    marginBottom: "1.25rem",
  };

  return (
    <div dir="rtl" style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem", maxWidth: 900, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>لوحة تحكم المبيعات</h2>
        <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>تحليل الأداء ومعدلات النمو — 2024</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
        {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
        {[["monthly","شهري"],["quarterly","ربع سنوي"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            fontSize: 12, padding: "5px 14px", borderRadius: 100, cursor: "pointer",
            border: "0.5px solid",
            borderColor: filter === val ? "#185FA5" : "rgba(0,0,0,0.2)",
            background: filter === val ? "#185FA5" : "transparent",
            color: filter === val ? "#E6F1FB" : "#666",
            transition: "all 0.15s",
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>المبيعات والنمو عبر الزمن</span>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#888" }}>
            <span><span style={{ width: 10, height: 10, borderRadius: 2, background: "#185FA5", display: "inline-block", marginLeft: 4 }}></span>مبيعات 2024</span>
            <span><span style={{ width: 10, height: 10, borderRadius: 2, background: "#9FE1CB", display: "inline-block", marginLeft: 4 }}></span>مبيعات 2023</span>
          </div>
        </div>
        <div style={{ position: "relative", width: "100%", height: 280 }}>
          {chartJsLoaded && <BarChart filter={filter} />}
        </div>
      </div>

      {/* Growth Line Chart */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: "1rem" }}>نسبة النمو % شهريًا</div>
        <div style={{ position: "relative", width: "100%", height: 200 }}>
          {chartJsLoaded && <LineChart filter={filter} />}
        </div>
      </div>

      {/* Category Table */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: "1rem" }}>تفاصيل المبيعات حسب الفئة</div>
        <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["الفئة","مبيعات 2024","مبيعات 2023","النمو"].map(h => (
                <th key={h} style={{ fontWeight: 500, color: "#888", textAlign: "right", padding: "8px 6px", borderBottom: "0.5px solid rgba(0,0,0,0.1)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((c, i) => {
              const pct = Math.round(((c.cur - c.prev) / c.prev) * 100);
              const up = pct >= 0;
              return (
                <tr key={i}>
                  <td style={{ padding: "10px 6px", fontWeight: 500, borderBottom: i < categories.length-1 ? "0.5px solid rgba(0,0,0,0.07)" : "none" }}>{c.name}</td>
                  <td style={{ padding: "10px 6px", textAlign: "right", borderBottom: i < categories.length-1 ? "0.5px solid rgba(0,0,0,0.07)" : "none" }}>{c.cur.toLocaleString()}</td>
                  <td style={{ padding: "10px 6px", textAlign: "right", color: "#888", borderBottom: i < categories.length-1 ? "0.5px solid rgba(0,0,0,0.07)" : "none" }}>{c.prev.toLocaleString()}</td>
                  <td style={{ padding: "10px 6px", textAlign: "right", borderBottom: i < categories.length-1 ? "0.5px solid rgba(0,0,0,0.07)" : "none" }}>
                    <span style={{
                      display: "inline-block", padding: "2px 8px", borderRadius: 100, fontSize: 11,
                      background: up ? "#EAF3DE" : "#FCEBEB",
                      color: up ? "#3B6D11" : "#A32D2D",
                    }}>
                      {up ? "+" : ""}{pct}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}