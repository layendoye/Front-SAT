import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OctroieCompteFormComponent } from './octroie-compte-form.component';

describe('OctroieCompteFormComponent', () => {
  let component: OctroieCompteFormComponent;
  let fixture: ComponentFixture<OctroieCompteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OctroieCompteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OctroieCompteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
