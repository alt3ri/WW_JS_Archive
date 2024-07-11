"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingSliderItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MenuController_1 = require("../MenuController"),
  MenuTool_1 = require("../MenuTool"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSliderItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.ubi = 0),
      (this.cbi = (t, e = !0) => {
        this.GetItemClickLimit(this.GetSlider(1))
          ? this.mbi(this.ubi, e)
          : this.mbi(t, e);
      }),
      (this.dbi = () => {
        this.GetItemClickLimit(this.GetSlider(1)) || this.Cbi();
      }),
      (this.mbi = (t, e = !0) => {
        this.GetSlider(1).SetValue(t, e), this.gbi(t, e);
      }),
      (this.nBi = (t, e) => {
        var i;
        this.Data.MenuDataFunctionId === t &&
          ((i = (t = this.Data.MenuDataSliderRange)[0]),
          (t = t[1]),
          (e = MathUtils_1.MathUtils.GetFloatPointFloor(
            e,
            this.Data.MenuDataSliderDigits,
          )),
          this.mbi(MathUtils_1.MathUtils.Clamp(e, i, t), !1));
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
    ];
  }
  OnStart() {
    this.GetSlider(1).SetCanClickWhenDisable(!0), this.fbi();
  }
  OnClear() {
    this.GetSlider(1).OnValueChangeCb?.Unbind(),
      this.GetSlider(1).OnEndDragCb?.Unbind(),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ChangeConfigValue,
        this.nBi,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeConfigValue,
          this.nBi,
        ),
      this.Data && (this.Data = void 0);
  }
  Update(t) {
    (this.Data = t), this.mGe(), this.tOt();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.MenuDataFunctionName ?? "");
  }
  tOt() {
    var t = this.Data.MenuDataSliderRange,
      e = t[0],
      t = t[1],
      i = MenuController_1.MenuController.GetTargetConfig(
        this.Data.MenuDataFunctionId,
      ),
      i = MathUtils_1.MathUtils.GetFloatPointFloor(
        i,
        this.Data.MenuDataSliderDigits,
      ),
      s = this.GetSlider(1);
    s.GetRootComponent()?.SetUIActive(!0),
      s.SetMaxValue(t, !0, !1),
      s.SetMinValue(e, !0, !1),
      this.mbi(MathUtils_1.MathUtils.Clamp(i, e, t), !1);
  }
  fbi() {
    this.GetSlider(1)?.OnValueChangeCb.Bind(this.cbi),
      this.GetSlider(1)?.OnEndDragCb.Bind(this.dbi),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeConfigValue,
        this.nBi,
      );
  }
  gbi(t, e = !0) {
    t = MathUtils_1.MathUtils.GetFloatPointFloor(
      t,
      this.Data.MenuDataSliderDigits,
    );
    this.GetText(2).SetText(t.toString()),
      e && this.FireSaveMenuChange(t),
      MenuTool_1.FunctionItemViewTool.CheckNotice(this.Data) &&
        MenuController_1.MenuController.NoticeChange(
          this.Data.MenuDataFunctionId,
        );
  }
  SetInteractionActive(t) {
    this.GetSlider(1).SetSelfInteractive(t),
      t || (this.ubi = this.GetSlider(1).GetValue());
  }
}
exports.MenuScrollSettingSliderItem = MenuScrollSettingSliderItem;
//# sourceMappingURL=MenuScrollSettingSliderItem.js.map
