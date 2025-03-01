import { useLocation, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import img from './ums.png'
import img1 from './user.png'

const UMS = () => {
    

    const location=useLocation()
    const navigate=useNavigate()
    const id= location.state?.id || sessionStorage.getItem('userId')
    const name= location.state?.name || sessionStorage.getItem('userName')
    const email= location.state?.email || sessionStorage.getItem('userEmail')
    const status= location.state?.status || sessionStorage.getItem('userStatus')
    const last_login= location.state?.last_login || sessionStorage.getItem('userLast_login')

    useEffect(()=>{
      if(id) sessionStorage.setItem('userId', id)
      if(name) sessionStorage.setItem('userName', name)
      if(email) sessionStorage.setItem('userEmail', email)
      if(status) sessionStorage.setItem('userStatus', status)
      if(last_login) sessionStorage.setItem('userLast_login', last_login)

  }, [id, name, email, status, last_login])

    const [userInfo, setUserInfo]=useState([])
    const [ids, setIds] = useState([])
    const [selectedItems, setSelectedItems]= useState([])

    const getData = async () => {
      try {
          const response = await fetch('https://ums-35qh.onrender.com/getData');
  
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          setUserInfo(data);
  
          const idsArray = data.map(user => user.id);
          setIds(idsArray);

          
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  
  useEffect(() => {
      getData();
  }, []);
  

  const deleteSelection= async (e)=>{
    e.preventDefault()
      const body={selectedItems}
     const response=await fetch('https://ums-35qh.onrender.com/deleteUser',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)

      })
      if(response.ok){
        getData()
        if(selectedItems.includes(id)){
          handlelogout()
        }
        setSelectedItems([])
      }
  }

  const blockUser= async(e)=>{
    e.preventDefault()

    const body={selectedItems}

    const response=await fetch('https://ums-35qh.onrender.com/blockUser',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
  })

  if(response.ok){
    getData()
    if(selectedItems.includes(id)){
      handlelogout()
    }
    setSelectedItems([])
  }

  }

  const unblockUser= async(e)=>{
    e.preventDefault()

    const body={selectedItems}

    const response=await fetch('https://ums-35qh.onrender.com/unBlockUser',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })

    if(response.ok){
      getData()
      setSelectedItems([])
    }
  }

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item) 
        : [...prevSelected, item] 
    );
  };

  const handleCheckboxChangeAll=()=>{
 
      setSelectedItems(selectedItems.length === ids.length ? [] : [...ids]);

  }


  const getTimeAgo = (isoTimestamp) => {
    const lastLoginTime = new Date(isoTimestamp); // Convert ISO string to Date object
    const now = new Date();
    const diffInMs = now - lastLoginTime; // Difference in milliseconds

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} days ago`;
};



   
    const handlelogout= async ()=>{

        const response= await fetch('https://ums-35qh.onrender.com/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if(response.status===200){
          navigate('/')
         // alert("Successfully Logout")

        }else{
            return alert("logout failed")
        }

    }

    





    return (
        <div className= "container" style={{padding: "90px"}}>
        
        <nav className="navbar navbar-light bg-warning fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      <img src={img} alt="UMS logo" width="60" height="60" className="d-inline-block align-text-top fw-bold"/>
       UMS
    </a>
    <div className="d-flex"><h1>UMS</h1></div>
    <div className="d-flex me-5">

        <div style={{color: 'blue', fontSize: "18px"}}> <img src={img1} alt="UMS logo" width="40" height="40" className="d-inline-block align-text-top fw-bold me-2"/><div className="flex-column fw-bold">{name.split(' ')[0]}</div></div>
        <div></div>

        <button className="btn btn-sm btn-outline-light ms-2" onClick={handlelogout}>logout</button>
    </div>

    
  </div>
  
</nav>

<div className="container" style={{backgroundColor: " #f9ecf2"}}>

<div className="container-fluid w-100 px-3 py-3 border border-3 rounded d-flex flex-wrap justify-content-between align-items-center" style={{ backgroundColor: "#e09ebd", minHeight: "100vh" }}>
  <div className="d-flex flex-wrap gap-2">
    <button className={selectedItems.length === 0 ? "btn btn-danger btn-light disabled" : "btn btn-outline-danger btn-light"} onClick={deleteSelection}>
      <i className="fa fa-trash"></i>
    </button>
    <button className={selectedItems.length === 0 ? "btn btn-warning btn-light disabled" : "btn btn-outline-warning btn-light"} onClick={blockUser}>
      <i className="fa fa-lock"></i>
    </button>
    <button className={selectedItems.length === 0 ? "btn btn-success btn-light disabled" : "btn btn-outline-success btn-light"} onClick={unblockUser}>
      <i className="fa fa-unlock"></i>
    </button>
  </div>
  <span className="text-center flex-grow-1" style={{ fontSize: 24, fontFamily: "fancy", color: "Black" }}>
    User Table
  </span>
</div>

        

        {/*Table User */}
        

          <table className="table table-striped table-hover my-2 border border-3 rounded">

                <thead className="table-dark">
                  <tr>
                    <th ><input type="checkbox" checked={selectedItems.length===ids.length} onChange={handleCheckboxChangeAll} /></th>
                    <th >Name</th>
                    <th >Email</th>
                    <th >Last Login</th>
                    <th>Status</th>
                  </tr>
                </thead>
                   <tbody>
                    {userInfo.map((u)=>(
                      <tr key={u.id} className={u.status==="blocked" ? "text-muted bg-white": " "}>
                        <td><input type="checkbox" checked={selectedItems.includes(u.id)} onChange={()=>handleCheckboxChange(u.id)} /></td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{getTimeAgo(u.last_login)}</td>
                        <td className={u.status==="active" ? "text-success" : "text-danger"}>{u.status}</td>
                        
                      </tr>
                      
                    ))}
                   </tbody>

          </table>

        </div>





      


</div>
     );
}
 
export default UMS;