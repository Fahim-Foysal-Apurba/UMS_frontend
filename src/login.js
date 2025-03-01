import img from './ums.png'
import {useState} from 'react'
import {useNavigate} from "react-router-dom"



const Login = () => {
    
    const navigate= useNavigate()
    const [activelink, setActivelink]= useState('Login')
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [name, setName]= useState("")
    const [loading, setLoading] = useState(false)
    const [errormessage, setErrormessage]= useState("")

    const handleLink = (link) =>{
        setActivelink(link);
    }
    const handleLoginSubmit = async(e)=>{
        e.preventDefault();

        const body= {email, password}
        setLoading(true)

        try{

            const response= await fetch('https://ums-35qh.onrender.com/login',{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })

            const data= await response.json();

            if(response.status=== 402 || response.status ===403 || response.status === 404 || response.status===500){
                setErrormessage(data.message)
            }else if(response.status===201){
                navigate('/ums', {state: {id: data.user.id, email: data.user.email, name: data.user.name, status: data.user.status, last_login: data.user.last_login}})
            }



        }catch(err){
            console.error(err.message)
            setLoading(false)
        }finally{
            setLoading(false)
        }
        setEmail('')
        setPassword('')

        

    }
    const handleRegisterSubmit = async (e) =>{
        e.preventDefault();
        const body={name, email, password}
        setLoading(true)

        try{
        const response = await fetch("https://ums-35qh.onrender.com/register", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })

        const data= await response.json();

        if(response.status===400 || response.status===500){
            setErrormessage(data.message)

        }else if(response.status === 201){
            navigate('/ums', {state: {id: data.user.id, email: data.user.email, name: data.user.name, status: data.user.status, last_login: data.user.last_login}})
        }}
        catch(err){
            console.log(err.message)
            setLoading(false)

        }finally{
            setLoading(false)
        }
        setName('')
        setEmail('')
        setPassword('')

    }

    return ( 
        
        <div className="container">
            <div className="d-flex  justify-content-center align-items-center vh-100 bg-light">
                <div className="card border border-3 shadow-lg transition hover-shadow" style={{transition: "0.3s"}} 
                onMouseOver={(e)=>e.currentTarget.style.transform="scale(1.07)"}
                onMouseOut={(e)=>e.currentTarget.style.transform="scale(1)"}>
                    <div className="card-body mx-3 my-1">
                        <div className="row">
                            <div className="col-lg-6 bg-dark d-flex flex-column justify-content-center align-items-center py-3">
                                
                            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mb-5">
                                <div className="container-fluid">
                                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                  </button>
                                  <div className="collapse navbar-collapse" id="navbarNav">

                                    <ul className="navbar-nav">
                                      <li className="nav-item">
                                        <a className={`nav-link ${activelink==="Login" ? "active bg-info rounded" : ""}`}
                                        href="#Login"
                                        onClick={()=>handleLink("Login")}
                                        >Login</a>
                                      </li>


                                      <li className="nav-item">
                                        <a className={`nav-link ${activelink=== "Registration" ? "active bg-info rounded" : ""}`} 
                                        href="#Registration"
                                        onClick={()=>handleLink("Registration")}>
                                            Register</a>
                                         </li>
                                    </ul>
                                  </div>
                                 </div>
                                </nav> 

                                {/*Login */}
                                {activelink==="Login" && (
                                <form className="form-control d-flex justify-content-center flex-column" onSubmit={handleLoginSubmit}>
                                    <label htmlFor="email" className="form-label fw-bold"> Email: </label>
                                    <input type="email"
                                    id="email" 
                                    className="form-control mb-2"
                                    value={email}
                                    placeholder='Enter you email'
                                    onChange={(e)=> setEmail(e.target.value)}
                                    required
                                     />
                                    
                                    <label htmlFor="password" className="form-label fw-bold">Password: </label>
                                    <input type="password"
                                    className="form-control mb-5" 
                                    id="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    required
                                    />

                                    {errormessage && (<div className="text-danger text-center">{errormessage}</div>)}

                                    <button type="submit" className="btn btn-outline-light btn-secondary mt-3" disabled={loading}>{loading ? (<div className="spinner-border text-warning" role="status"><span className="visually-hidden">Logging...</span></div>):("Login")}</button>


                                </form>)}


                                {/*Register */}

                                {activelink==="Registration" && (

                                <form onSubmit={handleRegisterSubmit} className="form-control d-flex justify-content-center flex-column">


                                    <label htmlFor="name" className="form-label fw-bold">Name: </label>
                                    <input type="text"
                                    className="form-control"
                                    id="name" 
                                    value={name}
                                    placeholder="Enter your name"
                                    onChange={(e)=>setName(e.target.value)}
                                    required/>

                                    <label htmlFor="email1" className="form-label fw-bold">Email: </label>
                                    <input type="email"
                                    className="form-control"
                                    id="email1" 
                                    value={email}
                                    placeholder="Enter your email"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required/>

                                    <label htmlFor="password1" className="form-label fw-bold">Password:</label>
                                    <input type="password"
                                    className="form-control mb-2" 
                                    id="password1"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="Your password"
                                    required/>
                                    
                                    {errormessage && (<div className="text-danger text-center">{errormessage}</div>)}
                                    

                                    <button type="submit" className="btn btn-outline-light btn-secondary" disabled={loading}>{loading ? (<div className="spinner-border text-warning" role="status"><span className="visually-hidden">Registering...</span></div>):("Register")}</button>


                                </form>

                                )}
                                
                                

                            </div>
                            <div className="col-lg-6 bg-warning d-flex justify-content-center align-items-center flex-column">
                                <img className="w-50 my-2" src={img} alt="logo" />
                                <h1>UMS</h1>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Login;