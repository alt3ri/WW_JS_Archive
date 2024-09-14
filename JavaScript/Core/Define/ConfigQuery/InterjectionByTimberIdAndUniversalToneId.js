"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configInterjectionByTimberIdAndUniversalToneId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Interjection_1 = require("../Config/Interjection"),
  DB = "db_audio_interjection.db",
  FILE = "k.可视化编辑/c.Csv/y.音频/y.音色语音事件映射/*.csv*",
  TABLE = "Interjection",
  COMMAND =
    "select BinData from `Interjection` where TimberId = ? AND UniversalToneId = ?",
  KEY_PREFIX = "InterjectionByTimberIdAndUniversalToneId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configInterjectionByTimberIdAndUniversalToneId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configInterjectionByTimberIdAndUniversalToneId.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configInterjectionByTimberIdAndUniversalToneId.GetConfig(";
exports.configInterjectionByTimberIdAndUniversalToneId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n}#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (e) {
        var r = KEY_PREFIX + `#${n}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (C)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["TimberId", n],
              ["UniversalToneId", o],
            ))
      ) {
        r = void 0;
        if (
          (([t, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["TimberId", n],
            ["UniversalToneId", o],
          )),
          t)
        ) {
          const C = Interjection_1.Interjection.getRootAsInterjection(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          return (
            e &&
              ((t = KEY_PREFIX + `#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=InterjectionByTimberIdAndUniversalToneId.js.map
