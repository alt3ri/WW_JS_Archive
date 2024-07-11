"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPayByPayIdAndRegion = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Pay_1 = require("../Config/Pay");
const DB = "db_paycurrency.db";
const FILE = "c.充值.xlsx";
const TABLE = "Pay";
const COMMAND = "select BinData from `Pay` where PayId=? AND Region=?";
const KEY_PREFIX = "PayByPayIdAndRegion";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configPayByPayIdAndRegion.GetConfigList(";
exports.configPayByPayIdAndRegion = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n, i = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var a = KEY_PREFIX + `#${o}#${n})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (d) return d;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, n, ...logPair))
      ) {
        const d = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["PayId", o],
              ["Region", n],
            ) !== 1
          )
            break;
          let r = void 0;
          if (
            (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PayId", o],
              ["Region", n],
            )),
            !e)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = Pay_1.Pay.getRootAsPay(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          d.push(r);
        }
        return (
          i &&
            ((a = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, d, d.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          d
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PayByPayIdAndRegion.js.map
