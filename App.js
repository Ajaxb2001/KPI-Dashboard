import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import logo from "./msb.png";

const data = [
  { month: "Jun 2022", Milk: 5000, Buttermilk: 1500, Curd: 2500, FlavoredMilk: 800, Cowdung: 300 },
  { month: "Jul 2022", Milk: 5200, Buttermilk: 1600, Curd: 2600, FlavoredMilk: 850, Cowdung: 310 },
  { month: "Aug 2022", Milk: 5100, Buttermilk: 1550, Curd: 2700, FlavoredMilk: 870, Cowdung: 305 },
  { month: "Sep 2022", Milk: 5300, Buttermilk: 1580, Curd: 2800, FlavoredMilk: 900, Cowdung: 320 },
  { month: "Oct 2022", Milk: 5500, Buttermilk: 1650, Curd: 2900, FlavoredMilk: 950, Cowdung: 330 },
  { month: "Nov 2022", Milk: 5700, Buttermilk: 1700, Curd: 3000, FlavoredMilk: 1000, Cowdung: 340 },
  { month: "Dec 2022", Milk: 5800, Buttermilk: 1750, Curd: 3100, FlavoredMilk: 1050, Cowdung: 350 },
  { month: "Jan 2023", Milk: 5900, Buttermilk: 1800, Curd: 3150, FlavoredMilk: 1100, Cowdung: 360 },
  { month: "Feb 2023", Milk: 6000, Buttermilk: 1850, Curd: 3200, FlavoredMilk: 1150, Cowdung: 370 },
  { month: "Mar 2023", Milk: 6100, Buttermilk: 1900, Curd: 3250, FlavoredMilk: 1200, Cowdung: 380 },
  { month: "Apr 2023", Milk: 6200, Buttermilk: 1950, Curd: 3300, FlavoredMilk: 1250, Cowdung: 390 },
  { month: "May 2023", Milk: 6300, Buttermilk: 2000, Curd: 3350, FlavoredMilk: 1300, Cowdung: 400 },
  { month: "Jun 2023", Milk: 6400, Buttermilk: 2050, Curd: 3400, FlavoredMilk: 1350, Cowdung: 410 }
];

const productColors = {
  Milk: "#8884d8",
  Buttermilk: "#82ca9d",
  Curd: "#ffc658",
  FlavoredMilk: "#ff8042",
  Cowdung: "#a4de6c"
};

const productNames = {
  Milk: "Regular Milk",
  Buttermilk: "Buttermilk",
  Curd: "Curd",
  FlavoredMilk: "Flavored Milk",
  Cowdung: "Cow Dung"
};

const calculateTotal = (product) => data.reduce((sum, item) => sum + item[product], 0);
const topProduct = () => {
  const totals = ["Milk", "Buttermilk", "Curd", "FlavoredMilk", "Cowdung"].map(p => ({
    product: p,
    total: calculateTotal(p)
  }));
  return totals.sort((a, b) => b.total - a.total)[0];
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

export default function KPIDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Milk");
  const top = topProduct();
  const pieData = ["Milk", "Buttermilk", "Curd", "FlavoredMilk", "Cowdung"].map((product) => ({
    name: product,
    value: calculateTotal(product)
  }));

  const products = ["Milk", "Buttermilk", "Curd", "FlavoredMilk", "Cowdung"];

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
   <header className="dashboard-header">
  <div className="logo-title-container">
    <img src={logo} alt="MSB Logo" className="logo-img" />
    <h1>MSB Industries - A2 Milk Sales Dashboard</h1>
  </div>
  <button className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
</header>
 


      <div className="summary-cards">
        {["Milk", "Buttermilk", "Curd", "FlavoredMilk", "Cowdung"].map(product => (
          <div key={product} className="summary-card">
            <h3>{productNames[product]}</h3>
            <p>{calculateTotal(product).toLocaleString()} Ltrs / Units</p>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">{productNames[selectedProduct]} Sales Trend</h2>
            <div className="product-toggle-container">
              <span className="toggle-label">Product:</span>
              <div className="product-toggle-buttons">
                {products.map((product) => (
                  <button
                    key={product}
                    className={`product-toggle-btn ${selectedProduct === product ? 'active' : ''}`}
                    onClick={() => setSelectedProduct(product)}
                    style={{
                      '--product-color': productColors[product]
                    }}
                  >
                    {product === "FlavoredMilk" ? "Flavored" : product}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={selectedProduct} 
                stroke={productColors[selectedProduct]} 
                strokeWidth={3}
                dot={{ fill: productColors[selectedProduct], strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: productColors[selectedProduct] }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Overall Product Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                }}
              />
              <Legend />
              <Bar dataKey="Buttermilk" stackId="a" fill="#82ca9d" />
              <Bar dataKey="Curd" stackId="a" fill="#ffc658" />
              <Bar dataKey="FlavoredMilk" stackId="a" fill="#ff8042" />
              <Bar dataKey="Cowdung" stackId="a" fill="#a4de6c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Improvement Strategies</h2>
          <ul className="strategy-list">
            <li>🎯 Run promotional campaigns for Flavored Milk and Cowdung to increase awareness.</li>
            <li>📦 Offer bundle discounts combining Milk with Buttermilk or Curd.</li>
            <li>📊 Expand retail reach to underrepresented areas based on sales data.</li>
            <li>📣 Leverage influencer and social media marketing to promote niche products.</li>
          </ul>
        </div>

        <div className="dashboard-card full-width">
          <h2 className="card-title">Top Performing Product</h2>
          <p className="top-product-highlight">
            <strong>{productNames[top.product]}</strong> leads with <strong>{top.total.toLocaleString()}</strong> units sold!
          </p>
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} MSB Industries. All rights reserved.</p>
      </footer>
    </div>
  );
}
