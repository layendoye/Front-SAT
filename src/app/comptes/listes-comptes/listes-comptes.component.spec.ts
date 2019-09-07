import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesComptesComponent } from './listes-comptes.component';

describe('ListesComptesComponent', () => {
  let component: ListesComptesComponent;
  let fixture: ComponentFixture<ListesComptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesComptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
