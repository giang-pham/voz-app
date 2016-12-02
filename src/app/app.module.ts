import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ThreadPage } from '../pages/thread/thread';
import { SimpleDivider } from './component/simple-divider.ts'

@NgModule({
  declarations: [
    MyApp,
    BookmarkPage,
    ContactPage,
    HomePage,
    TabsPage,
    ThreadPage,
    SimpleDivider
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BookmarkPage,
    ContactPage,
    HomePage,
    TabsPage,
    ThreadPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
