import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmedianosComponent } from './rmedianos.component';

describe('RmedianosComponent', () => {
  let component: RmedianosComponent;
  let fixture: ComponentFixture<RmedianosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmedianosComponent]
    });
    fixture = TestBed.createComponent(RmedianosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
