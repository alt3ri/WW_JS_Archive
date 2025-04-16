"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SolarSpeedRolePanelBase = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class SolarSpeedRolePanelBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.DataCache = void 0),
      (this.RoleItem = void 0),
      (this.HandleOnClickFunction = () => {
        void 0 !== this.DataCache?.PlayerId &&
          ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleClickPlayerInResultView(
            this.DataCache.PlayerId,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [6, UE.UIText],
      [5, UE.UIText],
      [4, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UITexture],
      [9, UE.UINiagara],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UITexture],
      [15, UE.UITexture],
      [16, UE.UIItem],
      [17, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[7, this.HandleOnClickFunction]]);
  }
  async OnBeforeStartAsync() {
    (this.RoleItem = new SolarSpeedRoleIconPanel()),
      await this.RoleItem.CreateThenShowByActorAsync(
        this.GetItem(2).GetOwner(),
      );
  }
  $uc(t) {
    var e = this.GetTexture(8);
    t && !StringUtils_1.StringUtils.IsBlank(t)
      ? (e.SetUIActive(!0), this.SetTextureByPath(t, e))
      : e.SetUIActive(!1);
  }
  Refresh(t, e, i) {
    (this.DataCache = t),
      this.RoleItem.Refresh(t.IconData),
      this.GetButton(7)?.RootUIComp.SetUIActive(t.IsAddButtonAvailable),
      this.GetItem(10)?.SetUIActive(!1);
    var s = UE.Color.FromHex(t.MedalColorHex),
      s = (this.GetTexture(0)?.SetColor(s), UE.Color.FromHex(t.FxColorHex));
    this.GetUiNiagara(9)?.SetColor(s),
      this.SetTextureByPath(t.BgPath, this.GetTexture(1)),
      this.$uc(t.MedalTexturePath),
      this.TrySetSpriteByPath(t.PlayerIndexIconPath, this.GetSprite(3), !1),
      this.GetText(6)?.SetText(t.NameText),
      this.OnRefresh(t);
  }
  RefreshAddFriendByPlayerIdExternal(t) {
    var e = this.DataCache;
    void 0 !== e &&
      t === e.PlayerId &&
      e.IsAddButtonAvailable &&
      (this.GetItem(10)?.SetUIActive(!0),
      this.GetButton(7)?.RootUIComp.SetUIActive(!1));
  }
  SetFriendItemState(t) {
    this.GetItem(17)?.SetUIActive(t);
  }
  OnRefresh(t) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(5), t.DescTextId),
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), t.TitleTextId);
  }
}
exports.SolarSpeedRolePanelBase = SolarSpeedRolePanelBase;
class SolarSpeedRoleIconPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(t) {
    this.SetTextureByPath(t.IconPath, this.GetTexture(0));
  }
}
//# sourceMappingURL=SolarSpeedRolePanelBase.js.map
