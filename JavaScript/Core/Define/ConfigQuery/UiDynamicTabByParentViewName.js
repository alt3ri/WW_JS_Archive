"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUiDynamicTabByParentViewName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiDynamicTab_1 = require("../Config/UiDynamicTab");
const DB = "db_ui.db";
const FILE = "u.UI动态页签.csv";
const TABLE = "UiDynamicTab";
const COMMAND = "select BinData from `UiDynamicTab` where ParentViewName = ?";
const KEY_PREFIX = "UiDynamicTabByParentViewName";
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
  "configUiDynamicTabByParentViewName.GetConfigList(";
exports.configUiDynamicTabByParentViewName = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (i, n = !0) => {
    let o;
    if (
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) return r;
      }
      if (
        (o = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ParentViewName",
              i,
            ]) !== 1
          )
            break;
          let a = void 0;
          if (
            (([o, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ParentViewName", i],
            )),
            !o)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a = UiDynamicTab_1.UiDynamicTab.getRootAsUiDynamicTab(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          r.push(a);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=UiDynamicTabByParentViewName.js.map
