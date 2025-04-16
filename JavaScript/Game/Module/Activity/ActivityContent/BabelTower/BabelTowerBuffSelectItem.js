"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerBuffSelectItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerBuffSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.BuffId = 0),
      (this.OnClickToggleCallBack = void 0),
      (this.OnCancelClickToggleCallBack = void 0),
      (this.CanClickCallBack = void 0),
      (this.kqe = (t) => {
        1 === t
          ? this.OnClickToggleCallBack?.(this.BuffId)
          : this.OnCancelClickToggleCallBack?.(this.BuffId);
      }),
      (this.yMa = () => {
        var t = { IsDeTerm: !1, ConfigId: this.BuffId, ShowWays: !0 };
        UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(
      () =>
        1 === this.GetExtendToggle(0).GetToggleState() ||
        !this.CanClickCallBack ||
        this.CanClickCallBack(this.BuffId),
    ),
      this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.yMa);
  }
  Refresh(t, i, e) {
    this.BuffId = t.Id;
    var s,
      r = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(
        this.BuffId,
      );
    r &&
      ((s = this.GetText(1)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, r.NameText),
      this.SetTextureByPath(r.Texture, this.GetTexture(3)),
      this.RefreshState(t.State));
  }
  RefreshState(t) {
    var i = this.GetText(1),
      e = this.GetText(2);
    e.SetUIActive(0 !== t),
      e.SetChangeColor(0 !== t, e.changeColor),
      i.SetChangeColor(0 !== t, i.changeColor),
      2 === t
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(e, "BabelTowerBuffUse")
        : 1 === t &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(e, "BabelTowerBuffLock");
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleStateForce(t, !1);
  }
}
exports.BabelTowerBuffSelectItem = BabelTowerBuffSelectItem;
//# sourceMappingURL=BabelTowerBuffSelectItem.js.map
