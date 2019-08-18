<template>
  <div class="container">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">考えるノート</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav mr-auto"/>
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">使い方</a>
            <a class="nav-item nav-link active" href="#">ログアウト</a>
          </div>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-3">
        <p class="h4 border-bottom p-2 mb-2">
          観察一覧
          <button type="button" class="btn btn-outline-secondary btn-sm float-right">＋</button>
        </p>
        <ul>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            コップや指の影が伸びる？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            水にうかぶ一円玉
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            ペンのキャップを回すと？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            逆から考える
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            電車の『ガタン、ゴトン』
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            紙の輪をひねって切ると？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            アリは線をいやがる？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            1円玉と10円玉を、つまんで落とすと？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            お風呂の水が青く見えるのは？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            水槽のしま模様
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            カメの甲羅
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            はかりの上のヘリコプター
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            アクリル棒の端が明るい？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            柿の種
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            走る新幹線を写真に撮ると？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            反射した光が縦や横に？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            ごま塩のごまと塩が混ざるのは？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            ぜんまいで走るおもちゃの車
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            水面を走る水玉？
          </a></p></li>
          <li><p class="text-truncate"><a href="#" class="text-dark">
            メジャーの先が、がたついている？
          </a></p></li>
        </ul>
      </div>
      <div class="col-9">
        <h4 class="border-bottom p-2">ノート</h4>
        <div class="card w-75 mb-2">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">観察</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </p>
            <a href="#" class="card-link text-muted">仮説へ</a>
            <a href="#" class="card-link text-muted">変更</a>
            <a href="#" class="card-link text-muted">削除</a>
          </div>
        </div>
        <div class="card w-75 mb-2 offset-md-1">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">仮説</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </p>
            <a href="#" class="card-link text-muted">実験へ</a>
            <a href="#" class="card-link text-muted">変更</a>
            <a href="#" class="card-link text-muted">削除</a>
          </div>
        </div>
        <div class="card w-75 mb-2 offset-md-2">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">実験</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </p>
            <a href="#" class="card-link text-muted">考察へ</a>
            <a href="#" class="card-link text-muted">変更</a>
            <a href="#" class="card-link text-muted">削除</a>
          </div>
        </div>
        <div class="card w-75 offset-md-3">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">考察</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </p>
            <a href="#" class="card-link text-muted">変更</a>
            <a href="#" class="card-link text-muted">削除</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
