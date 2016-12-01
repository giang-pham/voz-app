import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ThreadService } from '../../app/thread.service';
import { PostService } from '../../app/post.service';
import { Thread } from '../../app/model/threadObj';
import { LoadingController } from 'ionic-angular';
import { ThreadPage } from '../thread/thread';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ThreadService, PostService]
})
export class HomePage implements OnInit {
  threads:Thread[];
  startThread:number;

  constructor(public navCtrl:NavController,
              private threadService:ThreadService,
              private postService:PostService,
              private loadingController:LoadingController) {
    this.startThread = 33;
  }

  getThreads(t:number):void {
    let loader = this.loadingController.create({
      content: "Loading"
    });
    loader.present();
    this.threadService.getThreads(t).subscribe(
        res => this.threads = res,
        err => console.warn(err),
      () => {
        loader.dismiss();
      }
    );
  }

  ngOnInit():void {
    this.getThreads(this.startThread);
  }

  goto(id:number) {
    this.navCtrl.push(ThreadPage, {thread: id});
  }

}
