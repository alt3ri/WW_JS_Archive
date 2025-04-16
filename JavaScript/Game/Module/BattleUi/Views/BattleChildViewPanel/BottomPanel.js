"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BottomPanel = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConcertoResponseItem_1 = require("../ConcertoResponseItem"),
  FishingStateView_1 = require("../FishingStateView"),
  RoleBuffView_1 = require("../RoleBuffView"),
  RoleStateView_1 = require("../RoleStateView"),
  RoleTopBuffView_1 = require("../RoleTopBuffView"),
  SpecialEnergyBarContainer_1 = require("../SpecialEnergy/SpecialEnergyBarContainer"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class BottomPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.lJe = void 0),
      (this._Je = void 0),
      (this.uJe = void 0),
      (this.cJe = void 0),
      (this.kXa = void 0),
      (this.DF_ = void 0),
      (this.mJe = (t) => {
        this.uJe?.RefreshVisible();
      }),
      (this.xie = () => {
        var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        t &&
          (BottomPanel.kQe.Start(),
          t.IsPhantom() && 0 < t.RoleConfig.SpecialEnergyBarId
            ? (this.lJe.Refresh(void 0), this.uJe.Refresh(void 0))
            : (this.lJe.Refresh(t), this.uJe.Refresh(t)),
          this._Je.Refresh(t),
          this.cJe.OnChangeRole(t),
          this.kXa.OnChangeRole(t),
          BottomPanel.kQe.Stop());
      }),
      (this.zpe = (t) => {
        this.lJe.GetEntityId() === t.Id && this.lJe.Refresh(void 0),
          this.uJe.GetEntityId() === t.Id && this.uJe.Refresh(void 0),
          this._Je.GetEntityId() === t.Id && this._Je.Refresh(void 0),
          this.cJe.OnRemoveEntity(t.Id),
          this.kXa.OnRemoveEntity(t.Id);
      }),
      (this.dJe = (t, e) => {
        var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (i?.Valid && e && i.Id === t)
          for (const s of e.GSs)
            s.tSs === EAttributeId.Proto_Life &&
              this.lJe.RefreshHpAndShield(!0);
      }),
      (this.AQe = (t, e, i, s) => {
        this._Je.GetEntityId() === t &&
          (i ? this._Je.AddBuff(e, s) : this._Je.RemoveBuff(e, s));
      }),
      (this.Gd_ = (t) => {
        this.BF_(2, !t), this.kF_(t);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async InitializeAsync() {
    await Promise.all([
      this.CJe(),
      this.gJe(),
      this.fJe(),
      this.pJe(),
      this.NXa(),
    ]);
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData(),
      t =
        (this.lJe.Refresh(t),
        this.uJe.Refresh(t),
        this._Je.Refresh(t),
        this.cJe.OnChangeRole(t),
        this.kXa.OnChangeRole(t),
        ControllerHolder_1.ControllerHolder.FishingController.IsInFishingShip());
    this.BF_(2, !t), this.kF_(t);
  }
  Reset() {
    (this.lJe = void 0),
      (this.uJe = void 0),
      (this._Je = void 0),
      (this.cJe = void 0),
      (this.kXa = void 0),
      this.kF_(!1),
      super.Reset();
  }
  OnShowBattleChildViewPanel() {
    this.lJe?.SetNiagaraActive(!1);
  }
  OnTickBattleChildViewPanel(t) {
    BottomPanel.vJe.Start(),
      this.lJe?.Tick(t),
      this._Je?.Tick(t),
      this.cJe?.Tick(t),
      this.kXa?.Tick(t),
      BottomPanel.vJe.Stop();
  }
  async CJe() {
    var t = this.GetItem(0);
    (this.lJe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      RoleStateView_1.RoleStateView,
    )),
      this.lJe.ShowBattleVisibleChildView();
  }
  async fJe() {
    var t = this.GetItem(1);
    (this.uJe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      ConcertoResponseItem_1.ConcertoResponseItem,
    )),
      this.uJe.ShowBattleVisibleChildView();
  }
  async gJe() {
    var t = this.GetItem(3);
    (this._Je = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      RoleBuffView_1.RoleBuffView,
    )),
      this._Je.ShowBattleVisibleChildView();
  }
  async pJe() {
    var t = this.GetItem(2);
    (this.cJe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      SpecialEnergyBarContainer_1.SpecialEnergyBarContainer,
      this.GetItem(4),
    )),
      this.cJe.ShowBattleVisibleChildView();
  }
  async NXa() {
    var t = this.GetItem(5);
    (this.kXa = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      RoleTopBuffView_1.RoleTopBuffView,
    )),
      this.kXa.ShowBattleVisibleChildView();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiRemoveRoleData,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.AQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnServerAttributeChange,
        this.dJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.mJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiRemoveRoleData,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnServerAttributeChange,
        this.dJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.AQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.mJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
      );
  }
  BF_(t, e) {
    this.lJe?.SetVisible(t, e),
      this.uJe?.SetVisible(t, e),
      this._Je?.SetVisible(t, e),
      this.cJe?.SetVisible(t, e),
      this.kXa?.SetVisible(t, e);
  }
  kF_(t) {
    t
      ? this.DF_ ||
        (this.DF_ = this.NewDynamicChildViewByResourceIdWithCallback(
          this.RootItem,
          "UiItem_NavigationFightHp",
          FishingStateView_1.FishingStateView,
        ))
      : this.DF_ && (this.DF_.Destroy(), (this.DF_ = void 0));
  }
}
((exports.BottomPanel = BottomPanel).vJe = Stats_1.Stat.Create(
  "[BattleView]BottomPanelTick",
)),
  (BottomPanel.kQe = Stats_1.Stat.Create("[ChangeRole]BottomPanel"));
//# sourceMappingURL=BottomPanel.js.map
