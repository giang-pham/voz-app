/**
 * Created by SGHP001 on 12/1/2016.
 */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
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
  page:number;

  constructor(public navCtrl:NavController,
              public params:NavParams,
              private postService:PostService,
              private loadingController:LoadingController) {
    this.thread = params.get('thread');
    this.posts = [];
    this.page = 1;
  }

  ngOnInit():void {
    this.getPosts(this.thread, this.page);
  }

  getPosts(t:number, page:number):void {
    let loader = this.loadingController.create({
      content: "Loading"
    });
    loader.present();
    this.postService.getPosts(t, page).subscribe(
        res => this.posts = res,
        err => console.warn(err),
      () => {
        loader.dismiss();
      }
    );
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    this.postService.getPosts(this.thread, this.page).subscribe(
        res => this.posts.push(...res),
        err => console.warn(err),
      () => {
        infiniteScroll.complete();
      }
    );
  }

}
