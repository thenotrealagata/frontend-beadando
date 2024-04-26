import './App.css';
import React, { useEffect, useState } from 'react';
import { Input, Toggle, StepInput } from './components/FormControls.js';
import { SalaryChanger } from './components/SalaryChanger.js';
import { RecentlyMarriedInput } from './components/RecentlyMarriedInput.js';

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
  const [numberofDependants, setNumberOfDependants] = useState(0);
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(0);

  function calculateNetSalary() {
    let szja = grossSalary * 0.15;
    const tb = grossSalary * 0.185;
    let reduction = 0;

    if (under25Reduction) {
      const upperLimit = 499952;
      if (grossSalary < upperLimit) {
        szja = 0;
      } else {
        szja = (grossSalary - upperLimit) * 0.15;
      }
    }

    if (personalReduction) {
      reduction += 77300;
    }

    if (isMarriageRecent) {
      reduction += 5000;
    }

    if (familyTaxReduction) {
      let factor = 0;

      switch (numberOfBeneficiaries) {
        case 1:
          factor = 10000;
          break;
        case 2:
          factor = 20000;
          break;
        case 3:
          factor = 33000;
          break;
      }

      reduction += factor * numberofDependants;
    }

    setNetSalary(grossSalary - Math.max(szja + tb - reduction, 0));
  }

  useEffect(() => {
    calculateNetSalary();
  })

  return(
    <div className='container bg-neutral-content rounded w-2/5 mx-auto p-5'>
      <h1 className="text-2xl font-bold uppercase mb-2">{name} bérének kiszámítása</h1>
      <Input label="Családtag neve" placeholder="Név" feedback="Add meg a családtag nevét!" inputType="text" value={name} setValue={(value) => setName(value)}></Input>
      <Input label="Bruttó bér" placeholder="100000" feedback="Add meg a bruttó béredet!" inputType="number" value={grossSalary} setValue={(value) => setGrossSalary(value)}></Input>
      <SalaryChanger grossSalary={grossSalary} setGrossSalary={(value) => setGrossSalary(value)}></SalaryChanger>
      <h2 className='text-xl font-bold mt-3 uppercase mb-1'>Kedvezmények</h2>
      <Toggle label="25 év alattiak SZJA mentessége" value={under25Reduction} setValue={(value) => setUnder25Reduction(value)}></Toggle>
      <div className="flex align-middle">
        <Toggle label="Friss házasok kedvezménye" value={recentlyMarriedReduction} setValue={(value) => setRecentlyMarriedReduction(value)}></Toggle>
        {recentlyMarriedReduction && <RecentlyMarriedInput isValid={isMarriageRecent} setIsValid={(value) => setIsMarriageRecent(value)}></RecentlyMarriedInput>}
      </div>
      <Toggle label="Személyi adókedvezmény" value={personalReduction} setValue={(value) => setPersonalReduction(value)}></Toggle>
      <Toggle label="Családi kedvezmény" value={familyTaxReduction} setValue={(value) => setFamilyTaxReduction(value)}></Toggle>
      {familyTaxReduction &&
      <div className='flex'>
        <StepInput number={numberofDependants} setNumber={setNumberOfDependants} min={0}></StepInput>
        <span className='text-sm'>Eltartott, ebből kedvezményezett:</span>
        <StepInput number={numberOfBeneficiaries} setNumber={setNumberOfBeneficiaries} min={0} max={Math.min(3, numberofDependants)}></StepInput>
      </div>}
      <h2 className='text-xl font-bold mt-3 uppercase mb-1'>Számított nettó bér: {netSalary} Ft</h2>
    </div>
  )
}

function Household() {
  const [id, setId] = useState(0);
  const [people, setPeople] = useState([{
    id: 0,
    name: "",
    grossSalary: 0,
    netSalary: 0,
    under25Reduction: false,
    recentlyMarriedReduction: false,
    isMarriageRecent: null,
    personalReduction: false,
    familyTaxReduction: false,
    numberofDependants: 0,
    numberOfBeneficiaries: 0
  }]);

  function newPerson() {
    setId(id+1);
    return {
      id: id,
      name: "",
      grossSalary: 0,
      netSalary: 0,
      under25Reduction: false,
      recentlyMarriedReduction: false,
      isMarriageRecent: null,
      personalReduction: false,
      familyTaxReduction: false,
      numberofDependants: 0,
      numberOfBeneficiaries: 0
    }
  }

  function addPerson() {
    setPeople([...people, newPerson()]);
  }

  return (
    <div>
      <div className='flex'>
        {people.map(person => {
          return(<button className="btn">{person.name}</button>);
        })}
        <button onClick={addPerson}>+</button>
      </div>
      <div className='flex flex-auto'>
        <Person></Person>
        <div className='container bg-neutral-content rounded w-2/5 mx-auto p-5'>
          <h1 className="text-2xl font-bold uppercase mb-2">Háztartás nettó jövedelme</h1>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App mt-2">
      <Household></Household>
    </div>
  );
}

export default App;
