import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagerComponent } from './tag-manager.component';

describe('TagManagerComponent', () => {
  let component: TagManagerComponent;
  let fixture: ComponentFixture<TagManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
