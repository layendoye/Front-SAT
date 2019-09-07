import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesComptesComponent } from './historiques-comptes.component';

describe('HistoriquesComptesComponent', () => {
  let component: HistoriquesComptesComponent;
  let fixture: ComponentFixture<HistoriquesComptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquesComptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquesComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
