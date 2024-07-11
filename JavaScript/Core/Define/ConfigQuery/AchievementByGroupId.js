"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAchievementByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Achievement_1 = require("../Config/Achievement"),
  DB = "db_achievement.db",
  FILE = "c.成就.xlsx",
  TABLE = "Achievement",
  COMMAND = "select BinData from `Achievement` where GroupId=?",
  KEY_PREFIX = "AchievementByGroupId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigListStat = void 0,
  CONFIG_LIST_STAT_PREFIX = "configAchievementByGroupId.GetConfigList(";
exports.configAchievementByGroupId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e, o = !0) => {
    var n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var i = KEY_PREFIX + `#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) return t;
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
      ) {
        const t = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "GroupId",
              e,
            ])
          )
            break;
          var r = void 0;
          if (
            (([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GroupId", e],
            )),
            !n)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = Achievement_1.Achievement.getRootAsAchievement(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          t.push(r);
        }
        return (
          o &&
            ((i = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=AchievementByGroupId.js.map
