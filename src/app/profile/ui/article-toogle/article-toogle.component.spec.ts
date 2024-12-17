import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleToogleComponent } from './article-toogle.component';

describe('ArticleToogleComponent', () => {
  let component: ArticleToogleComponent;
  let fixture: ComponentFixture<ArticleToogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleToogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
