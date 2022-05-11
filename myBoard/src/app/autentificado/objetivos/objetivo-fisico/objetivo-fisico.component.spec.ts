import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivoFisicoComponent } from './objetivo-fisico.component';

describe('ObjetivoFisicoComponent', () => {
  let component: ObjetivoFisicoComponent;
  let fixture: ComponentFixture<ObjetivoFisicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetivoFisicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivoFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
