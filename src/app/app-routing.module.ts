import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules } from "@angular/router";

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

const ROUTES = [
    { path: 'welcome', component: WelcomeComponent },
    {
        path: 'products',
        canActivated: [AuthGuard],
        data: { preload: false },
        loadChildren: () =>
            import('./products/product.module').then(m => m.ProductModule)
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }