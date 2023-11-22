import "font-awesome/css/font-awesome.min.css";
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
      <nav className="bg-zinc-900 border border-orange-500 p-1 fixed bottom-3 left-0 right-0 z-10 lg:w-1/3 md:w-2/4 sm:w-1/6 w-full mx-auto rounded-full">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center space-x-4">
            <a
              href="/my-barbers"
              className={`${
                pathname === "/my-barbers"
                  ? "text-orange-500 scale-[1.2] bg-zinc-900 rounded-t-full p-2 -translate-y-3"
                  : "text-white"
              } hover:scale-[1.2] hover:-translate-y-3 transition-all px-6`}
            >
              <i className={`fa fa-scissors md:fa-3x fa-2x `}></i>
            </a>
            <a
              href="/"
              className={`${
                pathname === "/"
                  ? "text-orange-500 scale-[1.2] bg-zinc-900 rounded-t-full p-2 -translate-y-3"
                  : "text-white"
              } hover:scale-[1.2] hover:-translate-y-3 transition-all px-6`}
            >
              <i className={`fa fa-home md:fa-3x fa-2x `}></i>
            </a>
            <a
              href="/profile"
              className={`${
                pathname === "/profile"
                  ? "text-orange-500 scale-[1.2] bg-zinc-900 rounded-t-full p-2 -translate-y-3"
                  : "text-white"
              } hover:scale-[1.2] hover:-translate-y-3 transition-all px-6`}
            >
              <i className={`fa fa-user md:fa-3x fa-2x  `}></i>
            </a>
          </div>
        </div>
      </nav>
    
  );
}

export default NavBar;
