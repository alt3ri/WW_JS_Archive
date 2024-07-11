"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographExpressionItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LOCK_ALPHA = 0.3;
const UNLOCK_ALPHA = 1;
class PhotographExpressionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LWi = 0),
      (this.fAi = void 0),
      (this.DWi = void 0),
      (this.RWi = void 0),
      (this.DTt = () => {
        const t = this.UWi();
        return t && this.DWi ? this.DWi(this) : t;
      }),
      (this.x$e = (t) => {
        this.UWi() && this.fAi && this.fAi(this, t === 1);
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
    let i, e;
    (this.LWi = t) !== 0 &&
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
    let t;
    return (
      this.LWi === 0 ||
      (t = this.RWi.UnLockConditionGroup) === 0 ||
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
    const e = this.GetExtendToggle(0);
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
// # sourceMappingURL=PhotographExpressionItem.js.map
