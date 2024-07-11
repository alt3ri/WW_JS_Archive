"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFormationPropertyAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FormationProperty_1 = require("../Config/FormationProperty");
const DB = "db_formationproperty.db";
const FILE = "d.队伍属性表.xlsx";
const TABLE = "FormationProperty";
const COMMAND = "select BinData from `FormationProperty`";
const KEY_PREFIX = "FormationPropertyAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configFormationPropertyAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let r;
    if (
      (r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return i;
      }
      const i = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let e = void 0;
        if (
          (([r, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !r)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e = FormationProperty_1.FormationProperty.getRootAsFormationProperty(
          new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
        );
        i.push(e);
      }
      return (
        o &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        i
      );
    }
  },
};
// # sourceMappingURL=FormationPropertyAll.js.map
