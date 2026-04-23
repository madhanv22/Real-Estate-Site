import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function PriceHistoryChart({ data = [] }) {
  const appreciation = data.length >= 2
    ? Math.round(((data.at(-1).v - data[0].v) / data[0].v) * 100)
    : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 font-extrabold text-green-600 mb-4 text-sm">
        <span>📈</span> Price History (₹ in Lakhs)
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="y" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
              formatter={(v) => [`₹${v} L`, 'Price']}
            />
            <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2.5}
              dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-xs text-slate-400 mt-2">↑ {appreciation}% appreciation over 5 years</p>
    </div>
  );
}
