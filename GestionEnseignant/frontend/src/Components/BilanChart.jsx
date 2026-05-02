// Components/BilanChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "./BilanChart.css";

export default function BilanChart({ bilan }) {
  const data = [
    { name: "Total", value: Number(bilan.total) || 0, color: "#00acc1" },
    { name: "Minimum", value: Number(bilan.min) || 0, color: "#00838f" },
    { name: "Maximum", value: Number(bilan.max) || 0, color: "#4dd0e1" }
  ];

  const formatValue = (value) => {
    return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.name}</p>
          <p className="tooltip-value">{formatValue(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">📊 Aperçu graphique des prestations</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            dataKey="name" 
            axisLine={{ stroke: '#e0f2f1' }}
            tickLine={{ stroke: '#e0f2f1' }}
            tick={{ fill: '#546e7a', fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => value.toLocaleString()}
            axisLine={{ stroke: '#e0f2f1' }}
            tickLine={{ stroke: '#e0f2f1' }}
            tick={{ fill: '#546e7a', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#e0f2f1', opacity: 0.3 }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}