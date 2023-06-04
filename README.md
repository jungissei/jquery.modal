# jQuery.modal


[https://jungissei.github.io/jquery.modal/](https://jungissei.github.io/jquery.modal/)


## 基本モーダル実装手順

リソース読み込み
```html
<link rel="stylesheet" href="/jquery.modal/lib/common/css/style.css">
<script defer type="text/javascript" src="/jquery.common/js/jquery.js"></script>
<script defer src="/jquery.modal/lib/common/js/jqueryModal.js"></script>
<script>
$(function(){
  let $open_btn = $('[data-modal-open="modal_dog"]'),
    $canvas = $('#modal_dog');

  $open_btn.modal();

  // モーダル開く直前の処理
  $canvas.on('modal.before_open', function () {
    // 処理を既述
  });

  // モーダル開く直後の処理
  $canvas.on('modal.after_open', function () {
    // 処理を既述
  });

  // モーダル閉じる直前の処理
  $canvas.on('modal.before_close', function () {
    // 処理を既述
  });

  // モーダル閉じた直後の処理
  $canvas.on('modal.after_close', function () {
    // 処理を既述
  });
});
</script>
```

モーダルを開くボタンとモーダル設置。
```html
<!-- モーダルを開くボタン ここから -->
<button class="modal_demo_btn" data-modal-open="modal_dog">
  モーダルを開く
</button>
<!-- モーダルを開くボタン ここまで -->

<!-- モーダル ここから -->
<div
  id="modal_dog"
  class="area_modal page_layout layout1"
  aria-hidden="true"
>
  <div class="layout_inner">
    <div class="layout_container">
      <div class="layout_width">
        <div
          id="modal_block_dog1"
          class="modal_block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal_ttl_dog1"
          aria-describedby="modal_desc_dog1"
        >
          <div data-modal-focus-trap-first tabindex="0"></div>

          <div class="modal_content">
            <h2 id="modal_ttl_dog1" class="block_ttl">Snow</h2>
            <p id="modal_desc_dog1" class="block_txt">
              This image name is dog1.jpg. And name is Snow.<br />Lorem
              ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <button
            type="button"
            class="block_close_btn"
            data-modal-close
          >
            <span class="btn_ttl">メニューを閉じる</span>
            <span class="btn_line_top"></span>
            <span class="btn_line_bottom"></span>
          </button>

          <div data-modal-focus-trap-last tabindex="0"></div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- モーダル ここまで -->
```
- `data-modal-open="modal_dog"`と`id="modal_dog"`の値は共通にする。値は任意。
- `aria-labelledby="modal_ttl_dog1"`と`aria-describedby="modal_desc_dog1"`の値は、モーダルコンテンツ内の` id="modal_ttl_dog1"`、`id="modal_desc_dog1"`値と共通にする。値は任意。
- scssは`/lib/common/css/pc/_modal.scss`、`/lib/common/css/sp/_modal.scss`を参照。


## 動作テスト手順
- [ ]  開閉機能
    - [ ]  モーダル開く機能確認
        - [ ]  開くボタン押下
    - [ ]  モーダル閉じる機能
        - [ ]  閉じるボタン押下
        - [ ]  モーダル下層の透過背景要素押下
        - [ ]  Escキー押下
- [ ]  フォーカス機能
    - [ ]  Tab押下
        - [ ]  不活性コンテンツにフォーカスされないか
        - [ ]  フォーカス
    - [ ]  モーダルを開いた時にフォーカス可能な最初の要素にフォーカスされるか
    - [ ]  モーダルを閉じた時にモーダル開くボタンにフォーカスを戻るか
- [ ]  アクセシビリティの属性
    - [ ]  モーダルの要素に`role="dialog”`と`aria-modal="true"`
    を付与
    - [ ]  ダイログに表示されたタイトルがある時は、それを参照する`aria-labelledby`を使用する。表示されたタイトルがない時は、`aria-label`を使用する。
    - [ ]  ダイアログの主な目的やメッセージを説明する要素がある時は、`aria-describeby`で参照
- [ ]  その他
    - [ ]  モーダルを開いた時にコンテンツがずれる
