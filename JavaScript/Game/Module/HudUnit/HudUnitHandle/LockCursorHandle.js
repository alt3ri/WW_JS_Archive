"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockCursorHandle = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  BattleUiControl_1 = require("../../BattleUi/BattleUiControl"),
  LockCursorUnit_1 = require("../HudUnit/LockCursorUnit"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  Info_1 = require("../../../../Core/Common/Info"),
  HIT_CASE_SOCKET = new UE.FName("HitCase");
class LockCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Uua = new Vector2D_1.Vector2D()),
      (this.Poi = void 0),
      (this.v$e = !1),
      (this.xoi = !1),
      (this.woi = !1),
      (this.Boi = 0),
      (this.boi = (t, e) => {
        Info_1.Info.IsInGamepad() &&
          (0 === e ? (this.woi = void 0 !== this.Poi) : (this.xoi = !0)),
          this.Poi &&
            !ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
              188,
            )?.HasTag(-2140742267) &&
            (0 === e ? this.qoi() : this.Goi());
      }),
      (this.Noi = (t, e) => {
        102 === e && (t ? this.qoi() : this.Goi());
      }),
      (this.VJe = (t, e) => {
        t ? (this.Boi = e) : e === this.Boi && (this.Boi = 0);
      });
  }
  OnAddEvents() {
    InputDistributeController_1.InputDistributeController.BindAction(
      InputMappingsDefine_1.actionMappings.锁定目标,
      this.boi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
        this.Noi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.VJe,
      );
  }
  OnRemoveEvents() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.锁定目标,
      this.boi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
        this.Noi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.VJe,
      );
  }
  OnDestroyed() {
    this.Poi = void 0;
  }
  qoi() {
    var t, e;
    this.Poi &&
      ((e = (t =
        ModelManager_1.ModelManager.SceneTeamModel
          .GetCurrentEntity).Entity.GetComponent(188)),
      (t = t.Entity.GetComponent(53)),
      e.HasTag(-1150819426)) &&
      ((e =
        t.BpInputComp.UnlockLongPressTime *
        TimeUtil_1.TimeUtil.InverseMillisecond),
      this.Poi.ActivateUnlockTimeDown(e));
  }
  Goi() {
    this.Poi?.DeactivateUnlockTimeDown();
  }
  OnTick(t) {
    var e;
    super.OnTick(t),
      this.v$e ||
        ((t = this.GetTargetInfo()),
        this.xoi &&
          ((this.xoi = !1),
          this.woi ||
            t.ShowTarget ||
            this.Ooi() ||
            BattleUiControl_1.BattleUiControl.ResetFocus()),
        t &&
        t.ShowTarget?.Valid &&
        t.ShowTarget.Id !== this.Boi &&
        (e = this.GetWorldLocation()) &&
        HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
          e,
          this.Uua,
        )
          ? (this.Activate(),
            this.Poi &&
              (this.Poi.UpdateShowTargetState(t.ShowTarget),
              this.Poi.RefreshManualLockVisible(),
              this.Poi.GetRootItem().SetAnchorOffset(
                this.Uua.ToUeVector2D(!0),
              )))
          : this.Deactivate());
  }
  Ooi() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !!t?.Valid &&
      t.Entity.GetComponent(160)?.DirectionState ===
        CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
    );
  }
  Activate() {
    this.Poi
      ? this.Poi.Activate()
      : this.v$e ||
        ((this.v$e = !0),
        this.NewHudUnit(LockCursorUnit_1.LockCursorUnit, "UiItem_SuoDing").then(
          (t) => {
            t && ((this.v$e = !1), (this.Poi = t));
          },
          () => {},
        ));
  }
  Deactivate() {
    this.Poi && this.Poi.Deactivate();
  }
  GetTargetInfo() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid) return t.Entity.CheckGetComponent(29).GetTargetInfo();
  }
  GetWorldLocation() {
    var e = this.GetTargetInfo();
    if (e) {
      var i = e.ShowTarget;
      if (i?.Valid) {
        i = i.Entity.GetComponent(1).Owner;
        if (i instanceof TsBaseCharacter_1.default) {
          i = i.Mesh;
          let t = FNameUtil_1.FNameUtil.GetDynamicFName(e.SocketName);
          return (
            (t && i.DoesSocketExist(t)) || (t = HIT_CASE_SOCKET),
            i.GetSocketLocation(t)
          );
        }
      }
    }
  }
}
exports.LockCursorHandle = LockCursorHandle;
//# sourceMappingURL=LockCursorHandle.js.map
