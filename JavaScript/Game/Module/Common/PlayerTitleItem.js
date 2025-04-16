"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerTitleInfoTip = exports.PlayerTitleItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  PersonalDefine_1 = require("../Personal/Model/PersonalDefine"),
  LguiUtil_1 = require("../Util/LguiUtil");
class PlayerTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Jmc = void 0),
      (this.L0 = !1),
      (this.Vmc = 0),
      (this.eje = () => {
        var e, t, i;
        this.L0 ||
          ((e = this.GetItem(11)),
          (t =
            ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleInfoString(
              this.Jmc.Id,
              this.Vmc,
            )),
          (i = this.Jmc.IconInTitleInfo),
          UiManager_1.UiManager.OpenView(
            "PlayerTitleInfoTip",
            {
              ItemForLocation: e,
              PlayerTitleInfoString: t,
              PlayerTitleInfoIcon: i,
            },
            () => {
              var e = UiManager_1.UiManager.GetViewByName("PlayerTitleInfoTip");
              e && e.BindCloseCallback(this.EUt);
            },
          ));
      }),
      (this.EUt = () => {
        this.GetExtendToggle(12).SetToggleStateForce(0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIText],
      [6, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIText],
      [10, UE.UITexture],
      [11, UE.UIItem],
      [12, UE.UIExtendToggle],
      [13, UE.UINiagara],
      [14, UE.UINiagara],
      [15, UE.UINiagara],
      [16, UE.UIItem],
      [17, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[12, this.eje]]);
  }
  Refresh(e, t, i) {
    e && 0 !== e
      ? (this.SetUiActive(!0),
        (this.Jmc =
          ConfigManager_1.ConfigManager.InventoryConfig.GetPlayerTitleItemConfig(
            e,
          )),
        this.Jmc &&
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(9),
            this.Jmc.TitleName,
          ),
          (e = this.Jmc.TitleBgIcon) &&
            this.SetTextureByPath(e, this.GetTexture(0)),
          (e = this.Jmc.SelectedIcon),
          this.SetTextureByPath(e, this.GetTexture(10)),
          (e = this.Jmc.TitleStyle),
          this.GetItem(7)?.SetUIActive(!1),
          this.GetItem(16)?.SetUIActive(!1),
          this.GetItem(1)?.SetUIActive(!1),
          1 === e
            ? this.RefreshCommonTitle(0 === i)
            : 2 === e && this.RefreshStarTitle(t),
          this.RefreshDecorate()))
      : this.SetUiActive(!1);
  }
  RefreshCommonTitle(t) {
    if (
      (this.Jmc.TitleIcon &&
        (this.GetItem(7)?.SetUIActive(!0),
        this.efc(this.Jmc.TitleIcon, this.GetTexture(8))),
      this.Jmc.RoleHeadIcon)
    ) {
      this.GetItem(16)?.SetUIActive(!0);
      let e = this.Jmc.RoleHeadIcon;
      t && (e = this.Jmc.FemaleRoleHeadIcon),
        this.SetTextureByPath(e, this.GetTexture(17));
    }
  }
  RefreshStarTitle(e) {
    this.GetItem(1)?.SetUIActive(!0),
      this.efc(this.Jmc.TitleIcon, this.GetTexture(6)),
      this.efc(this.Jmc.StarTitleBgIcon, this.GetTexture(2)),
      this.efc(this.Jmc.StarTitleIcon, this.GetTexture(3));
    var t = this.GetText(4),
      e = e ?? 0;
    t &&
      ((this.Vmc = e),
      t.SetText(e.toString()),
      t.SetColor(
        UE.Color.FromHex(
          PersonalDefine_1.playerTitleQualityToColor[this.Jmc.TitleQuality],
        ),
      ));
  }
  RefreshDecorate() {
    var e = this.Jmc.DecorateLeftNiagara,
      t = this.GetUiNiagara(13),
      e =
        (e
          ? (this.SetNiagaraSystemByPath(e, t), t.SetUIActive(!0))
          : t.SetUIActive(!1),
        this.Jmc.DecorateRightNiagara),
      t = this.GetUiNiagara(14),
      e =
        (e
          ? (this.SetNiagaraSystemByPath(e, t), t.SetUIActive(!0))
          : t.SetUIActive(!1),
        this.Jmc.DecorateBgNiagara),
      t = this.GetUiNiagara(15);
    e
      ? (this.SetNiagaraSystemByPath(e, t), t.SetUIActive(!0))
      : t.SetUIActive(!1);
  }
  efc(e, t) {
    this.SetTextureByPath(e, t);
    e = this.Jmc.TitleQuality;
    t?.SetColor(
      UE.Color.FromHex(PersonalDefine_1.playerTitleQualityToColor[e]),
    );
  }
  SetIsPreview(e) {
    this.L0 = e;
  }
}
exports.PlayerTitleItem = PlayerTitleItem;
class PlayerTitleInfoTip extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.tfc = void 0),
      (this.ifc = ""),
      (this.PNo = void 0),
      (this.$St = () => {
        UiManager_1.UiManager.IsViewOpen("ChatView") && this.rfc();
      }),
      (this.rfc = () => {
        this.CloseMe();
      }),
      (this.eje = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[3, this.eje]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateNavigationListener,
      this.rfc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.rfc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetToBattleView,
        this.rfc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddChatContent,
        this.$St,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateNavigationListener,
      this.rfc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.rfc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetToBattleView,
        this.rfc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddChatContent,
        this.$St,
      );
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    (this.tfc = e.ItemForLocation), (this.ifc = e.PlayerTitleInfoString);
    this.GetItem(1).D_K2_SetWorldLocation(
      this.tfc.D_K2_GetComponentLocation(),
      !1,
      void 0,
      !0,
    ),
      this.UpdateText();
    var t = this.GetTexture(4);
    e.PlayerTitleInfoIcon
      ? (t.SetUIActive(!0), this.SetTextureByPath(e.PlayerTitleInfoIcon, t))
      : t.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.PNo && this.PNo();
  }
  UpdateText() {
    this.GetText(2)?.SetText(this.ifc);
  }
  BindCloseCallback(e) {
    this.PNo = e;
  }
}
exports.PlayerTitleInfoTip = PlayerTitleInfoTip;
//# sourceMappingURL=PlayerTitleItem.js.map
