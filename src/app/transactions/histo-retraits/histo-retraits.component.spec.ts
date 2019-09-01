import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoRetraitsComponent } from './histo-retraits.component';

describe('HistoRetraitsComponent', () => {
  let component: HistoRetraitsComponent;
  let fixture: ComponentFixture<HistoRetraitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoRetraitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoRetraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
