/**
 * Created by SGHP001 on 11/28/2016.
 */
import { Injectable } from '@angular/core';
import { Thread } from './model/Thread';
import { THREADS } from './mock-threads';
import { HTTP } from 'ionic-native';

@Injectable()
export class ThreadService {
  getThreads():Promise<Thread[]> {
    return Promise.resolve(THREADS);
  }

  getContent():Promise<string> {
    HTTP.get('http://ionic.io', {}, {})
      .then(data => {
        console.log(data.data);
      })
      .catch(error => {
        console.log(error.error);
      });
    return new Promise((resolve, reject) => {
      HTTP.get('http://ionic.io', {}, {})
        .then(data => {
          console.log(data.data);
          resolve(data.data); // data received by server
        })
        .catch(error => {
          resolve(error.error); // error message as string
        });
    });

  }
}
