import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { ApiService } from 'src/app/services/api.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [
    CommonModule,
    TabsModule,
    GalleryModule
  ]
})
export class MemberDetailComponent {
  member: Member | undefined;
  memberSubscription!: Subscription;

  images: GalleryItem[] = [];

  constructor(
    private apiService: ApiService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Subscripe to the changes
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.apiService.getMemberByUserName(params['username']);
      
        this.memberSubscription = this.memberService.member.subscribe(
          (member) => {
            this.member = member;
            this.getImages();
          });
      }
    );
  }

  ngOnDestroy() {
    if (this.memberSubscription) {this.memberSubscription.unsubscribe();}
  }

  private getImages() {
    if(!this.member) return;

    for(const photo of this.member?.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  }

}
