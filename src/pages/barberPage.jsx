import MyBarber from "../components/barberShops/myBarber"
import { useParams } from "react-router-dom";

function BarberPage() {
    const params = useParams();
    return (
        <div>
            <h1>barberiaDetails:{params.id}</h1>
             <MyBarber />
        </div>
       
    )
}

export default BarberPage;