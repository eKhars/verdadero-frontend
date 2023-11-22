import NavBar from "../common/NavBar";

function Payment() {
    const pagos = [
      { cliente: 'Cliente1', monto: 100, servicio: 'corte', fecha: '2023-11-21' },
      { cliente: 'Cliente2', monto: 150, servicio: 'mamadas', fecha: '2023-11-22' },
    ];
  
    return (
      <div className="container mx-auto p-4">
        <header>
          <img
            src="/barhallaLogo.png"
            alt="Barhalla Logo"
            className="mx-auto mb-4 w-32 h-32"
          />
        </header>
        <main className="text-center">
          <h1 className="mt-2 text-2xl text-orange-500">Historial de Pagos</h1>
        </main>
        <hr className="w-full mt-4 sm:mt-8 border-t-2 border-orange-500" />
        <section className="mt-4 flex flex-col items-center sm:flex-row sm:justify-between">
          <label className="mb-2 sm:mb-0 bg-zinc-900 w-16 text-center rounded-lg">
            Mes:
          </label>
          <select className="w-full sm:w-1/2 bg-zinc-950 border border-zinc-800 rounded-lg text-center mb-4 sm:mb-0">
            <option value="enero">Enero</option>
            <option value="febrero">Febrero</option>
            <option value="marzo">Marzo</option>
          </select>
          <div className="ml-0 sm:ml-4">
            <label className="text-orange-500">
              <input type="checkbox" /> Historial Completo
            </label>
          </div>
        </section>
        <hr className="w-full mt-4 sm:mt-8 border-t-2 border-orange-500" />
        <section className="mt-4">
          <div className="flex justify-between text-orange-500 font-bold mb-4">
            <div className="w-1/4">Cliente</div>
            <div className="w-1/4">Monto</div>
            <div className="w-1/4">Servicio</div>
            <div className="w-1/4">Fecha</div>
          </div>
          {pagos.map((pago, index) => (
            <div key={index} className="flex justify-between  items-center  mb-2 sm:mb-0">
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">{pago.cliente}</div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">{pago.monto}</div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">{pago.servicio}</div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">{pago.fecha}</div>
            </div>
          ))}
        </section>
        <hr className="w-full mt-4 sm:mt-8 border-t-2 border-orange-500" />
        <NavBar />
        
      </div>
    );
  }
  
  export default Payment;
  