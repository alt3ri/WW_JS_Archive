"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponLevelByLevelId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  WeaponLevel_1 = require("../Config/WeaponLevel"),
  DB = "db_weapon.db",
  FILE = "w.武器基础配置.xlsx",
  TABLE = "WeaponLevel",
  COMMAND = "select BinData from `WeaponLevel` where LevelId = ?",
  KEY_PREFIX = "WeaponLevelByLevelId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configWeaponLevelByLevelId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configWeaponLevelByLevelId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configWeaponLevelByLevelId.GetConfigList(";
exports.configWeaponLevelByLevelId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var t = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "LevelId",
              o,
            ])
          )
            break;
          var a = void 0;
          if (
            (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["LevelId", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = WeaponLevel_1.WeaponLevel.getRootAsWeaponLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          C.push(a);
        }
        return (
          e &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=WeaponLevelByLevelId.js.map
