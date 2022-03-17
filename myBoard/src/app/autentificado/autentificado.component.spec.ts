import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutentificadoComponent } from './autentificado.component';

describe('AutentificadoComponent', () => {
  let component: AutentificadoComponent;
  let fixture: ComponentFixture<AutentificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutentificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutentificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
