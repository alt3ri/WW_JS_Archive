"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BottomPanel = void 0);
const UE = require("ue");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleUiDefine_1 = require("../../BattleUiDefine");
const ConcertoResponseItem_1 = require("../ConcertoResponseItem");
const RoleBuffView_1 = require("../RoleBuffView");
const RoleStateView_1 = require("../RoleStateView");
const SpecialEnergyBarContainer_1 = require("../SpecialEnergy/SpecialEnergyBarContainer");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
class BottomPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.J$e = void 0),
      (this.z$e = void 0),
      (this.Z$e = void 0),
      (this.eYe = void 0),
      (this.tYe = (e) => {
        this.Z$e?.RefreshVisible();
      }),
      (this.xie = () => {
        const e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        e &&
          (e.IsPhantom() && e.RoleConfig.SpecialEnergyBarId > 0
            ? (this.J$e.Refresh(void 0), this.Z$e.Refresh(void 0))
            : (this.J$e.Refresh(e), this.Z$e.Refresh(e)),
          this.z$e.Refresh(e),
          this.eYe.OnChangeRole(e));
      }),
      (this.zpe = (e) => {
        this.J$e.GetEntityId() === e.Id && this.J$e.Refresh(void 0),
          this.Z$e.GetEntityId() === e.Id && this.Z$e.Refresh(void 0),
          this.z$e.GetEntityId() === e.Id && this.z$e.Refresh(void 0),
          this.eYe.OnRemoveEntity(e.Id);
      }),
      (this.iYe = (e, t) => {
        const i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (i?.Valid && t && i.Id === e)
          for (const s of t.dfs)
            s.Ugs === EAttributeId.Proto_Life &&
              this.J$e.RefreshHpAndShield(!0);
      }),
      (this.pKe = (e, t, i, s) => {
        this.z$e.GetEntityId() === e &&
          t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
          (i
            ? this.z$e.AddBuffItem(t, s, !0)
            : this.z$e.DeactivateBuffItem(s, !0));
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
    await Promise.all([this.oYe(), this.rYe(), this.nYe(), this.sYe()]);
    const e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    this.J$e.Refresh(e),
      this.Z$e.Refresh(e),
      this.z$e.Refresh(e),
      this.eYe.OnChangeRole(e);
  }
  Reset() {
    (this.J$e = void 0),
      (this.Z$e = void 0),
      (this.z$e = void 0),
      (this.eYe = void 0),
      super.Reset();
  }
  OnShowBattleChildViewPanel() {
    this.J$e?.SetNiagaraActive(!1);
  }
  OnTickBattleChildViewPanel(e) {
    this.J$e?.Tick(e), this.z$e?.Tick(e), this.eYe?.Tick(e);
  }
  async oYe() {
    const e = this.GetItem(0);
    (this.J$e = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      RoleStateView_1.RoleStateView,
    )),
      await this.J$e.ShowAsync();
  }
  async nYe() {
    const e = this.GetItem(1);
    this.Z$e = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      ConcertoResponseItem_1.ConcertoResponseItem,
    );
  }
  async rYe() {
    const e = this.GetItem(3);
    (this.z$e = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      RoleBuffView_1.RoleBuffView,
    )),
      await this.z$e.ShowAsync();
  }
  async sYe() {
    const e = this.GetItem(2);
    (this.eYe = await this.NewStaticChildViewAsync(
      e.GetOwner(),
      SpecialEnergyBarContainer_1.SpecialEnergyBarContainer,
      this.GetItem(4),
    )),
      await this.eYe.ShowAsync();
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
        this.pKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnServerAttributeChange,
        this.iYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.tYe,
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
        this.iYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.pKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.tYe,
      );
  }
}
((exports.BottomPanel = BottomPanel).aYe = void 0), (BottomPanel.RKe = void 0);
// # sourceMappingURL=BottomPanel.js.map
