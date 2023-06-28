# vue, ts, sass, php, db学習環境導入
1. cd docker
1. docker compose up
    - クライアント、PHPサーバ、DBサーバ、PHPMYADMINサーバが立ち上がる
1. docker compose exec httpdvue bash
1. cd assets
1. npm i
1. npm run build でts,sassのトランスパイル
    - （../httpd/html/assets配下に出力される。htmlがドキュメントルートなので、assets/js/xxx.js,assets/css/xxxcssで読み込める。）
    - npm run buildw でts,sassの変更を検知して自動でトランスパイルする。

また、リポジトリのルートディレクトリをvscodeで開くことでdevcontainerで開くこともできる。（各コンテナを起動し、httpdvueコンテナにアタッチした状態になる）
