"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSignalDecodeWaveformById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SignalDecodeWaveform_1 = require("../Config/SignalDecodeWaveform"),
  DB = "db_signaldecodewaveform.db",
  FILE = "k.可视化编辑/c.Csv/x.信号破译谱面配置/*.csv*",
  TABLE = "SignalDecodeWaveform",
  COMMAND = "select BinData from `SignalDecodeWaveform` where Id=?",
  KEY_PREFIX = "SignalDecodeWaveformById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configSignalDecodeWaveformById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configSignalDecodeWaveformById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configSignalDecodeWaveformById.GetConfig(";
exports.configSignalDecodeWaveformById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      i =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
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
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          i)
        ) {
          const a =
            SignalDecodeWaveform_1.SignalDecodeWaveform.getRootAsSignalDecodeWaveform(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
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
//# sourceMappingURL=SignalDecodeWaveformById.js.map
