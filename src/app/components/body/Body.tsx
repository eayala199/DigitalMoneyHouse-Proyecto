import React from "react";
import Card from "../card/Card";

const Body = () => {
  return (
    <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/assets/fondo-home.jpeg')" }}>
      <style jsx>{`
        @media (max-width: 375px) {
          .text-responsive-h1 {
            font-size: 28px;
          }
          .text-responsive-h2 {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="flex flex-col justify-start h-full text-white px-8 pt-16">
        <div className="max-w-md">
          <h1 className="text-[48px] text-left mb-4 text-responsive-h1">
            De ahora en adelante, hacés más con tu dinero
          </h1>
          <h2 className="text-[34px] text-left text-lime-500 text-responsive-h2">
            Tu nueva <strong>billetera virtual</strong>
          </h2>
        </div>
      </div>

      <div className="absolute bottom-[100px] sm:bottom-[34px] left-1/2 transform -translate-x-1/2 flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-4"
        style={{ height: '246px', zIndex: 10, maxWidth: 'calc(100% - 32px)' }}>
        <Card
          title="Transferí dinero"
          content="Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual."
        />
        <Card
          title="Pago de servicios"
          content="Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvidate de las facturas en papel."
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[80px] sm:h-[120px] lg:h-[148px] bg-lime-500 rounded-t-[20px] sm:rounded-t-[30px] flex items-center justify-center"
        style={{ zIndex: 1 }}>
      </div>
    </div>
  );
};

export default Body;
