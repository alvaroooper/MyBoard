import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivoCompletadoComponent } from './objetivo-completado.component';

describe('ObjetivoCompletadoComponent', () => {
  let component: ObjetivoCompletadoComponent;
  let fixture: ComponentFixture<ObjetivoCompletadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetivoCompletadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivoCompletadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
