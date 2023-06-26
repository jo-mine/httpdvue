FROM httpd:2.4
 
WORKDIR /usr/local/apache2
 
# node.jsなどをインストール
RUN apt-get update \
 && apt-get -y install --no-install-recommends \
    nodejs \
    npm \
    curl \
 # キャッシュ削除
 && apt-get clean
 
# node.jsを最新にする
RUN npm install -g n \
 && n stable \
 && apt purge -y \
    nodejs \
    npm