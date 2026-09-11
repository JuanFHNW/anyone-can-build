import React, { useState, useMemo } from 'react'
import SessionSetup from './components/SessionSetup'
import MemberSelector from './components/MemberSelector'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import menuData from './data/menu'

export default function App() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [members, setMembers] = useState([])
  const [activeMember, setActiveMember] = useState(null)
  const [cart, setCart] = useState([]) // {item, member, id}
  const [payments, setPayments] = useState({}) // {member: {method, amount, details}}

  const taxRate = 0.08

  const totalsByPerson = useMemo(() => {
    const res = {}
    for (const m of members) res[m] = { items: [], subtotal: 0 }
    for (const entry of cart) {
      if (!res[entry.member]) res[entry.member] = { items: [], subtotal: 0 }
      res[entry.member].items.push(entry)
      res[entry.member].subtotal += entry.item.price
    }
    for (const name of Object.keys(res)) {
      res[name].tax = +(res[name].subtotal * taxRate).toFixed(2)
      res[name].total = +(res[name].subtotal + res[name].tax).toFixed(2)
    }
    return res
  }, [cart, members])

  const totalBill = useMemo(() => {
    const sum = Object.values(totalsByPerson).reduce((s, p) => s + (p.total || 0), 0)
    return +sum.toFixed(2)
  }, [totalsByPerson])

  function startSession(initialMembers) {
    setMembers(initialMembers)
    setActiveMember(initialMembers[0] || null)
    setSessionStarted(true)
  }

  function addToCart(item, member) {
    const id = Date.now() + Math.random()
    setCart(c => [...c, { id, item, member }])
  }

  function removeFromCart(id) {
    setCart(c => c.filter(x => x.id !== id))
  }

  function recordPayment(member, payment) {
    setPayments(p => ({ ...p, [member]: payment }))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Restaurant Group Order</h1>
      </header>
      {!sessionStarted ? (
        <SessionSetup onStart={startSession} />
      ) : (
        <div className="layout">
          <aside className="sidebar">
            <MemberSelector
              members={members}
              active={activeMember}
              setActive={setActiveMember}
            />
            <Cart
              cart={cart}
              totalsByPerson={totalsByPerson}
              removeFromCart={removeFromCart}
              payments={payments}
              totalBill={totalBill}
            />
          </aside>

          <main className="main">
            <Menu
              categories={menuData}
              members={members}
              onAdd={(item, member) => addToCart(item, member)}
              activeMember={activeMember}
            />
            <Checkout
              members={members}
              totalsByPerson={totalsByPerson}
              payments={payments}
              onPay={recordPayment}
              totalBill={totalBill}
            />
          </main>
        </div>
      )}
    </div>
  )
}
