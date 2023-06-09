# todo-app


- Uygulama backend ve frontend olmak üzere iki farklı dosya içerisindedir.
- Repodan çekilen uygulamaları ayağa kaldırmak için öncesinde ilgili paketlerin indirilmesi işlemi yapılması gerekmektedir.
- Backend'i çalıştırmak için terminal üzerinde `api` klasörü içerisinde öncelikle  `npm install` veya  `npm i` yazılarak gereken paketlerin indirilmesi yapılabilir. İndirme işlemi sonrasında  `npm start` yazarak projeyi çalıştırabilirsiniz.
- Frontend'i çalıştırmak için terminal üzerinde `client` klasörü içerisinde öncelikle `npm install` veya  `npm i` veya `yarn` yazılarak gereken paketlerin indirilmesi yapılabilir. İndirme işlemi sonrasında `npm start` veya `yarn start` yazarak projeyi çalıştırabilirsiniz.
- Backend `http://localhost:4000/` portunda çalışmaktadır.
- Frontend `http://localhost:3000/` portunda çalışmaktadır.
- Kullanıcı `http://localhost:3000/` deki ekran üzerinden uygulamaya giriş işlemi veya uygulamaya kayıt işlemi yapabilir. 
- Kayıt olmadan giriş yapmaya çalışan kullanıcı için login ekranında uyarı yazısı çıkmaktadır. 
- Uygulamaya önceden  kayıt olan ve daha sonraki zamanarda giriş yapmak isteyen kullanıcı bilgileri database kayıtları üzerinden kontrol edilir. Kayıtlı bilgiler olması halinde kullanıcı giriş işlemlerini tamamlayabilir veya kullanıcı uygulamaya kayıt işlemi yapabilir. 
- Kayıt işlemi yapan kullanıcı otomatik olarak login olmuş varsayılarak proje ana sayfası içerisine dahil edilir.Burada gerekli form alanları doldurulduktan sonra uygulamaya todo ekleyebilir. 
- Eklenen todo'lar Form yapısının alt tarafında sergilenir. 
- Her bir tododa birer adet checkbox, edit butonu ve delete butonu bulunmaktadır. 
- İlgili todonun checkbox'ına tıklanılması halinde todo tamamlanmış kabul edilir ve ilgili todonun üzeri çizilir. 
- İlgili todonun edit butonuna tıklanılması halinde üst taraftaki input alanına todonun içeriği getirilir. 
- İnput alanından düzenleme işlemi yapıldıktan sonra Edit Todo butonu ile todo güncellenebilir.
- İlgili tonun delete butonuna tıklanılması halinde ise todo silme işlemi gerçekleştirilir.
- Proje içerisinde `search` input alanı üzerinden listelenen todolar içerisinde arama işlemi yapılabilir. Girilen kelimeye göre dinamik olarak listelenen todolar güncellenmektedir.
- Proje içerisinde `search` inputu yanında olan (yukarı aşağı ok) butonuna tıklanılması halinde listelenen todolar öncelikle "a-z" şeklinde, tekrar tıklanması halinde ise "z-a" şeklinde dinamik olarak sıralanacaktır.
- Proje içerisinde `logout` butonuna tıklanması halinde geçerli oturum kapatma işlemi gerçekleştirilebilir.
- NOT: Todolar üzerinden yapılan create, update, put ve delete işlemleri direkt olarak database kayıt edilmektedir.
- NOT: Kullanıcı login, logout, register işlemleri direkt olarak database kayıt edilmektedir.
- NOT: Backend işlemlerinde database olarak `mongo.db`, kullanıcı login register işlemlerinde `json-web-token` kullanılmıştır. Login veya register işlemi yapan kullanıcı için geri dönen token bilgisi `cookie-parser` paketi ile cookie üzerinde kayıt edilmektedir. Kullanıcı logout işlemi yaptığında ise cookie'e kayıtlı token bilgisi de silinmektedir. Kullanıcı login veya register işlemi yaptığında girilmesi istenen şifre bilgileri `bcrypt` paketi ile database hashlenerek kayıt edilmektedir. Dosya yükleme işlemleri için `express-fileupload` paketi kullanılmıştır. 
