"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonResultButton = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CommonResultButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.IRe = void 0),
      (this.rbt = 0),
      (this.nbt = void 0),
      (this.sbt = void 0),
      (this.ije = () => {
        this.nbt && this.nbt(), this.DoClickCallBack();
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnBeforeDestroy() {
    this.ClearBtnTimer(), (this.nbt = void 0);
  }
  ResetData() {
    this.sbt = void 0;
  }
  SetData(t) {
    this.sbt = t;
  }
  DoClickCallBack() {
    this.sbt?.GetButtonClickCallBack()?.();
  }
  DoTimerCallBack(t) {
    this.sbt?.GetButtonTimerCallBack()?.(t, this);
  }
  DoRefreshCallBack() {
    this.sbt?.GetButtonRefreshCallBack()?.(this);
  }
  SetBtnFunction(t) {
    this.nbt = t;
  }
  SetBtnCanClick(t) {
    var i = this.GetButton(0);
    i.GetSelfInteractive() !== t && i.SetSelfInteractive(t);
  }
  SetBtnText(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, i);
  }
  GetBtnText() {
    return this.GetText(1);
  }
  SetTipsItem(t, i) {
    i =
      "×" +
      (
        i ??
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t)
      ).toString();
    this.GetText(4).SetText(i),
      this.SetItemIcon(this.GetTexture(3), t),
      this.GetItem(5).SetUIActive(!0);
  }
  SetTipsItemTextColor(t) {
    this.GetText(4).SetColor(t);
  }
  SetFloatText(t, ...i) {
    this.GetText(2).SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), t, i);
  }
  GetBtnFloatText() {
    return this.GetText(2).SetUIActive(!0), this.GetText(2);
  }
  SetFloatTextWithTimer(t, i, e) {
    this.ClearBtnTimer(),
      i || this.SetBtnCanClick(i),
      (this.rbt = t),
      (this.IRe = TimerSystem_1.TimerSystem.Loop(
        () => {
          this.rbt <= 0
            ? i
              ? this.ije()
              : this.SetBtnCanClick(!0)
            : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e, this.rbt--);
        },
        CommonDefine_1.MILLIONSECOND_PER_SECOND,
        t + 1,
      )),
      this.GetText(2).SetUIActive(!0);
  }
  ClearBtnTimer() {
    TimerSystem_1.TimerSystem.Has(this.IRe) &&
      TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = void 0);
  }
}
exports.CommonResultButton = CommonResultButton;
//# sourceMappingURL=CommonResultButton.js.map
