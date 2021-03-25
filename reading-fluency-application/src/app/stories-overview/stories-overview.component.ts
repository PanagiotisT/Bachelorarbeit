import { Component, OnInit } from '@angular/core';
import { IStories } from '../entities/i-stories';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { IStory } from '../entities/i-story';

@Component({
  selector: 'app-stories-overview',
  templateUrl: './stories-overview.component.html',
  styleUrls: ['./stories-overview.component.scss']
})
export class StoriesOverviewComponent implements OnInit {

  stories: IStories;

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private dataService: DataService, private router: Router) {
    console.log('Constructor');
  }

  ngOnInit(): void {
    this.apiService.getStories().subscribe((stories: IStories) => {
      console.log(stories);
      this.stories = stories;
    });
  }

  sanitizeImageUrl(imageUrl): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/' + imageUrl);
  }

  selectStory(story: IStory) {
    console.log(`Story set to ${story.name}`);
    this.dataService.setStory(story);
    this.dataService.setScene(0);
    this.router.navigateByUrl('story/scenes');
  }

}
