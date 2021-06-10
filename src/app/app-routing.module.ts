import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './observable/all/all.component';
import { FromEventComponent } from './observable/from-event/from-event.component';
import { IntervalComponent } from './observable/interval/interval.component';
import { IPLComponent } from './observable/ipl/ipl.component';
import { ObservableComponent } from './observable/observable.component';
import { OfFromComponent } from './observable/of-from/of-from.component';
import { QuestionComponent } from './observable/question/question.component';
import { ReplaySubjectComponent } from './observable/replay-subject/replay-subject.component';
import { SubjectComponent } from './observable/subject/subject.component';
import { ToArrayComponent } from './observable/to-array/to-array.component';
import { PromiseComponent } from './promise/promise.component';


const routes: Routes = [
  {path: 'promise', component:PromiseComponent},
  {path: 'observable', component:ObservableComponent, children:[
    {path: '', component: AllComponent},
    {path: 'from-event', component: FromEventComponent},
    {path: 'interval', component: IntervalComponent},
    {path: 'of-from', component: OfFromComponent},
    {path: 'to-array', component: ToArrayComponent},
    {path: 'question', component: QuestionComponent},
    {path: 'subject', component: SubjectComponent },
    {path: 'replay-subject', component: ReplaySubjectComponent },
    {path: 'ipl', component: IPLComponent }
  ]},
  { path: '**', redirectTo: 'observable' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
