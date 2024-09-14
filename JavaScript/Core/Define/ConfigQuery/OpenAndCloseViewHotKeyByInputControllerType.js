"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configOpenAndCloseViewHotKeyByInputControllerType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  OpenAndCloseViewHotKey_1 = require("../Config/OpenAndCloseViewHotKey"),
  DB = "db_input_settings.db",
  FILE = "s.输入配置.xlsx",
  TABLE = "OpenAndCloseViewHotKey",
  COMMAND =
    "select BinData from `OpenAndCloseViewHotKey` where InputControllerType=?",
  KEY_PREFIX = "OpenAndCloseViewHotKeyByInputControllerType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configOpenAndCloseViewHotKeyByInputControllerType.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configOpenAndCloseViewHotKeyByInputControllerType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configOpenAndCloseViewHotKeyByInputControllerType.GetConfigList(";
exports.configOpenAndCloseViewHotKeyByInputControllerType = {
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
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "InputControllerType",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([t, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["InputControllerType", o],
            )),
            !t)
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
          r.push(C);
        }
        return (
          n &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
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
//# sourceMappingURL=OpenAndCloseViewHotKeyByInputControllerType.js.map
