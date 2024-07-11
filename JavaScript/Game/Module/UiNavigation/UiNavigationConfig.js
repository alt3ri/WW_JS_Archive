"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const HotKeyIconByKeyName_1 = require("../../../Core/Define/ConfigQuery/HotKeyIconByKeyName");
const HotKeyMapById_1 = require("../../../Core/Define/ConfigQuery/HotKeyMapById");
const HotKeyTextByTextId_1 = require("../../../Core/Define/ConfigQuery/HotKeyTextByTextId");
const HotKeyTypeById_1 = require("../../../Core/Define/ConfigQuery/HotKeyTypeById");
const HotKeyViewById_1 = require("../../../Core/Define/ConfigQuery/HotKeyViewById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class UiNavigationConfig extends ConfigBase_1.ConfigBase {
  GetHighlightWhenMouseMoveOut() {
    const e = CommonParamById_1.configCommonParamById.GetBoolConfig(
      "highlight_when_mouse_moveout",
    );
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          '鼠标移出button表现参数找不到, 请检测c.参数字段"highlight_when_mouse_moveout"',
        ),
      e
    );
  }
  GetMobileHighlight() {
    const e =
      CommonParamById_1.configCommonParamById.GetBoolConfig("mobile_highlight");
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          '移动端是否显示按钮高亮参数找不到, 请检测c.参数字段"mobile_highlight"',
        ),
      e
    );
  }
  GetPcPress() {
    const e = CommonParamById_1.configCommonParamById.GetBoolConfig("pc_press");
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          'PC端是否显示按钮按下参数找不到, 请检测c.参数字段"pc_press"',
        ),
      e
    );
  }
  GetNavigateTolerance() {
    const e =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "navigate_tolerance",
      );
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          '导航组同向误差找不到, 请检测c.参数字段"navigate_tolerance"',
        ),
      e
    );
  }
  GetHotKeyViewConfig(e) {
    const o = HotKeyViewById_1.configHotKeyViewById.GetConfig(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "热键界面配置找不到", ["id", e])),
      o
    );
  }
  GetHotKeyMapConfig(e) {
    let o;
    if (e !== -1)
      return (
        (o = HotKeyMapById_1.configHotKeyMapById.GetConfig(e)) ||
          e === -1 ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiNavigation", 11, "热键映射配置找不到", [
              "id",
              e,
            ])),
        o
      );
  }
  GetHotKeyTypeConfig(e) {
    return HotKeyTypeById_1.configHotKeyTypeById.GetConfig(e);
  }
  GetHotKeyIconConfig(e, o = 0) {
    const i = HotKeyIconByKeyName_1.configHotKeyIconByKeyName.GetConfig(e);
    return (
      i ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("UiNavigation", 11, "快捷键图标配置找不到", [
            "keyName",
            e,
          ])),
      i
    );
  }
  GetHotKeyText(e) {
    const o = HotKeyTextByTextId_1.configHotKeyTextByTextId.GetConfig(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "快捷键文本配置找不到", [
            "TextId",
            e,
          ])),
      o?.Name
    );
  }
  GetHotKeyIcon(e, o = !1) {
    return this.GetHotKeyIconConfig(e, o)?.Icon;
  }
}
exports.UiNavigationConfig = UiNavigationConfig;
// # sourceMappingURL=UiNavigationConfig.js.map
