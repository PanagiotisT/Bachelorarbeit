import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneOverviewComponent } from './scene-overview.component';

describe('SceneOverviewComponent', () => {
  let component: SceneOverviewComponent;
  let fixture: ComponentFixture<SceneOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
