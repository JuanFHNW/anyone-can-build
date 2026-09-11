import React from 'react'

export default function MemberSelector({ members, active, setActive }) {
  return (
    <div className="member-selector">
      <h3>Group Members</h3>
      <div className="members">
        {members.map(m => (
          <button
            key={m}
            className={m === active ? 'member active' : 'member'}
            onClick={() => setActive(m)}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  )
}
