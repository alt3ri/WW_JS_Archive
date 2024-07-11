"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BrightnessView = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RenderConfig_1 = require("../../../Render/Config/RenderConfig");
const RenderDataManager_1 = require("../../../Render/Data/RenderDataManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LongPressButtonItem_1 = require("../../Common/Button/LongPressButtonItem");
const MenuController_1 = require("../MenuController");
const MenuTool_1 = require("../MenuTool");
const STEP = 5;
const SLIDER_MIN_VALUE = 0;
const SLIDER_MAX_VALUE = 100;
class BrightnessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.MenuDataIns = void 0),
      (this.IsConfirm = !1),
      (this.ewi = 0),
      (this.twi = 0),
      (this.iwi = void 0),
      (this.Oxt = void 0),
      (this.owi = void 0),
      (this.rwi = () => {
        const t = this.GetSlider(2).GetValue() - STEP;
        this.nwi(t);
      }),
      (this._o = () => {
        const t = this.GetSlider(2).GetValue() + STEP;
        this.nwi(t);
      }),
      (this.mIt = () => {
        this.CloseMe();
      }),
      (this.swi = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "AdjustBrighness",
        ),
          (this.IsConfirm = !0),
          this.mIt();
      }),
      (this.awi = (t) => {
        let i = 2.2;
        t < 0 && (i = MathUtils_1.MathUtils.Lerp(1.5, 2.2, (t + 1) / this.ewi)),
          t > 0 && (i = MathUtils_1.MathUtils.Lerp(2.2, 3.5, t / this.ewi)),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            GlobalData_1.GlobalData.World,
            RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(),
            RenderConfig_1.RenderConfig.UIShowBrightness,
            i,
          ),
          this.nwi(t, !1);
      }),
      (this.hwi = () => {
        var t = this.MenuDataIns.MenuDataSliderDefault;
        var t = MenuTool_1.FunctionItemViewTool.GetSliderPosition(
          this.MenuDataIns.MenuDataSliderRange,
          t * this.ewi,
          this.MenuDataIns.MenuDataSliderDigits,
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
        [0, this.swi],
        [1, this.hwi],
        [2, this.awi],
      ]);
  }
  nwi(t, i = !0) {
    t >= 100
      ? this.GetButton(7).SetSelfInteractive(!1)
      : t <= 0
        ? this.GetButton(6).SetSelfInteractive(!1)
        : (this.GetButton(6).SetSelfInteractive(!0),
          this.GetButton(7).SetSelfInteractive(!0)),
      this.GetSlider(2).SetValue(MathUtils_1.MathUtils.Clamp(t, 0, 100), i);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
      this.mIt();
    }),
      (this.iwi = this.OpenParam),
      (this.MenuDataIns = this.iwi[0]);
    var t = this.MenuDataIns.MenuDataSliderRange[0];
    var i = this.MenuDataIns.MenuDataSliderRange[1];
    var t =
      ((this.ewi = 0.5 * Math.abs(i - t)),
      (this.twi =
        MenuController_1.MenuController.GetTargetConfig(
          this.MenuDataIns.MenuDataFunctionId,
        ) * this.ewi),
      this.iwi[1](this.MenuDataIns.MenuDataFunctionId, this.twi / this.ewi),
      MathUtils_1.MathUtils.RangeClamp(
        this.twi,
        t,
        i,
        SLIDER_MIN_VALUE,
        SLIDER_MAX_VALUE,
      ));
    var i = this.GetSlider(2);
    i.SetMaxValue(SLIDER_MAX_VALUE, !0, !1),
      i.SetMinValue(SLIDER_MIN_VALUE, !0, !1),
      i.SetValue(t, !0),
      (this.Oxt = new LongPressButtonItem_1.LongPressButtonItem(
        this.GetButton(7),
        1,
        this._o,
      )),
      (this.owi = new LongPressButtonItem_1.LongPressButtonItem(
        this.GetButton(6),
        1,
        this.rwi,
      ));
  }
  OnBeforeDestroy() {
    const t = this.MenuDataIns.MenuDataSliderRange[0];
    const i = this.MenuDataIns.MenuDataSliderRange[1];
    var s = this.GetSlider(2).GetValue();
    var s = MathUtils_1.MathUtils.RangeClamp(
      s,
      SLIDER_MIN_VALUE,
      SLIDER_MAX_VALUE,
      t,
      i,
    );
    this.IsConfirm && this.twi !== s
      ? (this.iwi[1](this.MenuDataIns.MenuDataFunctionId, s / this.ewi),
        (this.IsConfirm = !1))
      : this.iwi[1](this.MenuDataIns.MenuDataFunctionId, this.twi / this.ewi),
      this.Oxt?.Clear(),
      this.owi?.Clear(),
      (this.Oxt = void 0),
      (this.owi = void 0);
  }
}
exports.BrightnessView = BrightnessView;
// # sourceMappingURL=BrightnessView.js.map
