"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLanguageDefineByLanguageCode = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LanguageDefine_1 = require("../Config/LanguageDefine");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "LanguageDefine";
const COMMAND = "select BinData from `LanguageDefine` where LanguageCode=?";
const KEY_PREFIX = "LanguageDefineByLanguageCode";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configLanguageDefineByLanguageCode.GetConfig(";
exports.configLanguageDefineByLanguageCode = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, n = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var o = KEY_PREFIX + `#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (a) return a;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "LanguageCode",
            e,
          ]) > 0)
      ) {
        var i;
        var o = void 0;
        if (
          (([i, o] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["LanguageCode", e],
          )),
          i)
        ) {
          const a = LanguageDefine_1.LanguageDefine.getRootAsLanguageDefine(
            new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
          );
          return (
            n &&
              ((i = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=LanguageDefineByLanguageCode.js.map
