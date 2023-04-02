export function makeInfo(
    searchCount: number,
    runTime: number,
    searchDate: Date
  ) {
    console.log("search Result:", searchCount, runTime, formatDate(searchDate));
    return (
      "検索結果:" +
      searchCount +
      "件 検索時間:" +
      runTime +
      "sec 検索日時:" +
      formatDate(searchDate)
    );
  }
  
  export function formatDate(date: Date) {
    return (
      date.getFullYear().toString().padStart(4, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0")
    );
  }
  
  export function makeAnchorTag(url: string) {
    //<a href="https://jae02546.github.io/station_search/" target="_blank" rel="noopener noreferrer">路線データ、及び免責事項について</a>
    let foo =
      "<a href='" +
      url +
      "' target='_blank' rel='noopener noreferrer'>" +
      decodeURIComponent(url) +
      "</a>";
  
    return foo;
  }
  