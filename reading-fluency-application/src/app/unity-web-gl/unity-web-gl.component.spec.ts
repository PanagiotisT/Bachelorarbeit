import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityWebGlComponent } from './unity-web-gl.component';

describe('UnityWebGlComponent', () => {
  let component: UnityWebGlComponent;
  let fixture: ComponentFixture<UnityWebGlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnityWebGlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityWebGlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
