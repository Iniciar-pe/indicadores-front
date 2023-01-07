import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FAQService } from 'app/main/pages/faq/faq.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FAQService} _faqService
   */
  constructor(private _faqService: FAQService) {
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Changes
   */
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
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
