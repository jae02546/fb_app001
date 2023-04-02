<script lang="ts">
  import { TableValue } from "$lib/class";
  import { makeAnchorTag, makeInfo } from "$lib/tools";
  import { onMount, onDestroy } from "svelte";
  import { getFsJson } from "../lib/firestore";
  import { makeLineMap, makeStaMap } from "../lib/make_map";
  import { searchSta } from "../lib/search_map";

  let tableFontSize = "is-size-6";
  let lineMap = new Map(); //路線データmap
  let staMap = new Map(); //駅データmap
  let searchText = ""; //検索文字列
  let matchType = 1; //検索方法
  let itemType = 1; //検索項目
  let searchInfo = ""; //検索結果（件数、時間、日時）

  const makeMap = async () => {
    //firestoreからjson配列取得
    let fsJson = await getFsJson();
    //map変換
    lineMap = makeLineMap(fsJson);
    staMap = makeStaMap(fsJson);
  };

  let tableData: TableValue[] = [];
  let no = 1;
  const search = async () => {
    const startTime = new Date();
    let foo = searchSta(lineMap, staMap, searchText, matchType, itemType);
    tableFontSize = window.innerWidth <= 1080 ? "is-size-7" : "is-size-6";
    tableData = [];
    no = 1;
    foo?.forEach((element) => {
      let line: string = "<br>";
      let url: string = makeAnchorTag(element.url) + "<br>";
      element.lvArr.forEach((element2) => {
        line += element2.name + (element2.close ? "（廃線）" : "") + "<br>";
        // line +=
        //   element2.lineNo6 +
        //   element2.name +
        //   (element2.close ? "（廃線）" : "") +
        //   "<br>";
        element2.urls.forEach((element2) => {
          url += makeAnchorTag(element2) + "<br>";
        });
      });
      let bar = new TableValue(
        no,
        element.name + (element.close ? "（廃駅）" : ""),
        // element.staNo9 + element.name + (element.close ? "（廃駅）" : ""),
        element.kana,
        element.prefectures,
        line,
        url
      );
      tableData.push(bar);
      no++;
    });
    tableData = tableData;

    //検索結果（件数、時間、日時）
    if (searchText !== "") {
      const count = foo?.size === undefined ? 0 : foo?.size;
      const endTime = new Date();
      const runTime = (endTime.getTime() - startTime.getTime()) / 1000;
      searchInfo = makeInfo(count, runTime, endTime);
    } else {
      searchInfo = "検索文字列を入力してください";
    }
    searchInfo = searchInfo;
  };

  onMount(async () => {
    await makeMap();
    console.log(
      "onMount lineMap.size:",
      lineMap.size,
      "staMap.size:",
      staMap.size
    );
  });

  onDestroy(() => {});

  function clearInput() {
    searchText = "";
  }
</script>

<div class="container is-fluid is-family-primary">
  <form class="box is-size-6">
    <!-- <div class="title is-4">駅名検索</div> -->
    <div class="field">
      <input
        class="input is-primary is-half"
        type="text"
        placeholder="検索文字列を入力してください"
        name="search"
        bind:value={searchText}
      />
      <button class="button is-primary" on:click={search}>検索</button>
      {#if searchText}
        <button class="button" on:click={clearInput}>Clear</button>
      {/if}
    </div>
    <div class="field">
      検索方法
      <input
        type="radio"
        bind:group={matchType}
        name="match"
        value={1}
      />部分一致
      <input
        type="radio"
        bind:group={matchType}
        name="match"
        value={2}
      />前方一致
      <input
        type="radio"
        bind:group={matchType}
        name="match"
        value={3}
      />後方一致
      <input
        type="radio"
        bind:group={matchType}
        name="match"
        value={4}
      />完全一致
    </div>
    <div class="field">
      検索項目
      <input type="radio" bind:group={itemType} name="item" value={1} />駅名
      <input type="radio" bind:group={itemType} name="item" value={2} />かな
    </div>
    <!-- <div>
      <button class="button is-primary" on:click={search}>検索</button>
    </div> -->
  </form>

  <!-- <form class="box is-size-6"> -->
  <form class="box {tableFontSize}">
    <ul>
      <p>{searchInfo}</p>
      <table class="table is-striped is-bordered">
        {#if tableData.length !== 0}
          <thead>
            <tr>
              <th class="has-text-centered">No</th>
              <th class="has-text-centered">駅名</th>
              <th class="has-text-centered">かな</th>
              <th class="has-text-centered">都道府県</th>
              <th class="has-text-centered">路線名</th>
              <th class="has-text-centered">Wikipedia</th>
            </tr>
          </thead>
        {/if}
        <tbody>
          {#each tableData as data}
            <tr>
              <td class="is-vcentered">{@html data.no}</td>
              <td class="is-vcentered">{@html data.name}</td>
              <td class="is-vcentered">{@html data.kana}</td>
              <td class="is-vcentered">{@html data.prefectures}</td>
              <td class="is-vcentered">{@html data.line}</td>
              <td class="is-vcentered">{@html data.url}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </ul>
  </form>

  <!-- <form class="box is-size-7">
    <div>
      駅名検索 ver.2.0 (c)2023 jae02546<br />
      <a
        href="https://jae02546.github.io/station_search/"
        target="_blank"
        rel="noopener noreferrer">路線データ、及び免責事項について</a
      >
      <br />
      Twitter @jae02546 || @salted_salmon<br />
    </div>
  </form> -->
</div>
