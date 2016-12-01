/**
 * Created by SGHP001 on 12/1/2016.
 */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ThreadService } from '../../app/thread.service';
import { PostService } from '../../app/post.service';
import { Post } from '../../app/model/postObj';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-thread',
  templateUrl: 'thread.html',
  providers: [PostService]
})
export class ThreadPage implements OnInit {
  posts:Post[];
  thread:number;

  constructor(public navCtrl:NavController,
              public params:NavParams,
              private postService:PostService,
              private loadingController:LoadingController) {
    this.thread = params.get('thread');
  }

  ngOnInit():void {
    this.getPosts(this.thread);
  }

  getPosts(t:number):void {
    let loader = this.loadingController.create({
      content: "Loading"
    });
    loader.present();
    this.postService.getPosts(t).subscribe(
        res => this.posts = res,
        err => console.warn(err),
      () => {
        loader.dismiss();
      }
    );
  }

}
