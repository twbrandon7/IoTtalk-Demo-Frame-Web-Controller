# IoTtalk-Demo-Frame-Web-Controller
這個專案的主要目的是重建位於台北天龍的展架的網頁控制介面。<br/>
程式碼參考自 [IoTtalk SwitchSetJS](https://farm.iottalk.tw) (取用程式IoTtalk v1 JavaScript SDK)<br/>
另外，這是一份備忘錄，如果之後需要重建類似的展架，可以直接取用。

## 使用到的套件
- [Boostrap v4](https://getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/)
- [jQuery v3.1.0](https://jquery.com/)
- [Moment.js](https://momentjs.com/)

## IoTtalk設定
創建下列Device Feature:

名稱                    | df  | 型態
------------------------|-----|-----
chartTemperatures       | odf | float
chartAtmosphericPressur | odf | float
chartAltitude           | odf | float
chartHumidity           | odf | float
chartLightSensor        | odf | int
chartMoisture           | odf | float
sprinkling              | idf | int
lamp                    | idf | int
drip                    | idf | int

創建Device Model :
- 名稱 : `Tano_Demo_Control`
- Input Device Features (idf) : 見上表，共3個
- Output Device Features (odf) : 見上表，共6個

## 設定網頁連線與上傳網頁
再將網頁上傳至網頁伺服器前，需要更改 `./js/iottalk/demo_frame.js` 這個檔案。<br/>
請將<br/>
`var ENDPOINT = 'http://xxx.xxx.xxx.xxx:xxxx';`<br/>
更改為IoTtalk伺服器的IP (含port)。<br/>
接著將<br/>
`var device_id = '';`<br/>
的內容改為方便辨識的名稱。(請注意 : 這個名稱不能與其他裝置相同!)

設定完之後就可以將整個以下資料夾與網站上傳至網頁伺服器了。
- boostrap/
- css/
- images/
- js/
- index.html