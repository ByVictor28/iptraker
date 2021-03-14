import React from 'react'
import classes from "./Tooltip.module.css"

const Tooltip = ({children,text})=>{ 
return (
    <div className={classes.Tooltip}>
        {children}
        <span>{text}</span>
    </div>
) 
}

export default Tooltip
