import './App.css';
import React, { useEffect, useState } from 'react';
import { Input, Toggle, StepInput } from './components/FormControls.js';
import { SalaryChanger } from './components/SalaryChanger.js';
import { RecentlyMarriedInput } from './components/RecentlyMarriedInput.js';

function Person({ person, setPerson, deletePerson }) {
  function setValue(key, value) {
    let newPerson = {...person};
    newPerson[key] = value;
    setPerson(newPerson);
  }

  function calculateNetSalary() {
    let szja = person.grossSalary * 0.15;
    const tb = person.grossSalary * 0.185;
    let reduction = 0;

    if (person.under25Reduction) {
      const upperLimit = 499952;
      if (person.grossSalary < upperLimit) {
        szja = 0;
      } else {
        szja = (person.grossSalary - upperLimit) * 0.15;
      }
    }

    if (person.personalReduction) {
      reduction += 77300;
    }

    if (person.isMarriageRecent) {
      reduction += 5000;
    }

    if (person.familyTaxReduction) {
      let factor = 0;

      switch (person.numberOfBeneficiaries) {
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

      reduction += factor * person.numberofDependants;
    }

    setValue('netSalary', Math.round(person.grossSalary - Math.max(szja + tb - reduction, 0)));
  }

  useEffect(() => {
    calculateNetSalary();
  }, [person.grossSalary, person.under25Reduction, person.isMarriageRecent, person.personalReduction, person.familyTaxReduction, person.numberofDependants, person.numberOfBeneficiaries])

  return(
    <div className='container bg-neutral-content rounded w-2/5 mx-auto p-5'>
      <div className='flex'>
        <h1 className="text-2xl font-bold uppercase mb-2 me-2">{person.name} bérének kiszámítása</h1>
        <button className="btn btn-sm btn-ghost btn-square" onClick={deletePerson}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <Input label="Családtag neve" placeholder="Név" feedback="Add meg a családtag nevét!" inputType="text" value={person.name} setValue={(value) => setValue('name', value)}></Input>
      <Input label="Bruttó bér" placeholder="100000" feedback="Add meg a bruttó béredet!" inputType="number" value={person.grossSalary} setValue={(value) => setValue('grossSalary', value)}></Input>
      <SalaryChanger grossSalary={person.grossSalary} setGrossSalary={(value) => setValue('grossSalary', value)}></SalaryChanger>
      <h2 className='text-xl font-bold mt-3 uppercase mb-1'>Kedvezmények</h2>
      <Toggle label="25 év alattiak SZJA mentessége" value={person.under25Reduction} setValue={(value) => setValue('under25Reduction', value)}></Toggle>
      <div className="flex align-middle">
        <Toggle label="Friss házasok kedvezménye" value={person.recentlyMarriedReduction} setValue={(value) => setValue('recentlyMarriedReduction', value)}></Toggle>
        {person.recentlyMarriedReduction && <RecentlyMarriedInput isValid={person.isMarriageRecent} setIsValid={(value) => setValue('isMarriageRecent', value)}></RecentlyMarriedInput>}
      </div>
      <Toggle label="Személyi adókedvezmény" value={person.personalReduction} setValue={(value) => setValue('personalReduction', value)}></Toggle>
      <Toggle label="Családi kedvezmény" value={person.familyTaxReduction} setValue={(value) => setValue('familyTaxReduction', value)}></Toggle>
      {person.familyTaxReduction &&
      <div className='flex'>
        <StepInput number={person.numberofDependants} setNumber={(value) => setValue('numberofDependants', value)} min={0} max={-1}></StepInput>
        <span className='text-sm'>Eltartott, ebből kedvezményezett:</span>
        <StepInput number={person.numberOfBeneficiaries} setNumber={(value) => setValue('numberOfBeneficiaries', value)} min={0} max={Math.min(3, person.numberofDependants)}></StepInput>
      </div>}
      <h2 className='text-xl font-bold mt-3 uppercase mb-1'>Számított nettó bér: {person.netSalary} Ft</h2>
    </div>
  )
}

function Household() {
  const [id, setId] = useState(1);
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
  const [selectedPerson, setSelectedPerson] = useState(0);

  function newPerson() {
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
    setId(id+1);
    setPeople([...people, newPerson()]);
  }

  function editPerson(newPerson) {
    setPeople(people.map(person => person.id == newPerson.id ? newPerson : person));
  }
  
  function deleteCurrentPerson() {
    if (people.length == 1) {
      const newPerson2 = newPerson();
      setPeople([newPerson2]);
    }
    setPeople(people.filter(person => person.id != selectedPerson));
    setSelectedPerson(people[0].id);
  }

  return (
    <div>
      <div className='flex flex-auto mx-auto mb-2'>
        {people.map(person => {
          return(<button className="btn btn-primary uppercase mx-1" onClick={() => setSelectedPerson(person.id) }>{person.name}</button>);
        })}
        <button className="btn btn-outline btn-primary mx-1" onClick={addPerson}>+</button>
      </div>
      <div className='flex flex-auto'>
        <Person person={people[selectedPerson]} setPerson={(value) => editPerson(value)} deletePerson={deleteCurrentPerson}></Person>
        <div className='container bg-neutral-content rounded w-2/5 mx-auto p-5'>
          <h1 className="text-2xl font-bold uppercase mb-2">Háztartás összesített jövedelme</h1>
          <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Családtag</th>
                <th>Nettó bér</th>
              </tr>
            </thead>
            <tbody>
              {people.map(person => {
                return(
                  <tr>
                    <td>{person.name}</td>
                    <td>{person.netSalary} Ft</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>Összesített jövedelem</td>
                <td>{people.reduce((n, person) => n + person.netSalary, 0)} Ft</td>
              </tr>
            </tfoot>
          </table>
        </div>
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
