import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivoAcademicoComponent } from './objetivo-academico.component';

describe('ObjetivoAcademicoComponent', () => {
  let component: ObjetivoAcademicoComponent;
  let fixture: ComponentFixture<ObjetivoAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetivoAcademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
