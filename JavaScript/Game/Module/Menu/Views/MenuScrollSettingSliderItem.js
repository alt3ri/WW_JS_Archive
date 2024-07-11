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
      (this.uBi = 0),
      (this.cBi = (t, e = !0) => {
        this.GetItemClickLimit(this.GetSlider(1))
          ? this.mBi(this.uBi, e)
          : this.mBi(t, e);
      }),
      (this.dBi = () => {
        this.GetItemClickLimit(this.GetSlider(1)) || this.CBi();
      }),
      (this.mBi = (t, e = !0) => {
        this.GetSlider(1).SetValue(t, e), this.gBi(t, e);
      }),
      (this.nwi = (t, e) => {
        var i;
        this.Data.MenuDataFunctionId === t &&
          ((i = (t = this.Data.MenuDataSliderRange)[0]),
          (t = t[1]),
          (e = MathUtils_1.MathUtils.GetFloatPointFloor(
            e,
            this.Data.MenuDataSliderDigits,
          )),
          this.mBi(MathUtils_1.MathUtils.Clamp(e, i, t), !1));
      }),
      (this.CBi = () => {
        MenuController_1.MenuController.SaveLocalConfig(),
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
    this.GetSlider(1).SetCanClickWhenDisable(!0), this.fBi();
  }
  OnClear() {
    this.GetSlider(1).OnValueChangeCb?.Unbind(),
      this.GetSlider(1).OnEndDragCb?.Unbind(),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ChangeConfigValue,
        this.nwi,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeConfigValue,
          this.nwi,
        ),
      this.Data && (this.Data = void 0);
  }
  Update(t) {
    (this.Data = t), this.mGe(), this.eNt();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.MenuDataFunctionName ?? "");
  }
  eNt() {
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
      this.mBi(MathUtils_1.MathUtils.Clamp(i, e, t), !1);
  }
  fBi() {
    this.GetSlider(1)?.OnValueChangeCb.Bind(this.cBi),
      this.GetSlider(1)?.OnEndDragCb.Bind(this.dBi),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeConfigValue,
        this.nwi,
      );
  }
  gBi(t, e = !0) {
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
      t || (this.uBi = this.GetSlider(1).GetValue());
  }
}
exports.MenuScrollSettingSliderItem = MenuScrollSettingSliderItem;
//# sourceMappingURL=MenuScrollSettingSliderItem.js.map
