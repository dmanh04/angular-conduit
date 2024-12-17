import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileArticleListComponent } from './profile-article-list.component';

describe('ProfileArticleListComponent', () => {
  let component: ProfileArticleListComponent;
  let fixture: ComponentFixture<ProfileArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileArticleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
