export class NotificationsFakeData {
  public static data = {
    messages: [
      {
        image: 'assets/images/pages/eCommerce/descarga.png',
        heading: '<span class="font-weight-bolder">Bienvenido a la pagina 🎉</span>',
        text: 'Empiece a generar indicadores.'
      },
      {
        image: 'assets/images/pages/eCommerce/descarga.png',
        heading: '<span class="font-weight-bolder">Nuevo mensaje</span>  recibido',
        text: 'Tienes 10 mensajes sin leer.'
      },
      {
        image: 'assets/images/pages/eCommerce/descarga.png',
        heading: '<span class="font-weight-bolder">Distribución de Licencias</span>  verificar',
        text: 'Recuerde que tiene 3 Licencias sin utilizar.'
      }
    ],
    systemMessages: [
      /*
      {
        icon: 'x',
        heading: '<span class="font-weight-bolder">Servidor caido</span> registrado',
        text: 'El servidor de EE. UU. está inactivo debido al alto uso de la CPU.'
      },
      {
        icon: 'check',
        heading: '<span class="font-weight-bolder">Reporte de ventas</span> generado',
        text: 'Informe de ventas del último mes generado.'
      },
      {
        icon: 'alert-triangle',
        heading: '<span class="font-weight-bolder">memoria alta</span> uso',
        text: 'Servidor BLR usando mucha memoria.'
      }*/
    ],
    system: true
  };
}
