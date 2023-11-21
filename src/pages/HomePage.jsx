import Search from "../components/barberShops/search";
import BarberForm from "../components/barberShops/barberForm";
import NavBar from "../components/common/NavBar";

function HomePage() {
  return (
    <div>
        <Search/>
        <BarberForm/>
        <NavBar/>
    </div>
  )
}

export default HomePage