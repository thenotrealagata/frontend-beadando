import React, { useEffect, useState } from 'react';
import { Input } from './FormControls';

export function RecentlyMarriedInput ({ isValid, setIsValid }) {
    const [date, setDate] = useState();
  
    useEffect(() => {
      const convertedDate = new Date(date);
      const todayDate = new Date();
      const earliestValidDate = new Date(todayDate.getFullYear()-2, todayDate.getMonth(), todayDate.getDate());
  
      if(convertedDate > todayDate) setDate(todayDate.toISOString().substring(0, 10));
      setIsValid(earliestValidDate <= new Date(date));
    }, [date])
  
    return(
      <div className='flex'>
        <button className="btn btn-xs" onClick={()=>document.getElementById('dateModal').showModal()}>Dátum hozzáadása</button>
        <dialog id="dateModal" className="modal">
          <div className="modal-box">
            <p className="py-4">A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házastársi életközösség alatt legfeljebb 24 hónapon keresztül jár.</p>
            <Input label="Add meg a házasságkötés dátumát:" feedback="Például: 2000/10/25" placeholder="YYYY/MM/DD" inputType="date" value={date} setValue={setDate}></Input>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Bezárás</button>
          </form>
        </dialog>
        <div className='mb-2'>
          {isValid && <div className="badge badge-success gap-2">Jogosult</div>}
          {!isValid && <div className="badge badge-error gap-2">Nem jogosult</div>}
        </div>
      </div>
    );
  }