import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoEnvoisComponent } from './histo-envois.component';

describe('HistoEnvoisComponent', () => {
  let component: HistoEnvoisComponent;
  let fixture: ComponentFixture<HistoEnvoisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoEnvoisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoEnvoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
