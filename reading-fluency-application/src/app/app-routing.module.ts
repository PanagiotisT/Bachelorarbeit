import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoriesOverviewComponent } from './stories-overview/stories-overview.component';
import { SceneOverviewComponent } from './scene-overview/scene-overview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: StoriesOverviewComponent },
  { path: 'story/scenes', component: SceneOverviewComponent},
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
