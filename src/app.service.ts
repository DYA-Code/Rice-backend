import { Injectable } from '@nestjs/common';

import Neis from "@my-school.info/neis-api";
const neis = new Neis({ KEY: "d374573af8d34cddaf4e4c250b995c8c", Type: "json" });
import fetch from 'node-fetch';

let today = new Date();

let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

let data: string = year + month + day;

@Injectable()
export class AppService {
  getHello() {
    return 'Hello World';
  }

  async getRice(nm: string) {

    try {
      const school = await neis.getSchoolInfo({ SCHUL_NM: nm });
      const mealInfo = await neis.getMealInfo({ ATPT_OFCDC_SC_CODE: school[0].ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE: school[0].SD_SCHUL_CODE, MLSV_YMD: data });
      
      // const meal = mealInfo.filter(m => m.MMEAL_SC_CODE = "2");
      const meal = mealInfo[1];
      
      return meal;
    } catch {
      return 'no';
    }
   
  }

  // async getSchoolLocation ( nm: string ) {

  //   const url = 'http://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api';
  //   let queryParams = '?' + encodeURIComponent('serviceKey') + '=PfTq%2BIyhkxvmLxTT8XCN5ojf9jxlsaFOgfAOppxXMbTJl%2FM4HDhFhksFFQNCrsWokHfuzqtGlxWUDc93x%2FVJYQ%3D%3D';  // Service Key
  //   queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');  // type
  //   // queryParams += '&' + encodeURIComponent('cddcCode') + '=' + encodeURIComponent('8750000');  // 시도교육청코드
  //   // queryParams += '&' + encodeURIComponent('rdnmadr') + '=' + encodeURIComponent('경상북도 포항시 남구 지곡로 150');  // 소재지도로명주소
  //   queryParams += '&' + encodeURIComponent('schoolNm') + '=' + encodeURIComponent(nm);  // school name
  //   queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(1);
  //   // queryParams += '&' + encodeURIComponent('schoolSe') + '=' + '중학교';
    
  //   const result = await fetch(url + queryParams).then(async (res) => await res.json());

  //   return result.response.body.items[1];
  // }

  async getInfo( nm: string ) {
    const school = await neis.getSchoolInfo({ SCHUL_NM: nm });

    return school[0];
  }
}