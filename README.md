# MyAngularTest
自己測試練習Angular框架用的.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

因為測試時有使用 proxy 代理 故啟動時 請使用 ng serve --proxy-config proxy.conf.json

## 注意事項

 1.股票資訊來源 https://mis.twse.com.tw & https://www.twse.com.tw (proxy.conf.json)
 2.圖表使用angular-highchart
 3.自選報價群組資料來源(取得/修改) test_nodeServer
 4.因為有實作soical-login(目前僅google),故請去修改 environment.ts 的 googleLoginClientId變數為你自己的
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
