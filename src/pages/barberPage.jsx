import MyBarber from "../components/barberShops/myBarber"
import { useParams } from "react-router-dom";

function BarberPage() {
    const params = useParams();
    return (
        <div>
             <MyBarber />
        </div>
       
    )
}

export default BarberPage;