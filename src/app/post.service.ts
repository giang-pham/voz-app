/**
 * Created by SGHP001 on 11/28/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { Post } from './model/postObj';

@Injectable()
export class PostService {

  constructor(private http:Http) {
  }

  getPosts(t:number):Observable<Post[]> {
    console.log('loading thread: ' + t);
    return this.http.get('https://vozforums.com/showthread.php?t=' + t)
      .map(res => this.getPostElements(res))
      .map(postList => this.getPostObjects(postList));
  }

  getPostElements(res:Response) {
    var body = '<div id="body-mock">'
      + res.text()
        .replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '')
        .replace(new RegExp('images/', 'g'), 'https://vozforums.com/images/')
        .replace(new RegExp('/images/smilies/', 'g'), 'https://vozforums.com/images/smilies/')
        .replace(new RegExp('customavatars/', 'g'), 'https://vozforums.com/customavatars/')
        .replace('/clear.gif', 'https://vozforums.com/clear.gif') + '</div>';
    var $body = $(body);
    var $postListParent = $($body.find('#posts'));
    var $postList = $postListParent.find('> div');
    return $postList;
  }

  getPostObjects($postList:any):Post[] {
    return $postList.map(function (i, post) {
      var $this = $(post);
      var id = '1';

      var title = $($this.find('.alt1 .smallfont > strong')).text();
      var content = $($this.find('.alt1 .voz-post-message')).text();
      var op = $($this.find('.alt2 .bigusername')).text();

      return {id: id, author: op, title: title, content: content};
    });
  }

}
