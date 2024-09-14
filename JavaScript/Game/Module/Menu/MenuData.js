"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuData = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  MenuTool_1 = require("./MenuTool");
class MenuData {
  constructor() {
    (this.ConfigId = 0),
      (this.SubType = 0),
      (this.SubName = void 0),
      (this.FunctionName = void 0),
      (this.Platform = 0),
      (this.FunctionSort = 0),
      (this.SubSort = 0),
      (this.FunctionId = 0),
      (this.SetType = 0),
      (this.SliderRange = []),
      (this.SliderDefault = 0),
      (this.SliderDigits = 0),
      (this.OptionsDefault = 0),
      (this.OptionsNameListInternal = []),
      (this.OptionsValueListInternal = []),
      (this.SubImage = void 0),
      (this.FunctionImage = void 0),
      (this.ButtonTextId = void 0),
      (this.ButtonViewName = void 0),
      (this.RelationFuncIds = []),
      (this.YO = 0),
      (this.AffectedValueSet = new Set()),
      (this.AffectedFunction = new Map()),
      (this.DisableValueSet = new Set()),
      (this.DisableFunction = []),
      (this.vq = !0),
      (this.ValueTipsMap = new Map()),
      (this.ClickedTipsMap = new Map()),
      (this.ClickedTips = void 0),
      (this.mVa = !1),
      (this.dVa = void 0);
  }
  Initialize(t) {
    (this.ConfigId = t.Id),
      (this.SubType = t.SubType),
      (this.SubName = t.SubName),
      (this.FunctionName = t.Name),
      (this.Platform = t.Platform),
      (this.FunctionSort = t.FunctionSort),
      (this.SubSort = t.SubSort),
      (this.FunctionId = t.FunctionId),
      (this.SetType = t.SetType),
      (this.SliderRange = t.SliderRange),
      (this.SliderDefault = t.SliderDefault),
      (this.SliderDigits = t.Digits),
      (this.OptionsDefault = t.OptionsDefault),
      (this.OptionsNameListInternal = t.OptionsName),
      (this.OptionsValueListInternal = t.OptionsValue),
      (this.SubImage = t.SubImage),
      (this.FunctionImage = t.FunctionImage),
      (this.ButtonTextId = t.ButtonText),
      (this.ButtonViewName = t.OpenView),
      (this.YO = t.ConditionGroup),
      (this.AffectedFunction = t.AffectedFunction),
      (this.DisableFunction = t.DisableFunction),
      (this.ValueTipsMap = t.ValueTipsMap),
      (this.ClickedTipsMap = t.ClickedTipsMap),
      (this.ClickedTips = t.ClickedTips),
      (this.RelationFuncIds = t.RelationFunction),
      (this.dVa = t.DetailText);
    for (const i of t.AffectedValue) this.AffectedValueSet.add(i);
    for (const e of t.DisableValue) this.DisableValueSet.add(e);
    this.OnInitialize(t);
  }
  OnInitialize(t) {}
  SetEnable(t) {
    this.vq = t;
  }
  GetEnable() {
    return this.vq;
  }
  CheckCondition() {
    var t;
    return !(
      (0 < this.YO &&
        !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
          this.YO.toString(),
          void 0,
        )) ||
      ((t = MenuData.pNn.get(this.FunctionId)) && t.Check())
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
  OnSet(t) {}
  OnApply() {}
  OnSave() {}
  CheckPlatform() {
    return MenuTool_1.MenuTool.CheckPlatform(this.Platform);
  }
  CheckDeviceHardware() {
    return (
      !ModelManager_1.ModelManager.MenuModel.IsCheckDeviceVendor ||
      MenuTool_1.MenuTool.CheckDeviceVendor(this.FunctionId)
    );
  }
  CheckIosReviewShield() {
    return MenuTool_1.MenuTool.CheckIosReviewShield(this.ConfigId);
  }
  get OptionsNameList() {
    return this.OptionsNameListInternal;
  }
  get OptionsValueList() {
    return this.OptionsValueListInternal;
  }
  HasDetailText() {
    var t = this.dVa;
    return !!t && !StringUtils_1.StringUtils.IsBlank(t);
  }
  GetDetailTextId() {
    return this.dVa;
  }
  SetDetailTextVisible(t) {
    this.mVa = t;
  }
  GetIsDetailTextVisible() {
    return this.mVa;
  }
}
(exports.MenuData = MenuData).pNn = new Map([
  [
    112,
    FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
      .TemplateForPioneerClient,
  ],
]);
//# sourceMappingURL=MenuData.js.map
