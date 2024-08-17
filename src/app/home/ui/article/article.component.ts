import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Article } from '../../../shared/models/article.model';



@Component({
  selector: 'app-article',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})


export class ArticleComponent {

  @Input({required:true}) listArticle!:Article[];

}
