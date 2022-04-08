import { alink } from './../side-bar/side-bar';
import { Sidebar } from "../side-bar/side-bar";

export const READ_SIDE_BAR_CONFIG: Sidebar = {
  title: "Read",
  alink: [
    {
      name: 'All',
      link: '/read/all',
      icon:'reorder'
    },
    {
      name: 'News',
      link: '/read/news',
      icon:'newspaper'
    },
    {
      name: 'Stock-Info',
      link: '/read/stock',
      icon:'pageview'
    }
  ]
}
