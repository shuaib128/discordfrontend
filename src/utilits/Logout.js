import SendData from "./Data/SendData";
import { DeleteToken } from "./Token/DeleteToken";

export default function Logout(URL, DATA, NAVIGATE) {
    SendData("POST", URL, DATA).then(data => {
        if (data.detail === "You have successfully logged out.") {
            DeleteToken();

            NAVIGATE("/signin");
        }
    })
}