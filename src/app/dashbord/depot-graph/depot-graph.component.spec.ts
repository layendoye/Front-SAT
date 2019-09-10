import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotGraphComponent } from './depot-graph.component';

describe('DepotGraphComponent', () => {
  let component: DepotGraphComponent;
  let fixture: ComponentFixture<DepotGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepotGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
