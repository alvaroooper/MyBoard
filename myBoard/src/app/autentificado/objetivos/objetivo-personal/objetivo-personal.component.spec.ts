import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivoPersonalComponent } from './objetivo-personal.component';

describe('ObjetivoPersonalComponent', () => {
  let component: ObjetivoPersonalComponent;
  let fixture: ComponentFixture<ObjetivoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetivoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
