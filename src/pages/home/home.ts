import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ThreadService } from '../../app/thread.service';
import { Thread } from '../../app/model/Thread';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ThreadService]
})
export class HomePage implements OnInit {
  threads:Thread[];
  content:Thread;

  constructor(public navCtrl:NavController, private threadService:ThreadService, private loadingController:LoadingController) {

  }

  getThreads():void {
    let loader = this.loadingController.create({
      content: "Loading"
    });
    loader.present();
    this.threadService.getThreads().subscribe(
      res => this.threads = res,
      err => console.warn(err),
      () => {
        loader.dismiss();
      }
    );
  }

  getContent():void {
    this.threadService.getContent().then(content => console.log(content));
  }

  ngOnInit():void {
    this.getThreads();
    this.getContent();
  }

  goto(id:string):void{
    alert(id);
  }

}
