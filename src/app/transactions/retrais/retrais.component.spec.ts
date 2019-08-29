import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraisComponent } from './retrais.component';

describe('RetraisComponent', () => {
  let component: RetraisComponent;
  let fixture: ComponentFixture<RetraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
