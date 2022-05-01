import {Component} from '@angular/core';
import { isAdmin } from '../../utils/user.util';
import { adminNavItems, navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = isAdmin() ? adminNavItems : navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
