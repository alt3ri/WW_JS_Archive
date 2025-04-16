"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockCursorHandle = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
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
  PhantomUtil_1 = require("../../Phantom/PhantomUtil"),
  LockCursorUnit_1 = require("../HudUnit/LockCursorUnit"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  HIT_CASE_SOCKET = new UE.FName("HitCase");
class LockCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.jma = new Vector2D_1.Vector2D()),
      (this.Poi = void 0),
      (this.v$e = !1),
      (this.xoi = !1),
      (this.woi = !1),
      (this.Boi = 0),
      (this.vG_ = void 0),
      (this.yG_ = void 0),
      (this.SG_ = void 0),
      (this.MG_ = !1),
      (this.boi = (t, i) => {
        Info_1.Info.IsInGamepad() &&
          (0 === i ? (this.woi = void 0 !== this.Poi) : (this.xoi = !0)),
          this.Poi &&
            !ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
              203,
            )?.HasTag(-2140742267) &&
            (0 === i ? this.qoi() : this.Goi());
      }),
      (this.Noi = (t, i) => {
        102 === i && (t ? this.qoi() : this.Goi());
      }),
      (this.VJe = (t, i) => {
        t ? (this.Boi = i) : i === this.Boi && (this.Boi = 0);
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
    this.EG_(), (this.Poi = void 0);
  }
  qoi() {
    var t;
    this.Poi?.IsForceLockState() &&
      ((t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
          61,
        ).GetBpInputComp().UnlockLongPressTime *
        TimeUtil_1.TimeUtil.InverseMillisecond),
      this.Poi.ActivateUnlockTimeDown(t));
  }
  Goi() {
    this.Poi?.DeactivateUnlockTimeDown();
  }
  OnTick(t) {
    super.OnTick(t),
      this.v$e ||
        (this.IG_(),
        this.xoi &&
          ((this.xoi = !1),
          this.woi ||
            this.vG_ ||
            this.Ooi() ||
            BattleUiControl_1.BattleUiControl.ResetFocus()),
        this.vG_ &&
        this.vG_.Id !== this.Boi &&
        (t = this.Koi(this.vG_, this.yG_)) &&
        HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
          t,
          this.jma,
        )
          ? (this.Activate(),
            this.Poi &&
              (this.Poi.Refresh(this.vG_, this.SG_, this.MG_),
              this.Poi.GetRootItem().SetAnchorOffset(
                this.jma.ToUeVector2D(!0),
              )),
            this.EG_())
          : this.Deactivate());
  }
  Ooi() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !!t?.Valid &&
      t.Entity.GetComponent(173)?.DirectionState ===
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
    this.EG_(), this.Poi && this.Poi.Deactivate();
  }
  IG_() {
    this.EG_();
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid) {
      const e = t.Entity.CheckGetComponent(32);
      var i = e.GetTargetInfo();
      if (i.ShowTarget?.Valid)
        (this.vG_ = i.ShowTarget),
          (this.yG_ = i.SocketName),
          (this.SG_ = t),
          (this.MG_ = !0);
      else if (t.Entity.GetComponent(203)?.HasTag(-2100129479)) {
        i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          t.Entity,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
        );
        if (i?.Valid) {
          const e = i.Entity.CheckGetComponent(32);
          e &&
            (t = e.GetTargetInfo()).ShowTarget?.Valid &&
            ((this.vG_ = t.ShowTarget),
            (this.yG_ = t.SocketName),
            (this.SG_ = i));
        }
      }
    }
  }
  EG_() {
    (this.vG_ = void 0),
      (this.yG_ = void 0),
      (this.SG_ = void 0),
      (this.MG_ = !1);
  }
  Koi(i, e) {
    if (i?.Valid) {
      i = i.Entity.GetComponent(1).Owner;
      if (i instanceof TsBaseCharacter_1.default) {
        i = i.Mesh;
        let t = FNameUtil_1.FNameUtil.GetDynamicFName(e);
        return (
          (t && i.DoesSocketExist(t)) || (t = HIT_CASE_SOCKET),
          i.D_GetSocketLocation(t)
        );
      }
    }
  }
}
exports.LockCursorHandle = LockCursorHandle;
//# sourceMappingURL=LockCursorHandle.js.map
