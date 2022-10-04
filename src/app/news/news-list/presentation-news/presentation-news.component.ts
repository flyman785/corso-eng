import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {NewsModel} from "../../../shared/services/news.service";

@Component({
  selector: 'app-presentation-news',
  templateUrl: './presentation-news.component.html',
  styleUrls: ['./presentation-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationNewsComponent implements OnInit {
  @Input() news?: Observable<NewsModel[]>;
  @Output() remove = new EventEmitter<string>()

  constructor(
  ) { }

  ngOnInit(): void {
  }

  deleteNews(id: string): void {
    this.remove.emit(id);
  }

}
