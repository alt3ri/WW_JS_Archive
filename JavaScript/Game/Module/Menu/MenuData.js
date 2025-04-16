"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuData = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class MenuData {
  constructor(e) {
    (this.rSl = e), (this.aHa = !1), (this.h0c = new Map());
  }
  get ConfigId() {
    return this.rSl.Id;
  }
  get SubType() {
    return this.rSl.SubType;
  }
  get SubName() {
    return this.rSl.SubName;
  }
  get FunctionName() {
    return this.rSl.Name;
  }
  get FunctionSort() {
    return this.rSl.FunctionSort;
  }
  get SubSort() {
    return this.rSl.SubSort;
  }
  get FunctionId() {
    return this.rSl.FunctionId;
  }
  get SetType() {
    return this.rSl.SetType;
  }
  get SliderRange() {
    return this.rSl.SliderRange;
  }
  get SliderRangeDisplay() {
    return 0 < this.rSl.SliderRangeDisplay?.length
      ? this.rSl.SliderRangeDisplay
      : this.rSl.SliderRange;
  }
  get SliderDefault() {
    return this.rSl.SliderDefault;
  }
  get SliderDigits() {
    return this.rSl.Digits;
  }
  get OptionsDefault() {
    return this.rSl.OptionsDefault;
  }
  get OptionsNameListInternal() {
    return this.rSl.OptionsName;
  }
  get OptionsValueListInternal() {
    return this.rSl.OptionsValue;
  }
  get SubImage() {
    return this.rSl.SubImage;
  }
  get FunctionImage() {
    return this.rSl.FunctionImage;
  }
  get ButtonTextId() {
    return this.rSl.ButtonText;
  }
  get ButtonViewName() {
    return this.rSl.OpenView;
  }
  get RelationFuncIds() {
    return this.rSl.RelationFunction;
  }
  get AffectedValue() {
    return this.rSl.AffectedValue;
  }
  get AffectedFunction() {
    return this.rSl.AffectedFunction;
  }
  get DisableValue() {
    return this.rSl.DisableValue;
  }
  get DisableFunction() {
    return this.rSl.DisableFunction;
  }
  get ValueTipsMap() {
    return this.rSl.ValueTipsMap;
  }
  get ClickedTipsMap() {
    return this.rSl.ClickedTipsMap;
  }
  get ClickedTips() {
    return this.rSl.ClickedTips;
  }
  get hHa() {
    return this.rSl.DetailText;
  }
  GetEnable() {
    if (this.FunctionId === GameSettingsDefine_1.EFunction.MobileGamepadMode)
      return (
        1 ===
        GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.MobileGamepadMode,
        )
      );
    for (var [e, t] of this.h0c) {
      e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
      if (void 0 !== e && t.includes(e)) return !1;
    }
    return !0;
  }
  CacheDisableState(e, t) {
    this.h0c.set(e, t);
  }
  ResetDisableStateCache() {
    this.h0c.clear();
  }
  CanAffectedFunction(e) {
    return !!this.AffectedValue.includes(e) && 0 < this.AffectedFunction.size;
  }
  HasDisableFunction() {
    return 0 < this.DisableFunction.length;
  }
  get OptionsNameList() {
    return this.OptionsNameListInternal;
  }
  get OptionsValueList() {
    return this.OptionsValueListInternal;
  }
  HasDetailText() {
    var e = this.hHa;
    return !!e && !StringUtils_1.StringUtils.IsBlank(e);
  }
  GetDetailTextId() {
    return this.hHa;
  }
  SetDetailTextVisible(e) {
    this.aHa = e;
  }
  GetIsDetailTextVisible() {
    return this.aHa;
  }
  IsRecommendIndex(e) {
    var t;
    return (
      this.FunctionId === GameSettingsDefine_1.EFunction.IMAGEQUALITY &&
      !ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom &&
      void 0 !==
        (t =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv()) &&
      this.OptionsValueList.indexOf(t) === e
    );
  }
}
exports.MenuData = MenuData;
//# sourceMappingURL=MenuData.js.map
