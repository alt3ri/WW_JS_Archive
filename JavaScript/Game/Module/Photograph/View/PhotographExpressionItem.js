"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographExpressionItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LOCK_ALPHA = 0.3,
  UNLOCK_ALPHA = 1;
class PhotographExpressionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.IKi = 0),
      (this.fPi = void 0),
      (this.TKi = void 0),
      (this.LKi = void 0),
      (this.gke = () => {
        var t = this.DKi();
        return t && this.TKi ? this.TKi(this) : t;
      }),
      (this.jYe = (t) => {
        this.DKi() && this.fPi && this.fPi(this, 1 === t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.jYe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
  }
  Refresh(t) {
    var i, e;
    0 !== (this.IKi = t) &&
      ((this.LKi =
        ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfig(
          t,
        )),
      this.LKi) &&
      ((t = this.LKi.Name),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t),
      (t = this.DKi()),
      (i = this.GetExtendToggle(0)),
      t
        ? (i.RootUIComp.SetAlpha(UNLOCK_ALPHA),
          (e = this.LKi.IconType),
          (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_PhotoMotionIcon" + e,
          )),
          this.SetSpriteByPath(e, this.GetSprite(1), !1))
        : (i.RootUIComp.SetAlpha(LOCK_ALPHA),
          (e = this.LKi.ConditionTipsId),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e)),
      this.GetText(3).SetUIActive(!t),
      this.GetSprite(1).SetUIActive(t),
      this.GetItem(4).SetUIActive(!t));
  }
  DKi() {
    var t;
    return (
      0 === this.IKi ||
      0 === (t = this.LKi.UnLockConditionGroup) ||
      ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        t.toString(),
        void 0,
        !0,
      )
    );
  }
  BindOnSelected(t) {
    this.fPi = t;
  }
  BindOnCanExecuteChange(t) {
    this.TKi = t;
  }
  SetSelected(t, i = !1) {
    var e = this.GetExtendToggle(0);
    t ? e.SetToggleStateForce(1, i) : e.SetToggleStateForce(0, i);
  }
  GetPhotoMontageId() {
    return this.IKi;
  }
  GetPhotoMontageConfig() {
    return this.LKi;
  }
}
exports.PhotographExpressionItem = PhotographExpressionItem;
//# sourceMappingURL=PhotographExpressionItem.js.map
