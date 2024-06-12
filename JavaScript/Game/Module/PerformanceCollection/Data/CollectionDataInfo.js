
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CollectionDataInfo=void 0;const Log_1=require("../../../../Core/Common/Log");class CollectionDataInfo{constructor(){this.p3i=void 0,this.v3i=void 0,this.M3i=void 0,this.S3i=void 0}get MaxValue(){return void 0===this.p3i&&Log_1.Log.CheckInfo()&&Log_1.Log.Info("Performance",10,"尚未有数据，无法获取MaxValue"),this.p3i}get LastValue(){return void 0===this.S3i&&Log_1.Log.CheckInfo()&&Log_1.Log.Info("Performance",10,"尚未有数据，无法获取LastValue"),this.S3i}get Count(){return void 0===this.M3i&&Log_1.Log.CheckInfo()&&Log_1.Log.Info("Performance",10,"尚未有数据，无法获取Count"),this.M3i}AddValue(o){void 0===o?Log_1.Log.CheckInfo()&&Log_1.Log.Info("Performance",10,"AddValue 的值不能为undefined ！"):(void 0===this.M3i?(this.M3i=1,this.v3i=o,this.p3i=o):(this.M3i+=1,this.v3i+=o,this.p3i=this.p3i>o?this.p3i:o),this.S3i=o)}GetAvg(o=void 0){return void 0===this.M3i?(Log_1.Log.CheckInfo()&&Log_1.Log.Info("Performance",10,"尚未有数据，无法获取平均值"),o||void 0):this.v3i/this.M3i}Clear(){this.p3i=void 0,this.v3i=void 0,this.M3i=void 0,this.S3i=void 0}}exports.CollectionDataInfo=CollectionDataInfo;
//# sourceMappingURL=CollectionDataInfo.js.map