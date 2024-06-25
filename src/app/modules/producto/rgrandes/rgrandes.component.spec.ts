import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgrandesComponent } from './rgrandes.component';

describe('RgrandesComponent', () => {
  let component: RgrandesComponent;
  let fixture: ComponentFixture<RgrandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RgrandesComponent]
    });
    fixture = TestBed.createComponent(RgrandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
