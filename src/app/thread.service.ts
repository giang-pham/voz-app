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

  getThreads(f:number):Observable<Thread[]> {
    console.log('loading forum ' + f);
    return this.http.get('https://vozforums.com/forumdisplay.php?f=' + f).
      map(res => this.getThreadElements(res)).
      map(threadList => this.getThreadObjects(threadList));
  }

  getThreadElements(res:Response) {
    var body = '<div id="body-mock">'
      + res.text().
        replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '').
        replace(new RegExp('images/', 'g'), 'https://vozforums.com/images/').replace('/clear.gif', 'https://vozforums.com/clear.gif') + '</div>';
    var $body = $(body);
    var $threadListParent = $($body.find('[id^="threadbits_forum_"]'));
    var $threadList = $threadListParent.find('> tr');
    return $threadList;
  }

  getThreadObjects($threadList:any):Thread[] {
    return $threadList.map(function (i, thread) {
      var $this = $(thread);

      var title = $this.find('[id^="thread_title"]');
      var $title = $(title);
      var titleText = $title.text();

      var id = $title.attr('id').replace('thread_title_', '');

      var op = $($this.find('.alt1 .smallfont > span')).text();
      var view = $($this).find('td:nth-child(5)').text();

      return {id: id, author: op, title: titleText, view: view};
    });
  }

}
