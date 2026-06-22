import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPagosAdminComponent } from './historial-pagos-admin.component';

describe('HistorialPagosAdminComponent', () => {
  let component: HistorialPagosAdminComponent;
  let fixture: ComponentFixture<HistorialPagosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPagosAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialPagosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
