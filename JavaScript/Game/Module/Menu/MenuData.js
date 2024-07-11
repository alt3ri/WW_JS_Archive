"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuData = void 0);
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
class MenuData {
  constructor(t) {
    (this.iwi = 0),
      (this.owi = void 0),
      (this.he = void 0),
      (this.rwi = 0),
      (this.nwi = 0),
      (this.swi = 0),
      (this.awi = 0),
      (this.hwi = 0),
      (this.lwi = []),
      (this._wi = 0),
      (this.uwi = 0),
      (this.cwi = 0),
      (this.mwi = []),
      (this.dwi = []),
      (this.Cwi = void 0),
      (this.gwi = void 0),
      (this.uEe = void 0),
      (this.fwi = void 0),
      (this.pwi = void 0),
      (this.vwi = []),
      (this.YO = 0),
      (this.AffectedValueSet = new Set()),
      (this.AffectedFunction = new Map()),
      (this.DisableValueSet = new Set()),
      (this.DisableFunction = []),
      (this.IsEnable = !0),
      (this.ValueTipsMap = new Map()),
      (this.ClickedTipsMap = new Map()),
      (this.ClickedTips = void 0),
      (this.iwi = t.SubType),
      (this.owi = t.SubName),
      (this.he = t.Name),
      (this.rwi = t.Platform),
      (this.nwi = t.FunctionSort),
      (this.swi = t.SubSort),
      (this.awi = t.FunctionId),
      (this.hwi = t.SetType),
      (this.lwi = t.SliderRange),
      (this._wi = t.SliderDefault),
      (this.uwi = t.Digits),
      (this.cwi = t.OptionsDefault),
      (this.mwi = t.OptionsName),
      (this.dwi = t.OptionsValue),
      (this.Cwi = t.SubImage),
      (this.gwi = t.FunctionImage),
      (this.uEe = t.KeyMap),
      (this.fwi = t.ButtonText),
      (this.pwi = t.OpenView),
      (this.YO = t.ConditionGroup),
      (this.AffectedFunction = t.AffectedFunction),
      (this.DisableFunction = t.DisableFunction),
      (this.ValueTipsMap = t.ValueTipsMap),
      (this.ClickedTipsMap = t.ClickedTipsMap),
      (this.ClickedTips = t.ClickedTips);
    for (const e of t.AffectedValue) this.AffectedValueSet.add(e);
    for (const i of t.DisableValue) this.DisableValueSet.add(i);
    6 === this.MenuDataFunctionId
      ? (this.vwi = MenuData.Mwi)
      : (this.vwi = t.RelationFunction),
      11 !== this.MenuDataFunctionId ||
        "MenuConfig_6_OptionsName_4" !== this.mwi[this.mwi.length - 1] ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsFrameRate120Device() ||
        (this.mwi.pop(), this.dwi.pop());
  }
  get MenuDataRelationFuncIds() {
    return this.vwi;
  }
  get MenuDataSubType() {
    return this.iwi;
  }
  get MenuDataSubName() {
    return this.owi;
  }
  get MenuDataFunctionName() {
    return this.he;
  }
  get MenuDataPlatform() {
    return this.rwi;
  }
  get MenuDataFunctionSort() {
    return this.nwi;
  }
  get MenuDataSubSort() {
    return this.swi;
  }
  get MenuDataFunctionId() {
    return this.awi;
  }
  get MenuDataSetType() {
    return this.hwi;
  }
  get MenuDataSliderRange() {
    return this.lwi;
  }
  get MenuDataSliderDefault() {
    return this._wi;
  }
  get MenuDataSliderDigits() {
    return this.uwi;
  }
  get MenuDataOptionsDefault() {
    return this.cwi;
  }
  get MenuDataOptionsNameList() {
    return this.mwi;
  }
  get MenuDataOptionsValueList() {
    return this.dwi;
  }
  get MenuDataSubImage() {
    return this.Cwi;
  }
  get MenuDataFunctionImage() {
    return this.gwi;
  }
  get MenuDataFunctionKeyMap() {
    return this.uEe;
  }
  get MenuDataButtonTextId() {
    return this.fwi;
  }
  get MenuDataButtonViewName() {
    return this.pwi;
  }
  GetConditionGroup() {
    return this.YO;
  }
  CheckCondition() {
    var t;
    return !(
      (0 < this.YO &&
        !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
          this.YO.toString(),
          void 0,
        )) ||
      ((t = MenuData.lNn.get(this.MenuDataFunctionId)) && t.Check())
    );
  }
  CanAffectedFunction(t) {
    return !!this.AffectedValueSet.has(t) && 0 < this.AffectedFunction.size;
  }
  IsAffectedDisable(t) {
    return this.DisableValueSet.has(t);
  }
  HasDisableFunction() {
    return 0 < this.DisableFunction.length;
  }
}
((exports.MenuData = MenuData).Mwi = [5]),
  (MenuData.KeySettingInputControllerType = 0),
  (MenuData.lNn = new Map([
    [
      112,
      FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
        .TemplateForPioneerClient,
    ],
  ]));
//# sourceMappingURL=MenuData.js.map
