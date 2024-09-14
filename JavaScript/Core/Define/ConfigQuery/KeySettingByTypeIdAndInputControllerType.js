"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configKeySettingByTypeIdAndInputControllerType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  KeySetting_1 = require("../Config/KeySetting"),
  DB = "db_menu.db",
  FILE = "s.设置系统.xlsx",
  TABLE = "KeySetting",
  COMMAND =
    "select BinData from `KeySetting` where TypeId=? AND InputControllerType=?",
  KEY_PREFIX = "KeySettingByTypeIdAndInputControllerType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configKeySettingByTypeIdAndInputControllerType.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configKeySettingByTypeIdAndInputControllerType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configKeySettingByTypeIdAndInputControllerType.GetConfigList(";
exports.configKeySettingByTypeIdAndInputControllerType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n, o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${n}#${o})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var C = KEY_PREFIX + `#${n}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (r)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["TypeId", n],
              ["InputControllerType", o],
            )
          )
            break;
          var g = void 0;
          if (
            (([i, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["TypeId", n],
              ["InputControllerType", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = KeySetting_1.KeySetting.getRootAsKeySetting(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          r.push(g);
        }
        return (
          t &&
            ((C = KEY_PREFIX + `#${n}#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(C, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=KeySettingByTypeIdAndInputControllerType.js.map
