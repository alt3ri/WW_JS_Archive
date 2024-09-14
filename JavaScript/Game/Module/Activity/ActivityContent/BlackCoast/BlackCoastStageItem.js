"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastStageItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BlackCoastStageItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.eTt = () => {
        this.Pe &&
          (this.Pe.IsUnlock
            ? this.OpenTaskView?.(this.Pe.StageId)
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                this.Pe.GetLockConditionText(),
              ));
      }),
      (this.NewFlagRedDot = void 0),
      (this.OpenTaskView = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UITextureTransitionComponent],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Refresh(t, i, s) {
    this.Pe = t;
    var r =
      ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(
        this.Pe.StageId,
      );
    this._Oe(t.StageState, r), this.T2e(t.StageState, r), this.BNe();
  }
  _Oe(t, i) {
    var s = 0 === t,
      r = 1 === t,
      t = 2 === t;
    if (
      (this.GetItem(1).SetUIActive(r || t),
      this.GetItem(4).SetUIActive(s),
      this.GetItem(3).SetUIActive(t),
      this.GetText(2).SetUIActive(r),
      s)
    ) {
      t = this.GetUiTextureTransitionComponent(12);
      this.SetTextureTransitionByPath(i.TextureNormal, t);
    } else {
      var e = [this.GetItem(9), this.GetItem(10), this.GetItem(11)];
      for (let t = 0; t < e.length; t++) e[t].SetUIActive(this.Pe.Index === t);
    }
  }
  T2e(t, i) {
    var s;
    1 === t &&
      ((s = this.Pe.GetTaskProgress()), this.GetText(2).SetText(s + "%")),
      0 === t &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(6),
          this.Pe.GetLockConditionText(),
        ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.Title);
  }
  BNe() {
    var t = this.NewFlagRedDot?.(this.Pe.StageId) ?? !1;
    this.GetItem(8).SetUIActive(this.Pe.GetRewardState() || t);
  }
}
exports.BlackCoastStageItem = BlackCoastStageItem;
//# sourceMappingURL=BlackCoastStageItem.js.map
