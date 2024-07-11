"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLoadingTipsTextByLevelAreaId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LoadingTipsText_1 = require("../Config/LoadingTipsText");
const DB = "db_loadingtips.db";
const FILE = "z.载入提示.xlsx";
const TABLE = "LoadingTipsText";
const COMMAND = "select BinData from `LoadingTipsText` where LevelAreaId=?";
const KEY_PREFIX = "LoadingTipsTextByLevelAreaId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX =
  "configLoadingTipsTextByLevelAreaId.GetConfigList(";
exports.configLoadingTipsTextByLevelAreaId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, e = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) return a;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "LevelAreaId",
              o,
            ]) !== 1
          )
            break;
          let r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["LevelAreaId", o],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = LoadingTipsText_1.LoadingTipsText.getRootAsLoadingTipsText(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          a.push(r);
        }
        return (
          e &&
            ((n = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=LoadingTipsTextByLevelAreaId.js.map
