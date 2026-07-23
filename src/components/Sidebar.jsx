import { motion } from "framer-motion";
import {
  FiHome,
  FiEdit3,
  FiCalendar,
  FiClock,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

import "../styles/sidebar.css";

const menu=[

{
title:"Dashboard",
icon:<FiHome/>,
path:"/"
},

{
title:"Create Post",
icon:<FiEdit3/>,
path:"/create-post"
},

{
title:"Scheduled",
icon:<FiCalendar/>,
path:"/scheduled"
},

{
title:"Drafts",
icon:<FiClock/>,
path:"/drafts"
},

{
title:"Analytics",
icon:<FiBarChart2/>,
path:"/analytics"
},

{
title:"Settings",
icon:<FiSettings/>,
path:"/settings"
}

];

function Sidebar(){

return(

<motion.div

className="sidebar glass"

initial={{x:-80}}

animate={{x:0}}

>

<h1 className="sidebarTitle">

Workspace

</h1>

<div className="menu">

{menu.map((item)=>(

<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

isActive

?

"menuItem activeItem"

:

"menuItem"

}

>

<span>

{item.icon}

</span>

<p>

{item.title}

</p>

</NavLink>

))}

</div>

<div className="storage glass">

<h4>

Storage

</h4>

<div className="progress">

<div className="progressFill"/>

</div>

<small>

2.4 GB of 10 GB Used

</small>

</div>

</motion.div>

);

}

export default Sidebar;