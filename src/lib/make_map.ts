import { LineValue, StaValue } from "./class";

//firestoreから取得したjson文字列より路線map作成
export function makeLineMap(array: { id: string; json: string }[]) {
  // let map = new Map();
  const map = new Map<number, LineValue>();
  //mapキーは路線No6
  array.forEach((element) => {
    if (element.id == "路線") {
      let foo: LineValue[] = JSON.parse(element.json);
      for (const v of foo) {
        map.set(v.lineNo6, new LineValue(v.lineNo6, v.close, v.name, v.urls));
      }
    }
  });

  //路線No6でsort
  const sortedMap = new Map([...map.entries()].sort((a, b) => a[0] - b[0]));
  // const sortedMap = new Map([...map.entries()].sort());
  return sortedMap;
}

//firestoreから取得したjson文字列より駅map作成
export function makeStaMap(array: { id: string; json: string }[]) {
  // let map = new Map();
  const map = new Map<number, StaValue>();
  //mapキーは駅No9
  array.forEach((element) => {
    if (element.id != "路線") {
      // console.log("駅:",element.id);
      let foo: StaValue[] = JSON.parse(element.json);
      for (const v of foo) {
        map.set(
          v.staNo9,
          new StaValue(
            v.staNo9,
            v.lineNo6,
            v.sameStaNo9,
            v.close,
            v.name,
            v.kana,
            v.prefectures,
            v.url
          )
        );
      }
    }
  });

  //駅No9でsort
  const sortedMap = new Map([...map.entries()].sort((a, b) => a[0] - b[0]));
  // const sortedMap = new Map([...map.entries()].sort());
  return sortedMap;
}
