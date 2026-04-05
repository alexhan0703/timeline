"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({ subject: '', day: '월', start_time: '', end_time: '' });

  useEffect(() => {
    fetch('/api/schedule').then(res => res.json()).then(data => setSchedules(data));
  }, []);

  const addSchedule = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newItem = await res.json();
    setSchedules([...schedules, newItem]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🗓️ 시간표 생성기</h1>
      <form onSubmit={addSchedule} style={{ marginBottom: '20px' }}>
        <input placeholder="과목" onChange={e => setForm({...form, subject: e.target.value})} required />
        <select onChange={e => setForm({...form, day: e.target.value})}>
          {['월','화','수','목','금'].map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <input type="time" onChange={e => setForm({...form, start_time: e.target.value})} required />
        <input type="time" onChange={e => setForm({...form, end_time: e.target.value})} required />
        <button type="submit">추가</button>
      </form>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {['월','화','수','목','금'].map(day => (
          <div key={day} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <strong>{day}</strong>
            {schedules.filter(s => s.day === day).map((s, i) => (
              <div key={i} style={{ background: '#f0f7ff', padding: '5px', marginTop: '5px', fontSize: '12px' }}>
                {s.subject}<br/>{s.start_time}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
