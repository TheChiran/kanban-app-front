import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  socialMediaLinks=[{"link":"https://www.facebook.com/TheChiran/","image":"/assets/facebook.png"},
                    {"link":"https://www.instagram.com/chiran_swe/","image":"/assets/instagram.png"},
                    {"link":"https://www.linkedin.com/in/tonmoy-chiran-0920b2151/","image":"/assets/linkedin.png"}];
  constructor() { }

  ngOnInit(): void {
  }

}
