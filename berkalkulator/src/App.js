import './App.css';
import React, { useEffect, useState } from 'react';
import { Input, Toggle } from './components/FormControls.js';

function SalaryChanger({ grossSalary, setGrossSalary }) {
  function handleGrossSalaryChange(e) {
    setGrossSalary(e.nativeEvent.srcElement.value);
  }

  function manipulateValue (percent) {
    let value = Number(grossSalary) + Math.round((percent / 100) * grossSalary);
    setGrossSalary(value);
  }

  return(
    <div>
      <input type="range" min="0" max="1000000" value={grossSalary} className="range range-primary" onChange={handleGrossSalaryChange}/>
      <div className="w-100 mx-auto mt-3">
        <button className="btn btn-primary mx-2" onClick={() => manipulateValue(-1)}>-1%</button>
        <button className="btn btn-primary mx-2" onClick={() => manipulateValue(-5)}>-5%</button>
        <button className="btn btn-primary mx-2" onClick={() => manipulateValue(1)}>+1%</button>
        <button className="btn btn-primary mx-2" onClick={() => manipulateValue(5)}>+5%</button>
      </div>
    </div>
  );
}

function RecentlyMarriedInput ({ isValid, setIsValid }) {
  const [date, setDate] = useState(new Date("2000-01-01"));

  useEffect(() => {
    // TODO
    const difference = Date() - Date(date);
    console.log(date.getYear(), difference, Date(), Date(date), '- Has changed')
    setIsValid(!isValid);
  },[date])

  return(
    <div>
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
      {isValid && 'Igen'}
      {(isValid == false) && 'Nem'}
      {(isValid == null) && 'nincs adat'}
    </div>
  );
}

function Person() {
  const [name, setName] = useState("");
  const [grossSalary, setGrossSalary] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  // Tax reductions
  const [under25Reduction, setUnder25Reduction] = useState(false);
  const [recentlyMarriedReduction, setRecentlyMarriedReduction] = useState(false);
  const [isMarriageRecent, setIsMarriageRecent] = useState(null);
  const [personalReduction, setPersonalReduction] = useState(false);
  const [familyTaxReduction, setFamilyTaxReduction] = useState(false);

  function calculateNetSalary() {
    let szja = grossSalary * 0.15;
    const tb = grossSalary * 0.185;
    let reduction = 0;
    let extraIncome = 0;

    if (under25Reduction) {
      const upperLimit = 499952;
      if (grossSalary < upperLimit) {
        szja = 0;
      } else {
        szja = (grossSalary - upperLimit) * 0.15;
      }
    }

    if (personalReduction) {
      reduction = 77300;
    }

    if (isMarriageRecent) {
      extraIncome = 5000;
    }

    let temp = grossSalary - Math.max(szja + tb - reduction, 0) + extraIncome;

    setNetSalary(temp);
  }

  useEffect(() => {
    calculateNetSalary();
  })

  return(
    <div>
      <h1 className="text-2xl font-bold uppercase mb-2">{name} bérének kiszámítása</h1>
      <Input label="Családtag neve" placeholder="Név" feedback="Add meg a családtag nevét!" inputType="text" value={name} setValue={(value) => setName(value)}></Input>
      <Input label="Bruttó bér" placeholder="100000" feedback="Add meg a bruttó béredet!" inputType="number" value={grossSalary} setValue={(value) => setGrossSalary(value)}></Input>
      <SalaryChanger grossSalary={grossSalary} setGrossSalary={(value) => setGrossSalary(value)}></SalaryChanger>
      <h2 className='text-xl font-bold mt-3 uppercase mb-1'>Kedvezmények</h2>
      <Toggle label="25 év alattiak SZJA mentessége" value={under25Reduction} setValue={(value) => setUnder25Reduction(value)}></Toggle>
      <div className="flex">
        <Toggle label="Friss házasok kedvezménye" value={recentlyMarriedReduction} setValue={(value) => setRecentlyMarriedReduction(value)}></Toggle>
        {recentlyMarriedReduction && <RecentlyMarriedInput isValid={isMarriageRecent} setIsValid={(value) => setIsMarriageRecent(value)}></RecentlyMarriedInput>}
      </div>
      <Toggle label="Személyi adókedvezmény" value={personalReduction} setValue={(value) => setPersonalReduction(value)}></Toggle>
      <Toggle label="Családi kedvezmény" value={familyTaxReduction} setValue={(value) => setFamilyTaxReduction(value)}></Toggle>
      <h2 className='text-xl font-bold mt-3 uppercase mb-1'>Számított nettó bér: {netSalary} Ft</h2>
    </div>
  )
}

function Household() {

}

function App() {
  //[people, setPeople] = useState([]);

  return (
    <div className="App container bg-neutral-content rounded w-85 mx-auto p-5">
      <Person></Person>
    </div>
  );
}

export default App;
