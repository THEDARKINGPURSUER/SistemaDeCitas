import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from "./components/tabs/tabs.component";
import { FormActualizarComponent } from "./components/form-actualizar/form-actualizar.component";
import { GuardianGuard } from './guards/guardian.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: TabsComponent
  },
  {
    path: 'form/:id',
    component: FormActualizarComponent, 
    canActivate: [GuardianGuard]
  },
  {
    path: '**',
    redirectTo: '/app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
