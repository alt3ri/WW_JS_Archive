"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSubtitleTextByRowNameAndDatatableName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SubtitleText_1 = require("../Config/SubtitleText"),
  DB = "db_subtitle_text.db",
  FILE = "k.可视化编辑/j.剧情/字幕*",
  TABLE = "SubtitleText",
  COMMAND =
    "select BinData from `SubtitleText` where RowName = ? AND DatatableName = ?",
  KEY_PREFIX = "SubtitleTextByRowNameAndDatatableName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configSubtitleTextByRowNameAndDatatableName.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configSubtitleTextByRowNameAndDatatableName.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configSubtitleTextByRowNameAndDatatableName.GetConfig(";
exports.configSubtitleTextByRowNameAndDatatableName = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (t, e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${t}#${e})`),
      a =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (o) {
        var i = KEY_PREFIX + `#${t}#${e})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (m)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["RowName", t],
              ["DatatableName", e],
            ))
      ) {
        i = void 0;
        if (
          (([a, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["RowName", t],
            ["DatatableName", e],
          )),
          a)
        ) {
          const m = SubtitleText_1.SubtitleText.getRootAsSubtitleText(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            o &&
              ((a = KEY_PREFIX + `#${t}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, m)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
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
//# sourceMappingURL=SubtitleTextByRowNameAndDatatableName.js.map
