"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleAnimAudioByRoleId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleAnimAudio_1 = require("../Config/RoleAnimAudio"),
  DB = "db_role.db",
  FILE = "j.角色.xlsx",
  TABLE = "RoleAnimAudio",
  COMMAND = "select BinData from `RoleAnimAudio` where RoleId=?",
  KEY_PREFIX = "RoleAnimAudioByRoleId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRoleAnimAudioByRoleId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configRoleAnimAudioByRoleId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configRoleAnimAudioByRoleId.GetConfigList(";
exports.configRoleAnimAudioByRoleId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var t = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const f = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "RoleId",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([e, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = RoleAnimAudio_1.RoleAnimAudio.getRootAsRoleAnimAudio(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          f.push(C);
        }
        return (
          i &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, f, f.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          f
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RoleAnimAudioByRoleId.js.map
