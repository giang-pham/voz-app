/**
 * Created by SGHP001 on 11/28/2016.
 */
import { Injectable } from '@angular/core';
import { Thread } from './model/threadObj';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Injectable()
export class ThreadService {

  constructor(private http:Http) {
  }

  getThreads(f:number, page:number):Observable<Thread[]> {
    console.log('loading forum ' + f);
    return this.http.get('https://vozforums.com/forumdisplay.php?f=' + f + '&page=' + page).
      map(res => this.getThreadElements(res)).
      map(threadList => this.getThreadObjects(threadList));
  }

  getThreadElements(res:Response) {
    let body = '<div id="body-mock">'
      + res.text().
        replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '').
        replace(new RegExp('images/', 'g'), 'https://vozforums.com/images/').replace('/clear.gif', 'https://vozforums.com/clear.gif') + '</div>';
    let $body = $(body);
    let $threadListParent = $($body.find('[id^="threadbits_forum_"]'));
    let $threadList = $threadListParent.find('> tr');
    return $threadList;
  }

  getThreadObjects($threadList:any):Thread[] {
    return $threadList.map(function (i, thread) {
      let $this = $(thread);

      let title = $this.find('[id^="thread_title"]');
      let $title = $(title);
      let titleText = $title.text();

      let id = $title.attr('id').replace('thread_title_', '');

      let op = $($this.find('.alt1 .smallfont > span')).text();
      let view = $($this).find('td:nth-child(5)').text();

      let vozsticky = $($this).find('.vozsticky');
      let sticky = vozsticky.length === 1;

      let $threadImage = $($this.find('.alt1 img'));
      let hot = $threadImage.attr('src').indexOf('thread_hot') > 0;

      let $threadStar = $($this.find('.alt1 .smallfont img'));
      let star = false;
      $threadStar.map(function(i, thread) {
        let $thread = $(thread);
        if ($thread.attr('src').indexOf('rating_5') > 0 || $thread.attr('src').indexOf('rating_4') > 0) {
          star = true;
        }
      });

      return {id: id, author: op, title: titleText, view: view, sticky: sticky, hot: hot, star: star};
    });
  }

}
