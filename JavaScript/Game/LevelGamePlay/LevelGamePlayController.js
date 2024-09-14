"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGamePlayController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Time_1 = require("../../Core/Common/Time"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Net_1 = require("../../Core/Net/Net"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatMessage_1 = require("../Module/CombatMessage/CombatMessage"),
  EntityHandle_1 = require("../NewWorld/Character/EntityHandle"),
  SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager"),
  WaitEntityTask_1 = require("../World/Define/WaitEntityTask"),
  SHOW_FAKE_ERROR_CODE_TIPS_INTERVAL = 1e3;
class LevelGamePlayController extends ControllerBase_1.ControllerBase {
  static HandleScanResponse(e) {
    return !(
      !e ||
      !UE.KuroStaticLibrary.IsImplementInterface(
        e.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      ) ||
      ((e = e), !(e = EntitySystem_1.EntitySystem.Get(e.GetEntityId()))) ||
      (e.GetComponent(74)?.StartProcess(),
      e.GetComponent(62)?.ShowScanEffect(),
      0)
    );
  }
  static HandleClearAllScanEffect() {}
  static MultiplayerLimitTypeCheck(e, t = !0) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
    switch (e) {
      case 2:
        return t && LevelGamePlayController.ShowFakeErrorCodeTips(), !1;
      case 0:
        var r =
          ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
          ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
        return !r && t && LevelGamePlayController.ShowFakeErrorCodeTips(), r;
      case 1:
        return !0;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              7,
              "[MultiplayerCommonCheck] 不支持的联机限制类型",
            ),
          !1
        );
    }
  }
  static ShowFakeErrorCodeTips() {
    var e;
    Time_1.Time.Now - this.lUe < SHOW_FAKE_ERROR_CODE_TIPS_INTERVAL ||
      ((this.lUe = Time_1.Time.Now),
      (e =
        ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(600064)),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        9,
        void 0,
        void 0,
        [e],
      ));
  }
  static OnInit() {
    return (
      Net_1.Net.Register(26763, LevelGamePlayController._Ue),
      Net_1.Net.Register(18924, LevelGamePlayController.uUe),
      Net_1.Net.Register(15885, LevelGamePlayController.cUe),
      Net_1.Net.Register(25095, LevelGamePlayController.mUe),
      Net_1.Net.Register(15374, LevelGamePlayController.dUe),
      Net_1.Net.Register(
        27866,
        LevelGamePlayController.OnEnableNearbyTrackingNotify,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.CUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
        this.gUe,
      ),
      (this.fUe = new Map()),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(26763),
      Net_1.Net.UnRegister(18924),
      Net_1.Net.UnRegister(15885),
      Net_1.Net.UnRegister(25095),
      Net_1.Net.UnRegister(15374),
      Net_1.Net.UnRegister(27866),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.CUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
        this.gUe,
      ),
      !(this.fUe = void 0)
    );
  }
  static ThrowDamageChangeRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Dms.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (r.I5n = MathUtils_1.MathUtils.BigIntToLong(t)),
      Net_1.Net.Call(24959, r, (e) => {
        switch (e.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrThrowDamageEntityNotExit:
          case Protocol_1.Aki.Protocol.Q4n
            .Proto_ErrThrowDamageReqEntityIsAlreadyDead:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              22800,
            );
        }
      });
  }
  static ManipulatableBeCastOrDrop2Server(e, t) {
    var r = Protocol_1.Aki.Protocol.Uds.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (r.T5n = t ? 1 : 2),
      Net_1.Net.Call(20527, r, (e) => {
        switch (e.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              22800,
            );
        }
      });
  }
  static async GetRewardTreasureBoxRequest(e) {
    if (this.fUe?.get(e)) return !1;
    this.fUe.set(e, !0);
    var t = Protocol_1.Aki.Protocol.wms.create(),
      t =
        ((t.F4n = MathUtils_1.MathUtils.NumberToLong(
          ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
        )),
        await Net_1.Net.CallAsync(27451, t));
    return (
      this.fUe.delete(e),
      !!t &&
        (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Q4n,
              26500,
            ),
            !1)
          : (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OpenTreasureBox,
            ),
            !0))
    );
  }
  static ElevatorStateChangeRequest(e, t, r, a) {
    var o = Protocol_1.Aki.Protocol.WZn.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (o.L5n = t),
      (o.Y4n = r),
      Net_1.Net.Call(24055, o, (e) => {
        if ((a(), e))
          switch (e.Q4n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrElevatorLocked:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15801,
              );
          }
      });
  }
  static OnManipulatableItemExitAreaInternal(t, r, a = 0, o = !1) {
    if (t) {
      let e = void 0;
      var l,
        n,
        i,
        _ = (e =
          t instanceof EntityHandle_1.EntityHandle ? t.Entity : t).GetComponent(
          187,
        );
      _.IsMoveAutonomousProxy &&
        ((n = new UE.Transform()),
        (i = (0, puerts_1.$ref)(void 0)),
        (l = (0, puerts_1.$ref)(void 0)),
        SceneInteractionManager_1.SceneInteractionManager.Get()
          .GetMainCollisionActor(_.GetSceneInteractionLevelHandleId())
          .GetActorBounds(!1, i, l),
        n.SetLocation((0, puerts_1.$unref)(i)),
        (_ = e.GetComponent(143)),
        (l = r ?? "ResetPositionTip"),
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          l,
        ),
        _
          ? (o
              ? _.ResetItemLocationAndRotation(a, !0)
              : _.ResetItemLocationAndRotation(),
            (n = Global_1.Global.BaseCharacter) &&
              ((i = n.CharacterActorComponent.Entity.GetComponent(57)),
              t.Id === i.GetHoldingEntity()?.Id) &&
              i.StopManipualte())
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              32,
              "[Manipulate] 服务器返回的Entity没有SceneItemManipulatableComponent",
            ));
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Character",
          32,
          "[Manipulate] 服务器返回的Id找不到对应的Entity",
        );
  }
  static EntityFollowTrackRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Nds.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(20847, r, t);
  }
  static EntityBuffProducerRequest(e, t) {
    var r = Protocol_1.Aki.Protocol._es.create();
    (r.D5n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(24695, r, t);
  }
  static ShootTargetHitGearStateChangeRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Lms.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      Net_1.Net.Call(16494, r, t);
  }
  static OnEnableNearbyTrackingNotify(t) {
    for (const e of t.PSs) {
      const r = MathUtils_1.MathUtils.LongToNumber(e);
      WaitEntityTask_1.WaitEntityTask.Create(r, (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) &&
          (e = e.Entity.GetComponent(147)) &&
          (e.EnableTracking = t.yIs);
      });
    }
  }
  static EntityAdsorbRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Fes.create();
    (r.F4n = e), Net_1.Net.Call(19484, r, t);
  }
  static RequestChairSit(e, t, r) {
    var a = Protocol_1.Aki.Protocol.rms.create(),
      e =
        ((a.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
        (a.U5n = t),
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
          0,
        ).GetCreatureDataId());
    e && (a.R5n = CombatMessage_1.CombatNet.CreateCombatCommon(e)),
      (a.x5n = r),
      Net_1.Net.Call(22679, a, (e) => {
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(
          26,
        )?.OnResponseSit(t, e.Q4n);
      });
  }
}
((exports.LevelGamePlayController = LevelGamePlayController).fUe = void 0),
  (LevelGamePlayController.lUe = 0),
  (LevelGamePlayController.cUe = (e) => {}),
  (LevelGamePlayController.uUe = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "World",
        18,
        "服务端通知耐久度变化",
        ["CreatureDataId", e.F4n],
        ["耐久度", e.jqs],
      );
    var t,
      r,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(e.F4n),
      );
    a?.Valid &&
      ((t = a.Entity.GetComponent(0)),
      (e = e.jqs),
      (r = t.GetDurabilityValue()),
      t.SetDurabilityValue(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
        a,
        e,
        r,
      ));
  }),
  (LevelGamePlayController._Ue = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t &&
      (t.Entity.GetComponent(0).UpdateEntityCommonTags(e.aSs),
      t.Entity.GetComponent(181).SyncTagsFromServer(e.aSs));
  }),
  (LevelGamePlayController.dUe = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t
      ? (t = t.Entity.GetComponent(126)) && t.SetTargetFloor(e.P5n)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneItem", 36, "OnElevatorMoveNotify No Entity", [
          "id",
          e.F4n,
        ]);
  }),
  (LevelGamePlayController.mUe = (e) => {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.F4n);
    LevelGamePlayController.OnManipulatableItemExitAreaInternal(e, void 0);
  }),
  (LevelGamePlayController.CUe = (e, t) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.AddVisionCapture(e, t);
  }),
  (LevelGamePlayController.gUe = (e) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.RemoveVisionCapture(e);
  });
//# sourceMappingURL=LevelGamePlayController.js.map
