"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RaceStrengthHandle = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../Abilities/FormationAttributeController"),
  MigrationStrengthUnit_1 = require("../HudUnit/MigrationStrengthUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class RaceStrengthHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.VisibleTagId = 0),
      (this.SpeedUpTagId = 0),
      (this.FormationAttributeId = 8),
      (this.StrengthUnit = void 0),
      (this.RoleData = void 0),
      (this.TagTaskList = []),
      (this.IsVisible = !1),
      (this.IsSpeedUp = !1),
      (this.xie = () => {
        this.Ake(ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()),
          this.RoleData &&
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
              this,
              this.RoleData.EntityHandle,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            );
      }),
      (this.zpe = (t, i) => {
        this.RoleData?.EntityHandle === i &&
          (this.m$e(),
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            this.RoleData.EntityHandle,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ));
      }),
      (this.VGa = (t, i) => {
        (this.IsVisible = i), this.HGa();
      }),
      (this.jGa = (t, i) => {
        this.IsSpeedUp = i;
      });
  }
  OnInitialize() {
    super.OnInitialize(), this.InitTagAndAttributeId();
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    t && this.Ake(t);
  }
  InitTagAndAttributeId() {
    (this.FormationAttributeId = 8),
      (this.VisibleTagId = -640833006),
      (this.SpeedUpTagId = -1220261351);
  }
  Ake(t) {
    this.m$e(),
      t && t.EntityHandle?.Valid
        ? ((this.RoleData = t),
          this.StrengthUnit?.RefreshEntity(t),
          this.c$e(),
          (this.IsVisible = this.RoleData.GameplayTagComponent.HasTag(
            this.VisibleTagId,
          )),
          (this.IsSpeedUp = this.RoleData.GameplayTagComponent.HasTag(
            this.SpeedUpTagId,
          )),
          this.HGa())
        : ((this.RoleData = void 0),
          this.StrengthUnit?.RefreshEntity(void 0),
          this.StrengthUnit?.SetVisible(!1));
  }
  HGa() {
    this.IsVisible ? this.WGa() : this.StrengthUnit?.SetVisible(!1);
  }
  WGa() {
    this.StrengthUnit ||
      (this.StrengthUnit = this.NewHudUnitWithReturn(
        MigrationStrengthUnit_1.MigrationStrengthUnit,
        "UiItem_EnduranceB",
        !1,
        () => {
          this.StrengthUnit &&
            (this.StrengthUnit.InitData(4),
            this.StrengthUnit.RefreshEntity(this.RoleData),
            this.xni());
        },
      )),
      this.StrengthUnit.SetVisible(!0);
  }
  OnDestroyed() {
    super.OnDestroyed(), (this.StrengthUnit = void 0), this.Ake(void 0);
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
    this.mdt(this.VisibleTagId, this.VGa),
      this.mdt(this.SpeedUpTagId, this.jGa);
  }
  m$e() {
    for (const t of this.TagTaskList) t?.EndTask();
    this.TagTaskList.length = 0;
  }
  mdt(t, i) {
    t = this.RoleData.GameplayTagComponent.ListenForTagAddOrRemove(t, i);
    t && this.TagTaskList.push(t);
  }
  xni() {
    var t =
        FormationAttributeController_1.FormationAttributeController.GetValue(
          this.FormationAttributeId,
        ),
      i = FormationAttributeController_1.FormationAttributeController.GetMax(
        this.FormationAttributeId,
      );
    this.StrengthUnit.SetStrengthPercent(t, i);
  }
  OnTick(t) {
    super.OnTick(t),
      this.IsVisible &&
        this.StrengthUnit &&
        this.StrengthUnit.IsShowOrShowing &&
        (this.StrengthUnit.RefreshTargetPosition(t),
        this.StrengthUnit.SetRecoverState(this.IsSpeedUp),
        this.xni(),
        this.StrengthUnit.TickRecoverAnim(t));
  }
}
exports.RaceStrengthHandle = RaceStrengthHandle;
//# sourceMappingURL=RaceStrengthHandle.js.map
