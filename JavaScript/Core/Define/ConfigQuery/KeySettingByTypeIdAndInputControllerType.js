"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configKeySettingByTypeIdAndInputControllerType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KeySetting_1 = require("../Config/KeySetting");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "KeySetting";
const COMMAND =
  "select BinData from `KeySetting` where TypeId=? AND InputControllerType=?";
const KEY_PREFIX = "KeySettingByTypeIdAndInputControllerType";
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
  "configKeySettingByTypeIdAndInputControllerType.GetConfigList(";
exports.configKeySettingByTypeIdAndInputControllerType = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, e, n = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var t = KEY_PREFIX + `#${o}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) return C;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["TypeId", o],
              ["InputControllerType", e],
            ) !== 1
          )
            break;
          let r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["TypeId", o],
              ["InputControllerType", e],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = KeySetting_1.KeySetting.getRootAsKeySetting(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          C.push(r);
        }
        return (
          n &&
            ((t = KEY_PREFIX + `#${o}#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=KeySettingByTypeIdAndInputControllerType.js.map
