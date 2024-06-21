import React from 'react'
//the classNames of tailwind are taken from the tutorial as it is since my main focus was on React. So please ignore the tailwind classes.
function Select({
    options,
    label,
    className= "", //given by user
    ...props //any more properties that the user might give like placeholder etc.
}, ref // reference given by the user
) {
    const id = useId() // to generate unique id.
  return (
    <div className='w-full'>
      {label &&  // this '&&' means that if label exists, then do this
      <label htmlFor={id} className=''></label>}
      <select 
      {...props} //additional properties given by the user
      id={id}
      ref={ref}
      className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 w-full border border-gray-50 ${className}`}
      >
        {/*Since options is an array so we will loop it. We will do options? so that if options does not contain a value, then we will not loop it because sometimes might possible that the user has not given any value  */}
        {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
/*
forwardRef means that forwarding a reference through child components 
"Ref forwarding is a technique for automatically passing a ref through a component to one of its children."
It is used to take the refernce from one component to another.
*/
