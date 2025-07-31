import { useState } from 'react';
import "./SignupComp.css";

export default function AvailabilityInput({onChange}){
    const [selected, setSelected] = useState([]);
    const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
    const handleDayToggle = (day) => {
        const exists = selected.find(item => item.day === day);
        if(exists) {
            const filtered = selected.filter(item => item.day !== day);
            setSelected(filtered);
            onChange(filtered);
        } else {
            const updated = [...selected, { day, startTime: '', endTime: '' }];
            setSelected(updated);
            onChange(updated);
        }
    };

    const handleTimeChange = (day, field, value) => {
        const updated = selected.map(item => item.day === day ? {...item, [field]: value} : item);
        setSelected(updated);
        onChange(updated);
    }
    return (
        <div>
            <h2 className="dark:text-white font-medium">Choose days and time available</h2>
            {weekdays.map((day) => {
                const active = selected.find((s) => s.day === day);
                return (
                    <div key={day} className='days-container'>
                        <label className='day-label'>
                            <input type='checkbox' checked={!active} onChange={() => handleDayToggle(day)} className='peer hidden' />
                            <span className={`day-name ${active ? 'active' : 'inactive'}`}>
                                {day.slice(0, 3)}
                            </span>
                        </label>
                        {active && (
                            <div className='time-inputs'>
                                From
                                <input className='time-input' type='time' value={active.startTime} onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)} />
                                to
                                <input className='time-input' type='time' value={active.endTime} onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)} />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}