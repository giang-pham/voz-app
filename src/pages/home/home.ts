import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ThreadService } from '../../app/thread.service';
import { Thread } from '../../app/model/Thread';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ThreadService]
})
export class HomePage implements OnInit {
  threads: Thread[];
  content: string;

  constructor(public navCtrl: NavController, private threadService: ThreadService) {

  }

  getThreads(): void {
    this.threadService.getThreads().then(threads => this.threads = threads);
  }

  getContent(): void {
    this.threadService.getContent().then(content => this.content = content);
  }

  ngOnInit(): void {
    this.getThreads();
    this.getContent();
  }

}
