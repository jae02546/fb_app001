// https://baapuro.com/Svelte/one/
// 最後にSEO対策として、layout.jsにtrailing slush（URLに必ずスラッシュを付ける）
// を設定しよう。 スラッシュ有と無が混在すると、2重にページが存在することになり、
// SEOの評価が下がる。
// layout.jsにルーティングの設定を書く
export const prerender = true;
export const trailingSlash = 'always';
