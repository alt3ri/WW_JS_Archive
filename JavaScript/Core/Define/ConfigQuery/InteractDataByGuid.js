"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configInteractDataByGuid = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InteractData_1 = require("../Config/InteractData");
const DB = "db_interactdata.db";
const FILE = "UniverseEditor/InteractOption/InteractOption.csv";
const TABLE = "InteractData";
const COMMAND = "select BinData from `InteractData` where Guid=?";
const KEY_PREFIX = "InteractDataByGuid";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configInteractDataByGuid.GetConfig(";
exports.configInteractDataByGuid = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (n, o = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var t = KEY_PREFIX + `#${n})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i) return i;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Guid",
            n,
          ]) > 0)
      ) {
        var e;
        var t = void 0;
        if (
          (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Guid", n],
          )),
          e)
        ) {
          const i = InteractData_1.InteractData.getRootAsInteractData(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            o &&
              ((e = KEY_PREFIX + `#${n})`),
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
// # sourceMappingURL=InteractDataByGuid.js.map
