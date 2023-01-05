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
        question: 'Ciclo de caja',
        ans:
          'Integra tres indicadores en uno: el período promedio de cobro, período promedio de pago y período promedio de inventarios. Así, arroja el saldo promedio en días equivalentes a efectivo que queda después de sumar el promedio de días en inventarios con el promedio de días en cuentas por cobrar y restar el promedio de días de pago. En vista que el promedio de días en inventarios más el promedio de días en cuentas por cobrar viene a ser el ciclo operativo, se calcula también deduciendo al ciclo operativo el promedio de días de pago. '
      },
      {
        question: 'Cliente',
        ans:
          'Persona o conjunto de personas que consumen, utilizan, adquieren, deciden la adquisición, recomiendan, reciben o son afectadas por el producto o el servicio entregado por una organización, una unidad estratégica, un proceso o una unidad orgánica. En el contexto interno de una organización, también puede tratarse de un proceso o unidad orgánica que recibe el producto o la salida de un proceso determinado. El cliente puede ser externo o interno.'
      },
      {
        question: 'Cliente externo',
        ans:
          'Persona –individual o colectiva, natural o social– que no pertenece a la organización que consume, utiliza, adquiere, decide la adquisición, paga, recomienda o es afectado por la actividad o el servicio, retribuye o recibe el producto o el servicio entregado por ella o por una de sus unidades orgánicas. En muchas instituciones del sector público se sustituye el término cliente por beneficiario o usuario.'
      },
      {
        question: 'Competidor',
        ans:
          'Organización que entrega productos o servicios similares, sustitutos o complementarios a los productos o servicios entregados por una organización o unidad estratégica, y que se orientan a los mismos segmentos de clientes, usuarios o beneficiarios de la organización o unidad estratégica.'
      },
      {
        question: 'Competitividad',
        ans:
          'Capacidad para lograr y mantener una relación calidad-precio que disuada a los competidores potenciales, persuada a los clientes y permita la permanencia de la organización o de la unidad estratégica en el mercado. Para hacer práctica esta definición, compréndase por precio el monto pagado por el cliente, que incluye los costos y el margen de ganancia; y por calidad, fundamentalmente las características o valores claves del producto y la percepción de estos por los clientes. Es decir, un negocio X será más competitivo que un negocio Y si ofrece un producto a un precio P con un nivel de calidad de 18, mientras el negocio Y también ofrece el mismo producto al precio P, pero con un nivel de calidad de 16.'
      },
      {
        question: 'Costo de capital',
        ans:
          'Suma ponderada del gasto financiero y del costo de oportunidad. Dicho de una manera simple, representa el costo del dinero invertido en la organización y que ha sido aportado por agentes externos o que no son propietarios de la organización (pasivo) y por los accionistas (patrimonio). Por lo general, un pasivo genera un gasto financiero y las cuentas del patrimonio poseen costos de oportunidad. Si en un negocio se invirtió 10,000 dólares y fue financiado con 2,000 dólares mediante aportes de los accionistas y el saldo fue cubierto con un préstamo bancario, y además, conociendo que el costo de oportunidad es de 20% anual y el gasto financiero es de 10%, entonces el costo de capital del negocio equivale al 12% [(20% x 2,000 + 10% x 8,000) ÷ 10,000]. '
      },
      {
        question: 'Costo de insumo de producción',
        ans:
        `El insumo se considera como parte del material directo de un producto. Comprende todo material, ingrediente o sustancia que sirve para transformar la materia prima y que forma parte del producto terminado. En el caso que no forme parte del producto terminado, debe tratarse de un recurso que tuvo contacto con la materia prima o el producto en proceso con el fin de otorgarle valor. Por ejemplo:
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
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
