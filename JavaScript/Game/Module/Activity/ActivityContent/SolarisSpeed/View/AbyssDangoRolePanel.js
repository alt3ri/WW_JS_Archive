"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssDangoRolePanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  PlayerTitleItem_1 = require("../../../../Common/PlayerTitleItem"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  SolarSpeedRolePanelBase_1 = require("./SolarSpeedRolePanelBase");
class AbyssDangoRolePanel extends SolarSpeedRolePanelBase_1.SolarSpeedRolePanelBase {
  constructor() {
    super(...arguments),
      (this.O11 = void 0),
      (this.nRc = void 0),
      (this.q11 = void 0),
      (this.spc = void 0),
      (this.G11 = (e) => {
        var t;
        this.q11 === e &&
          ((t =
            ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerLikeCount(e)),
          this.nRc.Refresh(t, e, !0));
      });
  }
  async Wuc() {
    (this.O11 = new AbyssDangoDescContent()),
      await this.O11.CreateThenShowByResourceIdAsync(
        "UiItem_RaceResulInfo",
        this.GetItem(11),
      ),
      (this.nRc = new AbyssDangoLikeItem()),
      await this.nRc.CreateThenShowByResourceIdAsync(
        "UiItem_ClickLike",
        this.GetItem(13),
      ),
      this.nRc.GetRootItem().SetHierarchyIndex(0),
      (this.spc = new PlayerTitleItem_1.PlayerTitleItem()),
      await this.spc.CreateThenShowByResourceIdAsync(
        "UiItem_TitlesCom",
        this.GetItem(16),
      ),
      this.GetItem(16).SetUIActive(!0);
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAbyssLikeChange,
      this.G11,
    );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAbyssLikeChange,
      this.G11,
    );
  }
  async OnBeforeStartAsync() {
    await Promise.all([super.OnBeforeStartAsync(), this.Wuc()]),
      this.GetItem(12).SetUIActive(!1);
  }
  OnStart() {
    this.dde();
  }
  OnBeforeDestroy() {
    this.Cde();
  }
  Ybc(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(
      e.AvatarTexturePath,
    ).Path;
    this.SetTextureByPath(e, this.GetTexture(14));
  }
  _f1(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(
      e.LineTexturePath,
    ).Path;
    this.SetTextureByPath(e, this.GetTexture(15));
  }
  Hmc(e) {
    this.spc.Refresh(e.PlayerTitle, e.PlayerTitleStarLevel, e.Sex);
  }
  Wy1(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(
      e.BgTexturePath,
    ).Path;
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  OnRefresh(e) {
    (this.q11 = e.PlayerId), this.O11.Refresh(e);
    var t = !!e.IsSelf;
    this.nRc.Refresh(e.LikeCount, e.PlayerId, t),
      this.nRc.RefreshLineState(!e.IsSelf),
      this.nRc.SetActive(!0),
      this.Hmc(e),
      this.Ybc(e),
      this._f1(e),
      this.Wy1(e),
      this.SetFriendItemState(!e.IsSelf);
  }
}
exports.AbyssDangoRolePanel = AbyssDangoRolePanel;
class AbyssDangoDescContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Scroll = void 0),
      (this.fke = () => new AbyssDangoDescItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(1),
      this.fke,
      this.GetItem(2).GetOwner(),
    );
  }
  Quc(e) {
    var t = new UiAsyncTask_1.UiAsyncTask(
      "AbyssDangoDescContent.Refresh",
      async () => {
        await this.Scroll.RefreshByDataAsync(e);
      },
    );
    this.RunAsyncTask(t);
  }
  Refresh(e) {
    var t,
      s,
      i = e.MainDescData;
    0 < i.length &&
      ((t = ModelManager_1.ModelManager.DangoAbyssModel.GetMainHonorRank(i)),
      (i = i[0]),
      (s = (i =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssSettleById(i.Id))
        .Title.size),
      (i = i.Title.get(s - 1 <= t ? s - 1 : t) ?? ""),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i)),
      this.Quc(e.SubDescData);
  }
}
class AbyssDangoDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(e) {
    this.GetItem(0)?.SetUIActive(this.GridIndex % 2 == 0);
    var t =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseSettleById(
        e.Id,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.BaseTitle),
      t.IsTotalRatio
        ? this.GetText(2)?.SetText(e.Count.toString() + "%")
        : this.GetText(2)?.SetText(e.Count.toString());
  }
}
class AbyssDangoLikeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.F11 = void 0),
      (this.q11 = void 0),
      (this.MHe = () => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.AbyssLikePlayer(
          this.q11,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.MHe]]);
  }
  async OnBeforeStartAsync() {
    (this.F11 = new AbyssDangoLikeCountItem()),
      await this.F11.CreateByActorAsync(this.GetItem(1).GetOwner()),
      this.F11.SetActive(!1);
  }
  Refresh(e, t, s = !1) {
    (this.q11 = t),
      this.F11.SetActive(s),
      this.F11.Refresh(e),
      this.GetButton(0)?.RootUIComp.SetUIActive(!s);
  }
  RefreshLineState(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
}
class AbyssDangoLikeCountItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e) {
    this.GetText(0)?.SetText(e.toString());
  }
}
//# sourceMappingURL=AbyssDangoRolePanel.js.map
