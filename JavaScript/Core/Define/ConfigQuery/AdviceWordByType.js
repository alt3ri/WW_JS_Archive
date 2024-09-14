"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAdviceWordByType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AdviceWord_1 = require("../Config/AdviceWord"),
  DB = "db_advice.db",
  FILE = "s.溯言.xlsx",
  TABLE = "AdviceWord",
  COMMAND = "select BinData from `AdviceWord` where Type=?",
  KEY_PREFIX = "AdviceWordByType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAdviceWordByType.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configAdviceWordByType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configAdviceWordByType.GetConfigList(";
exports.configAdviceWordByType = {
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
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "Type",
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
              ["Type", o],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = AdviceWord_1.AdviceWord.getRootAsAdviceWord(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          r.push(C);
        }
        return (
          i &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AdviceWordByType.js.map
