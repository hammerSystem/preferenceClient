import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClientListImgComponent } from './search-client-list-img.component';

describe('SearchClientListImgComponent', () => {
  let component: SearchClientListImgComponent;
  let fixture: ComponentFixture<SearchClientListImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClientListImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClientListImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
