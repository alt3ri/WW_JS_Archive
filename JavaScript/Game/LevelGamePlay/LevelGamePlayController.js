"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGamePlayController = void 0);
const UE = require("ue"),
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
      (e.GetComponent(81)?.StartProcess(),
      e.GetComponent(69)?.ShowScanEffect(),
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
      Net_1.Net.Register(18769, LevelGamePlayController._Ue),
      Net_1.Net.Register(20305, LevelGamePlayController.uUe),
      Net_1.Net.Register(17140, LevelGamePlayController.cUe),
      Net_1.Net.Register(25311, LevelGamePlayController.dUe),
      Net_1.Net.Register(
        28154,
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
      Net_1.Net.UnRegister(18769),
      Net_1.Net.UnRegister(20305),
      Net_1.Net.UnRegister(17140),
      Net_1.Net.UnRegister(25311),
      Net_1.Net.UnRegister(28154),
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
      (r.I5n = MathUtils_1.MathUtils.NumberToLong(t)),
      Net_1.Net.Call(20247, r, (e) => {
        switch (e.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrThrowDamageEntityNotExit:
          case Protocol_1.Aki.Protocol.Q4n
            .Proto_ErrThrowDamageReqEntityIsAlreadyDead:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              18244,
            );
        }
      });
  }
  static ManipulatableBeCastOrDrop2Server(e, t) {
    var r = Protocol_1.Aki.Protocol.Uds.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (r.vul = t),
      Net_1.Net.Call(20648, r, (e) => {
        switch (e.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              18244,
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
        await Net_1.Net.CallAsync(18734, t));
    return (
      this.fUe.delete(e),
      !!t &&
        (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Q4n,
              25700,
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
      Net_1.Net.Call(18883, o, (e) => {
        if ((a(), e))
          switch (e.Q4n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrElevatorLocked:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27341,
              );
          }
      });
  }
  static OnManipulatableItemExitAreaInternal(e, t, r = 0) {
    var a,
      o,
      l,
      n = e instanceof EntityHandle_1.EntityHandle ? e.Entity : e;
    e && n
      ? ((o = n.GetComponent(200)),
        (l = n.GetComponent(156)),
        (a = n.GetComponent(154)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              31,
              "[Manipulate] 重置控物对象实体时找不到对应的控物组件",
            )),
        o &&
          l &&
          l.HasMoveAuthority() &&
          (a?.ResetItemLocationAndRotation(r, !0), (o = n.GetComponent(164))) &&
          o.StopTimerOnResetPos(),
        a &&
          a.ControlledByLocalPlayer() &&
          ((l = t ?? "ResetPositionTip"),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            l,
          ),
          (r =
            Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity)) &&
          (n = r.GetComponent(64)) &&
          e.Id === n.GetHoldingEntity()?.Id &&
          n.StopManipulate())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          19,
          "[Manipulate] 重置控物对象实体时找不到对应的Entity",
        );
  }
  static EntityFollowTrackRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Nds.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(16247, r, t);
  }
  static EntityBuffProducerRequest(e, t) {
    var r = Protocol_1.Aki.Protocol._es.create();
    (r.D5n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(20646, r, t);
  }
  static ShootTargetHitGearStateChangeRequest(e, t, r, a) {
    var o = Protocol_1.Aki.Protocol.Lms.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (o.yX_ = t),
      (o.Mjn = r),
      Net_1.Net.Call(22222, o, a);
  }
  static OnEnableNearbyTrackingNotify(t) {
    for (const e of t.PSs) {
      const r = MathUtils_1.MathUtils.LongToNumber(e);
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGamePlayController.OnEnableNearbyTrackingNotify",
        r,
        (e) => {
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) &&
            (e = e.Entity.GetComponent(158)) &&
            (e.EnableTracking = t.yIs);
        },
        6e4,
        !0,
        !0,
      );
    }
  }
  static EntityAdsorbRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Fes.create();
    (r.F4n = e), Net_1.Net.Call(18350, r, t);
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
      Net_1.Net.Call(19348, a, (e) => {
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(
          29,
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
        17,
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
      t.Entity.GetComponent(194).SyncTagsFromServer(e.aSs));
  }),
  (LevelGamePlayController.dUe = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t
      ? (t = t.Entity.GetComponent(137)) && t.SetTargetFloor(e.P5n)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneItem", 35, "OnElevatorMoveNotify No Entity", [
          "id",
          e.F4n,
        ]);
  }),
  (LevelGamePlayController.CUe = (e, t) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.AddVisionCapture(e, t);
  }),
  (LevelGamePlayController.gUe = (e) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.RemoveVisionCapture(e);
  });
//# sourceMappingURL=LevelGamePlayController.js.map
