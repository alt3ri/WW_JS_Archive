"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BottomPanel = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConcertoResponseItem_1 = require("../ConcertoResponseItem"),
  RoleBuffView_1 = require("../RoleBuffView"),
  RoleStateView_1 = require("../RoleStateView"),
  SpecialEnergyBarContainer_1 = require("../SpecialEnergy/SpecialEnergyBarContainer"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
class BottomPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.lJe = void 0),
      (this._Je = void 0),
      (this.uJe = void 0),
      (this.cJe = void 0),
      (this.mJe = (e) => {
        this.uJe?.RefreshVisible();
      }),
      (this.xie = () => {
        var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        e &&
          (e.IsPhantom() && 0 < e.RoleConfig.SpecialEnergyBarId
            ? (this.lJe.Refresh(void 0), this.uJe.Refresh(void 0))
            : (this.lJe.Refresh(e), this.uJe.Refresh(e)),
          this._Je.Refresh(e),
          this.cJe.OnChangeRole(e));
      }),
      (this.zpe = (e) => {
        this.lJe.GetEntityId() === e.Id && this.lJe.Refresh(void 0),
          this.uJe.GetEntityId() === e.Id && this.uJe.Refresh(void 0),
          this._Je.GetEntityId() === e.Id && this._Je.Refresh(void 0),
          this.cJe.OnRemoveEntity(e.Id);
      }),
      (this.dJe = (e, t) => {
        var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (i?.Valid && t && i.Id === e)
          for (const s of t.PSs)
            s.QMs === EAttributeId.Proto_Life &&
              this.lJe.RefreshHpAndShield(!0);
      }),
      (this.AQe = (e, t, i, s) => {
        this._Je.GetEntityId() === e &&
          (i ? this._Je.AddBuff(t, s) : this._Je.RemoveBuff(t, s));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async InitializeAsync() {
    await Promise.all([this.CJe(), this.gJe(), this.fJe(), this.pJe()]);
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    this.lJe.Refresh(e),
      this.uJe.Refresh(e),
      this._Je.Refresh(e),
      this.cJe.OnChangeRole(e);
  }
  Reset() {
    (this.lJe = void 0),
      (this.uJe = void 0),
      (this._Je = void 0),
      (this.cJe = void 0),
      super.Reset();
  }
  OnShowBattleChildViewPanel() {
    this.lJe?.SetNiagaraActive(!1);
  }
  OnTickBattleChildViewPanel(e) {
    this.lJe?.Tick(e), this._Je?.Tick(e), this.cJe?.Tick(e);
  }
  async CJe() {
    var e = this.GetItem(0);
    (this.lJe = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      RoleStateView_1.RoleStateView,
    )),
      await this.lJe.ShowAsync();
  }
  async fJe() {
    var e = this.GetItem(1);
    this.uJe = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      ConcertoResponseItem_1.ConcertoResponseItem,
    );
  }
  async gJe() {
    var e = this.GetItem(3);
    (this._Je = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      RoleBuffView_1.RoleBuffView,
    )),
      await this._Je.ShowAsync();
  }
  async pJe() {
    var e = this.GetItem(2);
    (this.cJe = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      SpecialEnergyBarContainer_1.SpecialEnergyBarContainer,
      this.GetItem(4),
    )),
      await this.cJe.ShowAsync();
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
      );
  }
}
((exports.BottomPanel = BottomPanel).vJe = void 0), (BottomPanel.kQe = void 0);
//# sourceMappingURL=BottomPanel.js.map
