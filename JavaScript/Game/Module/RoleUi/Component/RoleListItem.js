"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleListItem = exports.RoleListItemData = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleListItemData {
  constructor() {
    (this.RoleDataId = 0), (this.NeedShowTrial = !0), (this.NeedRedDot = !1);
  }
}
exports.RoleListItemData = RoleListItemData;
const ROLE_MAX_POSITION = 4;
class RoleListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.DataId = 0),
      (this.RoleIconItem = void 0),
      (this.ToggleCallBack = void 0),
      (this.CanToggleExecuteChange = void 0),
      (this.cFe = () => {
        this.ToggleCallBack && this.ToggleCallBack(this.GridIndex);
      }),
      (this.CanToggleExecuteChangeInternal = () =>
        !this.CanToggleExecuteChange ||
        this.CanToggleExecuteChange(this.GridIndex));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.cFe]]);
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(1);
    (this.RoleIconItem = new RoleIconItem()),
      await this.RoleIconItem.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    var t = this.GetExtendToggle(0);
    t &&
      (t.CanExecuteChange.Unbind(),
      t.CanExecuteChange.Bind(this.CanToggleExecuteChangeInternal));
  }
  s1o(t, e = !0) {
    this.RoleIconItem.Refresh(t),
      e
        ? this.GetItem(4).SetUIActive(t.IsTrialRole())
        : this.GetItem(4).SetUIActive(!1);
  }
  a1o(e) {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
    let s = void 0,
      o = 1;
    for (let t = 0; t < i.length; t++) {
      var r = i[t];
      r.GetConfigId === e && ((s = r), (o = t + 1));
    }
    var t = void 0 !== s;
    this.GetItem(2).SetUIActive(t),
      this.GetItem(5).SetUIActive(t),
      t &&
        ((t = Math.min(o, ROLE_MAX_POSITION)),
        (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_RoleFormationPosition" + t,
        )),
        this.SetSpriteByPath(t, this.GetSprite(3), !1));
  }
  GetRedDotItem() {
    return this.GetItem(6);
  }
  SetToggleState(t, e = !1) {
    var i = this.GetExtendToggle(0);
    e ? i.SetToggleStateForce(t) : i.SetToggleState(t);
  }
  Refresh(t, e, i) {
    this.DataId = t.RoleDataId;
    var s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.DataId);
    this.s1o(s, t.NeedShowTrial),
      this.a1o(this.DataId),
      t.NeedRedDot
        ? RedDotController_1.RedDotController.BindRedDot(
            "RoleSystemRoleList",
            this.GetRedDotItem(),
            void 0,
            this.DataId,
          )
        : this.GetRedDotItem().SetUIActive(!1),
      e ? this.OnSelected(!1) : this.OnDeselected(!1);
  }
  OnSelected(t) {
    this.SetToggleState(1, !0);
  }
  OnDeselected(t) {
    this.SetToggleState(0, !0);
  }
  GetToggleForGuide() {
    return this.GetExtendToggle(0);
  }
}
exports.RoleListItem = RoleListItem;
class RoleIconItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
    ];
  }
  Refresh(t) {
    this.SetRoleIcon(
      t.GetRoleConfig().RoleHeadIconBig,
      this.GetTexture(0),
      t.GetRoleId(),
      "RoleRootView",
    ),
      this.mFe(t.GetRoleConfig().QualityId);
  }
  mFe(t) {
    var e = this.GetSprite(1),
      i = this.GetSprite(2),
      s = this.GetSprite(3),
      o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_RoleIconBgUnCheckedUnHover" + t,
      ),
      o =
        (this.SetSpriteByPath(o, s, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_RoleIconBgUnCheckedHover" + t,
        )),
      s =
        (this.SetSpriteByPath(o, i, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_RoleIconBgChecked" + t,
        ));
    this.SetSpriteByPath(s, e, !1);
  }
}
//# sourceMappingURL=RoleListItem.js.map
