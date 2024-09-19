import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcasamientoComponent } from './rcasamiento.component';

describe('RcasamientoComponent', () => {
  let component: RcasamientoComponent;
  let fixture: ComponentFixture<RcasamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RcasamientoComponent]
    });
    fixture = TestBed.createComponent(RcasamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
