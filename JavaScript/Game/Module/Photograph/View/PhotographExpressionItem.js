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
      (this.LWi = 0),
      (this.fAi = void 0),
      (this.DWi = void 0),
      (this.RWi = void 0),
      (this.DTt = () => {
        var t = this.UWi();
        return t && this.DWi ? this.DWi(this) : t;
      }),
      (this.x$e = (t) => {
        this.UWi() && this.fAi && this.fAi(this, 1 === t);
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
      (this.BtnBindInfo = [[0, this.x$e]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.DTt);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
  }
  Refresh(t) {
    var i, e;
    0 !== (this.LWi = t) &&
      ((this.RWi =
        ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfig(
          t,
        )),
      this.RWi) &&
      ((t = this.RWi.Name),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t),
      (t = this.UWi()),
      (i = this.GetExtendToggle(0)),
      t
        ? (i.RootUIComp.SetAlpha(UNLOCK_ALPHA),
          (e = this.RWi.IconType),
          (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_PhotoMotionIcon" + e,
          )),
          this.SetSpriteByPath(e, this.GetSprite(1), !1))
        : (i.RootUIComp.SetAlpha(LOCK_ALPHA),
          (e = this.RWi.ConditionTipsId),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e)),
      this.GetText(3).SetUIActive(!t),
      this.GetSprite(1).SetUIActive(t),
      this.GetItem(4).SetUIActive(!t));
  }
  UWi() {
    var t;
    return (
      0 === this.LWi ||
      0 === (t = this.RWi.UnLockConditionGroup) ||
      ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        t.toString(),
        void 0,
        !0,
      )
    );
  }
  BindOnSelected(t) {
    this.fAi = t;
  }
  BindOnCanExecuteChange(t) {
    this.DWi = t;
  }
  SetSelected(t, i = !1) {
    var e = this.GetExtendToggle(0);
    t ? e.SetToggleStateForce(1, i) : e.SetToggleStateForce(0, i);
  }
  GetPhotoMontageId() {
    return this.LWi;
  }
  GetPhotoMontageConfig() {
    return this.RWi;
  }
}
exports.PhotographExpressionItem = PhotographExpressionItem;
//# sourceMappingURL=PhotographExpressionItem.js.map
