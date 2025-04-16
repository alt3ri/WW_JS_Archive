"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCharacterDisplayStyleById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CharacterDisplayStyle_1 = require("../Config/CharacterDisplayStyle"),
  DB = "db_characterdisplaystyle.db",
  FILE = "k.可视化编辑/c.Csv/j.角色展示样式/*.csv*",
  TABLE = "CharacterDisplayStyle",
  COMMAND = "select BinData from `CharacterDisplayStyle` where Id=?",
  KEY_PREFIX = "CharacterDisplayStyleById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCharacterDisplayStyleById.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCharacterDisplayStyleById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configCharacterDisplayStyleById.GetConfig(";
exports.configCharacterDisplayStyleById = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${t})`),
      i =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var n = KEY_PREFIX + `#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a)
          return (
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              t,
            ]))
      ) {
        n = void 0;
        if (
          (([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", t],
          )),
          i)
        ) {
          const a =
            CharacterDisplayStyle_1.CharacterDisplayStyle.getRootAsCharacterDisplayStyle(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            o &&
              ((i = KEY_PREFIX + `#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=CharacterDisplayStyleById.js.map
