"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLordGymEntranceByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LordGymEntrance_1 = require("../Config/LordGymEntrance");
const DB = "db_lordgym.db";
const FILE = "l.领主道馆.xlsx";
const TABLE = "LordGymEntrance";
const COMMAND = "select BinData from `LordGymEntrance` where MarkId=?";
const KEY_PREFIX = "LordGymEntranceByMarkId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configLordGymEntranceByMarkId.GetConfig(";
exports.configLordGymEntranceByMarkId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var r = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (i) return i;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "MarkId",
            o,
          ]) > 0)
      ) {
        var e;
        var r = void 0;
        if (
          (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", o],
          )),
          e)
        ) {
          const i = LordGymEntrance_1.LordGymEntrance.getRootAsLordGymEntrance(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=LordGymEntranceByMarkId.js.map
