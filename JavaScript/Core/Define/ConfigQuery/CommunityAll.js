"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCommunityAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Community_1 = require("../Config/Community");
const DB = "db_platformchannel.db";
const FILE = "p.平台渠道.xlsx";
const TABLE = "Community";
const COMMAND = "select BinData from `Community` where PackageType!=?";
const KEY_PREFIX = "CommunityAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configCommunityAll.GetConfigList(";
exports.configCommunityAll = {
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
        const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (m) return m;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const m = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PackageType",
              o,
            ]) !== 1
          )
            break;
          let t = void 0;
          if (
            (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PackageType", o],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t = Community_1.Community.getRootAsCommunity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          m.push(t);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, m, m.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          m
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=CommunityAll.js.map
