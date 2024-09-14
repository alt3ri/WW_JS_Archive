"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configOpenAndCloseViewHotKeyByActionName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  OpenAndCloseViewHotKey_1 = require("../Config/OpenAndCloseViewHotKey"),
  DB = "db_input_settings.db",
  FILE = "s.输入配置.xlsx",
  TABLE = "OpenAndCloseViewHotKey",
  COMMAND = "select BinData from `OpenAndCloseViewHotKey` where ActionName=?",
  KEY_PREFIX = "OpenAndCloseViewHotKeyByActionName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configOpenAndCloseViewHotKeyByActionName.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configOpenAndCloseViewHotKeyByActionName.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configOpenAndCloseViewHotKeyByActionName.GetConfigList(";
exports.configOpenAndCloseViewHotKeyByActionName = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActionName",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([i, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActionName", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C =
            OpenAndCloseViewHotKey_1.OpenAndCloseViewHotKey.getRootAsOpenAndCloseViewHotKey(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          a.push(C);
        }
        return (
          n &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=OpenAndCloseViewHotKeyByActionName.js.map
