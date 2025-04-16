"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BasicGraphicSettingSliderItem = void 0);
const UE = require("ue"),
  LongPressButtonItem_1 = require("../../../Common/Button/LongPressButtonItem"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MenuTool_1 = require("../../MenuTool");
class BasicGraphicSettingSliderItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.f0c = void 0),
      (this.g0c = void 0),
      (this.Hwt = void 0),
      (this.C0c = () => {
        var t;
        this.Pe &&
          ((t = MenuTool_1.FunctionItemViewTool.GetActualSliderStep(
            this.Pe.MenuData,
            1,
          )),
          (t = Math.max(this.Pe.CurValue - t, this.Pe.MinValue)),
          this.Hwt.SetValue(t));
      }),
      (this._o = () => {
        var t;
        this.Pe &&
          ((t = MenuTool_1.FunctionItemViewTool.GetActualSliderStep(
            this.Pe.MenuData,
            1,
          )),
          (t = Math.min(this.Pe.CurValue + t, this.Pe.MaxValue)),
          this.Hwt.SetValue(t));
      }),
      (this.A2t = (t) => {
        this.Pe &&
          (this.Pe.OnChangeValue(t),
          (t = MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(
            this.Pe.MenuData,
            t,
          )),
          this.GetText(3).SetText(t.toString()));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UISliderComponent],
      [3, UE.UIText],
      [4, UE.UIText],
    ];
  }
  OnStart() {
    (this.f0c = new LongPressButtonItem_1.LongPressButtonItem(
      this.GetButton(1),
      1,
      this._o,
    )),
      (this.g0c = new LongPressButtonItem_1.LongPressButtonItem(
        this.GetButton(0),
        1,
        this.C0c,
      )),
      (this.f0c.ShouldPlayLongPressSound = !0),
      (this.g0c.ShouldPlayLongPressSound = !0),
      (this.Hwt = this.GetSlider(2)),
      this.Hwt.OnValueChangeCb.Bind(this.A2t);
  }
  OnBeforeDestroy() {
    (this.f0c.ShouldPlayLongPressSound = !1),
      (this.g0c.ShouldPlayLongPressSound = !1),
      this.f0c.Clear(),
      this.g0c.Clear(),
      (this.f0c = void 0),
      (this.g0c = void 0);
  }
  Refresh(t, i, s) {
    (this.Pe = t),
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), t.Title);
    var e = this.GetSlider(2),
      e =
        (e.SetMaxValue(t.MaxValue, !0, !1),
        e.SetMinValue(t.MinValue, !0, !1),
        e.SetValue(t.CurValue),
        MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(
          t.MenuData,
          t.CurValue,
        ));
    this.GetText(3).SetText(e.toString());
  }
}
exports.BasicGraphicSettingSliderItem = BasicGraphicSettingSliderItem;
//# sourceMappingURL=BasicGraphicSettingSliderItem.js.map
