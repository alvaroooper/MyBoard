import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionalidadesComponent } from './funcionalidades.component';

describe('FuncionalidadesComponent', () => {
  let component: FuncionalidadesComponent;
  let fixture: ComponentFixture<FuncionalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
