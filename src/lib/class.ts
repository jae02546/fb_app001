//路線Valueクラス
//取り敢えず駅名検索に必要なもの、元のシート自体も作り直した方がよい
//駅並べ、駅一覧等で使用する場合はsortNo6が必要（jsonから戻す場合は列挙順が保証されない）
//urlsは別シートより（jsonからの戻しを考慮しsortNo付きのclassで配列としたほうがよい）
export class LineValue {
    //路線シートのデータを入れるmapのvalueに使用、mapのkeyは路線No6
    //廃線,路線名,wikiUrls（配列）
    lineNo6: number; //この項目はkeyと被る
    close: boolean;
    name: string;
    urls: string[];
    constructor(lineNo6: number, close: boolean, name: string, urls: string[]) {
      this.lineNo6 = lineNo6;
      this.close = close;
      this.name = name;
      this.urls = urls;
    }
  }
  
  //駅valueクラス
  //取り敢えず駅名検索に必要なもの、元のシート自体も作り直した方がよい
  export class StaValue {
    //駅シートのデータを入れるmapのvalueに使用、mapのkeyは駅No9
    //駅並べ、駅一覧等で使用する場合はsortNo9が必要（jsonから戻す場合は列挙順が保証されない）
    //路線No6,同駅No,廃駅,駅名,かな,都道府県,wikiUrl
    staNo9: number; //この項目はkeyと被る
    lineNo6: number;
    sameStaNo9: number;
    close: boolean;
    name: string;
    kana: string;
    prefectures: string;
    url: string;
    constructor(
      staNo9: number,
      lineNo6: number,
      sameStaNo9: number,
      close: boolean,
      name: string,
      kana: string,
      prefectures: string,
      url: string
    ) {
      this.staNo9 = staNo9;
      this.lineNo6 = lineNo6;
      this.sameStaNo9 = sameStaNo9;
      this.close = close;
      this.name = name;
      this.kana = kana;
      this.prefectures = prefectures;
      this.url = url;
    }
  }
  
  //表示Valueクラス
  export class ShowValue {
    //検索結果を表示するmapのvalueに使用、mapのkeyは同一駅No
    //廃駅,駅名,かな,英語,都道府県,駅wiki,路線Arr[]
    staNo9: number;
    sameStaNo9: number;
    close: boolean;
    name: string;
    kana: string;
    prefectures: string;
    url: string;
    lvArr: LineValue[];
    constructor(
      staNo9: number,
      sameStaNo9: number,
      close: boolean,
      name: string,
      kana: string,
      prefectures: string,
      url: string,
      lvArr: LineValue[]
    ) {
      this.staNo9 = staNo9;
      this.sameStaNo9 = sameStaNo9;
      this.close = close;
      this.name = name;
      this.kana = kana;
      this.prefectures = prefectures;
      this.url = url;
      this.lvArr = lvArr;
    }
  }
  
  export class TableValue {
    no: number;
    name: string;
    kana: string;
    prefectures: string;
    line: string;
    url: string;
    constructor(
      no: number,
      name: string,
      kana: string,
      prefectures: string,
      line: string,
      url: string
    ) {
      this.no = no;
      this.name = name;
      this.kana = kana;
      this.prefectures = prefectures;
      this.line = line;
      this.url = url;
    }
  }
  