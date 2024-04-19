import './App.css';
import React, { useEffect, useState } from 'react';

function Input({ label, placeholder, feedback, inputType, value, setValue }) {
  function handleInputChange(e) {
    setValue(e.target.value);
  }

  return(<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">{label}</span>
  </div>
  <input type={inputType} placeholder={placeholder} className="input input-bordered w-full max-w-xs" value={value} onChange={handleInputChange}/>
  <div className="label">
    {!value && <span className="label-text-alt">{feedback}</span>}
  </div>
</label>);
}

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

function TaxReductionToggle({ label, value, setValue }) {
  function handleToggleChange() {
    setValue(!value);
  }

  return(
    <div className="form-control">
      <label className="label cursor-pointer">
        <input type="checkbox" className="toggle toggle-primary" checked={value} onChange={handleToggleChange}/>
        <span className="label-text">{label}</span> 
      </label>
      <p>{label}</p>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [grossSalary, setGrossSalary] = useState(0);
  const [under25Reduction, setUnder25Reduction] = useState(false);

  return (
    <div className="App container bg-neutral-content rounded w-85 mx-auto p-5">
      <h1 className="text-3xl font-bold">{name} bérének kiszámítása</h1>
      <Input label="Családtag neve" placeholder="Név" feedback="Add meg a családtag nevét!" inputType="text" value={name} setValue={(value) => setName(value)}></Input>
      <Input label="Bruttó bér" placeholder="100000" feedback="Add meg a bruttó béredet!" inputType="number" value={grossSalary} setValue={(value) => setGrossSalary(value)}></Input>
      <SalaryChanger grossSalary={grossSalary} setGrossSalary={(value) => setGrossSalary(value)}></SalaryChanger>
      <h2 className='text-2xl font-bold mt-3'>Kedvezmények</h2>
      <TaxReductionToggle label="25 év alattiak SZJA mentessége" value={under25Reduction} setValue={(value) => setUnder25Reduction(value)}></TaxReductionToggle>

    </div>
  );
}

export default App;
