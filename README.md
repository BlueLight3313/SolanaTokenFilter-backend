# Backend Stack For Bakergun - NodeJS, ExpressJS and Data JSON Dummy

![Flow-Diagram-NodeJS-ExpressJS-EJS-WithoutDB](Flow_Diagram_NodeJS_ExpressJS_EJS_WithoutDB_sm.png)

Backend stack ini dibuat dengan [NodeJS](https://nodejs.org), [ExpressJS 🚀](https://expressjs.com) dan JSON Dummy (Tidak ada intergrasi ke Database Platform atau noDB).

Pelayanan (**_serving_**) apa yang ada di dalam project ini? file berextensi .json untuk keperluan **ReSTAPI**(**Re**presentational **S**tate **T**ransfer **A**pplication **P**rogramming **I**nterface) ke [Front-End](https://github.com/sanengineer/bakergun-frontend-html-css-js).

## Feature

### View Engine Ready To Use

Penggunaan view engine dengan ejs ataupun hbs, sebenarnya kurang begitu penting. Namun di project ini sudah saya siapkan routing untuk merender tiap halaman, dari mulai halaman index sampai sub nya.

misal :

- localhost:8008 (index)

- localhost:8008/page1 (sub)

- localhost:8008/page2 (sub)

Stepnya, membuat folder baru (misal: Views) di directory root project ini, lalu pakai module export-import dan uncomment codingan yang ada di file server.js .

### Data JSON Dummy

#### gameboard-urlimage.json

isinya object yang hanya memiliki value url image saja.

#### gameboard-id-name-urlimage.json

isinya object yang memiliki nama key id, key name, dan key imageUrl. Value dari masing-masing key tersebut misal untuk key **name**, value nya bisa di pakai untuk menembak ke attribute **alt** di element img di html.

untuk data json ini tidak diaktifkan, namun siap dipakai. Tinggal mengganti import module dari **_gameboard-urliamge.json_** ke **_gameboard-id-name-urlimage.json_**, lalu aktifan codingan method **READ** by params Id.

#### images.json

Isinya object untuk assets images yang ada di semua halaman.

#### players.json

Isinya json untuk list daftar nama para pemain, komentar tentang experience gamenya, avatar tiap tiap pemain, dan jobs description tiap tiap pemain.

#### blog.json

Isinya object untuk halaman blog page, mulai dari feature image post, title, description, nama authornya, avatar-author dan tanggal postingnya.

### CRUD Method

Di project ini method CRUD sudah **ready to use**, tapi karena suatu hal hanya method READ yang bisa dilakukan.

### Endpoint ReSTAPI

#### Players List

- All Player

        localhost:8008/api/v1/players

- Player By Id

  example: Player Id 2

        localhost:8008/api/v1/players/2

#### Images Url Asset on Game Page

- Asset Images Url Only

        localhost:8008/api/v1/gameboard

#### Blog Page

- All Blog Post

        localhost:8008/api/v1/blog

- Blog Post by Id

  example: Posy Id 2

        localhost:8008/api/v1/blog/2

## Get Started

        $ git clone https://github.com/sanengineer/bakergun-backend.git

        $ cd bakergun-backend

        $ npm install

        $ npm start

## Development Guide

### Use Node Version 10.0.0 (Recomended)

### Run Server Dev Mode:

        $ cd bakergun-backend

        $ npm run dev
