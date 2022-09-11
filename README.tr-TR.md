[![en-EN](https://img.shields.io/badge/EN-%C4%B0ngilizce-blue)](README.md)
[![tr-TR](https://img.shields.io/badge/*TR-T%C3%BCrk%C3%A7e-red?style=plastic)](README.tr-TR.md)

![nodejs](https://img.shields.io/badge/nodejs-43853d?logo=nodedotjs&labelColor=fff)
![npm](https://img.shields.io/badge/npm-bc2c32?logo=npm&labelColor=fff)
![javascript](https://img.shields.io/badge/javascript-e9d961?logo=javascript&labelColor=000)
![mocha](https://img.shields.io/badge/mocha-8d6849?logo=mocha&labelColor=fff)
[![License](https://img.shields.io/badge/License-Apache--2.0-red)](LICENSE)
[![vulnerabilities](https://snyk.io/test/github/buglss/cronti/badge.svg)](https://snyk.io/test/github/buglss/cronjo/)

[![NPM](https://nodei.co/npm/cronjo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cronjo/)

# Giriş

Zamanlanmış işler oluşturmanızı sağlar. Diğer paketlerden farklı olarak [cronti](https://www.npmjs.com/package/cronti) paketinin gücünü kullanır. Yani zamanlanmış işler oluşturmak için crontime ifadelerine hakim olmanız gerekmez.

Benzer işi yapan diğer paketlerden farklı olarak crontime ifadelerine hakimiyet gerektirmez. Bu konuda diğer paketlerin de tarih girişi desteği var. Fakat bu tarihi de sizin hesaplayıp girmeniz gerekir. [cronjo](https://www.npmjs.com/package/cronjo) paketinde böyle bir hesaplama yapmanıza da gerek yok. Çünkü [cronti](https://www.npmjs.com/package/cronti) paketinin gücünü kullanır.

[cronti](https://www.npmjs.com/package/cronti) paketinin gücüyle günlük hayatta kullanılan zamanlama/planlama ifadelerini kullanarak zamanlanmış işler oluşturabilirsiniz.

# Kurulum

npm ile:

```bash
npm i cronjo # Yerel Kurulum. Özel bir projede kullanmak için.
npm i -g cronjo # Global Install. Genel projelerde kullanmak için.
```

Not: Eğer npm versiyonunuz 5.0.0'dan küçükse `--save` argumanı ekleyin.

# Hızlı Başlangıç

```js
// Paketi Dahil Et
const cronjo = require("cronjo")

// Zamanlanmış İş Oluştur
let schedule = cronjo((scheduleId) => { console.log("OK", scheduleId) }, "19 * * * *")

// Kullanılabilir Özellikler
console.log(schedule.id)
console.log(schedule.expression)
console.log(schedule.job)
console.log(schedule.firstDayOfWeek)
console.log(schedule.name)
console.log(schedule.fireDate)
console.log(schedule.nextDates)
console.log(schedule.cancel)

// Kurulu İşler
console.log(cronjo())

// Yardımcı Fonksiyonlar
console.log(cronjo("HELPERS"))
console.log(cronjo({method: "HELPERS" /* VEYA method: -1*/}))
```

[cronti](https://www.npmjs.com/package/cronti) paketinin getirdiği özellikler ile:

```js
// Paketi Dahil Et
const cronjo = require("cronjo")

// İki Tarih Arasında Düzenli Aralıklarla Çalışacak Zamanlanmış İş Oluştur
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onIntervalTime" // VEYA -> method: 1
}, "2022-04-25T09:30:00.000Z", "2022-05-15T09:30:00.000Z")

// Geçerli Crontime İfadesi ile Zamanlanmış İş Oluştur
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onCrontime" // VEYA -> method: 3
}, "0 2 * * *")

// Belirli Bir Tarih için Zamanlanmış İş Oluştur
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onDate" // VEYA -> method: 4
}, "2022-05-26T09:30:00.000Z")

// Ay, Hafta, Haftanın Günü, Saat ve Tick Parametrelerinin Çeşitli Kombinasyonlarıyla Zamanlanmış İş Oluştur 
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onTime" // VEYA -> method: 2
}, "0FD", "4M", "2W", "3WD")

// Tarihindeki Hafta için Zamanlanmış İş Oluştur 
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onWeek" // VEYA -> method: 0
}, "2022-05-26T09:30:00.000Z")

// Kullanılabilir Özellikler
console.log(schedule.id)
console.log(schedule.expression)
console.log(schedule.job)
console.log(schedule.firstDayOfWeek)
console.log(schedule.name)
console.log(schedule.fireDate)
console.log(schedule.nextDates)
console.log(schedule.cancel)

// Kurulu İşler
console.log(cronjo())

// Yardımcı Fonksiyonlar
console.log(cronjo("HELPERS"))
console.log(cronjo({method: "HELPERS" /* VEYA method: -1*/}))
```

# Dokümantasyon

``cronjo`` fonksiyonu, ilk parametrede job fonksiyonu, options veya "HELPERS" değerini alabilir veya hiç değer almaz.
Eğer job fonksiyonu ile kullanılırsa ikinci parametreye crontime ifadesi yazılmalıdır.
Eğer options değerleri ile kullanılırsa sonraki parametreler [cronti](https://www.npmjs.com/package/cronti) paketindeki isterlere uygun şekilde doldurulur.
Eğer "HELPERS" ile kullanılırsa sonrasında parametre girişine ihtiyaç yoktur.
Eğer hiç parametre değeri gönderilmezse oluşturulmuş tüm zamanlanmış işleri döner.

cronjo(<job(function)|options(object)|"HELPERS"(string)>, <crontime(string)|...args>)

## job

Zamanlanmış iş oluştururken crontime ifadesi kullanılmak istendiğinde kullanılabilir. İlk parametreye job fonksiyonu girilir.
İkinci parametreye geçerli bir crontime ifadesi girilir.

Job fonksiyonuna zamanlanmış işin id'si parametre olarak gönderilir.

#### Girdi

|        Parametre        |  Tip       | Zorunluluk |                                                 Açıklama                                       |
| :---------------------: | :--------: | :--------: | :--------------------------------------------------------------------------------------------: |
|      job                |  Function  |   evet     |                                  Zamanlanmış işin fonksiyonu                                   |
|      expression         |  String    |   evet     |                                      Zamanlanmış işin kurulacağı crontime ifadesi              |

#### Çıktı (object)

| Parametre      |  Tip     |     Açıklama                                                        |
| :------------: | :------: | :-----------------------------------------------------------------: |
| id             | Number   | Zamanlanmış işin id'si                                              |
| expression     | String   | Zamanlanmış işin crontime ifadesi                                   |
| job            | Function | Zamanlanmış işin fonksiyonu                                         |
| firstDayOfWeek | Number   | Zamanlanmış işin kurulmasında kullanılan haftanın başlangıç günü    |
| name           | String   | Zamanlanmış işin adı                                                |
| fireDate       | Function | Zamanlanmış işin tetikleneceği zamanı dönen fonksiyon               |
| nextDates      | Function | Zamanlanmış işin tetikleneceği zamanların listesini dönen fonksiyon |
| cancel         | Function | Zamanlanmış işin iptal eden fonksiyon                               |

#### Örnek

```js
const cronjo = require("cronjo")
cronjo((scheduleId) => { console.log("OK", scheduleId) }, "0 12 * * *")
```

## options

4 adet özellik sunulmaktadır. Bunlar method, job, name ve firstDayOfWeek isimleriyle anılır.

|    Özellik     |                                             Açıklama                                                |
| :------------: | :-------------------------------------------------------------------------------------------------: |
|     method     |                        Zamanlanmış işi oluştururken kullanılacak ``cronti`` metodu                  |
|     job        |           Zamanlanmış işin fonksiyonu                                                               |
|     name       | Zamanlanmış işin adı                                                                                |
| firstDayOfWeek |                    Zamanlanmış işin kurulmasında kullanılan haftanın başlangıç günü                 |

## options.method

[cronti](https://www.npmjs.com/package/cronti) paketinin getirdiği özellikleri ele alınmıştır. Tek farklı özelliği "HELPERS" metodunda vardır.
Bu metod ``cronjo`` paketindeki yardımcı fonksiyonları döner.

|    Metod       | Indeks |      Ad        |                                             Açıklama                                                |
| :------------: | :---:  | :------------: | :-------------------------------------------------------------------------------------------------: |
|     onWeek     |   0    |     onWeek     |                        Tarihin bulunduğu hafta için zamanlanmış iş oluşturur                        |
| onIntervalTime |   1    | onIntervalTime |           İki tarih arasında düzenli aralıklarla çalışacak bir zamanlanmış iş oluşturur             |
|     onTime     |   2    |     onTime     | Ay, hafta, haftanın günü, saat, dakika ve tick gibi çeşitli kombinasyonlarla zamanlanmış iş oluşturur   |
|   onCrontime   |   3    |   onCrontime   |                    Geçerli crontime ifadesine göre zamanlanmış iş oluşturur                         |
|     onDate     |   4    |     onDate     |                           Belirli bir tarih için zamanlanmış iş oluşturur                           |
|     HELPERS    |   -1   |     HELPERS    |                           cronjo paketindeki yardımcı fonksiyonlarını döner                         |

## options.method.onWeek

Girilen tarihin haftasında, her gün tetiklenecek olan zamanlanmış iş oluşturmak için kullanılır.
tick değerine göre girilen tarihten önce tetiklenecek olan zamanlanmış işi oluşturur.

Parametre olarak geçerli bir tarih değeri gönderilmelidir. Tik değeri için herhangi bir sayısal değer kullanılabilir.

#### Girdi

|        Parametre        |  Tip   | Zorunluluk |                                                 Açıklama                                                 |
| :---------------------: | :----: | :--------: | :------------------------------------------------------------------------------------------------------: |
|      args.\<date\>      |  Date  |    evet    |                                  Crontime ifadesi için haftanın tarihi                                   |
|      args.\<tick\>      | Number |   hayır    |                                      Tarihten çıkarılacak gün sayıs                                      |
| args.\<firstDayOfWeek\> | String |   hayır    | Haftanın ilk günü. 0 ile 6 arasında değerler alır. <sayı>FD değerini alır. Varsayılan değer pazartesidir |

#### Çıktı (object)

| Parametre      |  Tip     |     Açıklama                                                        |
| :------------: | :------: | :-----------------------------------------------------------------: |
| id             | Number   | Zamanlanmış işin id'si                                              |
| expression     | String   | Zamanlanmış işin crontime ifadesi                                   |
| job            | Function | Zamanlanmış işin fonksiyonu                                         |
| firstDayOfWeek | Number   | Zamanlanmış işin kurulmasında kullanılan haftanın başlangıç günü    |
| name           | String   | Zamanlanmış işin adı                                                |
| fireDate       | Function | Zamanlanmış işin tetikleneceği zamanı dönen fonksiyon               |
| nextDates      | Function | Zamanlanmış işin tetikleneceği zamanların listesini dönen fonksiyon |
| cancel         | Function | Zamanlanmış işin iptal eden fonksiyon                               |

#### Örnek

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onWeek" // VEYA -> method: 0
}, "2022-05-26T09:30:00.000Z")
```

## options.method.onIntervalTime

Başlangıç ve bitiş tarihine göre zamanlanmış iş oluşturmak için kullanılır.
Step parametresine göre iki tarih arasında hangi aralıklarda çalışacağı belirtilir.
Step parametresi gün, saat veya dakika olarak kullanılır.

Parametrelerde 2 tarih değeri olmalıdır. Bu tarihlerin sırası önemli değildir.
Daha küçük olan startDate, daha büyük olan endDate olarak kullanılacaktır.
Step parametresi için paterne uygun bir string değeri kullanabilirsiniz.

#### Girdi

|     Parametre      |           Tip           | Zorunluluk |                  Açıklama                   |
| :----------------: | :---------------------: | :--------: | :-----------------------------------------: |
| args.\<startDate\> |          Date           |    evet    |            Cron başlangıç tarihi            |
|  args.\<endDate\>  |          Date           |    evet    |              Cron bitiş tarihi              |
|   args.\<step\>    | String <.d \| .h \| .m> |   hayır    | Hangi adımlarda çalıştırılacağını belirtir. |

#### Çıktı (object)

| Parametre      |  Tip     |     Açıklama                                                        |
| :------------: | :------: | :-----------------------------------------------------------------: |
| id             | Number   | Zamanlanmış işin id'si                                              |
| expression     | String   | Zamanlanmış işin crontime ifadesi                                   |
| job            | Function | Zamanlanmış işin fonksiyonu                                         |
| firstDayOfWeek | Number   | Zamanlanmış işin kurulmasında kullanılan haftanın başlangıç günü    |
| name           | String   | Zamanlanmış işin adı                                                |
| fireDate       | Function | Zamanlanmış işin tetikleneceği zamanı dönen fonksiyon               |
| nextDates      | Function | Zamanlanmış işin tetikleneceği zamanların listesini dönen fonksiyon |
| cancel         | Function | Zamanlanmış işin iptal eden fonksiyon                               |

#### Örnek

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onIntervalTime" // VEYA -> method: 1
}, "2022-04-25T09:30:00.000Z", "2022-05-15T09:30:00.000Z")
```

## options.method.onTime

Ay, hafta, haftanın günü, saat, dakika ve tick gibi çeşitli kombinasyonlarla zamanlanmış iş oluşturmak için kullanılır.
Yalnızca time zorunlu bir değerdir.
Tüm crontime ifadeleri bu zaman parametresine göre ayarlanır.
tick değerine göre zamanlanmış iş girilen tarihten önce tetiklenecek şekilde oluşturulur.

- Sadece month(0..11) ve week(0,1,2,-1) parametresi doldurulursa, haftanın ilk gününden o haftanın son gününe kadar her gün tetiklenecek olan zamanlanmış iş oluşturulur.
- Yalnızca month(0..11), week(0,1,2,-1) ve weekDays(0..6) parametreleri doldurulursa, haftanın o günü için zamanlanmış iş oluşturulur.
- Yalnızca week(0,1,2,-1) parametresi doldurulursa, o hafta boyunca her gün tetiklenecek zamanlanmış iş oluşturulur. Ayın son haftası için hariç(-1).
- Yalnızca month(0..11) parametresi doldurulursa, o aydaki her gün için zamanlanmış iş oluşturulur.
- Yalnızca weekDays(0..6) parametresi doldurulursa, her ay bu haftanın günü için (pzt,sl,çrş,prş,cm,cmt,pz) zamanlanmış iş oluşturulur.
- Yalnızca month(0..11) ve weekDays(0..6) parametreleri doldurulursa, bu ayın bu haftasının günü için zamanlanmış iş oluşturulur.
- Hiçbir parametre doldurulmazsa, her ayın her günü için zamanlanmış iş oluşturulur.

Geçerli bir ay, hafta veya hafta içi parametre değeri gönderilebilir.
Paterne göre zaman parametresi gönderilebilir.
Tick değeri için herhangi bir sayısal değer kullanılabilir.

#### Girdi

|        Parameter        |       Tip       | Zorunluluk |                                                 Açıklama                                                 |
| :---------------------: | :-------------: | :--------: | :------------------------------------------------------------------------------------------------------: |
|     args.\<month\>      |  String <..M>   |   hayır    |            Crontime ifadesi için ay. 0 ile 11 arasında değerler alır. <sayı>M değerini alır.             |
|      args.\<week\>      |  String <..W>   |   hayır    |           Crontime ifadesi için hafta. 0, 1, 2 ve -1 değerlerini alır. <sayı>W değerini alır.            |
|    args.\<weekDays\>    |  String <..WD>  |   hayır    |     Crontime ifadesi için hafta içi günler. 0 ile 6 arasında değerler alır. <sayı>WD değerini alır.      |
|      args.\<time\>      | String <dd\:mm> |   hayır    |                                    Crontime ifadesi için zaman(gg:dd)                                    |
|      args.\<tick\>      |     Number      |   hayır    |               Tarihten çıkarılacak gün sayısı. Ay ve hafta parametreleri olmak zorundadır                |
| args.\<firstDayOfWeek\> |     String      |   hayır    | Haftanın ilk günü. 0 ile 6 arasında değerler alır. <sayı>FD değerini alır. Varsayılan değer pazartesidir |

#### Çıktı (object)

| Parametre      |  Tip     |     Açıklama                                                        |
| :------------: | :------: | :-----------------------------------------------------------------: |
| id             | Number   | Zamanlanmış işin id'si                                              |
| expression     | String   | Zamanlanmış işin crontime ifadesi                                   |
| job            | Function | Zamanlanmış işin fonksiyonu                                         |
| firstDayOfWeek | Number   | Zamanlanmış işin kurulmasında kullanılan haftanın başlangıç günü    |
| name           | String   | Zamanlanmış işin adı                                                |
| fireDate       | Function | Zamanlanmış işin tetikleneceği zamanı dönen fonksiyon               |
| nextDates      | Function | Zamanlanmış işin tetikleneceği zamanların listesini dönen fonksiyon |
| cancel         | Function | Zamanlanmış işin iptal eden fonksiyon                               |

#### Örnek

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onTime" // VEYA -> method: 2
}, "0FD", "4M", "2W", "3WD")
```

## options.method.onCrontime

Geçerli crontime ifadesine göre zamanlanmış iş olururken kullanılır.

#### Girdi

|     Parametre     |  Tip   | Zorunluluk |     Açıklama     |
| :---------------: | :----: | :--------: | :--------------: |
| args.\<crontime\> | String |    evet    | Crontime ifadesi |

#### Çıktı (object)

| Parametre      |  Tip     |     Açıklama                                                        |
| :------------: | :------: | :-----------------------------------------------------------------: |
| id             | Number   | Zamanlanmış işin id'si                                              |
| expression     | String   | Zamanlanmış işin crontime ifadesi                                   |
| job            | Function | Zamanlanmış işin fonksiyonu                                         |
| firstDayOfWeek | Number   | Zamanlanmış işin kurulmasında kullanılan haftanın başlangıç günü    |
| name           | String   | Zamanlanmış işin adı                                                |
| fireDate       | Function | Zamanlanmış işin tetikleneceği zamanı dönen fonksiyon               |
| nextDates      | Function | Zamanlanmış işin tetikleneceği zamanların listesini dönen fonksiyon |
| cancel         | Function | Zamanlanmış işin iptal eden fonksiyon                               |

#### Örnek

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onCrontime" // VEYA -> method: 3
}, "0 2 * * *")
```

## options.method.onDate

Girilen tarih değerine göre zamanlanmış iş oluştururken kullanılır.
Her ay veya sadece tarihin ayı ve her yıl tekrarlanacak şekilde oluşturulur.
Tick değerine göre girilen tarihten önce tetiklenecek şekilde oluşturulur.

Parametre olarak geçerli bir tarih değeri gönderilmelidir.

#### Girdi

|       Parametre        |   Tip   | Zorunluluk |                                  Açıklama                                   |
| :--------------------: | :-----: | :--------: | :-------------------------------------------------------------------------: |
|     args.\<date\>      |  Date   |    evet    |                   Crontime ifadesi için kullanılan tarih                    |
|     args.\<tick\>      | Number  |   hayır    | Tarihten çıkarılacak gün sayısı. Ay ve hafta parametreleri olmak zorundadır |
| args.\<isMonthOfDate\> | Boolean |   hayır    |                        Yalnızca tarihin ayında yürüt                        |

#### Çıktı (object)

| Parametre      |  Tip     |     Açıklama                                                        |
| :------------: | :------: | :-----------------------------------------------------------------: |
| id             | Number   | Zamanlanmış işin id'si                                              |
| expression     | String   | Zamanlanmış işin crontime ifadesi                                   |
| job            | Function | Zamanlanmış işin fonksiyonu                                         |
| firstDayOfWeek | Number   | Zamanlanmış işin kurulmasında kullanılan haftanın başlangıç günü    |
| name           | String   | Zamanlanmış işin adı                                                |
| fireDate       | Function | Zamanlanmış işin tetikleneceği zamanı dönen fonksiyon               |
| nextDates      | Function | Zamanlanmış işin tetikleneceği zamanların listesini dönen fonksiyon |
| cancel         | Function | Zamanlanmış işin iptal eden fonksiyon                               |

#### Örnek

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onDate" // VEYA -> method: 4
}, "2022-05-26T09:30:00.000Z")
```

## options.job

Zamanlanmış iş tetiklendiğinde çağrılacak fonksiyon. Bu fonksiyona parametre olarak zamanlanmış işin id'si gönderilir.

## options.name

Zamanlanmış işin ismidir.

## options.firstDayOfWeek

Zamanlanmış işin oluşturulmasında kullanılan bir konfigürasyon değeridir.
Haftanın başladığı günü ayarlamak için kullanılır.
Varsayılan olarak pazar günü başlangıç kabul edilir.

# Geri Bildirim

Lütfen paket ile ilgili geri bildirimlerinizi yapın.
Herhangi bir hata(bug) ile karşılaştığınızda lütfen [issues](https://github.com/buglss/cronjo/issues) oluşturun.
En kısa sürede geri bildirimlerinize cevap vereceğim.

# Yazarlar

Bakımını Yapanlar:

- Levent Sencer Şahin : [LinkedIn:@buglss](https://www.linkedin.com/in/buglss/) | [Blog:@buglss](https://buglss.github.io/) | [Facebook:@cebuglssio](https://www.facebook.com/cebuglssio) | [Twitter:@cebuglss](https://twitter.com/buglssio) | [Instagram:@cebuglss](https://www.instagram.com/buglssio)

# Telif Hakkı ve Lisans

Telif hakkı Levent Sencer Şahin ve diğer katkıda bulunanlar, [Apache-2.0](LICENSE) kapsamında.
