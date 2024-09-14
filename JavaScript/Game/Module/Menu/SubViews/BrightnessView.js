"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BrightnessView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  RenderConfig_1 = require("../../../Render/Config/RenderConfig"),
  RenderDataManager_1 = require("../../../Render/Data/RenderDataManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LongPressButtonItem_1 = require("../../Common/Button/LongPressButtonItem"),
  MenuController_1 = require("../MenuController"),
  MenuTool_1 = require("../MenuTool"),
  STEP = 5,
  SLIDER_MIN_VALUE = 0,
  SLIDER_MAX_VALUE = 100;
class BrightnessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.MenuDataIns = void 0),
      (this.IsConfirm = !1),
      (this.eBi = 0),
      (this.tBi = 0),
      (this.iBi = void 0),
      (this.Vwt = void 0),
      (this.oBi = void 0),
      (this.rBi = () => {
        var t = this.GetSlider(2).GetValue() - STEP;
        this.nBi(t);
      }),
      (this._o = () => {
        var t = this.GetSlider(2).GetValue() + STEP;
        this.nBi(t);
      }),
      (this.m2e = () => {
        this.CloseMe();
      }),
      (this.sBi = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "AdjustBrighness",
        ),
          (this.IsConfirm = !0),
          this.m2e();
      }),
      (this.aBi = (t) => {
        let i = 2.2;
        t < 0 && (i = MathUtils_1.MathUtils.Lerp(1.5, 2.2, (t + 1) / this.eBi)),
          0 < t && (i = MathUtils_1.MathUtils.Lerp(2.2, 3.5, t / this.eBi)),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            GlobalData_1.GlobalData.World,
            RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(),
            RenderConfig_1.RenderConfig.UIShowBrightness,
            i,
          ),
          this.nBi(t, !1);
      }),
      (this.hBi = () => {
        var t = this.MenuDataIns.SliderDefault,
          t = MenuTool_1.FunctionItemViewTool.GetSliderPosition(
            this.MenuDataIns.SliderRange,
            t * this.eBi,
            this.MenuDataIns.SliderDigits,
          );
        this.GetSlider(2).SetValue(t, !0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UISliderComponent],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.sBi],
        [1, this.hBi],
        [2, this.aBi],
      ]);
  }
  nBi(t, i = !0) {
    100 <= t
      ? this.GetButton(7).SetSelfInteractive(!1)
      : t <= 0
        ? this.GetButton(6).SetSelfInteractive(!1)
        : (this.GetButton(6).SetSelfInteractive(!0),
          this.GetButton(7).SetSelfInteractive(!0)),
      this.GetSlider(2).SetValue(MathUtils_1.MathUtils.Clamp(t, 0, 100), i);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
      this.m2e();
    }),
      (this.iBi = this.OpenParam),
      (this.MenuDataIns = this.iBi[0]);
    var t = this.MenuDataIns.SliderRange[0],
      i = this.MenuDataIns.SliderRange[1],
      t =
        ((this.eBi = 0.5 * Math.abs(i - t)),
        (this.tBi =
          MenuController_1.MenuController.GetTargetConfig(
            this.MenuDataIns.FunctionId,
          ) * this.eBi),
        this.iBi[1](this.MenuDataIns.FunctionId, this.tBi / this.eBi),
        MathUtils_1.MathUtils.RangeClamp(
          this.tBi,
          t,
          i,
          SLIDER_MIN_VALUE,
          SLIDER_MAX_VALUE,
        )),
      i = this.GetSlider(2);
    i.SetMaxValue(SLIDER_MAX_VALUE, !0, !1),
      i.SetMinValue(SLIDER_MIN_VALUE, !0, !1),
      i.SetValue(t, !0),
      (this.Vwt = new LongPressButtonItem_1.LongPressButtonItem(
        this.GetButton(7),
        1,
        this._o,
      )),
      (this.oBi = new LongPressButtonItem_1.LongPressButtonItem(
        this.GetButton(6),
        1,
        this.rBi,
      ));
  }
  OnBeforeDestroy() {
    var t = this.MenuDataIns.SliderRange[0],
      i = this.MenuDataIns.SliderRange[1],
      s = this.GetSlider(2).GetValue(),
      s = MathUtils_1.MathUtils.RangeClamp(
        s,
        SLIDER_MIN_VALUE,
        SLIDER_MAX_VALUE,
        t,
        i,
      );
    this.IsConfirm && this.tBi !== s
      ? (this.iBi[1](this.MenuDataIns.FunctionId, s / this.eBi),
        (this.IsConfirm = !1))
      : this.iBi[1](this.MenuDataIns.FunctionId, this.tBi / this.eBi),
      this.Vwt?.Clear(),
      this.oBi?.Clear(),
      (this.Vwt = void 0),
      (this.oBi = void 0);
  }
}
exports.BrightnessView = BrightnessView;
//# sourceMappingURL=BrightnessView.js.map
