import { alink } from './../side-bar/side-bar';
import { Sidebar } from "../side-bar/side-bar";

export const PRATICE_SIDE_BAR_CONFIG: Sidebar = {
  title: "Pratice Manage",
  alink: [
    {
      name: 'home',
      link: '/pratice/home',
      icon:'tv'
    },
    {
      name: 'myself',
      link: '/pratice/myself',
      icon:'view_module'
    },
    {
      name: 'history',
      link: '/pratice/history',
      icon:'hourglass_empty'
    },
    {
      name: 'setting',
      link: '/pratice/setting',
      icon:'settings'
    }

  ]
}
