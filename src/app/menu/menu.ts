import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  {
    id: 'perfil',
    type: 'section',
    title: 'Perfil',
    translate: 'MENU.PERFIL.SECTION',
    icon: 'package',
    role: ['Admin', 'Free', 'Owner', 'Analyst'],
    children: [
      {
        id: 'bill',
        title: 'Mi cuenta',
        translate: 'MENU.PERFIL.BILL',
        type: 'item',
        icon: 'user',
        url: 'admin/cuenta',
        role: ['Admin', 'Free', 'Owner', 'Analyst'],
      },
    ]
  },
  {
    id: 'licencias',
    type: 'section',
    title: 'Licencias',
    translate: 'MENU.LICENCIAS.SECTION',
    icon: 'package',
    role: ['Admin', 'Free', 'Owner', 'Analyst'],
    children: [
      {
        id: 'shopping',
        title: 'Comprar',
        translate: 'MENU.LICENCIAS.SHOPPING',
        type: 'item',
        icon: 'bookmark',
        role: ['Admin', 'Free', 'Owner'],
        url: 'apps/comercio/lista'
      },
      {
        id: 'DISTRIBUTION',
        title: 'Distribución',
        translate: 'MENU.LICENCIAS.DISTRIBUTION',
        type: 'collapsible',
        icon: 'layout',
        role: ['Admin', 'Owner'],
        children: [
          {
            id: 'components-alerts',
            title: 'Empresa individuales',
            translate: 'MENU.LICENCIAS.UX.BUSINESS_I',
            type: 'item',
            icon: 'circle',
            role: ['Admin', 'Owner'],
            url: 'admin/distribution-individual'
          },
          {
            id: 'components-avatar',
            title: 'Empresa con sucursales',
            translate: 'MENU.LICENCIAS.UX.BUSINESS_S',
            type: 'item',
            icon: 'circle',
            role: ['Admin', 'Owner'],
            url: 'admin/distribution-sucursal'
          },
          {
            id: 'components-avatar',
            title: 'Para donar',
            translate: 'MENU.LICENCIAS.UX.DONE',
            type: 'item',
            icon: 'circle',
            role: ['Admin', 'Owner'],
            url: 'admin/donar'
          },
        ]
      },
    ]
  },
  {
    id: 'data',
    type: 'item',
    title: 'Ingreso de datos',
    icon: '',
    translate: 'MENU.DATA.SECTION',
    role: ['Admin', 'Free', 'Owner', 'Analyst'],
    url: 'admin/entrada-de-datos'
  },
  {
    id: 'indicators',
    type: 'section',
    title: 'Resultados',
    translate: 'MENU.INDICATOR.SECTION',
    role: ['Admin', 'Free', 'Owner', 'Analyst'],
    icon: 'layers',
    children: [
      {
        id: 'indicators',
        title: 'Cuadro de ratios financieros',
        translate: 'MENU.INDICATOR.INDICATORS',
        type: 'item',
        icon: 'database',
        role: ['Admin', 'Free', 'Owner', 'Analyst'],
        url: 'admin/ratios'
      },
      {
        id: 'dashboard',
        title: 'Cálculo del ingreso neto del flujo monetario',
        translate: 'MENU.INDICATOR.DASHBOARD',
        type: 'item',
        icon: 'dollar-sign',
        role: ['Admin', 'Free', 'Owner', 'Analyst'],
        url: 'admin/flujo'
      },
      {
        id: 'abstract',
        title: 'Resumen ejecutivo',
        translate: 'MENU.INDICATOR.ABSTRACT',
        type: 'item',
        icon: 'sun',
        role: ['Admin', 'Free', 'Owner', 'Analyst'],
        url: 'admin/resumen'
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
    role: ['Admin'],
    children: [
      {
        id: 'users',
        title: 'Usuarios',
        translate: 'MENU.CONFIGURATION.USERS',
        type: 'item',
        icon: 'users',
        role: ['Admin'],
        url: 'admin/usuarios'
      },
      {
        id: 'indicators',
        title: 'Indicadores',
        translate: 'MENU.CONFIGURATION.INDICATORS',
        type: 'item',
        icon: 'activity',
        role: ['Admin'],
        url: 'admin/indicadores'
      },
      /**{
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
      }, */
    ]
  },
  // Charts & Maps
  /**{
    id: 'goto',
    type: 'section',
    title: 'Salir',
    translate: 'MENU.GOTO.SECTION',
    icon: 'log-out',
    role: ['Admin', 'Free', 'Owner', 'Analyst'],
    children: [
      {
        id: 'goto',
        title: 'Salir',
        translate: 'MENU.GOTO.GOTO',
        icon: 'log-out',
        type: 'item',
        role: ['Admin', 'Free', 'Owner', 'Analyst'],
        url: '/'
      }
    ]
  }, */

];

/*
{
        id: 'template',
        title: 'Plantilla',
        translate: 'MENU.CONFIGURATION.TEMPLATE',
        type: 'item',
        icon: 'book',
        url: 'admin/plantilla'
      },
      */
