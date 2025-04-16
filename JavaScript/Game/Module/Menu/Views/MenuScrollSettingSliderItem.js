"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingSliderItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  MenuTool_1 = require("../MenuTool"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSliderItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.ubi = 0),
      (this.cbi = (t, i = !0) => {
        this.GetItemClickLimit(this.GetSlider(1))
          ? this.mbi(this.ubi, i)
          : this.gbi(t, i);
      }),
      (this.dbi = () => {
        this.GetItemClickLimit(this.GetSlider(1)) || this.Cbi();
      }),
      (this.mbi = (t, i = !0) => {
        this.GetSlider(1).SetValue(t, i), this.gbi(t, i);
      }),
      (this.Cbi = () => {
        (ModelManager_1.ModelManager.MenuModel.IsEdited = !0),
          this.PlaySequenceByName("Flashing");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISliderComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetSlider(1).SetCanClickWhenDisable(!0), this.fbi();
  }
  OnClear() {
    this.GetSlider(1).OnValueChangeCb?.Unbind(),
      this.GetSlider(1).OnEndDragCb?.Unbind(),
      this.Data && (this.Data = void 0);
  }
  Update(t, i) {
    (this.Data = t), this.mGe(), i || this.tOt(), this.sxi(), this.cHa();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  tOt() {
    var t = this.Data.SliderRange,
      i = t[0],
      t = t[1],
      e = MenuController_1.MenuController.GetTargetConfig(this.Data.FunctionId),
      e = MathUtils_1.MathUtils.GetFloatPointFloor(e, this.Data.SliderDigits),
      s = this.GetSlider(1);
    s.GetRootComponent()?.SetUIActive(!0),
      s.SetMaxValue(t, !0, !1),
      s.SetMinValue(i, !0, !1),
      this.mbi(MathUtils_1.MathUtils.Clamp(e, i, t), !1);
  }
  fbi() {
    this.GetSlider(1)?.OnValueChangeCb.Bind(this.cbi),
      this.GetSlider(1)?.OnEndDragCb.Bind(this.dbi);
  }
  gbi(t, i = !0) {
    t = MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(this.Data, t);
    this.GetText(2).SetText(t.toString()), i && this.FireSaveMenuChange(t);
  }
  SetInteractionActive(t) {
    this.GetSlider(1).SetSelfInteractive(t),
      t || (this.ubi = this.GetSlider(1).GetValue());
  }
  OnSetDetailVisible(t) {
    this.GetItem(3)?.SetUIActive(t);
  }
  sxi() {
    var t, i;
    this.Data &&
      this.Data.HasDetailText() &&
      ((t = this.GetText(4)),
      (i = this.Data.GetDetailTextId()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i));
  }
  cHa() {
    this.Data && this.GetSprite(5)?.SetUIActive(this.Data.HasDetailText());
  }
}
exports.MenuScrollSettingSliderItem = MenuScrollSettingSliderItem;
//# sourceMappingURL=MenuScrollSettingSliderItem.js.map
