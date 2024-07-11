"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPersonalTipsByFunctionId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PersonalTips_1 = require("../Config/PersonalTips");
const DB = "db_personal.db";
const FILE = "g.个性化弹窗.xlsx";
const TABLE = "PersonalTips";
const COMMAND = "select BinData from `PersonalTips` where FunctionId=?";
const KEY_PREFIX = "PersonalTipsByFunctionId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configPersonalTipsByFunctionId.GetConfigList(";
exports.configPersonalTipsByFunctionId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) return t;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const t = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "FunctionId",
              o,
            ]) !== 1
          )
            break;
          let r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["FunctionId", o],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = PersonalTips_1.PersonalTips.getRootAsPersonalTips(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          t.push(r);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, t, t.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PersonalTipsByFunctionId.js.map
