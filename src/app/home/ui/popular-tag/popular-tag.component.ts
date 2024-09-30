import { Component, inject, OnInit } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { PopularTagStore } from './popular-tag.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-popular-tag',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './popular-tag.component.html',
  styleUrl: './popular-tag.component.scss',
  providers: [provideComponentStore(PopularTagStore)],
})
export class PopularTagComponent implements OnInit{
  readonly popularTagsStore = inject(PopularTagStore);

  ngOnInit(): void {
   this.popularTagsStore.getAllTags();
  }
}
