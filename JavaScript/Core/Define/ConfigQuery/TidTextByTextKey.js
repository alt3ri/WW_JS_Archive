"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTidTextByTextKey = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TidText_1 = require("../Config/TidText"),
  DB = "db_tid_text.db",
  FILE = "k.可视化编辑/w.文本.csv",
  TABLE = "TidText",
  COMMAND = "select BinData from `TidText` where TextKey=?",
  KEY_PREFIX = "TidTextByTextKey",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configTidTextByTextKey.GetConfig(";
exports.configTidTextByTextKey = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var i = KEY_PREFIX + `#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) return t;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "TextKey",
              e,
            ]))
      ) {
        var n,
          i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["TextKey", e],
          )),
          n)
        ) {
          const t = TidText_1.TidText.getRootAsTidText(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            o &&
              ((n = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=TidTextByTextKey.js.map
