import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentMessagesComponent } from './sent-messages.component';

describe('SentMessagesComponent', () => {
  let component: SentMessagesComponent;
  let fixture: ComponentFixture<SentMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
