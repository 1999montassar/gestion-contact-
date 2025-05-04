import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifeyComponent } from './verifey.component';

describe('VerifeyComponent', () => {
  let component: VerifeyComponent;
  let fixture: ComponentFixture<VerifeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
