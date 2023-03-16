import SendData from "./Data/SendData";
import { DeleteToken } from "./Token/DeleteToken";

export default function Logout(URL, DATA, NAVIGATE){
    SendData(URL, DATA).then(data => {
        console.log(data.detail);
        if(data.detail === "You have successfully logged out."){
            DeleteToken();

            NAVIGATE("/signin");
        }
    })
}