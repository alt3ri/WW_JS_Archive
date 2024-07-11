"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFlowTemplateDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FlowTemplateData_1 = require("../Config/FlowTemplateData");
const DB = "db_flowtemplatedata.db";
const FILE = "UniverseEditor/CameraTemplate/FlowTemplateCamera.csv";
const TABLE = "FlowTemplateData";
const COMMAND = "select BinData from `FlowTemplateData` where Id=?";
const KEY_PREFIX = "FlowTemplateDataById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configFlowTemplateDataById.GetConfig(";
exports.configFlowTemplateDataById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var a = KEY_PREFIX + `#${o})`;
        const n = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (n) return n;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            o,
          ]) > 0)
      ) {
        var t;
        var a = void 0;
        if (
          (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          t)
        ) {
          const n =
            FlowTemplateData_1.FlowTemplateData.getRootAsFlowTemplateData(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            e &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, n)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=FlowTemplateDataById.js.map
