import React from 'react'

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
        {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map((item, index)  => (
            <a
                href={`#${item}`}
                key = {item + index}
                className='app__navigation-dot'
                style={active === item ? { backgroundColor: '#BB86FC'} : { }}
            >
            </a>
            
        ))}
    </div>
  )
}

export default NavigationDots