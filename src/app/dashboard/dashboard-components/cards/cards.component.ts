import { Component, OnInit } from '@angular/core';

interface cards {
  image: string;
  btn: string;
  title:String,
  description:String
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cards: cards [] = [
    {
      title:"Top 10 Automation Testing Tools [Buyer’s Guide]",
      description:"Explore the top 10 automation testing tools in our detailed buyer’s guide and learn about their features, pros/cons",
      image: "assets/images/vits-blog-1.jpg",
      btn: "warn",
    },
    {
      title:"Explore The World of QA Automation with stellar",
      description:"Learn how website testing benefits from automation testing, and how QA automation makes testing faster",
      image: "assets/images/vits-blog-2.jpg",
      btn: "primary",
    },
    {
      title:"7 Benefits of Codeless Testing for Software QA",
      description:"Are you looking for ways to improve your software QA processes? Read this interesting piece about the benefit",
      image: "assets/images/vits-blog-4.jpg",
      btn: "accent",
    },
  ]

}
