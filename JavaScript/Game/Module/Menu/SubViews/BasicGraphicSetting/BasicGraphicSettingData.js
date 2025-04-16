"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BasicGraphicSettingData = exports.BasicGraphicSettingSliderData =
    void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../../../../GlobalData"),
  RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
  RenderDataManager_1 = require("../../../../Render/Data/RenderDataManager"),
  MenuData_1 = require("../../MenuData");
class BasicGraphicSettingSliderData {
  constructor(t) {
    (this.MinValueInternal = 0),
      (this.MaxValueInternal = 0),
      (this.CurValueInternal = 0),
      (this.DefaultValueInternal = 0),
      (this.TitleInternal = ""),
      (this.FunctionId = void 0),
      (this.MetaData = void 0),
      (this.OnChangeValue = (t) => {}),
      (this.OnApplyValue = () => {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(
          this.FunctionId,
          this.CurValueInternal,
          1,
        );
      }),
      (this.FunctionId = t.FunctionId),
      (this.MinValueInternal = t.SliderRange[0]),
      (this.MaxValueInternal = t.SliderRange[1]),
      (this.CurValueInternal =
        GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          t.FunctionId,
        ) ?? t.SliderDefault),
      (this.DefaultValueInternal = t.SliderDefault),
      (this.TitleInternal = t.FunctionName),
      (this.MetaData = t);
  }
  get MenuData() {
    return this.MetaData;
  }
  get MinValue() {
    return this.MinValueInternal;
  }
  get MaxValue() {
    return this.MaxValueInternal;
  }
  get CurValue() {
    return this.CurValueInternal;
  }
  get DefaultCurValue() {
    return this.DefaultValueInternal;
  }
  get Title() {
    return this.TitleInternal;
  }
}
exports.BasicGraphicSettingSliderData = BasicGraphicSettingSliderData;
class BasicGraphicSettingData {
  static d0c(t) {
    switch (t.FunctionId) {
      case GameSettingsDefine_1.EFunction.BRIGHTNESS:
        return new BasicGraphicSettingSliderBrightnessData(t);
      case GameSettingsDefine_1.EFunction.Saturation:
        return new BasicGraphicSettingSliderSaturationData(t);
      case GameSettingsDefine_1.EFunction.Contrast:
        return new BasicGraphicSettingSliderContrastData(t);
      default:
        return;
    }
  }
  static GetBasicGraphicSettingSliderDataList() {
    var t = [];
    for (const a of this.m0c) {
      var e =
        GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap.get(a);
      e && (e = new MenuData_1.MenuData(e)) && (e = this.d0c(e)) && t.push(e);
    }
    return t;
  }
}
(exports.BasicGraphicSettingData = BasicGraphicSettingData).m0c = [
  GameSettingsDefine_1.EFunction.BRIGHTNESS,
  GameSettingsDefine_1.EFunction.Saturation,
  GameSettingsDefine_1.EFunction.Contrast,
];
class BasicGraphicSettingSliderBrightnessData extends BasicGraphicSettingSliderData {
  constructor(t) {
    super(t),
      (this.eBi = 0),
      (this.OnChangeValue = (t) => {
        let e = 2.2;
        t <= 0 &&
          (e = MathUtils_1.MathUtils.Lerp(1.5, 2.2, (t + this.eBi) / this.eBi)),
          0 < t && (e = MathUtils_1.MathUtils.Lerp(2.2, 3.5, t / this.eBi)),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            GlobalData_1.GlobalData.World,
            RenderDataManager_1.RenderDataManager.Get().GetUiShowColorSettingMaterialParameterCollection(),
            RenderConfig_1.RenderConfig.UIShowBrightness,
            e,
          ),
          (this.CurValueInternal = t);
      }),
      (this.OnApplyValue = () => {
        var t = MathUtils_1.MathUtils.Lerp(
          -1,
          1,
          (this.CurValueInternal + this.eBi) / (2 * this.eBi),
        );
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(
          this.FunctionId,
          t,
          1,
        );
      }),
      (this.eBi = 100);
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
      t.FunctionId,
    );
    this.CurValueInternal = void 0 !== e ? e * this.eBi : t.SliderDefault;
  }
}
class BasicGraphicSettingSliderSaturationData extends BasicGraphicSettingSliderData {
  constructor() {
    super(...arguments),
      (this.OnChangeValue = (t) => {
        let e = 1;
        t <= 50 && (e = MathUtils_1.MathUtils.Lerp(0, 1, (2 * t) / 100)),
          50 < t &&
            (e = MathUtils_1.MathUtils.Lerp(1, 2, (2 * (t - 50)) / 100)),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            GlobalData_1.GlobalData.World,
            RenderDataManager_1.RenderDataManager.Get().GetUiShowColorSettingMaterialParameterCollection(),
            RenderConfig_1.RenderConfig.UIShowSaturation,
            e,
          ),
          (this.CurValueInternal = t);
      });
  }
}
class BasicGraphicSettingSliderContrastData extends BasicGraphicSettingSliderData {
  constructor() {
    super(...arguments),
      (this.OnChangeValue = (t) => {
        let e = 1;
        t <= 50 && (e = MathUtils_1.MathUtils.Lerp(0.5, 1, (2 * t) / 100)),
          50 < t &&
            (e = MathUtils_1.MathUtils.Lerp(1, 2, (2 * (t - 50)) / 100)),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            GlobalData_1.GlobalData.World,
            RenderDataManager_1.RenderDataManager.Get().GetUiShowColorSettingMaterialParameterCollection(),
            RenderConfig_1.RenderConfig.UIShowContrast,
            e,
          ),
          (this.CurValueInternal = t);
      });
  }
}
//# sourceMappingURL=BasicGraphicSettingData.js.map
