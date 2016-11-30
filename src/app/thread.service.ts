/**
 * Created by SGHP001 on 11/28/2016.
 */
import { Injectable } from '@angular/core';
import { Thread } from './model/Thread';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Injectable()
export class ThreadService {

  constructor(private http:Http) {
  }

  getThreads():Observable<Thread[]> {
    return this.http.get('https://vozforums.com/forumdisplay.php?f=33').
      map(this.getThreadContent);
  }

  getContent():Promise<string> {
    return Promise.resolve('');
  }

  getThreadContent(res:Response) {
    var result = [];
    var body = '<div id="body-mock">' + res.text().replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '')
        .replace(new RegExp('images/', 'g'), 'https://vozforums.com/images/').replace('/clear.gif', 'https://vozforums.com/clear.gif') + '</div>';
    var $body = $(body);
    var $threadList = $($body.find('#threadbits_forum_33 > tr'));
    $threadList.each(function (i, thread) {
      var $this = $(this);

      var title = $this.find('[id^="thread_title"]')
      var $title = $(title);
      var titleText = $title.text();

      var id = $title.attr('id').replace('thread_title_', '');

      var op = $($this.find('.alt1 .smallfont > span')).text();
      var view = $($this).find('td:nth-child(5)').text();

      result.push({id: id, author: op, title: titleText, view: view});
    });
    return result;
  }
}
