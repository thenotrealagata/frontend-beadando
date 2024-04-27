export function SalaryChanger({ grossSalary, setGrossSalary }) {
    function handleGrossSalaryChange(e) {
      setGrossSalary(e.nativeEvent.srcElement.value);
    }
  
    function manipulateValue (percent) {
      let value = Number(grossSalary) + Math.round((percent / 100) * grossSalary);
      setGrossSalary(value);
    }
  
    return(
      <div>
        <input type="range" min="0" max="1500000" value={grossSalary} className="range range-primary" onChange={handleGrossSalaryChange}/>
        <div className="grid grid-cols-4 place-content-center mt-3">
          <button className="btn btn-primary mx-5" onClick={() => manipulateValue(-1)}>-1%</button>
          <button className="btn btn-primary mx-5" onClick={() => manipulateValue(-5)}>-5%</button>
          <button className="btn btn-primary mx-5" onClick={() => manipulateValue(1)}>+1%</button>
          <button className="btn btn-primary mx-5" onClick={() => manipulateValue(5)}>+5%</button>
        </div>
      </div>
    );
  }