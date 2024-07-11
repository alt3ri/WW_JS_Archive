"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreFriendItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreFriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.oJs = void 0),
      (this.sMt = () => {
        var e = this.oJs.PlayerId;
        this.GetSprite(5).SetUIActive(!0),
          this.GetTexture(6).SetUIActive(!0),
          this.SetButtonUiActive(4, !1),
          this.oJs.IsMyFriend || this.oJs.OnClickCallback(e);
      }),
      (this.Pta = (e) => {
        e === this.oJs.PlayerId && this.SetButtonUiActive(4, !1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UISprite],
      [6, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[4, this.sMt]]);
  }
  OnAfterShow() {
    super.OnAfterShow(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ApplicationSent,
        this.Pta,
      );
  }
  OnBeforeHide() {
    super.OnBeforeHide(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ApplicationSent,
        this.Pta,
      );
  }
  Refresh(e, t, i) {
    var s = (this.oJs = e).IsMyFriend;
    this.GetSprite(5).SetUIActive(s),
      this.GetTexture(6).SetUIActive(s),
      this.SetButtonUiActive(4, !s),
      this.SetTextureByPath(e.PlayerIconPath, this.GetTexture(0)),
      this.SetTextureByPath(e.PlayerIndexPath, this.GetTexture(1)),
      this.GetText(2).SetText(e.PlayerName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "TowerDefence_Rolename",
        e.PlayerLevel,
      );
  }
}
exports.RewardExploreFriendItem = RewardExploreFriendItem;
//# sourceMappingURL=RewardExploreFriendItem.js.map
