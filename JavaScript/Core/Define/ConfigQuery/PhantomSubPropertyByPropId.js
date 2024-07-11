"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhantomSubPropertyByPropId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomSubProperty_1 = require("../Config/PhantomSubProperty");
const DB = "db_phantom.db";
const FILE = "h.幻象.xlsx";
const TABLE = "PhantomSubProperty";
const COMMAND = "select BinData from `PhantomSubProperty` where PropId=?";
const KEY_PREFIX = "PhantomSubPropertyByPropId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX =
  "configPhantomSubPropertyByPropId.GetConfigList(";
exports.configPhantomSubPropertyByPropId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n = !0) => {
    let r;
    if (
      (r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) return t;
      }
      if (
        (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const t = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PropId",
              o,
            ]) !== 1
          )
            break;
          let i = void 0;
          if (
            (([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PropId", o],
            )),
            !r)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i =
            PhantomSubProperty_1.PhantomSubProperty.getRootAsPhantomSubProperty(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          t.push(i);
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
// # sourceMappingURL=PhantomSubPropertyByPropId.js.map
