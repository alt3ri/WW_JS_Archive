
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SetEntityVisibleWhiteListCsv=exports.SetEntityVisibleWhiteListCsvLoader=void 0;const CsvLoader_1=require("./CsvLoader"),setEntityVisibleWhiteListCsvFields=[(0,CsvLoader_1.createCsvField)({Name:"EntityUid",CnName:"实体",Type:"String",Filter:"1",Condition:"notEmpty && unique",CreateType:"scheme",RenderType:7}),(0,CsvLoader_1.createCsvField)({Name:"CreatorId",CnName:"添加人",Type:"Int",Condition:"notEmpty",CreateType:"scheme",RenderType:42}),(0,CsvLoader_1.createCsvField)({Name:"CreateTime",CnName:"添加时间",Type:"Int",Condition:"notEmpty",CreateType:"scheme",RenderType:52}),(0,CsvLoader_1.createCsvField)({Name:"Desc",Type:"String",CnName:"描述",Default:""})];class SetEntityVisibleWhiteListCsvLoader extends CsvLoader_1.CsvLoader{constructor(){super("SetEntityVisibleWhiteListCsv",setEntityVisibleWhiteListCsvFields)}}exports.SetEntityVisibleWhiteListCsvLoader=SetEntityVisibleWhiteListCsvLoader;class SetEntityVisibleWhiteListCsv extends CsvLoader_1.GlobalCsv{}exports.SetEntityVisibleWhiteListCsv=SetEntityVisibleWhiteListCsv;
//# sourceMappingURL=SetEntityVisibleWhiteListCsv.js.map