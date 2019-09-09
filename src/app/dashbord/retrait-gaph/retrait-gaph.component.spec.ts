import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitGaphComponent } from './retrait-gaph.component';

describe('RetraitGaphComponent', () => {
  let component: RetraitGaphComponent;
  let fixture: ComponentFixture<RetraitGaphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetraitGaphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraitGaphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
