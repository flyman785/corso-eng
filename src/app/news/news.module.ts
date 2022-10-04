import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import {NewsListComponent} from "./news-list/news-list.component";
import {NewsFormComponent} from "./news-form/news-form.component";
import {SharedModule} from "../shared/shared.module";
import { PresentationNewsComponent } from './news-list/presentation-news/presentation-news.component';


@NgModule({
  declarations: [NewsListComponent, NewsFormComponent, PresentationNewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ]
})
export class NewsModule { }
