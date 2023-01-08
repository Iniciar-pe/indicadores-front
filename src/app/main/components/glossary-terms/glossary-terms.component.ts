import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'glossary-terms',
  templateUrl: './glossary-terms.component.html',
  styleUrls: ['./glossary-terms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlossaryTermsComponent implements OnInit {

  public contentHeader: object;
  public qandA: any;
  public searchText: string;

  constructor() {
 
  }


  ngOnInit(): void {
    this.qandA = [
      {
        question: `Ciclo de caja`,
        ans: `Integra tres indicadores en uno: el período promedio de cobro, período promedio de pago y período promedio de inventarios. Así, arroja el saldo promedio en días equivalentes a efectivo que queda después de sumar el promedio de días en inventarios con el promedio de días en cuentas por cobrar y restar el promedio de días de pago. En vista que el promedio de días en inventarios más el promedio de días en cuentas por cobrar viene a ser el ciclo operativo, se calcula también deduciendo al ciclo operativo el promedio de días de pago. `
      },
      {
        question: `Cliente`,
        ans: `Persona o conjunto de personas que consumen, utilizan, adquieren, deciden la adquisición, recomiendan, reciben o son afectadas por el producto o el servicio entregado por una organización, una unidad estratégica, un proceso o una unidad orgánica. En el contexto interno de una organización, también puede tratarse de un proceso o unidad orgánica que recibe el producto o la salida de un proceso determinado. El cliente puede ser externo o interno.`
      },
      {
        question: `Cliente externo`,
        ans: `Persona –individual o colectiva, natural o social– que no pertenece a la organización que consume, utiliza, adquiere, decide la adquisición, paga, recomienda o es afectado por la actividad o el servicio, retribuye o recibe el producto o el servicio entregado por ella o por una de sus unidades orgánicas. En muchas instituciones del sector público se sustituye el término cliente por beneficiario o usuario.`
      },
      {
        question: `Competidor`,
        ans: `Organización que entrega productos o servicios similares, sustitutos o complementarios a los productos o servicios entregados por una organización o unidad estratégica, y que se orientan a los mismos segmentos de clientes, usuarios o beneficiarios de la organización o unidad estratégica.`
      },
      {
        question: `Competitividad`,
        ans: `Capacidad para lograr y mantener una relación calidad-precio que disuada a los competidores potenciales, persuada a los clientes y permita la permanencia de la organización o de la unidad estratégica en el mercado. Para hacer práctica esta definición, compréndase por precio el monto pagado por el cliente, que incluye los costos y el margen de ganancia; y por calidad, fundamentalmente las características o valores claves del producto y la percepción de estos por los clientes. Es decir, un negocio X será más competitivo que un negocio Y si ofrece un producto a un precio P con un nivel de calidad de 18, mientras el negocio Y también ofrece el mismo producto al precio P, pero con un nivel de calidad de 16.`
      },
      {
        question: `Costo de capital`,
        ans: `Suma ponderada del gasto financiero y del costo de oportunidad. Dicho de una manera simple, representa el costo del dinero invertido en la organización y que ha sido aportado por agentes externos o que no son propietarios de la organización (pasivo) y por los accionistas (patrimonio). Por lo general, un pasivo genera un gasto financiero y las cuentas del patrimonio poseen costos de oportunidad. Si en un negocio se invirtió 10,000 dólares y fue financiado con 2,000 dólares mediante aportes de los accionistas y el saldo fue cubierto con un préstamo bancario, y además, conociendo que el costo de oportunidad es de 20% anual y el gasto financiero es de 10%, entonces el costo de capital del negocio equivale al 12% [(20% x 2,000 + 10% x 8,000) ÷ 10,000]. `
      },
      {
        question: `Costo de insumo de producción`,
        ans: `El insumo se considera como parte del material directo de un producto. Comprende todo material, ingrediente o sustancia que sirve para transformar la materia prima y que forma parte del producto terminado. En el caso que no forme parte del producto terminado, debe tratarse de un recurso que tuvo contacto con la materia prima o el producto en proceso con el fin de otorgarle valor. Por ejemplo:
          <br>
          <ul>
            <li>En un restaurante: Sal, tomate, cebolla, pimienta, etcétera.</li>
            <li>Servicio de atención pediátrica: Medicamento, esparadrapo, alcohol.</li>
            <li>Aceites comestibles: Ácido fosfórico, soda cáustica, tierra de blanqueo, sal industrial.</li>
            <li>Cerveza: Lúpulo (para el sabor amargo y aroma), agua, dextrosa, levadura (para la fermentación), azúcar.</li>
            <li>Plátano: Abono orgánico, ceniza.</li>
            <li>Ropa: Hilo, broches, botones.</li>
          </ul>
          `
      },
      {
        question: `Costo de mano de obra directa fija`,
        ans: `Monto que se otorga al personal que de manera permanente manipula las máquinas y los materiales y aplica los métodos de trabajo, que dentro de un rango relevante, no cambia cuando cambia la cantidad producida. Por ejemplo:
          <br>
          <ul>
            <li>Restaurante: Salario mensual del chef y de los ayudantes de cocina.</li>
            <li>Atención pediátrica: Sueldo mensual del médico pediatra.</li>
            <li>Aceites comestibles: Salario mensual de los operadores de las etiquetadoras, salario mensual de los operadores de los equipos de refinación.</li>
            <li>Cerveza: Salario mensual de los operadores de los equipos de maceración, salario mensual de los operadores de los equipos de cocción, salario mensual de los operadores de los equipos de fermentación, salario mensual de los operadores de los equipos de maduración.</li>
            <li>Plátano: Jornal de los peones de limpieza de campo.</li>
            <li>Ropa: Salario mensual del diseñador, cortador, estampador, del confeccionista, del bordador, del responsable de acabado, etcétera.</li>
          </ul>
          `
      },
      {
        question: `Costo de mano de obra directa variable`,
        ans: `Monto que se otorga al personal que de manera permanente manipula las máquinas y los materiales y aplica los métodos de trabajo, que sí cambia cuando cambia la cantidad producida. Por ejemplo:
          <br>
          <ul>
            <li>Restaurante: Bonos por menú vendido otorgado al chef y a los ayudantes de cocina.</li>
            <li>Atención pediátrica: Comisiones por niño atendido asignado al médico pediatra.</li>
            <li>Aceites comestibles: Comisión otorgada por tonelada de aceite vendido a los operadores de máquinas o equipos de la planta de producción.</li>
            <li>Cerveza: Comisión otorgada por hectolitro de cerveza vendida a los operadores de máquinas o equipos de la planta de producción.</li>
            <li>Plátano: Monto por cabeza de plátano a los peones de cosecha.</li>
            <li>Ropa: Incentivo por prenda vendida otorgado al diseñador, cortador, estampador, confeccionista, bordador, responsable de acabado.</li>
          </ul>
          `
      },
      {
        question: `Costo de materia prima`,
        ans: `O costo del in put primario principal. La materia prima es parte de los materiales directos de un producto e incluye todo producto u objeto que ingresa al proceso, que sufre una transformación y forma parte del producto terminado. Ejemplos de costos de materia prima:
          <br>
          <ul>
            <li>Restaurante: Arroz, pollo, carne.</li>
            <li>Servicio de atención pediátrica: Estado de salud del niño (costo cero).</li>
            <li>Aceites comestibles: Crudos de aceite de girasol, pescado, canola, etcétera.</li>
            <li>Cerveza: Grano de cebada u otro.</li>
            <li>Plátano: Rizoma o bulbo (tallo con raíz, viene a ser la semilla).</li>
            <li>Ropa: Tela.</li>
          </ul>
          `
      },
      {
        question: `Costo de mano de obra indirecta fija`,
        ans: `La mano de obra indirecta fija es el personal que dirige, supervisa, controla y/o apoya el trabajo en el proceso productivo, y que percibe una remuneración que, dentro de un rango relevante, no cambia con las unidades producidas. Ejemplos de costo de mano de obra indirecta fija:
          <br>
          <ul>
            <li>Restaurante: Sueldos del jefe del área de cocina y del supervisor de calidad.</li>
            <li>Atención pediátrica: Sueldos del director médico, de la enfermera, del técnico de laboratorio, del personal de mantenimiento de equipos médicos.</li>
            <li>Aceites comestibles: Sueldos del gerente de producción, de los supervisores de planta, del jefe de mantenimiento, del jefe de control de calidad, del personal de electricidad de la planta.</li>
            <li>Cerveza: Sueldos del gerente de producción, de los supervisores de planta, del jefe de mantenimiento, del jefe de control de calidad, del personal de desarrollo de productos.</li>
            <li>Plátano: Suelo del capataz de campo.</li>
            <li>Ropa: Sueldos del gerente de producción, de los supervisores de planta, del jefe de mantenimiento, del jefe de control de calidad, del personal de seguridad de la planta.</li>
          </ul>
          `
      },
      {
        question: `Costo de mano de obra indirecta variable`,
        ans: `La mano de obra indirecta variable es el personal que dirige, supervisa, controla y/o apoya el trabajo en el proceso productivo, y que percibe una remuneración que sí cambia conforme cambia las unidades producidas. Ejemplos de costo de mano de obra indirecta variable:
          <br>
          <ul>
            <li>Restaurante: Comisiones otorgadas al jefe del área de cocina y al supervisor de calidad.</li>
            <li>Atención pediátrica: Comisiones por cantidad de pacientes atendidos aplicadas al director médico, a la enfermera, al técnico de laboratorio, etcétera.</li>
            <li>Aceites comestibles: Comisión del gerente de producción por tonelada de aceite vendido.</li>
            <li>Cerveza: Bonos a los supervisores de planta por hectolitro de aceite vendido.</li>
            <li>Plátano: Monto por cabeza de plátano al capataz de campo.</li>
            <li>Ropa: Comisiones por volumen de prenda otorgadas al gerente de producción y a los supervisores de planta.</li>
          </ul>
          `
      },
      {
        question: `Costo de materiales indirectos fijos`,
        ans: `Monto que no cambia, dentro de un rango relevante, cuando cambia la cantidad producida y que corresponde a elementos que intervienen en la transformación de las materias primas y los productos en proceso y que son inventariables, pero que no tienen contacto con el producto terminado y/o no llegan a formar parte de este. Por ejemplo:
          <br>
          <ul>
            <li>Restaurante: Material de limpieza del área de cocina, desinfectantes utilizados en el área de cocina, material de limpieza de utensilios de cocina, etcétera.</li>
            <li>Atención pediátrica: Material de limpieza del consultorio, los artículos utilizados en los laboratorios, material de limpieza de uniformes, etcétera.</li>
            <li>Aceites comestibles: Lubricantes, materiales de limpieza del área de producción.</li>
            <li>Cerveza: Materiales de desinfección del área de producción, uniformes del personal de producción.</li>
            <li>Plátano: Materiales utilizados en el área de acopio.</li>
            <li>Ropa: Útiles de escritorio del personal de producción, agua destilada, material de limpieza de planta, etcétera.</li>
          </ul>
          `
      },
      {
        question: `Costo de materiales indirectos variables`,
        ans: `Monto que sí cambia cuando cambia la cantidad producida y que corresponde a elementos que intervienen en la transformación de las materias primas y los productos en proceso y que son inventariables, pero que no tienen contacto con el producto terminado y/o no llegan a formar parte de este. Por ejemplo:
          <br>
          <ul>
            <li>Restaurante: Gas, repuestos de equipos de cocina, carbón del horneo.</li>
            <li>Atención pediátrica: repuestos de los equipos de laboratorio, los artículos descartables como guantes o tapabocas, materiales de limpieza de sábanas.</li>
            <li>Aceites comestibles: Petróleo diesel del proceso de hidrogenación, agua industrial del proceso de fraccionamiento.</li>
            <li>Cerveza: Gas para el proceso de cocción, alcohol para análisis de laboratorio, hielo para la calibración de termómetros.</li>
            <li>Plátano: Repuestos y lubricantes de las máquinas y equipos de campo.</li>
            <li>Ropa: Gas, repuestos de equipos de producción, los lubricantes y aceites para el mantenimiento de equipos de producción, agua destilada para el planchado.</li>
          </ul>
          `
      },
      {
        question: `Costo de oportunidad`,
        ans: `Monto o tasa de ganancia que se deja o dejaría de percibir, como consecuencia de elegir una opción determinada. El costo de oportunidad debe ser algo real, no puede ser algo especulativo. Por ejemplo, un empresario para evaluar la conveniencia de invertir en el negocio “x” no debería utilizar la tasa promedio de la bolsa de valores si es que el capital que se desea invertir lo tiene depositado en un banco, excepto si tiene como alternativas de inversión el negocio “x” y la compra de acciones en la bolsa de valores. Si la empresa “y” que tiene una capacidad en exceso equivalente al 50% de la capacidad total de su almacén recibe la propuesta de un fabricante para alquilarle dicha capacidad por 500,000 dólares anuales, y al mismo tiempo se le presenta la oportunidad de participar en un nuevo mercado, que le significaría ocupar el área en exceso del almacén, deberá determinar si expandirse le es favorable o no, considerando como parte de los costos de expansión los 500,000 dólares 
que dejaría de ganar por no alquilar el almacén. En otras palabras, para aprobar el ingreso al nuevo mercado, el resultado debe ser por lo menos igual a cero, después de haber descontado a la utilidad de dicha estrategia, el costo de oportunidad de 500,000 dólares.`
      },
      {
        question: `Costo de producción`,
        ans: `Comprende el valor monetario de las materias primas o insumos primarios principales y los recursos que intervienen en su transformación en productos terminados.`
      },
      {
        question: `Costo de ventas (o gastos financieros de los fondos colocados o costo de mercaderías vendidas)`,
        ans: `En el caso de empresas manufactureras (se incluye a los restaurantes), el costo de ventas es el valor monetario obtenido en determinado período que resulta de la suma del inventario inicial de productos terminados más el costo de producción y menos el inventario final de productos terminados. En el caso de instituciones financieras, el costo de ventas viene a ser los gastos financieros correspondientes a los fondos colocados. En el caso de empresas comerciales, el costo de ventas equivale al costo de las mercaderías vendidas.`
      },
      {
        question: `Decisión inmediata`,
        ans: `Se orienta a frenar o superar el efecto, no se dirige a la causa de la desviación entre lo real y lo planeado, lo que se refleja en una acción que detiene un efecto no deseado, como prohibir o desautorizar un gasto superfluo o que no genera valor. Estas acciones son del tipo: “si ve que alguien sufre una hemorragia nasal, no pierda tiempo investigando por qué, actúe inmediatamente comprimiendo la fosa nasal por donde se produce el sangrado”.`
      },
      {
        question: `Decisión preventiva`,
        ans: `Se toma en relación con la causa o las causas de debilidades o problemas que, si bien actualmente no se presentan, podrían ocurrir en el futuro (potenciales). Por lo general, se recurre a decisiones preventivas después de observar varias tendencias consecutivas sobre resultados relacionados. Por ejemplo, si la cobertura de atención de una empresa pública se mantiene y se observa que las quejas fundadas de los usuarios también, pero en niveles relativamente altos, deberá tomarse una decisión que solucione la causa del alto nivel de quejas fundadas para evitar que este problema afecte negativamente la cobertura.`
      },
      {
        question: `EBITDA`,
        ans: `El EBITDA, proviene de las primeras palabras en inglés Earnings Before Interests, Tax, Depreciation and Amortization. Es el beneficio económico que resulta de restar a los ingresos o las ventas netas, el costo de ventas, los gastos administrativos y los gastos de venta, pero sin incluir los gastos financieros, los impuestos, las depreciaciones y las amortizaciones.`
      },
      {
        question: `Eficacia`,
        ans: `Grado de acercamiento de un resultado real a una meta o un resultado esperado. Es decir, el patrón de evaluación de la eficacia es la meta, y por tanto, es relativa a esta.`
      },
      {
        question: `Eficiencia`,
        ans: `Nivel de desempeño en la utilización de los recursos, medido comúnmente en términos de costo, tiempo y productividad. La eficiencia es relativa a los patrones de comparación establecidos en los indicadores de costo, tiempo y productividad.`
      },
      {
        question: `Efectividad`,
        ans: `Suma ponderada de la eficiencia y la eficacia. Por ejemplo, si una persona realizó una actividad antes de lo previsto (eficiente con relación al tiempo), gastó menos de lo presu¬puestado (eficiente con relación al costo) y, al mismo tiempo, no logró la meta fijada, su efectividad será el promedio ponderado de estos tres factores de evaluación.`
      },
      {
        question: `Envases y embalajes`,
        ans: `Parte de los materiales directos de un producto. Todo material que sirve para proteger, identificar y/o conservar la materia prima transformada, incluyendo los insumos, y que forma parte del producto terminado. Por ejemplo:
          <br>
          <ul>
            <li>Restaurante: Bolsas, recipientes desechables o compostables (se descomponen en poco tiempo sin dejar residuos visibles ni tóxicos), cajas, bolsas, botellas.</li>
            <li>Atención pediátrica: Cajas, frascos, botellas, jeringa.</li>
            <li>Aceites comestibles: Cajas, botellas de plásticos PET, tapas, sobretapas, cartones separadores, cintas de embalaje, pegamento.</li>
            <li>Cerveza: Cajas, etiquetas, pegamento, chapas.</li>
            <li>Plátano: Cajas.</li>
            <li>Ropa: Bolsa, armado de cartón, agujas, cajas.</li>
          </ul>
          `
      },
      {
        question: `Estrategia`,
        ans: `Decisión sobre el destino de los recursos más importantes de una organización o unidad estratégica, reflejada en una inversión, que privilegiando la superación de restricciones claves se enfoca en lograr la meta nuclear y, en particular, en la creación, consolidación o revitalización de las ventajas competitivas.`
      },
      {
        question: `Flujo monetario`,
        ans: `Evolución simultánea de los ingresos, los gastos y los inventarios de un período a otro. Es decir, es un indicador financiero múltiple de la evolución entre dos períodos de los ingresos, los gastos y los inventarios, que tiene como objetivo expresar la eficacia de una organización. Así, el flujo monetario mide la eficacia del movimiento del dinero en el tiempo. La interpretación del flujo monetario se efectúa midiendo y comparando, de manera simultánea, la variación porcentual y absoluta de los ingresos, gastos e inventarios. Los indicadores múltiples son aquellos que contienen más de un indicador o subindicador.`
      },
      {
        question: `Frecuencia de medición`,
        ans: `Se refiere a los intervalos de tiempo en que se mide el resultado de cada indicador. Por ejemplo, diario, semanal, mensual, bimensual, trimestral, semestral, anual, etcétera.`
      },
      {
        question: `Gastos administrativos`,
        ans: `Recursos sacrificados para gestionar la organización, vista como un todo.`
      },
      {
        question: `Gastos administrativos fijos`,
        ans: `Recursos sacrificados para gestionar la organización, vista como un todo que, dentro de un rango relevante, no cambia cuando cambia la cantidad vendida. Por ejemplo: Sueldo del gerente general, gastos de teléfono de las oficinas administrativas, depreciación de los equipos de las oficinas administrativas.`
      },
      {
        question: `Gastos administrativos variables`,
        ans: `Recursos sacrificados para gestionar la organización, vista como un todo, que sí cambia cuando cambia la cantidad vendida. Por ejemplo: Bono al gerente general por unidades vendidas, gastos a los asesores gerenciales por unidades vendidas.`
      },
      {
        question: `Gastos de distribución`,
        ans: `Recursos sacrificados para gestionar que los productos lleguen eficientemente bien a su destino.`
      },
      {
        question: `Gastos de distribución fijos`,
        ans: `Recursos sacrificados para gestionar que los productos lleguen eficientemente bien a su destino, que dentro de un rango relevante, no cambia cuando cambia la cantidad vendida. Por ejemplo: Sueldo del gerente o responsable de distribución, gastos de teléfono del personal de distribución, depreciación de los vehículos de distribución, gastos de combustible del vehículo de distribución, gastos de mantenimiento del vehículo de distribución.`
      },
      {
        question: `Gastos de distribución variables`,
        ans: `Recursos sacrificados para gestionar que los productos lleguen eficientemente bien a su destino, que sí cambia cuando cambia la cantidad vendida. Por ejemplo: Comisión al responsable de distribución por unidades entregadas conformes, fletes, costo de productos deteriorados en la distribución.`
      },
      {
        question: `Gastos de marketing`,
        ans: `Recursos sacrificados para gestionar el saber a qué clientes dirigirse y persuadirlos a comprar todo el tiempo.`
      },
      {
        question: `Gastos de marketing fijos`,
        ans: `Recursos sacrificados para gestionar el saber a qué clientes dirigirse y persuadirlos a comprar todo el tiempo que, dentro de un rango relevante, no cambia cuando cambia la cantidad vendida. Por ejemplo: Sueldo del gerente o responsable de marketing, gastos de publicidad, gastos de comunicación indirecta, gastos de teléfono del personal de marketing, depreciación de los equipos utilizados por el personal de marketing.`
      },
      {
        question: `Gastos de marketing variables`,
        ans: `Recursos sacrificados para gestionar el saber a qué clientes dirigirse y persuadirlos a comprar todo el tiempo, que sí cambia cuando cambia la cantidad vendida. Por ejemplo: Comisión del gerente o responsable de marketing por unidades vendidas; gastos de promociones, carnadas o anzuelos por unidades vendidas.`
      },
      {
        question: `Gastos de venta`,
        ans: `Recursos sacrificados para gestionar la captación de clientes de por vida.`
      },
      {
        question: `Gastos de venta fijos`,
        ans: `Recursos sacrificados para gestionar la captación de clientes de por vida que, dentro de un rango relevante, no cambia cuando cambia la cantidad vendida. Por ejemplo: Sueldo del gerente o responsable de ventas, gastos de teléfono de la fuerza de ventas, depreciación de los equipos de la fuerza de ventas.`
      },
      {
        question: `Gastos de venta variables`,
        ans: `Recursos sacrificados para gestionar la captación de clientes de por vida, que sí cambia cuando cambia la cantidad vendida. Por ejemplo: Comisión del gerente o responsable de ventas por unidades vendidas, comisiones de la fuerza de ventas por unidades vendidas.`
      },
      {
        question: `Gastos generales de producción fijos`,
        ans: `Rubro desembolsable y no desembolsable que, dentro de un rango relevante, no cambia cuando cambia la cantidad producida, no es inventariable, interviene en la transformación de las materias primas y los productos en proceso y no está incluido en los rubros de costos anteriores, pero que no tiene contacto con el producto terminado y/o no llega a formar parte de este. Por ejemplo:
          <br>
          <ul>
            <li>Restaurante: Depreciación lineal de los equipos de cocina, seguros de los equipos e inmuebles de cocina, depreciación de las instalaciones de cocina, inspecciones de la cocina, etcétera.</li>
            <li>Atención pediátrica: Depreciación lineal de los equipos médicos (o si los equipos fueran alquilados, gastos de alquiler); depreciación de los muebles del consultorio; etcétera.</li>
            <li>Aceites comestibles: Depreciación de muebles de planta, gastos por Internet en planta, gastos de teléfono de planta.</li>
            <li>Cerveza: Depreciación de los equipos de laboratorio, depreciación de los equipos de medida, depreciación de los equipos de limpieza, gastos de energía de planta.</li>
            <li>Plátano: Depreciación lineal de las palas de campo.</li>
            <li>En un negocio de ropa: Depreciación lineal de los equipos de producción, depreciación de los muebles e instalaciones de planta, depreciación de los equipos de seguridad, inspección de la planta, gastos de luz en la planta, etcétera.</li>
          </ul>
          `
      },
      {
        question: `Gastos generales de producción variables`,
        ans: `Rubro desembolsable y no desembolsable que sí cambia cuando cambia la cantidad producida, no es inventariable, interviene en la transformación de las materias primas y los productos en proceso y no está incluido en los rubros de costos anteriores, pero que no tiene contacto con el producto terminado y/o no llega a formar parte de este. Por ejemplo:
          <br>
          <ul>
            <li>Restaurante: Depreciación por cantidad de menú preparado, gastos de agua para el lavado de las vajillas, gastos de energía para la preparación de alimentos.</li>
            <li>Atención pediátrica: Depreciación por cantidad de atenciones de los equipos médicos, depreciación por cantidad de exámenes de los equipos de análisis.</li>
            <li>Aceites comestibles: Depreciación por toneladas producidas de la máquina de encajonado, depreciación por toneladas producidas de las etiquetadoras.</li>
            <li>Cerveza: Depreciación por hectolitros producidos de las máquinas y los equipos de fermentación, depreciación por hectolitros producidos de las máquinas y los equipos de maceración.</li>
            <li>Plátano: Depreciación por cabezas de plátanos de las hoces de corte.</li>
            <li>Ropa: Depreciación por cantidad producida de los equipos de producción, gastos de energía de las máquinas, depreciación por cantidad de análisis de los equipos de control de calidad.</li>
          </ul>
          `
      },
      {
        question: `Gestión o administración`,
        ans: `Es una ciencia social inexacta que, a través de los procesos de planificación, ejecución y control, y empleando técnicas, métodos y estilos, busca satisfacer de modo eficiente la verdadera razón por la cual se creó una organización.`
      },
      {
        question: `Indicador`,
        ans: `Marcador mensurable útil para conocer el estado y el comportamiento de un objeto que se desea interpretar. El objeto puede ser una organización, una unidad estratégica, una unidad orgánica, un proceso, un sector, un país, una región, un ambiente externo, una persona, un animal o una cosa.`
      },
      {
        question: `Ingreso neto del flujo monetario`,
        ans: `Es un indicador que mediante un monto absoluto mide el grado de eficacia en la gestión del flujo monetario de una organización. El flujo monetario comprende los ingresos (o las ventas netas), los gastos y los inventarios. La gestión del flujo monetario será eficaz si la variación absoluta de los ingresos de un período a otro es mayor a la suma de las variaciones absolutas de los gastos y del costo de capital ocasionado por los inventarios de un período a otro. En el caso que las variaciones absolutas de ambos grupos sean iguales, se calificará como una gestión indiferente o no eficaz ni ineficaz. Se considerará ineficaz cuando la variación absoluta de los ingresos de un período a otro sea inferior a la suma de las variaciones absolutas de los gastos y el costo de capital generado por los inventarios de un período a otro.`
      },
      {
        question: `Inversión`,
        ans: `Toda erogación que se espera sea útil en un periodo mayor a un año.`
      },
      {
        question: `Liquidez`,
        ans: `Capacidad para cubrir las obligaciones de corto plazo. Desde otra perspectiva, es la la capacidad para evitar pérdidas de oportunidades de ingresos por incumplimiento de las obligaciones de corto plazo.`
      },
      {
        question: `Margen de utilidad bruta`,
        ans: `O simplemente, margen bruto. Mide el rendimiento de las ventas netas o ingresos considerando los costos de los productos vendidos. Es el resultado de dividir la utilidad bruta entre las ventas netas.`
      },
      {
        question: `Margen de utilidad neta`,
        ans: `O margen neto. Mide el rendimiento de las ventas netas o ingresos considerando todos los costos, gastos e impuestos. Se calcula dividiendo la utilidad neta entre las ventas netas o ingresos.`
      },
      {
        question: `Margen de utilidad operativa`,
        ans: `O margen operativo. Indica el rendimiento de las ventas netas o ingresos considerando los costos de los productos vendidos y gastos operativos. Se obtiene dividiendo la utilidad operativa entre las ventas netas o ingresos. La utilidad operativa es la ganancia que queda después de restar a la utilidad bruta los gastos de administración y de ventas. O también, es el excedente alcanzado después de restar a las ventas netas el costo de ventas, los gastos administrativos y los gastos de venta. `
      },
      {
        question: `Meta `,
        ans: `Cuantificación y ubicación en el tiempo de un objetivo determinado. Responde a las preguntas ¿qué lograr?, ¿qué valor se creará?, ¿cuánto lograr? y ¿cuándo lograrlo?`
      },
      {
        question: `Meta nuclear`,
        ans: `Cuantificación y ubicación en el tiempo del objetivo más importante de una organización o unidad estratégica, hacia el cual convergen las demás metas.`
      },
      {
        question: `Objetivo`,
        ans: `Aquello que se pretende lograr, sin especificar el cuánto y el cuándo. Responde la pregunta ¿qué se desea lograr?`
      },
      {
        question: `Patrón de comparación`,
        ans: `Meta o valor que deberá alcanzar cada indicador y parámetro contra el cual se contrastan los resultados obtenidos en cada medición; por ende, sirve para deducir el nivel de eficiencia o eficacia del desempeño de determinado indicador.`
      },
      {
        question: `Período promedio de cobro`,
        ans: `Informa cuántos días demandará al negocio convertir las ventas a crédito en efectivo. Se relaciona con la velocidad de ingreso de efectivo. Se recomienda evaluar la efectividad de su gestión equiparándolo con el período promedio de pagos. En otras palabras, la lentitud o rapidez de las cobranzas es relativa a la lentitud o rapidez de los pagos.`
      },
      {
        question: `Período promedio de inventarios`,
        ans: `Cantidad media de días que demora el agotamiento de las existencias en materiales directos, productos en proceso y productos terminados. Desde otro punto de vista, indica el lapso de tiempo medio en días que dura trasladar las existencias del balance general al estado de resultados. Esto es, la velocidad, medida en días, con la que se renueva o repone el stock.`
      },
      {
        question: `Período promedio de pago`,
        ans: `Notifica sobre el tiempo medio que un negocio se demora en cancelar sus deudas iguales o menores a un año.`
      },
      {
        question: `Precio por acción`,
        ans: `Es la cotización monetaria en el mercado de una acción de una empresa.`
      },
      {
        question: `Proceso`,
        ans: `Conjunto de actividades que transforman elementos de entrada en resultados.`
      },
      {
        question: `Productividad`,
        ans: `Rendimiento de un recurso clave que se obtiene dividiendo las unidades físicas de producto entre las unidades físicas utilizadas de dicho recurso (Villajuana y Tuse, 2019, p.227).`
      },
      {
        question: `Producto`,
        ans: `Todo bien, tangible o intangible, entregado al cliente, que representa la razón más importante por la cual este consume, utiliza, adquiere, paga o decide su adquisición, y que responde directamente a la satisfacción de una necesidad básica.`
      },
      {
        question: `Prueba ácida`,
        ans: `O liquidez rápida. Capacidad para cubrir las obligaciones de corto plazo, sin tomar en cuenta la propiedad que tiene la organización en inventarios o existencias. Desde otra perspectiva, es la la capacidad para evitar pérdidas de oportunidades de ingresos por incumplimiento de las obligaciones de corto plazo. Sin incluir como propiedad de la organización lo que tiene en inventarios o existencias.`
      },
      {
        question: `Rango relevante`,
        ans: `Intervalo de volumen de producción o nivel de actividad, dentro del cual la necesidad de determinados recursos es la misma. Es decir, al interior de ese tramo algunos costos permanecerán invariables y serán considerados como fijos. Por ejemplo, si se estimó que un supervisor de producción puede dirigir con efectividad a 10 operadores de máquinas, cuya producción conjunta es de 1,000 unidades por mes, entonces el rango relevante será de 0 a 1,000 unidades y dentro de ese intervalo el sueldo del supervisor será un costo fijo. Sin embargo, si se tuviera la necesidad de producir 1,200 unidades, se requerirá de un supervisor adicional y por lo tanto, dicho rubro de costo se volverá en un costo fijo no tan fijo.`
      },
      {
        question: `Razón de apalancamiento`,
        ans: `Indica cuánto de la inversión total de una organización es financiada por agentes externos. Es resultado de dividir el pasivo total entre el activo total. A saber, el activo total o inversión total comprende el activo corriente más el activo no corriente o de largo, y el pasivo total es la suma del pasivo corriente y el pasivo no corriente o de largo plazo.`
      },
      {
        question: `Relación deuda/capital`,
        ans: `Expresa la cantidad de unidades monetarias de fondos externos por cada unidad monetaria de capital propio que están financiando la inversión total de una organización. Se obtiene dividiendo el pasivo total entre el patrimonio. La deuda incluye el pasivo corriente y el pasivo no corriente. Por su parte, el capital o patrimonio total, se refiere al monto invertido por los accionistas.`
      },
      {
        question: `Rentabilidad`,
        ans: `Es el rendimiento expresado en fondos generados respecto a un capital invertido o con relación a fondos que lo causaron. Es decir, es la medida del rendimiento económico de un fondo que fue apostado en una organización o unidad estratégica.`
      },
      {
        question: `Retorno sobre el patrimonio`,
        ans: `Conocido como ROE por sus siglas en inglés que significan return on equity. Calcula el rendimiento del patrimonio o del capital invertido por los accionistas de una organización o negocio. Resulta de la división de la utilidad neta entre el patrimonio. El numerador procede del estado de ganancias y pérdidas; y el patrimonio, del balance general. Su unidad de medida es el porcentaje o una tasa.`
      },
      {
        question: `Retorno sobre la inversión`,
        ans: `Conocido por su nomenclatura ROI, por provenir de las palabras en inglés return on investment. Mide el rendimiento de la inversión total. Se obtiene dividiendo la utilidad neta entre el activo total o inversión total.  El activo total es igual a la suma del activo corriente y activo no corriente que se muestra en los balances generales, o al pasivo total más el patrimonio.`
      },
      {
        question: `Rotación de inventarios`,
        ans: `Marca la cantidad de veces que las existencias se venden en un período determinado. De otra manera, podría concebirse como la frecuencia con la que las existencias salen del balance general y se trasladan al estado de ganancias y pérdidas, en determinado período. Los inventarios mientras están en el balance general son activos corrientes, pero conforme van ingresando al proceso de producción se van transformando en costos y finalmente se convierten en costo de ventas cuando se expenden o pasan a manos de los clientes externos. En los negocios donde se compran mercaderías y se venden sin ninguna transformación intrínseca, las existencias primero son activos al estar en el balance general y luego pasan directamente como costo de mercaderías vendidas (costo de ventas) al estado de ganancias y pérdidas.`
      },
      {
        question: `Servicio`,
        ans: `Se refiere a todo lo que la organización, la unidad estratégica o el negocio hace o entrega para persuadir la venta del producto y que el cliente lo ve, huele, toca, saborea y/o escucha. No es lo que se vende, es lo que se entrega o hace para convencer al cliente a que compre.`
      },
      {
        question: `Solvencia `,
        ans: `O apalancamiento. Capacidad de una organización para cumplir con sus obligaciones totales. Desde un punto de vista más desafiante, es la capacidad de una organización para acrecentar su riqueza mediante el uso de fondos externos. O también puede definirse como la capacidad de una organización para devolver de manera conforme el fondo total que recibió y lo que espera recibir en el futuro.`
      },
      {
        question: `Unidad de medida`,
        ans: `Patrón de cálculo de un indicador, que puede ser relativo o absoluto. Unidades de medida absolutas son, por ejemplo: clientes, quejas, kilovatios hora, dólares estadounidenses, kilogramos, metros, metros cuadrados, metros cúbicos, galones, etc. Las unidades de medida relativas se expresan generalmente en ratios, tasas, porcentajes, tanto por mil, partes por millón (ppm), escalas binarias del tipo “sí o no”, rangos del tipo “ABCDE” o cualquier otro término que indique la dimensión de cada resultado.`
      },
      {
        question: `Unidad estratégica`,
        ans: `Familia de productos o servicios afines que cumplen una función o satisfacen beneficios concretos de un grupo determinado de clientes externos y que es resultado de la aplicación de una tecnología específica o de la ejecución de un proceso particular. Es, por consiguiente, el resultado de conjugar tres ejes o dimensiones: grupo de clientes, beneficios específicos buscados y tecnología específica (cadena de valor). También se le denomina negocio o unidad de negocio.`
      },
      {
        question: `Utilidad antes de impuestos`,
        ans: `Es el beneficio económico que resulta de restar a los ingresos o las ventas netas, el costo de ventas, los gastos administrativos, los gastos de venta y los gastos financieros.`
      },
      {
        question: `Utilidad neta`,
        ans: `Es el beneficio económico que resulta de restar a los ingresos o las ventas netas, el costo de ventas, los gastos administrativos, los gastos de venta, los gastos financieros y el impuesto a la renta.`
      },
      {
        question: `Utilidad operativa`,
        ans: `Es el beneficio económico que resulta de restar a los ingresos o las ventas netas, el costo de ventas, los gastos administrativos y los gastos de venta.`
      },
      {
        question: `Valor de mercado`,
        ans: `Es el monto en unidades monetarias que representa la cotización de una empresa que resulta de multiplicar la cantidad total de acciones en circulación por el precio de cada acción en el mercado.`
      },
      {
        question: `Valor económico agregado`,
        ans: `El nombre del indicador de rentabilidad EVA procede de las iniciales de las palabras en inglés Economic Value Added, que significa valor económico agregado. Joel Stern y John Shiely (2002, p.23) lo definen como: “El EVA es la utilidad que queda una vez deducido el costo del capital invertido para generar dicha utilidad.” Para nosotros, el EVA es la variación de la riqueza organizacional que resulta de restar a la utilidad neta calculada convencionalmente el costo de oportunidad, sumarle las inversiones que según la contabilidad financiera se pasan como gastos y restarle la amortización de las inversiones pasadas como gastos (Villajuana, 2015, p.400).`
      },
      {
        question: `Ventaja competitiva`,
        ans: `Superioridad de una organización, una unidad estratégica o un producto, que se crea en base al talento y el esfuerzo creativo y racional de las personas, reflejado en una característica exclusiva y permanente, percibida y valorada por el cliente.`
      },
      {
        question: `Verificador`,
        ans: `Puesto o persona encargada de llenar o de utilizar un medio de verificación.`
      }
    ];
    // content header
    this.contentHeader = {
      headerTitle: 'FAQ',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Pages',
            isLink: true,
            link: '/'
          },
          {
            name: 'FAQ',
            isLink: false
          }
        ]
      }
    };
  }


}
