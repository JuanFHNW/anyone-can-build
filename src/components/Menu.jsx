import React, { useState } from 'react'

export default function Menu({ categories, onAdd, activeMember, members = [] }) {
  const [selectedMember, setSelectedMember] = useState(activeMember)

  // keep selectedMember in sync with activeMember
  React.useEffect(() => setSelectedMember(activeMember), [activeMember])

  return (
    <div className="menu">
      <div className="menu-header">
        <h2>Menu</h2>
        <div className="choose-member">
          <label>Ordering as:</label>
          <select value={selectedMember || ''} onChange={e => setSelectedMember(e.target.value)}>
            <option value="">(Unassigned)</option>
            {members.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {categories.map(cat => (
        <section key={cat.category} className="category">
          <h3>{cat.category}</h3>
          <div className="items">
            {cat.items.map(item => (
              <div className="card" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="card-body">
                  <div className="card-top">
                    <h4>{item.name}</h4>
                    <div className="price">${item.price.toFixed(2)}</div>
                  </div>
                  <p className="desc">{item.desc}</p>
                  <div className="card-actions">
                    <select value={selectedMember || ''} onChange={e => setSelectedMember(e.target.value)}>
                      <option value="">Unassigned</option>
                      {members.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <button onClick={() => onAdd(item, selectedMember || 'Unassigned')}>Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
