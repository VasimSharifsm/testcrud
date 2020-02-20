import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpInvokerComponent } from './http-invoker.component';

describe('HttpInvokerComponent', () => {
  let component: HttpInvokerComponent;
  let fixture: ComponentFixture<HttpInvokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpInvokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpInvokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
