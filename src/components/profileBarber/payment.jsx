function Payment() {
  return (
      <div className="flex flex-col items-center h-screen">
          <header>
              <img
                  src="/barhallaLogo.png"
                  alt="Barhalla Logo"
                  className="w-32 h-32"
              />
          </header>
          <main>
              <h1 className="mt-2 text-2xl text-orange-500">Historial de Pagos</h1>
          </main>
          <hr className="w-full mt-4 sm:mt-12 border-t-2 border-orange-500" />
          <section className="mt-4 flex items-center">
              <label className="mr-4 bg-zinc-900 w-16 text-center rounded-lg">Mes:</label>
              <select className="bg-zinc-950 border border-zinc-800 rounded-lg">
                  <option value="enero">Enero</option>
                  <option value="febrero">Febrero</option>
                  <option value="marzo">Marzo</option>
                  <option value="abril">Abril</option>
                  <option value="mayo">Mayo</option>
                  <option value="junio">Junio</option>
                  <option value="julio">Julio</option>
                  <option value="agosto">Agosto</option>
                  <option value="septiembre">Septiembre</option>
                  <option value="octubre">Octubre</option>
                  <option value="noviembre">Noviembre</option>
                  <option value="diciembre">Diciembre</option>
              </select>
              <div className="ml-4">
                  <label className="text-orange-500">
                      <input type="checkbox" /> Historial Completo
                  </label>
              </div>
          </section>
          <hr className="w-full mt-4 sm:mt-12 border-t-2 border-orange-500" />
      </div>
  );
}

export default Payment;
