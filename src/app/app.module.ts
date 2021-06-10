import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { PromiseComponent } from './promise/promise.component';
import { ObservableComponent } from './observable/observable.component';
import { AllComponent } from './observable/all/all.component';
import { FromEventComponent } from './observable/from-event/from-event.component';
import { IntervalComponent } from './observable/interval/interval.component';
import { OfFromComponent } from './observable/of-from/of-from.component';
import { ToArrayComponent } from './observable/to-array/to-array.component';
import { QuestionComponent } from './observable/question/question.component';
import { SubjectComponent } from './observable/subject/subject.component';
import { CompXComponent } from './sub_comp/comp-x/comp-x.component';
import { CompYComponent } from './sub_comp/comp-y/comp-y.component';
import { CompZComponent } from './sub_comp/comp-z/comp-z.component';
import { ReplaySubjectComponent } from './observable/replay-subject/replay-subject.component';
import { IPLComponent } from './observable/ipl/ipl.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PromiseComponent,
    ObservableComponent,
    AllComponent,
    FromEventComponent,
    IntervalComponent,
    OfFromComponent,
    ToArrayComponent,
    QuestionComponent,
    SubjectComponent,
    CompXComponent,
    CompYComponent,
    CompZComponent,
    ReplaySubjectComponent,
    IPLComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
