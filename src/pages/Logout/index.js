import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../action/login";

function Logout(){
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    navigate("/login");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(login("LOGOUT"));
  },[])
  return(
    <>

    </>
  )
}
export default Logout;