import { ItemDetailsComponent } from './item-details/item-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent }      from './menu-item/menu-item.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  {path: 'menu', component: ItemComponent},
  {path: 'menu/:type', component: ItemComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin/items', component: AdminPanelComponent},
  {path: 'admin/orders', component: AdminPanelComponent},
  {path: 'admin/items/:id', component: ItemDetailsComponent},
  {path: 'admin/orders/:id', component: OrderDetailsComponent},
  {path: 'orderconfirmation', component: OrderConfirmationComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
  
 }
