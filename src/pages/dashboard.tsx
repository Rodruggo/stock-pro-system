import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; 

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface UserAccount {
  id: number;
  email: string;
  fullname: string;
  role: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [activeTab, setActiveTab] = useState<"inventory" | "user">("inventory");
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fullname = localStorage.getItem("fullname") || "Guest";
  const role = localStorage.getItem("role") || "user";

  const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const prodRes = await api.get("/products");
      let allProducts = Array.isArray(prodRes.data) ? prodRes.data : [];
      
      // ADDED THIS PART: If user is not admin, show only items with stock > 0
      if (role !== "admin") {
        allProducts = allProducts.filter((p: Product) => p.stock > 0);
      }
      
      setProducts(allProducts);
      
      if (role === "admin") {
        const userRes = await api.get("/user");
        setUsers(Array.isArray(userRes.data) ? userRes.data : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("fullname")) {
      window.location.href = "/";
      return;
    }
    fetchData();
  }, []);

  // Inventory Logic
  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * Number(p.stock)), 0);
  
  // User Logic
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  const handleSubmit = async () => {
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    try {
      if (editingId) await api.put(`/products/${editingId}`, payload);
      else await api.post("/products", payload);
      setForm({ name: "", category: "", price: "", stock: "" });
      setEditingId(null);
      fetchData();
    } catch (error) { alert("Error saving product."); }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this product?")) {
      await api.delete(`/products/${id}`);
      fetchData();
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        await api.delete(`/users/${id}`); 
        fetchData();
      } catch (error) { alert("Error deleting user."); }
    }
  };

  if (loading) return <div style={{ padding: "50px", textAlign: "center", color: "#000" }}>Loading System...</div>;

  return (
    <div className="dashboard-container">
      <style>{`
        .sidebar { width: 250px; background: #111c44; color: white; padding: 20px; display: flex; flex-direction: column; min-height: 100vh;}
        .sidebar h2 { color: white !important; margin-bottom: 30px; }
        .nav-item { padding: 12px; border-radius: 8px; cursor: pointer; margin-bottom: 5px; color: white; transition: 0.3s; }
        .nav-item:hover { background: rgba(255,255,255,0.1); }
        .nav-active { background: #4318ff !important; font-weight: bold; }
        
        .main-content { flex: 1; padding: 40px; background: #f4f7fe; color: #000; }
        .card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #ccc; margin-bottom: 20px; color: #000; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .user-badge { background: white; border: 1px solid #000; padding: 10px 20px; border-radius: 8px; font-weight: bold; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 10px; background: white; }
        th { text-align: left; padding: 15px; border-bottom: 2px solid #000; color: #000; font-weight: bold; }
        td { padding: 15px; border-bottom: 1px solid #eee; color: #000; }
        
        .role-tag { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; border: 1px solid #000; }
        .btn-delete { background: #ff4d4d; color: white !important; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .btn-edit { background: #4da6ff; color: white !important; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 5px; }
      `}</style>

      <div className="sidebar">
        <h2>📦 STOCK PRO</h2>
        <div className={`nav-item ${activeTab === "inventory" ? "nav-active" : ""}`} onClick={() => setActiveTab("inventory")}>
          📊 Inventory List
        </div>
        {role === "admin" && (
          <div className={`nav-item ${activeTab === "user" ? "nav-active" : ""}`} onClick={() => setActiveTab("user")}>
            👥 User Management
          </div>
        )}
        <button style={{ marginTop: 'auto' }} onClick={() => { localStorage.clear(); window.location.href = "/"; }} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>{activeTab === "inventory" ? "Inventory Dashboard" : "User Management"}</h1>
          <div className="user-badge">👤 {fullname} ({role})</div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div className="card" style={{ flex: 1 }}>
            <small>{activeTab === "inventory" ? "TOTAL PRODUCTS" : "TOTAL REGISTERED USERS"}</small>
            <h2 style={{margin: 0}}>{activeTab === "inventory" ? totalProducts : totalUsers}</h2>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <small>{activeTab === "inventory" ? "TOTAL INVENTORY VALUE" : "ADMINISTRATORS"}</small>
            <h2 style={{margin: 0}}>{activeTab === "inventory" ? `$${totalValue.toFixed(2)}` : adminCount}</h2>
          </div>
        </div>

        {activeTab === "inventory" && (
          <>
            {role === "admin" && (
              <div className="card">
                <h3>{editingId ? "Edit Item" : "Add New Item"}</h3>
                <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{marginRight: '5px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}} />
                <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{marginRight: '5px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}} />
                <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={{marginRight: '5px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}} />
                <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} style={{marginRight: '5px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}} />
                <button onClick={handleSubmit} style={{background: '#000', color: '#fff', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', border: 'none'}}>{editingId ? "Update" : "Add"}</button>
              </div>
            )}

            <div className="card">
              <table>
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th>{role === "admin" && <th>Actions</th>}</tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td style={{fontWeight: 'bold'}}>{p.name}</td>
                      <td>{p.category}</td>
                      <td>${Number(p.price).toFixed(2)}</td>
                      <td style={{color: p.stock < 10 ? 'red' : 'green'}}>{p.stock} Units</td>
                      {role === "admin" && (
                        <td>
                          <button className="btn-edit" onClick={() => {setEditingId(p.id); setForm({name: p.name, category: p.category, price: p.price.toString(), stock: p.stock.toString()})}}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "user" && role === "admin" && (
          <div className="card">
            <h3 style={{marginBottom: '20px'}}>System Access Control</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td style={{fontWeight: 'bold'}}>{u.fullname}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className="role-tag" style={{ background: u.role === 'admin' ? '#e1f5fe' : '#f5f5f5' }}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      {u.fullname !== fullname ? (
                        <button className="btn-delete" onClick={() => handleDeleteUser(u.id)}>Delete User</button>
                      ) : (
                        <span style={{fontSize: '12px', color: '#666', fontStyle: 'italic'}}>Current User</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}