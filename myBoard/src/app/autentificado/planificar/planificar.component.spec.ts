import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificarComponent } from './planificar.component';

describe('PlanificarComponent', () => {
  let component: PlanificarComponent;
  let fixture: ComponentFixture<PlanificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
