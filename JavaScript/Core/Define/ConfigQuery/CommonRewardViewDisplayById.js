"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCommonRewardViewDisplayById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CommonRewardViewDisplay_1 = require("../Config/CommonRewardViewDisplay"),
  DB = "db_rewardui.db",
  FILE = "j.奖励界面表现.xlsx",
  TABLE = "CommonRewardViewDisplay",
  COMMAND = "select BinData from `CommonRewardViewDisplay` where Id=?",
  KEY_PREFIX = "CommonRewardViewDisplayById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configCommonRewardViewDisplayById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configCommonRewardViewDisplayById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configCommonRewardViewDisplayById.GetConfig(";
exports.configCommonRewardViewDisplayById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var t = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          e)
        ) {
          const a =
            CommonRewardViewDisplay_1.CommonRewardViewDisplay.getRootAsCommonRewardViewDisplay(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            i &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=CommonRewardViewDisplayById.js.map
