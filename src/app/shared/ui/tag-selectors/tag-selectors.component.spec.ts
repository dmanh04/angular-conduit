import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSelectorsComponent } from './tag-selectors.component';

describe('TagSelectorsComponent', () => {
  let component: TagSelectorsComponent;
  let fixture: ComponentFixture<TagSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagSelectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
