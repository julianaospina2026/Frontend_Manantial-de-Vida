import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialFacturasAdminComponent } from './historial-facturas-admin.component';

describe('HistorialFacturasAdminComponent', () => {
  let component: HistorialFacturasAdminComponent;
  let fixture: ComponentFixture<HistorialFacturasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialFacturasAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialFacturasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
