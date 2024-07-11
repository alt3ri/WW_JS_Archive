"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBlueprintConfigAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BlueprintConfig_1 = require("../Config/BlueprintConfig"),
  DB = "db_blueprint.db",
  FILE = "UniverseEditor/Entity/Blueprint.csv",
  TABLE = "BlueprintConfig",
  COMMAND = "select BinData from `BlueprintConfig`",
  KEY_PREFIX = "BlueprintConfigAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigListStat = void 0;
exports.configBlueprintConfigAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (n = !0) => {
    var o;
    if (
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) return r;
      }
      const r = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var e = void 0;
        if (
          (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e = BlueprintConfig_1.BlueprintConfig.getRootAsBlueprintConfig(
          new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
        );
        r.push(e);
      }
      return (
        n &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        r
      );
    }
  },
};
//# sourceMappingURL=BlueprintConfigAll.js.map
