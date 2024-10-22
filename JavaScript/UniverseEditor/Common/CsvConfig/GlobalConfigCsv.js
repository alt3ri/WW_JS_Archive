"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GlobalConfigCsv = exports.GlobalConfigCsvLoader = void 0);
const Log_1 = require("../Misc/Log"),
  CsvLoader_1 = require("./CsvLoader"),
  globalConfigCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 18,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "变量名",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Desc",
      CnName: "说明",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Type",
      CnName: "变量类型",
      Condition: "notEmpty",
      RenderType: 3,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Value",
      CnName: "值",
      RenderType: 11,
    }),
  ];
class GlobalConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("GlobalConfigCsv", globalConfigCsvFields);
  }
}
exports.GlobalConfigCsvLoader = GlobalConfigCsvLoader;
const globalValueConfig = {
  TalkJumpWaitTime: { Id: 1, Default: 0, Type: "Float" },
  TalkCharPerMin: { Id: 2, Default: 0, Type: "Int" },
  TalkShowInterval: { Id: 3, Default: 0, Type: "Float" },
  TalkAutoJumpTime: { Id: 4, Default: 0, Type: "Float" },
};
class GlobalConfigCsv extends CsvLoader_1.GlobalCsv {
  constructor() {
    super(...arguments), (this.$ = new Map());
  }
  Bind(e) {
    super.Bind(e);
    const t = e.Rows;
    e = globalValueConfig;
    Object.entries(e).forEach(([e, o]) => {
      var a = t.find((e) => e.Id === o.Id);
      a
        ? a.Type !== o.Type
          ? (0, Log_1.error)(
              `global config type [${e}] csv type [${a.Type}] != [${o.Type}]`,
            )
          : this.$.set(e, a)
        : (0, Log_1.error)("No global config for " + e);
    });
  }
  GetConfig(e) {
    e = this.$.get(e);
    return (0, CsvLoader_1.parseCsvValue)(e.Value, e.Type);
  }
}
exports.GlobalConfigCsv = GlobalConfigCsv;
//# sourceMappingURL=GlobalConfigCsv.js.map
