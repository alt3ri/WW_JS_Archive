"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockPredictedHandle = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LockPredictedUnit_1 = require("../HudUnit/LockPredictedUnit"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  HIT_CASE_SOCKET = new UE.FName("HitCase");
class LockPredictedHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Uua = new Vector2D_1.Vector2D()),
      (this.Sda = void 0),
      (this.v$e = !1),
      (this.dDr = !1),
      (this.rqo = void 0),
      (this.Eda = () => {
        this.yyo();
      }),
      (this.lne = (e, t) => {
        (this.dDr = t),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 18, "预测锁定Tag改变", ["HasTag", t]),
          this.dDr || this.Deactivate();
      });
  }
  OnInitialize() {
    super.OnInitialize(), this.yyo();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.Eda,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.Eda,
    );
  }
  yyo() {
    this.yda();
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    e &&
      e.EntityHandle?.Valid &&
      (e = e.GameplayTagComponent) &&
      ((this.dDr = e.HasTag(-126337119)),
      (this.rqo = e.ListenForTagAddOrRemove(-126337119, this.lne)),
      this.dDr || this.Deactivate());
  }
  OnDestroyed() {
    (this.Sda = void 0), this.yda();
  }
  yda() {
    (this.dDr = !1), this.rqo && (this.rqo.EndTask(), (this.rqo = void 0));
  }
  OnTick(e) {
    super.OnTick(e),
      !this.v$e &&
        this.dDr &&
        ((e = this.GetTargetInfo()) &&
        e.EntityHandle?.Valid &&
        (e = this.GetWorldLocation(e)) &&
        HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
          e,
          this.Uua,
        )
          ? (this.Activate(),
            this.Sda &&
              this.Sda.GetRootItem()?.SetAnchorOffset(
                this.Uua.ToUeVector2D(!0),
              ))
          : this.Deactivate());
  }
  Activate() {
    this.Sda
      ? this.Sda.Activate()
      : this.v$e ||
        ((this.v$e = !0),
        this.NewHudUnit(
          LockPredictedUnit_1.LockPredictedUnit,
          "UiItem_SuoDingArrow",
        ).then(
          (e) => {
            e && ((this.v$e = !1), (this.Sda = e));
          },
          () => {},
        ));
  }
  Deactivate() {
    this.Sda && this.Sda.Deactivate();
  }
  GetTargetInfo() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e?.Valid)
      return e.Entity.CheckGetComponent(29).GetPredictedLockOnTarget();
  }
  GetWorldLocation(t) {
    var i = t.EntityHandle;
    if (i?.Valid) {
      i = i.Entity.GetComponent(1).Owner;
      if (i instanceof TsBaseCharacter_1.default) {
        i = i.Mesh;
        let e = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName);
        return (
          (e && i.DoesSocketExist(e)) || (e = HIT_CASE_SOCKET),
          i.GetSocketLocation(e)
        );
      }
    }
  }
}
exports.LockPredictedHandle = LockPredictedHandle;
//# sourceMappingURL=LockPredictedHandle.js.map
