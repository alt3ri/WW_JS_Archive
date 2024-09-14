"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MigrationStrengthHandle = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../Abilities/FormationAttributeController"),
  MigrationStrengthUnit_1 = require("../HudUnit/MigrationStrengthUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class MigrationStrengthHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.N2a = 0),
      (this.F2a = 0),
      (this.V2a = 8),
      (this.vni = void 0),
      (this.Wst = void 0),
      (this.ldt = []),
      (this.Lrt = !1),
      (this.aNa = !1),
      (this.xie = () => {
        this.Ake(ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()),
          this.Wst &&
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
              this,
              this.Wst.EntityHandle,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            );
      }),
      (this.zpe = (t, i) => {
        this.Wst?.EntityHandle === i &&
          (this.m$e(),
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            this.Wst.EntityHandle,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ));
      }),
      (this.H2a = (t, i) => {
        (this.Lrt = i), this.j2a();
      }),
      (this.W2a = (t, i) => {
        this.aNa = i;
      });
  }
  OnInitialize() {
    super.OnInitialize(), (this.N2a = -640833006), (this.F2a = -1220261351);
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    t && this.Ake(t);
  }
  Ake(t) {
    this.m$e(),
      t && t.EntityHandle?.Valid
        ? ((this.Wst = t),
          this.vni?.RefreshEntity(t),
          this.c$e(),
          (this.Lrt = this.Wst.GameplayTagComponent.HasTag(this.N2a)),
          (this.aNa = this.Wst.GameplayTagComponent.HasTag(this.F2a)),
          this.j2a())
        : ((this.Wst = void 0),
          this.vni?.RefreshEntity(void 0),
          this.vni?.SetVisible(!1));
  }
  j2a() {
    this.Lrt ? this.Q2a() : this.vni?.SetVisible(!1);
  }
  Q2a() {
    this.vni ||
      (this.vni = this.NewHudUnitWithReturn(
        MigrationStrengthUnit_1.MigrationStrengthUnit,
        "UiItem_EnduranceB",
        !1,
        () => {
          this.vni &&
            (this.vni.InitData(4),
            this.vni.RefreshEntity(this.Wst),
            this.xni());
        },
      )),
      this.vni.SetVisible(!0);
  }
  OnDestroyed() {
    super.OnDestroyed(), (this.vni = void 0), this.Ake(void 0);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    ),
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  c$e() {
    this.mdt(this.N2a, this.H2a), this.mdt(this.F2a, this.W2a);
  }
  m$e() {
    for (const t of this.ldt) t?.EndTask();
    this.ldt.length = 0;
  }
  mdt(t, i) {
    t = this.Wst.GameplayTagComponent.ListenForTagAddOrRemove(t, i);
    t && this.ldt.push(t);
  }
  xni() {
    var t =
        FormationAttributeController_1.FormationAttributeController.GetValue(
          this.V2a,
        ),
      i = FormationAttributeController_1.FormationAttributeController.GetMax(
        this.V2a,
      );
    this.vni.SetStrengthPercent(t, i);
  }
  OnTick(t) {
    super.OnTick(t),
      this.Lrt &&
        this.vni &&
        this.vni.IsShowOrShowing &&
        (this.vni.RefreshTargetPosition(t),
        this.vni.SetRecoverState(this.aNa),
        this.xni(),
        this.vni.TickRecoverAnim(t));
  }
}
exports.MigrationStrengthHandle = MigrationStrengthHandle;
//# sourceMappingURL=MigrationStrengthHandle.js.map
