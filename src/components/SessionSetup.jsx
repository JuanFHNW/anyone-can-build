import React, { useState } from 'react'

export default function SessionSetup({ onStart }) {
  const [name, setName] = useState('')
  const [members, setMembers] = useState([])

  function addMember() {
    const n = name.trim()
    if (!n) return
    setMembers(m => (m.includes(n) ? m : [...m, n]))
    setName('')
  }

  function removeMember(n) {
    setMembers(m => m.filter(x => x !== n))
  }

  return (
    <div className="session-setup">
      <h2>Start an Order Session</h2>
      <div className="add-member">
        <input
          placeholder="Add member name (e.g., Alice)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={addMember}>Add</button>
      </div>
      <div className="members-list">
        {members.length === 0 && <p>No members yet. Add names to start.</p>}
        {members.map(m => (
          <div key={m} className="member-row">
            <span>{m}</span>
            <button onClick={() => removeMember(m)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="primary" onClick={() => onStart(members)} disabled={members.length === 0}>
          Start Session
        </button>
      </div>
    </div>
  )
}
