"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSharePlatformAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SharePlatform_1 = require("../Config/SharePlatform");
const DB = "db_platformchannel.db";
const FILE = "p.平台渠道.xlsx";
const TABLE = "SharePlatform";
const COMMAND = "select BinData from `SharePlatform` where PackageType!=?";
const KEY_PREFIX = "SharePlatformAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configSharePlatformAll.GetConfigList(";
exports.configSharePlatformAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, e = !0) => {
    let n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var r = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (i) return i;
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const i = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PackageType",
              o,
            ]) !== 1
          )
            break;
          let a = void 0;
          if (
            (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PackageType", o],
            )),
            !n)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a = SharePlatform_1.SharePlatform.getRootAsSharePlatform(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          i.push(a);
        }
        return (
          e &&
            ((r = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, i, i.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=SharePlatformAll.js.map
