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
      (e.GetComponent(73)?.StartProcess(),
      e.GetComponent(61)?.ShowScanEffect(),
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
      Net_1.Net.Register(23301, LevelGamePlayController._Ue),
      Net_1.Net.Register(18662, LevelGamePlayController.uUe),
      Net_1.Net.Register(16721, LevelGamePlayController.cUe),
      Net_1.Net.Register(27240, LevelGamePlayController.mUe),
      Net_1.Net.Register(24082, LevelGamePlayController.dUe),
      Net_1.Net.Register(14789, (e) => {
        this.OnEnableNearbyTrackingNotify(e);
      }),
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
      Net_1.Net.UnRegister(23301),
      Net_1.Net.UnRegister(18662),
      Net_1.Net.UnRegister(16721),
      Net_1.Net.UnRegister(27240),
      Net_1.Net.UnRegister(24082),
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
    var r = Protocol_1.Aki.Protocol.Sms.create();
    (r.P4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (r.C5n = MathUtils_1.MathUtils.BigIntToLong(t)),
      Net_1.Net.Call(14519, r, (e) => {
        switch (e.O4n) {
          case Protocol_1.Aki.Protocol.O4n.NRs:
          case Protocol_1.Aki.Protocol.O4n.Proto_ErrThrowDamageEntityNotExit:
          case Protocol_1.Aki.Protocol.O4n
            .Proto_ErrThrowDamageReqEntityIsAlreadyDead:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              10416,
            );
        }
      });
  }
  static ManipulatableBeCastOrDrop2Server(e, t) {
    var r = Protocol_1.Aki.Protocol.yds.create();
    (r.P4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (r.g5n = t ? 1 : 2),
      Net_1.Net.Call(14858, r, (e) => {
        switch (e.O4n) {
          case Protocol_1.Aki.Protocol.O4n.NRs:
          case Protocol_1.Aki.Protocol.O4n.Proto_ErrBeControlledEntityNotExist:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              10416,
            );
        }
      });
  }
  static async GetRewardTreasureBoxRequest(e) {
    if (this.fUe?.get(e)) return !1;
    this.fUe.set(e, !0);
    var t = Protocol_1.Aki.Protocol.Tms.create(),
      t =
        ((t.P4n = MathUtils_1.MathUtils.NumberToLong(
          ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
        )),
        await Net_1.Net.CallAsync(18905, t));
    return (
      this.fUe.delete(e),
      !!t &&
        (t.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.O4n,
              24972,
            ),
            !1)
          : (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OpenTreasureBox,
            ),
            !0))
    );
  }
  static ElevatorStateChangeRequest(e, t, r, a) {
    var o = Protocol_1.Aki.Protocol.kZn.create();
    (o.P4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (o.f5n = t),
      (o.F4n = r),
      Net_1.Net.Call(18267, o, (e) => {
        if ((a(), e))
          switch (e.O4n) {
            case Protocol_1.Aki.Protocol.O4n.NRs:
            case Protocol_1.Aki.Protocol.O4n.Proto_ErrElevatorLocked:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                28903,
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
          185,
        );
      _.IsMoveAutonomousProxy &&
        ((n = new UE.Transform()),
        (i = (0, puerts_1.$ref)(void 0)),
        (l = (0, puerts_1.$ref)(void 0)),
        SceneInteractionManager_1.SceneInteractionManager.Get()
          .GetMainCollisionActor(_.GetSceneInteractionLevelHandleId())
          .GetActorBounds(!1, i, l),
        n.SetLocation((0, puerts_1.$unref)(i)),
        (_ = e.GetComponent(142)),
        (l = r ?? "ResetPositionTip"),
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          l,
        ),
        _
          ? (o
              ? _.ResetItemLocationAndRotation(a, !0)
              : _.ResetItemLocationAndRotation(),
            (n = Global_1.Global.BaseCharacter) &&
              ((i = n.CharacterActorComponent.Entity.GetComponent(56)),
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
    var r = Protocol_1.Aki.Protocol.xds.create();
    (r.P4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(25800, r, t);
  }
  static EntityBuffProducerRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.res.create();
    (r.p5n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(11292, r, t);
  }
  static ShootTargetHitGearStateChangeRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.pms.create();
    (r.P4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      Net_1.Net.Call(13283, r, t);
  }
  static OnEnableNearbyTrackingNotify(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (t === e.n5n)
      for (const a of e.v5n) {
        var r =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
        r && (r = r.Entity.GetComponent(146)) && (r.EnableTracking = !1);
      }
  }
  static EntityAdsorbRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.bes.create();
    (r.P4n = e), Net_1.Net.Call(29942, r, t);
  }
  static RequestChairSit(e, t, r) {
    var a = Protocol_1.Aki.Protocol.Yds.create(),
      e =
        ((a.P4n = MathUtils_1.MathUtils.NumberToLong(e)),
        (a.M5n = t),
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
          0,
        ).GetCreatureDataId());
    e && (a.S5n = CombatMessage_1.CombatNet.CreateCombatCommon(e)),
      (a.E5n = r),
      Net_1.Net.Call(14933, a, (e) => {
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(
          26,
        )?.OnResponseSit(t, e.O4n);
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
        ["CreatureDataId", e.P4n],
        ["耐久度", e.Oqs],
      );
    var t,
      r,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(e.P4n),
      );
    a?.Valid &&
      ((t = a.Entity.GetComponent(0)),
      (e = e.Oqs),
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
    var t = MathUtils_1.MathUtils.LongToNumber(e.J4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t &&
      (t.Entity.GetComponent(0).UpdateEntityCommonTags(e.eSs),
      t.Entity.GetComponent(180).SyncTagsFromServer(e.eSs));
  }),
  (LevelGamePlayController.dUe = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t
      ? (t = t.Entity.GetComponent(125)) && t.SetTargetFloor(e.y5n)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneItem", 36, "OnElevatorMoveNotify No Entity", [
          "id",
          e.P4n,
        ]);
  }),
  (LevelGamePlayController.mUe = (e) => {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.P4n);
    LevelGamePlayController.OnManipulatableItemExitAreaInternal(e, void 0);
  }),
  (LevelGamePlayController.CUe = (e, t) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.AddVisionCapture(e, t);
  }),
  (LevelGamePlayController.gUe = (e) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.RemoveVisionCapture(e);
  });
//# sourceMappingURL=LevelGamePlayController.js.map
