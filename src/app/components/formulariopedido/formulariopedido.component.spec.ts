import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariopedidoComponent } from './formulariopedido.component';

describe('FormulariopedidoComponent', () => {
  let component: FormulariopedidoComponent;
  let fixture: ComponentFixture<FormulariopedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariopedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariopedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
