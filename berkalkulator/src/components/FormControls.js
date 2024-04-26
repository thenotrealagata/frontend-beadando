export function Input({ label, placeholder, feedback, inputType, value, setValue}) {
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

export function Toggle({ label, value, setValue }) {
  function handleToggleChange() {
    setValue(!value);
  }

  return(
    <div className="form-control">
      <label className="label cursor-pointer w-80">
        <input type="checkbox" className="toggle toggle-primary" checked={value} onChange={handleToggleChange}/>
        <span className="label-text font-bold">{label}</span> 
      </label>
    </div>
  );
}

export function StepInput ({ number, setNumber, min, max }) {
  function add(n) {
    if (max >= 0 && number + n > max) setNumber(max);
    else if (number + n < (min ?? 0)) setNumber(min);
    else setNumber(number + n);
  }

  return(
    <div className='flex mx-1 align-middle'>
      <button className="btn btn-circle btn-outline btn-xs me-2" onClick={() => add(-1)}>-</button>
      <span className="text-sm">{number}</span>
      <button className="btn btn-circle btn-outline btn-xs ms-2" onClick={() => add(1)}>+</button>
    </div>
  )
}