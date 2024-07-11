"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockCursorHandle = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
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
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  HIT_CASE_SOCKET = new UE.FName("HitCase");
class LockCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Aii = void 0),
      (this.aXe = !1),
      (this.Pii = !1),
      (this.xii = !1),
      (this.wii = 0),
      (this.Bii = (t, e) => {
        ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          (0 === e ? (this.xii = void 0 !== this.Aii) : (this.Pii = !0)),
          this.Aii &&
            !ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
              185,
            )?.HasTag(-2140742267) &&
            (0 === e ? this.bii() : this.qii());
      }),
      (this.Gii = (t, e) => {
        102 === e && (t ? this.bii() : this.qii());
      }),
      (this.AYe = (t, e) => {
        t ? (this.wii = e) : e === this.wii && (this.wii = 0);
      });
  }
  OnAddEvents() {
    InputDistributeController_1.InputDistributeController.BindAction(
      InputMappingsDefine_1.actionMappings.锁定目标,
      this.Bii,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
        this.Gii,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.AYe,
      );
  }
  OnRemoveEvents() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.锁定目标,
      this.Bii,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
        this.Gii,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.AYe,
      );
  }
  OnDestroyed() {
    this.Aii = void 0;
  }
  bii() {
    var t, e;
    this.Aii &&
      ((e = (t =
        ModelManager_1.ModelManager.SceneTeamModel
          .GetCurrentEntity).Entity.GetComponent(185)),
      (t = t.Entity.GetComponent(52)),
      e.HasTag(-1150819426)) &&
      ((e =
        t.BpInputComp.UnlockLongPressTime *
        TimeUtil_1.TimeUtil.InverseMillisecond),
      this.Aii.ActivateUnlockTimeDown(e));
  }
  qii() {
    this.Aii?.DeactivateUnlockTimeDown();
  }
  OnTick(t) {
    var e;
    super.OnTick(t),
      this.aXe ||
        ((t = this.GetTargetInfo()),
        this.Pii &&
          ((this.Pii = !1),
          this.xii ||
            t.ShowTarget ||
            this.Nii() ||
            BattleUiControl_1.BattleUiControl.ResetFocus()),
        t &&
        t.ShowTarget?.Valid &&
        t.ShowTarget.Id !== this.wii &&
        (e = this.GetWorldLocation()) &&
        (e = this.ProjectWorldToScreen(e))
          ? (this.Activate(),
            this.Aii &&
              (this.Aii.UpdateShowTargetState(t.ShowTarget),
              this.Aii.RefreshManualLockVisible(),
              (t = this.Aii.GetRootItem()).SetAnchorOffsetX(e.X),
              t.SetAnchorOffsetY(e.Y)))
          : this.Deactivate());
  }
  Nii() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !!t?.Valid &&
      t.Entity.GetComponent(158)?.DirectionState ===
        CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
    );
  }
  Activate() {
    this.Aii
      ? this.Aii.Activate()
      : this.aXe ||
        ((this.aXe = !0),
        this.NewHudUnit(LockCursorUnit_1.LockCursorUnit, "UiItem_SuoDing").then(
          (t) => {
            t && ((this.aXe = !1), (this.Aii = t));
          },
          () => {},
        ));
  }
  Deactivate() {
    this.Aii && this.Aii.Deactivate();
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
