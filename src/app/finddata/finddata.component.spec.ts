import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinddataComponent } from './finddata.component';

describe('FinddataComponent', () => {
  let component: FinddataComponent;
  let fixture: ComponentFixture<FinddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinddataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
