import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ThreadService } from '../../app/thread.service';
import { Thread } from '../../app/model/threadObj';
import { LoadingController } from 'ionic-angular';
import { ThreadPage } from '../thread/thread';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ThreadService]
})

export class HomePage implements OnInit {
  threads:Thread[];
  startThread:number;
  page:number;

  constructor(public navCtrl:NavController,
              private threadService:ThreadService,
              private loadingController:LoadingController) {
    this.startThread = 33;
    this.threads = [];
    this.page = 1;
  }

  getThreads(t:number, page:number):void {
    let loader = this.loadingController.create({
      content: "Loading"
    });
    loader.present();
    this.threadService.getThreads(t, page).subscribe(
        res => this.threads = res,
        err => console.warn(err),
      () => {
        loader.dismiss();
      }
    );
  }

  ngOnInit():void {
    this.getThreads(this.startThread, this.page);
  }

  goto(id:number) {
    this.navCtrl.push(ThreadPage, {thread: id});
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    this.threadService.getThreads(this.startThread, this.page).subscribe(
        res => this.threads.push(...res),
        err => console.warn(err),
      () => {
        infiniteScroll.complete();
      }
    );
  }

}
