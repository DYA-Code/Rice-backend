import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

import request from 'request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/rice/:nm')
  rice(@Param('nm') nm: string) {
    return this.appService.getRice(nm);
  }

  @Get('/info/:nm')
  info(@Param('nm') nm: string) {
    // console.log(this.appService.getInfo(nm));
    return this.appService.getInfo(nm).then((res) => { console.log(res); return res });
    // return this.appService.getInfo(nm);
  }

  // @Get('/shloc/:nm')
  // schoolLocation(@Param('nm') nm: string) {

  //   if (nm !== "" || nm !== null) {

  //     return this.appService.getSchoolLocation(nm);
  //   }


  //   // for (let i = 0; i < 10; i++) {
  //   //   result.push({ schoolnm: loc[i].schoolNm, latitude: loc[i].latitude, longitude: loc[i].longitude })
  //   // }
  // }
}