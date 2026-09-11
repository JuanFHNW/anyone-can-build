import React, { useState } from 'react'

export default function Checkout({ members, totalsByPerson, payments, onPay, totalBill }) {
  const [forms, setForms] = useState(() => {
    const f = {}
    for (const m of members) f[m] = { method: 'Credit Card', amount: (totalsByPerson[m]?.total || 0).toFixed(2), details: {} }
    return f
  })

  // keep forms amounts in sync when totalsByPerson changes
  React.useEffect(() => {
    setForms(f => {
      const next = { ...f }
      for (const m of members) {
        next[m] = { ...(next[m] || {}), amount: (totalsByPerson[m]?.total || 0).toFixed(2) }
      }
      return next
    })
  }, [totalsByPerson, members])

  function update(member, patch) {
    setForms(f => ({ ...f, [member]: { ...(f[member] || {}), ...patch } }))
  }

  function submit(member) {
    const fm = forms[member]
    const payment = { method: fm.method, amount: Number(fm.amount || 0), details: fm.details }
    onPay(member, payment)
  }

  const paidTotal = Object.values(payments).reduce((s, p) => s + Number(p.amount || 0), 0)

  return (
    <div className="checkout">
      <h3>Checkout</h3>
      <div className="payments">
        {members.map(m => (
          <div key={m} className="payment-card">
            <h4>{m}</h4>
            <div>Owes: ${((totalsByPerson[m]?.total) || 0).toFixed(2)}</div>
            <label>Method</label>
            <select value={forms[m]?.method || 'Credit Card'} onChange={e => update(m, { method: e.target.value })}>
              <option>Credit Card</option>
              <option>Cash</option>
              <option>Check</option>
            </select>
            <label>Amount</label>
            <input type="number" step="0.01" value={forms[m]?.amount || ''} onChange={e => update(m, { amount: e.target.value })} />

            {forms[m]?.method === 'Credit Card' && (
              <div className="cc-fields">
                <input placeholder="Card number (mock)" onChange={e => update(m, { details: { ...forms[m].details, card: e.target.value } })} />
              </div>
            )}

            <div className="payment-actions">
              <button onClick={() => submit(m)}>Pay</button>
              {payments[m] && <div className="paid-note">Last paid: ${Number(payments[m].amount).toFixed(2)} ({payments[m].method})</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="final-summary">
        <div>Total Bill: ${totalBill.toFixed(2)}</div>
        <div>Paid: ${paidTotal.toFixed(2)}</div>
        <div>Remaining: ${(totalBill - paidTotal).toFixed(2)}</div>
      </div>
    </div>
  )
}
