import React from 'react'

export default function Cart({ cart, totalsByPerson, removeFromCart, payments, totalBill }) {
  return (
    <div className="cart">
      <h3>Cart</h3>
      <div className="cart-items">
        {cart.length === 0 && <p>Cart is empty.</p>}
        {cart.map(entry => (
          <div key={entry.id} className="cart-item">
            <div>
              <strong>{entry.item.name}</strong> <span className="muted">(${entry.item.price.toFixed(2)})</span>
              <div className="muted">for: {entry.member}</div>
            </div>
            <div>
              <button onClick={() => removeFromCart(entry.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="breakdown">
        <h4>Breakdown</h4>
        {Object.keys(totalsByPerson).length === 0 && <p>No items assigned yet.</p>}
        {Object.entries(totalsByPerson).map(([name, data]) => (
          <div key={name} className="person-breakdown">
            <div className="person-name">{name}</div>
            <div className="person-items">
              {data.items.map(it => (
                <div key={it.id} className="person-item">
                  {it.item.name} <span className="muted">${it.item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="person-totals">
              <div>Subtotal: ${data.subtotal.toFixed(2)}</div>
              <div>Tax: ${data.tax.toFixed(2)}</div>
              <div className="total">Total: ${data.total.toFixed(2)}</div>
              {payments[name] && <div className="paid">Paid: ${Number(payments[name].amount).toFixed(2)} ({payments[name].method})</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="summary">
        <div>Total bill: ${totalBill.toFixed(2)}</div>
        <div>Paid: ${Object.values(payments).reduce((s, p) => s + Number(p.amount || 0), 0).toFixed(2)}</div>
      </div>
    </div>
  )
}
