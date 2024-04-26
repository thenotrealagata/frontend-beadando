export function Input({ label, placeholder, feedback, inputType, value, setValue}) {
    function handleInputChange(e) {
      setValue(e.target.value);
    }
  
    return(<label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text">{label}</span>
    </div>
    <input type={inputType} placeholder={placeholder} className="input input-bordered w-full max-w-xs" value={value} onChange={handleInputChange}
    {...(inputType=='date' ? { min: "2000-01-01", max: "2025-01-01"} : {})}
    />
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