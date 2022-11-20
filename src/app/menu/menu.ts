import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [

  {
    id: 'perfil',
    type: 'section',
    title: 'Perfil',
    translate: 'MENU.PERFIL.SECTION',
    icon: 'package',
    children: [
      {
        id: 'bill',
        title: 'Mi Cuenta',
        translate: 'MENU.PERFIL.BILL',
        type: 'item',
        icon: 'user',
        url: 'admin/cuenta'
      },
      /**
       * {
        id: 'license',
        title: 'Licencias',
        translate: 'MENU.PERFIL.LICENSE',
        type: 'item',
        icon: 'check-circle',
        url: 'admin/licencia'
      },
      {
        id: 'business',
        title: 'Empresas',
        translate: 'MENU.PERFIL.BUSINESS',
        type: 'item',
        icon: 'layers',
        url: 'admin/empresa'
      },
       */
      
    
    ]
  },
  {
    id: 'licencias',
    type: 'section',
    title: 'Licencias',
    translate: 'MENU.LICENCIAS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'shopping',
        title: 'Comprar',
        translate: 'MENU.LICENCIAS.SHOPPING',
        type: 'item',
        icon: 'bookmark',
        url: '#'
      },
      {
        id: 'DISTRIBUTION',
        title: 'Distribución',
        translate: 'MENU.LICENCIAS.DISTRIBUTION',
        type: 'item',
        icon: 'layout',
        url: '#'
      },
    ]
  },
  {
    id: 'data',
    type: 'item',
    title: 'Ingreso de datos',
    icon: '',
    translate: 'MENU.DATA.SECTION',
    url: 'admin/entrada-de-datos'
  },
  {
    id: 'indicators',
    type: 'section',
    title: 'Restultados',
    translate: 'MENU.INDICATOR.SECTION',
    icon: 'layers',
    children: [
      {
        id: 'indicators',
        title: 'Cuadro de ratios financieros',
        translate: 'MENU.INDICATOR.INDICATORS',
        type: 'item',
        icon: 'database',
        url: '#'
      },
      {
        id: 'dashboard',
        title: 'Cálculo del ingreso neto del flujo monetario',
        translate: 'MENU.INDICATOR.DASHBOARD',
        type: 'item',
        icon: 'dollar-sign',
        url: '/inicio'
      },
      {
        id: 'abstract',
        title: 'Resumen ejecutivo',
        translate: 'MENU.INDICATOR.ABSTRACT',
        type: 'item',
        icon: 'sun',
        url: '/inicio'
      },
    ]
  },
  // Forms & Tables
  {
    id: 'configuration',
    type: 'section',
    title: 'Configuración',
    translate: 'MENU.CONFIGURATION.SECTION',
    icon: 'file-text',
    children: [
      {
        id: 'users',
        title: 'Usuarios',
        translate: 'MENU.CONFIGURATION.USERS',
        type: 'item',
        icon: 'users',
        url: 'admin/usuarios'
      },
      {
        id: 'indicators',
        title: 'Indicadores',
        translate: 'MENU.CONFIGURATION.INDICATORS',
        type: 'item',
        icon: 'activity',
        url: 'admin/indicadores'
      },
      {
        id: 'template',
        title: 'Plantilla',
        translate: 'MENU.CONFIGURATION.TEMPLATE',
        type: 'item',
        icon: 'book',
        url: 'admin/plantilla'
      },
      {
        id: 'plan',
        title: 'Planes',
        translate: 'MENU.CONFIGURATION.PLAN',
        type: 'item',
        icon: 'airplay',
        url: 'admin/planes'
      },
      
      {
        id: 'table',
        title: 'Registro de tablas',
        translate: 'MENU.CONFIGURATION.TABLE',
        type: 'item',
        icon: 'columns',
        url: 'admin/tabla'
      },
      
      
    ]
  },
  // Charts & Maps
  {
    id: 'goto',
    type: 'section',
    title: 'Salir',
    translate: 'MENU.GOTO.SECTION',
    icon: 'log-out',
    children: [
      {
        id: 'goto',
        title: 'Salir',
        translate: 'MENU.GOTO.GOTO',
        icon: 'log-out',
        type: 'item',
        url: '#'
      }
    ]
  },
 
  
];
