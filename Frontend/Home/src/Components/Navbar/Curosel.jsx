import React from 'react';
// import { useEffect } from 'react';
import { useState,useEffect } from 'react';
import './Curosel.Module.css';

export const Curosel = () => {


const [ind,setIndex]=useState(0);

    const imgobj=[{
        id:1,
        url:'https://cargillsonline.com/VendorItems/Banner/DySec-nJ7WiEuQG3BANNER-1.png',

    },
{
    
        id:2,
        url:'https://cargillsonline.com/VendorItems/Banner/DySec-KoycQ1Eis6MALT_WEB-BA.jpg',
        
    
},
{
    id:3,
    url:'https://cargillsonline.com/VendorItems/Banner/DySec-uEiW7KUyblWEB-K.png',
    
},
{
    id:4,
    url:'https://cargillsonline.com/VendorItems/Banner/DySec-9iWAKoybPZWEB-A-K.png',
    
},
{
    id:5,
    url:'https://cargillsonline.com/VendorItems/Banner/DySec-Q1Eis7JTxHWEB-G.png',
    
}
]


 useEffect(()=>{

    setTimeout(()=>{
        if(ind===imgobj.length-1){
    setIndex(0);
        }
        else {
            setIndex(ind+1);
          
           
        }


    },2000);
},[ind])
   


const hoverhandler=(num)=>{
    setIndex(num);
}


  return (
    <div className='curosel'>

<div className='hoverimage'>
<img src={imgobj[ind].url} 
alt="" />
</div>




{/* hover control */}


<div className='hovercontrol'>
    <h3 onMouseEnter={()=>hoverhandler(0)}>
        Shopease Anniversary Sale
    </h3>

    <h3 onMouseEnter={()=>hoverhandler(1)}>
        Men's Blue jacket
    </h3>

    <h3 onMouseEnter={()=>hoverhandler(2)}>
        BlockBuster deals
    </h3>


<h3 onMouseEnter={()=>hoverhandler(3)}>
    Jdd
</h3>

<h3 onMouseEnter={()=>hoverhandler(4)}>
    Intel
</h3>

</div>

    </div>
  )
}
