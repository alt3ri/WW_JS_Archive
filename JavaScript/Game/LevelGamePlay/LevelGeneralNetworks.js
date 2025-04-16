"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralNetworks = exports.WAIT_ENTITY_ERROR_TIME = void 0);
const Log_1 = require("../../Core/Common/Log"),
  EntitySelfEventConfigByKey_1 = require("../../Core/Define/ConfigQuery/EntitySelfEventConfigByKey"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  Net_1 = require("../../Core/Net/Net"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GeneralLogicTreeDefine_1 = require("../Module/GeneralLogicTree/Define/GeneralLogicTreeDefine"),
  TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils"),
  SceneItemDynamicAttachTargetComponent_1 = require("../NewWorld/SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
  SceneItemJigsawBaseComponent_1 = require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
  SceneItemUtility_1 = require("../NewWorld/SceneItem/Util/SceneItemUtility"),
  TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle"),
  CombatLog_1 = require("../Utils/CombatLog"),
  WaitEntityTask_1 = require("../World/Define/WaitEntityTask"),
  AlertAreaController_1 = require("./AlertArea/AlertAreaController"),
  LevelGamePlayUtils_1 = require("./LevelGamePlayUtils"),
  LevelGeneralCommons_1 = require("./LevelGeneralCommons"),
  LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine"),
  LevelGeneralContextUtil_1 = require("./LevelGeneralContextUtil");
exports.WAIT_ENTITY_ERROR_TIME = 9e4;
class LevelGeneralNetworks {
  static Register() {
    Net_1.Net.Register(25630, this.QUe),
      Net_1.Net.Register(25233, LevelGeneralNetworks.XUe),
      Net_1.Net.Register(25760, LevelGeneralNetworks.$Ue),
      Net_1.Net.Register(19472, LevelGeneralNetworks.YUe),
      Net_1.Net.Register(22849, LevelGeneralNetworks.JUe),
      Net_1.Net.Register(18112, this.zUe),
      Net_1.Net.Register(18803, this.XTl),
      Net_1.Net.Register(24156, this.ZUe),
      Net_1.Net.Register(15015, this.Iqn),
      Net_1.Net.Register(27073, this.eAe),
      Net_1.Net.Register(22955, this.tAe),
      Net_1.Net.Register(20522, this.iAe),
      Net_1.Net.Register(19059, this.mza),
      Net_1.Net.Register(29648, this.dza),
      Net_1.Net.Register(21906, this.rAe),
      Net_1.Net.Register(25647, this.nAe),
      Net_1.Net.Register(15904, this.sAe),
      Net_1.Net.Register(26663, this.HPl),
      Net_1.Net.Register(19318, this.aAe),
      Net_1.Net.Register(18131, this.hAe),
      Net_1.Net.Register(29458, this.lAe),
      Net_1.Net.Register(15708, this._Ae),
      Net_1.Net.Register(19919, this.uAe),
      Net_1.Net.Register(19185, this.URn),
      Net_1.Net.Register(26554, this.vd1),
      Net_1.Net.Register(23114, this.sQs),
      Net_1.Net.Register(20073, this.mla),
      Net_1.Net.Register(22702, this.u3a),
      Net_1.Net.Register(27292, this.$Ja),
      Net_1.Net.Register(16984, this.$rh),
      Net_1.Net.Register(19537, this.xal),
      Net_1.Net.Register(15481, this.yMl),
      Net_1.Net.Register(21351, this.rEl),
      Net_1.Net.Register(22667, this.oEl),
      Net_1.Net.Register(23044, this.nEl),
      Net_1.Net.Register(22956, this.FTl),
      Net_1.Net.Register(15952, this.mwl),
      Net_1.Net.Register(19189, this.ujl),
      Net_1.Net.Register(15720, this.R2_),
      Net_1.Net.Register(24145, this.A2_),
      Net_1.Net.Register(22237, this.kZ_),
      Net_1.Net.Register(16424, this.ucc);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(25630),
      Net_1.Net.UnRegister(25233),
      Net_1.Net.UnRegister(25760),
      Net_1.Net.UnRegister(19472),
      Net_1.Net.UnRegister(18112),
      Net_1.Net.UnRegister(24156),
      Net_1.Net.UnRegister(15015),
      Net_1.Net.UnRegister(27073),
      Net_1.Net.UnRegister(20522),
      Net_1.Net.UnRegister(19059),
      Net_1.Net.UnRegister(29648),
      Net_1.Net.UnRegister(21906),
      Net_1.Net.UnRegister(15904),
      Net_1.Net.UnRegister(19318),
      Net_1.Net.UnRegister(29458),
      Net_1.Net.UnRegister(15708),
      Net_1.Net.UnRegister(19919),
      Net_1.Net.UnRegister(19185),
      Net_1.Net.UnRegister(26554),
      Net_1.Net.UnRegister(20073),
      Net_1.Net.UnRegister(22702),
      Net_1.Net.UnRegister(27292),
      Net_1.Net.UnRegister(16984),
      Net_1.Net.UnRegister(19537),
      Net_1.Net.UnRegister(15481),
      Net_1.Net.UnRegister(21351),
      Net_1.Net.UnRegister(22667),
      Net_1.Net.UnRegister(23044),
      Net_1.Net.UnRegister(22956),
      Net_1.Net.UnRegister(15952),
      Net_1.Net.UnRegister(19189),
      Net_1.Net.UnRegister(15720),
      Net_1.Net.UnRegister(24145),
      Net_1.Net.UnRegister(22237),
      Net_1.Net.UnRegister(16424);
  }
  static cAe(e) {
    var t,
      o = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      o =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          o,
        )?.Entity?.GetComponent(154);
    o
      ? ((t = MathUtils_1.MathUtils.LongToNumber(e.bDs)),
        o.SetControllerId(t),
        e.BDs && o.ResetItemLocationAndRotation())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          31,
          "[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent",
        );
  }
  static Tqn(e, t) {
    var o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e),
      r = o?.Entity?.GetComponent(156);
    o?.Valid && r
      ? r.SetAutonomousId(t)
      : CombatLog_1.CombatLog.Error(
          "Move",
          o?.Entity,
          "[ControllerIdModifyNotify] 场景物找不到对应的实体或移动同步组件",
          ["entityId", e],
          ["posSender", t],
        );
  }
  static mAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.xDs),
      o = MathUtils_1.MathUtils.LongToNumber(e.wDs),
      e = e.BIs - 1,
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
    r?.Valid
      ? EventSystem_1.EventSystem.EmitWithTarget(
          r.Entity,
          EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation,
          o,
          e,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          31,
          "BeControlledPosInFoundationNotify下发的Id找不到对应的Entity",
          ["EntityConfigId", t],
        );
  }
  static dAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      o = MathUtils_1.MathUtils.LongToNumber(e.bDs),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o),
      r = o?.Entity?.GetComponent(3);
    r &&
      !r.IsRoleAndCtrlByMe &&
      ((r = o.Entity.GetComponent(64)),
      e.q5n ? r.ActiveHandFX(t.Entity) : r.DeactiveHandFx());
  }
  static Cza(e) {
    var t,
      o,
      r = MathUtils_1.MathUtils.LongToNumber(e.DI_),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r),
      a = r.Entity.GetComponent(135),
      r = r.Entity.GetComponent(159);
    r &&
      r.Valid &&
      ((r = r.Config.Config.Type),
      (t = MathUtils_1.MathUtils.LongToNumber(e.nLs.iLs)),
      (t =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          t,
        ).Entity.GetComponent(136)),
      (o = new SceneItemJigsawBaseComponent_1.JigsawIndex(
        e.nLs.l8n.N5n,
        e.nLs.l8n.F5n,
      )),
      (t.Rotation = e.nLs.l8n.V5n),
      a.PutDownItem(t, o, r));
  }
  static gza(e) {
    var t,
      o,
      r = MathUtils_1.MathUtils.LongToNumber(e.DI_),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r),
      a = r.Entity.GetComponent(135),
      r = r.Entity.GetComponent(159);
    r &&
      r.Valid &&
      ((r = r.Config.Config.Type),
      (t = MathUtils_1.MathUtils.LongToNumber(e.nLs.iLs)),
      (t =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          t,
        ).Entity.GetComponent(136)),
      (o = new SceneItemJigsawBaseComponent_1.JigsawIndex(
        e.nLs.l8n.N5n,
        e.nLs.l8n.F5n,
      )),
      (t.Rotation = e.nLs.l8n.V5n),
      a.PickUpItem(t, o, r));
  }
  static gAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.G5n),
      t =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t,
        ).Entity.GetComponent(135),
      o = MathUtils_1.MathUtils.LongToNumber(e.O5n),
      o =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          o,
        ).Entity.GetComponent(136),
      r = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.k5n.N5n, e.k5n.F5n);
    (o.Rotation = e.k5n.V5n),
      t.PickUpItem(o, r, IComponent_1.EItemFoundation.BuildingBlock),
      t.PutDownItem(o, r, IComponent_1.EItemFoundation.BuildingBlock);
  }
  static fAe(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e.j5n);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
      .Entity.GetComponent(135)
      .OnFinish();
  }
  static pAe(r, a, n, l) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityGroupAction，等待创建Entity",
        ["CreatureDataId", a],
        ["PlayerId", r.W5n],
        ["SessionId", r.w5n],
        ["StartIndex", r.K5n],
        ["EndIndex", r.mvs],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.HandleEntityGroupActionByServerNotify",
        a,
        (t) => {
          if (t) {
            t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
            if (t) {
              var o = t.Entity.GetComponent(0)?.GetPbEntityInitData();
              if (o) {
                o = (0, IComponent_1.getComponent)(
                  o.ComponentsData,
                  "EntityGroupComponent",
                );
                if (o && o?.StateTriggers?.length) {
                  let e = o.StateTriggers[l]?.SuccessActions;
                  (e = n ? e : o.StateTriggers[l]?.FailActions)?.length &&
                    (ControllerHolder_1.ControllerHolder.LevelGeneralController
                      .LevelEventLogOpen &&
                      Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "LevelEvent",
                        7,
                        "执行EntityGroupAction，Entity创建完毕",
                        ["CreatureDataId", a],
                        ["PlayerId", r.W5n],
                        ["SessionId", r.w5n],
                        ["StartIndex", r.K5n],
                        ["EndIndex", r.mvs],
                      ),
                    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
                      e,
                      LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
                      r.W5n,
                      r.w5n,
                      r.K5n,
                      r.mvs,
                      r.sS_,
                    ));
                }
              }
            }
          }
        },
        exports.WAIT_ENTITY_ERROR_TIME,
        !0,
        !0,
      );
  }
  static R2l(o, r) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityGroupFailureAction，等待创建Entity",
        ["CreatureDataId", r],
        ["PlayerId", o.W5n],
        ["SessionId", o.w5n],
        ["StartIndex", o.K5n],
        ["EndIndex", o.mvs],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.HandleEntityGroupFailureActionByServerNotify",
        r,
        (e) => {
          var t;
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) &&
            (t = e.Entity.GetComponent(0)?.GetPbEntityInitData()) &&
            (t = (0, IComponent_1.getComponent)(
              t.ComponentsData,
              "EntityGroupComponent",
            )?.FailureState?.FailureOperations.Actions)?.length &&
            (ControllerHolder_1.ControllerHolder.LevelGeneralController
              .LevelEventLogOpen &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                7,
                "执行EntityGroupFailureAction，Entity创建完毕",
                ["CreatureDataId", r],
                ["PlayerId", o.W5n],
                ["SessionId", o.w5n],
                ["StartIndex", o.K5n],
                ["EndIndex", o.mvs],
              ),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              t,
              LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
              o.W5n,
              o.w5n,
              o.K5n,
              o.mvs,
              o.sS_,
            ));
        },
        exports.WAIT_ENTITY_ERROR_TIME,
        !0,
        !0,
      );
  }
  static xy1(o, r, a) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行ntityConditionListenerAction，等待创建Entity",
        ["CreatureDataId", r],
        ["PlayerId", o.W5n],
        ["SessionId", o.w5n],
        ["StartIndex", o.K5n],
        ["EndIndex", o.mvs],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.HandleEntityConditionListenerActionByServerNotify",
        r,
        (e) => {
          var t;
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) &&
            (t = e.Entity.GetComponent(0)?.GetPbEntityInitData()) &&
            (t = (0, IComponent_1.getComponent)(
              t.ComponentsData,
              "ConditionListenerComponent",
            ))?.Listeners?.length &&
            (t = t.Listeners[a]?.Actions)?.length &&
            (ControllerHolder_1.ControllerHolder.LevelGeneralController
              .LevelEventLogOpen &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                7,
                "执行EntityConditionListenerAction，Entity创建完毕",
                ["CreatureDataId", r],
                ["PlayerId", o.W5n],
                ["SessionId", o.w5n],
                ["StartIndex", o.K5n],
                ["EndIndex", o.mvs],
              ),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              t,
              LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
              o.W5n,
              o.w5n,
              o.K5n,
              o.mvs,
              o.sS_,
            ));
        },
        exports.WAIT_ENTITY_ERROR_TIME,
        !0,
        !0,
      );
  }
  static RequestSceneItemStateChange(e, t) {
    var o = Protocol_1.Aki.Protocol.fms.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (o.Q5n = t),
      Net_1.Net.Call(21106, o, (e) => {});
  }
  static RequestActiveOrDeactiveManipulateFx(e, t) {
    var o = Protocol_1.Aki.Protocol.Dds.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (o.q5n = t),
      Net_1.Net.Call(25067, o, (e) => {});
  }
  static RequestAwakePbEntity(e, t) {}
  static RequestSpawnPbEntity(e, t) {
    t(!0);
  }
  static RequestChangeEntityState(t, e) {
    var o = Protocol_1.Aki.Protocol.pds.create();
    (o.F4n = t.EntityId),
      (o.X5n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.State)),
      Net_1.Net.Call(24972, o, (e) => {
        e &&
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Level",
            7,
            "[ControllerHolder.LevelGeneralController.RequestChangeEntityState] 请求实体状态改变成功",
            ["PbDataId:", t.EntityId],
            ["TargetState:", t.State],
          );
      });
  }
  static RequestEntitySendEvent(t, o) {
    var e;
    void 0 ===
    EntitySelfEventConfigByKey_1.configEntitySelfEventConfigByKey.GetConfig(o)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          64,
          "[ControllerHolder.LevelGeneralController.RequestEntitySendEvent] 不能获取实体事件配置，请在s.实体自身事件文件夹中添加配置",
          ["creatureDataId:", t],
          ["eventKey:", o],
        )
      : (((e = Protocol_1.Aki.Protocol.tts.create()).F4n = t),
        (e.$5n = o),
        Net_1.Net.Call(21580, e, (e) => {
          e &&
            e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Level",
              35,
              "[ControllerHolder.LevelGeneralController.EntitySendEventResponse] 请求实体监听事件成功",
              ["creatureDataId:", t],
              ["eventKey:", o],
            );
        }));
  }
  static RequestDoAction(e, t) {}
  static RequestSetInitTagRequest(e) {
    var t;
    e &&
      (((t = Protocol_1.Aki.Protocol.Vds.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(16561, t, (e) => {}));
  }
  static RequestActionsFinish(e, t, o, r, a) {
    var n = Protocol_1.Aki.Protocol.d$n.create();
    (n.W5n = e),
      (n.w5n = t),
      (n.K5n = o),
      (n.J5n = r),
      Net_1.Net.Call(20544, n, a);
  }
  static RequestEntityInteractOption(e, t, o, r) {
    var a = Protocol_1.Aki.Protocol.Res.create();
    (a.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (a.z5n = t),
      r && (a.Z5n = r),
      Net_1.Net.Call(16721, a, o);
  }
  static RequestEntityDynamicInteractOption(e, t, o) {
    var r = Protocol_1.Aki.Protocol.Ues.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (r.e6n = t),
      Net_1.Net.Call(26385, r, o);
  }
  static RequestEntityRandomInteractOption(e, t, o) {
    var r = Protocol_1.Aki.Protocol.Aes.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (r.z5n = t),
      Net_1.Net.Call(21337, r, o);
  }
  static RequestClientTeleportByClientTrigger(e, t, o, r, a, n, l) {
    var i = Protocol_1.Aki.Protocol.Gg_.create(),
      o =
        ((i.P5n = o),
        (i.g8n = r),
        (i.mpl = Protocol_1.Aki.Protocol.Xw_.dpl),
        Protocol_1.Aki.Protocol.Yw_.create()),
      r = Protocol_1.Aki.Protocol.Cpl.create(),
      a = ((r.c5n = a), Protocol_1.Aki.Protocol.IOs.create()),
      _ =
        ((a.fvs = Protocol_1.Aki.Protocol.TOs.Proto_ClientTriggerActionCtx),
        Protocol_1.Aki.Protocol.aw_.create()),
      n = ((_.SDs = n), Protocol_1.Aki.Protocol.DOs.create());
    (n.v9n = t),
      (n.w5n = e),
      (_.eps = n),
      (a.dpl = _),
      (r.gpl = a),
      (o.Cpl = r),
      (i.ppl = o),
      Net_1.Net.Call(25375, i, l);
  }
  static RequestClientTeleportByNoRenderPortal(e, t, o, r) {
    var a = Protocol_1.Aki.Protocol.Gg_.create();
    (a.P5n = Protocol_1.Aki.Protocol.Gks.create()),
      (a.P5n.X = t.X),
      (a.P5n.Y = t.Y),
      (a.P5n.Z = t.Z),
      (a.g8n = Protocol_1.Aki.Protocol.D2s.create()),
      (a.g8n.Roll = o.Roll),
      (a.g8n.Pitch = o.Pitch),
      (a.g8n.Yaw = o.Yaw),
      (a.mpl = Protocol_1.Aki.Protocol.Xw_.Proto_NoRenderPortalComponent),
      (a.ppl = Protocol_1.Aki.Protocol.Yw_.create()),
      (a.ppl.MIl = Protocol_1.Aki.Protocol.MIl.create()),
      (a.ppl.MIl.A5n = e),
      Net_1.Net.Call(25375, a, r);
  }
  static IsEntityEnableAwake(e) {
    if (
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
    )
      for (const t of e)
        ModelManager_1.ModelManager.CreatureModel.GetEntityData(t);
    return !0;
  }
  static CheckCurrentPlayerIsParticipator(e) {
    if (!e) return !1;
    let t = !1;
    switch (e.Type) {
      case 2:
        t = LevelGeneralNetworks.vAe(e.QuestId);
        break;
      case 3:
        t = LevelGeneralNetworks.MAe(e.LevelPlayId);
        break;
      case 4:
        t = LevelGeneralNetworks.EAe(e.InstanceDungeonId);
        break;
      case 6:
        t = LevelGeneralNetworks.SAe(e.BtType, e.TreeConfigId);
        break;
      case 1:
        t = !0;
    }
    return t;
  }
  static SAe(e, t) {
    let o = !1;
    switch (e) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        o = LevelGeneralNetworks.vAe(t);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        o = LevelGeneralNetworks.MAe(t);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        o = LevelGeneralNetworks.EAe(t);
    }
    return o;
  }
  static vAe(e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (!e) return !1;
    let t = !1;
    switch (e.OnlineType) {
      case "SingleHangUpOnline":
        t = !ModelManager_1.ModelManager.GameModeModel.IsMulti;
        break;
      case "SingleNotHangUpOnline":
        t = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
    }
    return t;
  }
  static MAe(e) {
    e =
      ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e);
    if (!e) return !1;
    let t = !1;
    switch (e.OnlineType) {
      case "Local":
        t = !ModelManager_1.ModelManager.GameModeModel.IsMulti;
        break;
      case "SingleOnline":
        t = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
        break;
      case "Multiplayer":
        t = !0;
    }
    return t;
  }
  static EAe(e) {
    return (
      !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === e
    );
  }
  static RequestPlayerAccessEffectArea(e, t) {
    var o = Protocol_1.Aki.Protocol.Ugs.create();
    (o.zWn = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (o.i6n = t
        ? Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter
        : Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave),
      Net_1.Net.Call(22784, o, (e) => {});
  }
  static aQs(e, t, o) {
    e =
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        e,
      )?.Entity?.GetComponent(224);
    e && (o ? e.ServerConnectEntities(t) : e.ServerDisconnectEntities(t));
  }
  static PushEntityTimeDilation(e, t) {
    var o = Protocol_1.Aki.Protocol.Cm_.create();
    (o.F4n = e), (o.dKn = t), Net_1.Net.Send(17361, o);
  }
  static CheckEntityCanPushTimeDilation(e) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti && 1 === e;
  }
  static RequestEntityCameraAlertStateChange(o, r) {
    var e = Protocol_1.Aki.Protocol.Xp_.create();
    (e.F4n = o),
      (e.eOl = r),
      Net_1.Net.Call(16669, e, (e) => {
        var t =
          (!r &&
            e?.Q4n ===
              Protocol_1.Aki.Protocol.Q4n.Proto_CameraAlertHasNotAlert) ||
          (r &&
            e?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_CameraAlertHasAlert);
        (e && (t || e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              35,
              "[LevelGeneralNetworks.RequestEntityCameraAlertStateChange] 请求摄像头预警触发状态变更失败",
              ["CreatureDataId", o],
              ["IsAlert", r],
            ));
      });
  }
  static dcc(t) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnCreateVehicleEntity",
      t,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
          e.Entity?.Valid &&
          ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlaySummonAnim(
            e.Entity,
          );
      },
    );
  }
  static mcc(a, n, l, i) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnReplaceVehicleEntity",
      a,
      (e) => {
        if (e) {
          const o = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
          if (o?.Valid && o.Entity?.Valid) {
            e = o.Entity.GetComponent(1);
            if (e?.Valid) {
              var t = o.Entity.GetComponent(233);
              if (t?.Valid) {
                const r = e.Owner;
                r instanceof TsBaseVehicle_1.default &&
                  (r.WasRecentlyRenderedOnScreen(0.5)
                    ? ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlayCancelSummonAnim(
                        o.Entity,
                        n,
                        l,
                        i,
                      )
                    : (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                        o.Entity,
                        !1,
                        "GongduolaSummonController.BeforePlaySummonAnim",
                        !1,
                      ),
                      i.IsZero() || t.SetGravityDirect(i),
                      TimerSystem_1.TimerSystem.Delay(() => {
                        r.VehicleActorComponent.SetActorLocationAndRotation(
                          n.ToUeVector(),
                          l.ToUeRotator(),
                          "TsAnimNotifySummonGongduolaSetLocAndRot",
                        ),
                          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                            r.VehicleActorComponent.Entity,
                            !0,
                            "GongduolaSummonController.BeforePlaySummonAnim",
                            !1,
                          ),
                          (ModelManager_1.ModelManager.GongduolaSummonModel.SummonLocation =
                            void 0),
                          (ModelManager_1.ModelManager.GongduolaSummonModel.SummonRotation =
                            void 0),
                          ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlaySummonAnim(
                            o.Entity,
                          ),
                          Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "Temp",
                              31,
                              "[ChTest]TsAnimNotifySummonGongduolaSetLocAndRot",
                            );
                      }, 100)));
              }
            }
          }
        }
      },
    );
  }
}
(exports.LevelGeneralNetworks = LevelGeneralNetworks),
  ((_a = LevelGeneralNetworks).XUe = (o) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnEntityAddDynamicInteractNotify",
      MathUtils_1.MathUtils.LongToNumber(o.F4n),
      (e) => {
        var t;
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(o.F4n),
            ))?.Valid &&
            ((t =
              LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
                o.cvs,
              )),
            ModelManager_1.ModelManager.InteractionModel.AddInteractOption(
              e.Entity,
              o.e6n,
              t,
              o.DIs,
              o.XCa,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              36,
              "[EntityAddDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToBigInt(o.F4n)],
            );
      },
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.$Ue = (t) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnEntityRemoveDynamicInteractNotify",
      MathUtils_1.MathUtils.LongToNumber(t.F4n),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.F4n),
            )) &&
            ModelManager_1.ModelManager.InteractionModel.RemoveInteractOption(
              e.Entity,
              t.e6n,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              36,
              "[EntityRemoveDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToNumber(t.F4n)],
            );
      },
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.YUe = (t) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnEntityChangeDynamicInteractTextNotify",
      MathUtils_1.MathUtils.LongToNumber(t.F4n),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.F4n),
            )) &&
            ModelManager_1.ModelManager.InteractionModel.ChangeOptionText(
              e.Entity,
              t.e6n,
              t.DIs,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              36,
              "[OnEntityChangeDynamicInteractTextNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToNumber(t.F4n)],
            );
      },
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.JUe = (t) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnEntityInteractNotify",
      MathUtils_1.MathUtils.LongToNumber(t.F4n),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.F4n),
            ))?.Valid &&
            ModelManager_1.ModelManager.InteractionModel.LockInteraction(
              e.Entity,
              t.gTs,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              36,
              "[EntityInteractFinishNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToBigInt(t.F4n)],
            );
      },
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.zUe = (e) => {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.F4n),
    );
    t && t.Entity.GetComponent(131)?.UpdateState(e.m5n, e.CTs);
  }),
  (LevelGeneralNetworks.XTl = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t);
    o?.Valid && o.Entity
      ? o.Entity.GetComponent(156)?.ModifyBlackboardFromRemote(e.C6n, e.GI_)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          19,
          "SceneItemBlackboardNotify下发的Id找不到对应的Entity",
          ["Entity Id", t],
        );
  }),
  (LevelGeneralNetworks.ZUe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.F4n),
      o = MathUtils_1.MathUtils.LongToNumber(t.bDs);
    const r = new Array();
    r.push(e),
      0 !== o && r.push(o),
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.OnManipulatableSceneItemControllerIdModifyNotify",
        r,
        (e) => {
          e
            ? LevelGeneralNetworks.cAe(t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                31,
                "[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity",
                ["ids", r],
              );
        },
      );
  }),
  (LevelGeneralNetworks.Iqn = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      o = MathUtils_1.MathUtils.LongToNumber(e.wIs);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnSceneItemAutonomousModifyNotify",
      t,
      (e) => {
        e
          ? LevelGeneralNetworks.Tqn(t, o)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              31,
              "[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity",
              ["entityId", t],
            );
      },
    );
  }),
  (LevelGeneralNetworks.eAe = (t) => {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (e === t.r6n) {
      const o = new Array();
      o.push(MathUtils_1.MathUtils.LongToNumber(t.xDs)),
        0 !== t.wDs && o.push(MathUtils_1.MathUtils.LongToNumber(t.wDs)),
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
          "LevelGeneralNetworks.OnManipulatableSceneItemPosInFoundationNotify",
          o,
          (e) => {
            e
              ? LevelGeneralNetworks.mAe(t)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Level",
                  31,
                  "[RelationIdModifyNotif] 等待之后还是找不到对应的Entity",
                  ["ids", o],
                );
          },
        );
    }
  }),
  (LevelGeneralNetworks.xal = (t) => {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (e === t.r6n) {
      const o = new Array();
      o.push(MathUtils_1.MathUtils.LongToNumber(t.rT_)),
        0 !== t.wDs && o.push(MathUtils_1.MathUtils.LongToNumber(t.wDs)),
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
          "LevelGeneralNetworks.OnItemRelateFoundationNotify",
          o,
          (e) => {
            e
              ? LevelGeneralNetworks.Pal(t)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Level",
                  31,
                  "[ItemRelateFoundationNotify] 等待之后还是找不到对应的Entity",
                  ["ids", o],
                );
          },
        );
    }
  }),
  (LevelGeneralNetworks.Pal = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.rT_),
      o = MathUtils_1.MathUtils.LongToNumber(e.wDs),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
    r?.Valid
      ? (r = r.Entity.GetComponent(261))
        ? ((r.EntityInSocket = t?.Entity),
          e.x9n ===
            Protocol_1.Aki.Protocol.tR_.Proto_ItemRelateFoundationReason_Init &&
            r.InitMatch(o))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            31,
            "ItemRelateFoundationNotify指定的Entity缺少SceneItemGenericOutletComponent",
            ["EntityConfigId", o],
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          31,
          "ItemRelateFoundationNotify下发的Id找不到对应的Entity",
          ["EntityConfigId", o],
        );
  }),
  (LevelGeneralNetworks.tAe = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (o?.Valid) {
      var r = o?.Entity?.GetComponent(123);
      if (r) {
        var a = new SceneItemDynamicAttachTargetComponent_1.AttachParam();
        switch (
          ((a.PosAttachType = 2),
          (a.PosAttachOffset = e.o6n),
          (a.PosAbsolute = !1),
          (a.RotAttachType = 2),
          (a.RotAttachOffset = e.n6n),
          (a.RotAbsolute = !1),
          e.s6n)
        ) {
          case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetEntity:
            r.IsRegTarget() &&
              r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetEntity"),
              r.RegEntityTarget(
                e.h6n.a6n,
                e.h6n.l6n,
                a,
                "[EntityAttachChangeNotify] AttachTargetEntity",
              );
            break;
          case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetActorPath:
            r.IsRegTarget() &&
              r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetActorPath"),
              r.RegRefActorTarget(
                e._6n,
                a,
                "[EntityAttachChangeNotify] AttachTargetActorPath",
              );
            break;
          case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetNone:
            r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetNone");
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            39,
            "EntityAttachChangeNotify指定的Entity缺少DynamicAttachComp",
            ["EntityConfigId", t],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          39,
          "EntityAttachChangeNotify下发的EntityId找不到对应的Entity",
          ["EntityConfigId", t],
        );
  }),
  (LevelGeneralNetworks.iAe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.F4n),
      o = MathUtils_1.MathUtils.LongToNumber(t.bDs);
    const r = new Array();
    r.push(e),
      r.push(o),
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.OnManipulateFxShowNotify",
        r,
        (e) => {
          e
            ? LevelGeneralNetworks.dAe(t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                31,
                "[FxShowNotify] 等待之后还是找不到对应的Entity",
                ["ids", r],
              );
        },
      );
  }),
  (LevelGeneralNetworks.mza = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.DI_),
      o = MathUtils_1.MathUtils.LongToNumber(t.nLs.iLs);
    const r = new Array();
    r.push(e),
      r.push(o),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        "LevelGeneralNetworks.OnAddPlacementNotify",
        r,
        (e) => {
          e
            ? LevelGeneralNetworks.Cza(t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                31,
                "[OnAddPlacementNotify] 等待之后还是找不到对应的Entity",
                ["ids", r],
              );
        },
      );
  }),
  (LevelGeneralNetworks.dza = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.DI_),
      o = MathUtils_1.MathUtils.LongToNumber(t.nLs.iLs);
    const r = new Array();
    r.push(e),
      r.push(o),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        "LevelGeneralNetworks.OnRemovePlacementFromBoardNotify",
        r,
        (e) => {
          e
            ? LevelGeneralNetworks.gza(t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                31,
                "[OnRemovePlacementFromBoardNotify] 等待之后还是找不到对应的Entity",
                ["ids", r],
              );
        },
      );
  }),
  (LevelGeneralNetworks.rAe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.G5n),
      o = MathUtils_1.MathUtils.LongToNumber(t.O5n);
    const r = new Array();
    r.push(e),
      r.push(o),
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.OnMovePlacementNotify",
        r,
        (e) => {
          e
            ? LevelGeneralNetworks.gAe(t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                31,
                "[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
                ["ids", r],
              );
        },
      );
  }),
  (LevelGeneralNetworks.nAe = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.j5n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnCommitBoardSuccessNotify",
      o,
      (e) => {
        e
          ? _a.fAe(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              31,
              "[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
              ["baseId", o],
            );
      },
    );
  }),
  (LevelGeneralNetworks.QUe = (t) => {
    var o = t.cvs,
      r = t.w5n;
    if (
      ControllerHolder_1.ControllerHolder.LevelGeneralController
        .LevelEventLogOpen
    ) {
      let e = "";
      try {
        e = JSON.stringify(o);
      } catch {
        e = "Context序列化解析失败";
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LevelEvent",
          7,
          "服务端驱动执行行为组",
          ["Context", e],
          ["PlayerId", t.W5n],
          ["SessionId", r],
          ["Total", t.dvs],
          ["StartIndex", t.K5n],
          ["EndIndex", t.mvs],
          ["NeedFinishReq", t.sS_],
        );
    }
    switch (o.fvs) {
      case Protocol_1.Aki.Protocol.TOs.Svs:
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（动态交互）"),
          TsInteractionUtils_1.TsInteractionUtils.HandleEntityDynamicInteractByServerNotify(
            t,
            o.Svs.e6n,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Avs:
        var e = o.Avs._ps,
          a =
            ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
              e,
            );
        a
          ? (n = a.LevelPlayOpenAction) &&
            0 !== n.length &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneGameplay", 18, "开始执行玩法开启/刷新动作"),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              n,
              LevelGeneralContextDefine_1.LevelPlayContext.Create(a.Id),
              t.W5n,
              t.w5n,
              t.K5n,
              t.mvs,
              t.sS_,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay
                ],
              ],
              ["treeId", e],
            );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_LeaveInstEscActionCtx:
        var n = o.$ma?.Xma,
          a =
            ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
        a
          ? (e = a.FinishEscAction) && 0 !== e.length
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneGameplay",
                  18,
                  "开始执行副本玩法执行ESC退出行为",
                ),
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
                e,
                LevelGeneralContextDefine_1.InstanceDungeonContext.Create(n),
                t.W5n,
                t.w5n,
                t.K5n,
                t.mvs,
                t.sS_,
              ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                7,
                "服务器通知副本玩法执行ESC退出行为时：对应的行为数据不存在或者长度为0，联系程序检查Bug",
                [
                  "treeType",
                  GeneralLogicTreeDefine_1.btTypeLogString[
                    Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst
                  ],
                ],
                ["treeId", n],
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              7,
              "服务器通知玩法执行ESC退出行为时：对应的副本玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst
                ],
              ],
              ["treeId", n],
            );
        break;
      case Protocol_1.Aki.Protocol.TOs.Pvs:
        (a = o.Pvs._ps),
          (e =
            ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
              a,
            ));
        e
          ? (n = e.AfterGetRewardAction) &&
            0 !== n.length &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneGameplay", 18, "开始执行玩法开启/刷新动作"),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              n,
              LevelGeneralContextDefine_1.LevelPlayContext.Create(e.Id),
              t.W5n,
              t.w5n,
              t.K5n,
              t.mvs,
              t.sS_,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay
                ],
              ],
              ["treeId", a],
            );
        break;
      case Protocol_1.Aki.Protocol.TOs.Uvs:
        (n = o.Uvs.B5n),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(n));
        if (!e)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", n],
            )
          );
        a = e.ActiveActions;
        a &&
          0 !== a.length &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            a,
            LevelGeneralContextDefine_1.QuestContext.Create(n),
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
            t.sS_,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.wvs:
        (e = o.wvs.B5n),
          (a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e));
        if (!a)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", e],
            )
          );
        n = a.AcceptActions;
        n &&
          0 !== n.length &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            n,
            LevelGeneralContextDefine_1.QuestContext.Create(e),
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
            t.sS_,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.xvs:
        (a = o.xvs.B5n),
          (n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(a));
        if (!n)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", a],
            )
          );
        e = n.FinishActions;
        e &&
          0 !== e.length &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            e,
            LevelGeneralContextDefine_1.QuestContext.Create(a),
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
            t.sS_,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Yvs:
        (n = o.Yvs.B5n),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(n));
        if (!e)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", n],
            )
          );
        a = e.TerminateActions;
        a &&
          0 !== a.length &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            a,
            LevelGeneralContextDefine_1.QuestContext.Create(n),
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
            t.sS_,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.bvs:
      case Protocol_1.Aki.Protocol.TOs.Bvs:
      case Protocol_1.Aki.Protocol.TOs.qvs:
      case Protocol_1.Aki.Protocol.TOs.Gvs:
      case Protocol_1.Aki.Protocol.TOs.Ovs:
      case Protocol_1.Aki.Protocol.TOs.$vs:
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BehaviorTreeStartActionSession,
          t,
        );
        break;
      case Protocol_1.Aki.Protocol.TOs.Mvs:
        e = MathUtils_1.MathUtils.LongToNumber(o.Mvs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityInteractAction）",
            ["CreatureDataId", e],
          ),
          TsInteractionUtils_1.TsInteractionUtils.HandleEntityInteractByServerNotify(
            t,
            e,
            o.Mvs.z5n,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_EntityStateChangeAction:
        a = MathUtils_1.MathUtils.LongToNumber(o.yvs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityStateChangeAction）",
            ["CreatureDataId", a],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateActionByServerNotify(
            t,
            a,
            o.yvs.tps,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Ivs:
        n = MathUtils_1.MathUtils.LongToNumber(o.Ivs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityGroupAction）",
            ["CreatureDataId", n],
          ),
          LevelGeneralNetworks.pAe(t, n, o.Ivs.u6n, o.Ivs.ips);
        break;
      case Protocol_1.Aki.Protocol.TOs.zvs:
        e = MathUtils_1.MathUtils.LongToNumber(o.zvs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityGroupFailureAction）",
            ["CreatureDataId", e],
          ),
          LevelGeneralNetworks.R2l(t, e);
        break;
      case Protocol_1.Aki.Protocol.TOs.Tvs:
        (a = MathUtils_1.MathUtils.LongToNumber(o.Tvs.eps.w5n)),
          (n = MathUtils_1.MathUtils.LongToNumber(o.Tvs.rps));
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityTriggerAction）",
            ["CreatureDataId", a],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleTriggerStateActionByServerNotify(
            t,
            a,
            n,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_EntityLeaveTrigger:
        (e = MathUtils_1.MathUtils.LongToNumber(o.Lvs.eps.w5n)),
          (a = MathUtils_1.MathUtils.LongToNumber(o.Lvs.rps));
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityLeaveTriggerAction）",
            ["CreatureDataId", e],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleExitTriggerStateActionByServerNotify(
            t,
            e,
            a,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Hvs:
        n = MathUtils_1.MathUtils.LongToNumber(o.Hvs.eps.w5n);
        SceneItemUtility_1.SceneItemUtility.HandleExploreInteractActionByServerNotify(
          t,
          n,
        );
        break;
      case Protocol_1.Aki.Protocol.TOs.Rvs:
        e = MathUtils_1.MathUtils.LongToNumber(o.Rvs.eps.w5n);
        SceneItemUtility_1.SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify(
          t,
          e,
        );
        break;
      case Protocol_1.Aki.Protocol.TOs.Dvs:
        a = MathUtils_1.MathUtils.LongToNumber(o.Dvs.eps.w5n);
        SceneItemUtility_1.SceneItemUtility.HandleTimeTrackControlActionByServerNotify(
          t,
          a,
          o.Dvs,
        );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_SceneItemLifeCycleComponentCreate:
        n = MathUtils_1.MathUtils.LongToNumber(o.Kvs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（LifeCycleCreateAction）",
            ["CreatureDataId", n],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
            t,
            n,
            !0,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_SceneItemLifeCycleComponentDetroy:
        e = MathUtils_1.MathUtils.LongToNumber(o.Qvs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（LifeCycleDestroyAction）",
            ["CreatureDataId", e],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
            t,
            e,
            !1,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Jvs:
        (a = MathUtils_1.MathUtils.LongToNumber(o.Jvs.eps.w5n)),
          (n = o.Jvs.c6n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            39,
            "服务端驱动执行行为组（EntityBeamReceiveAction）",
            ["CreatureDataId", a],
            ["ReceiveType", n],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleBeamReceiveActionByServerNotify(
            t,
            a,
            n,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_TrampleActiveActionCtx:
        e = MathUtils_1.MathUtils.LongToNumber(o.Wga.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            39,
            "服务端驱动执行行为组（TrampleActiveAction）",
            ["CreatureDataId", e],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleTrampleActivateActionByServerNotify(
            t,
            e,
            !0,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_TrampleDeActiveActionCtx:
        a = MathUtils_1.MathUtils.LongToNumber(o.Qga.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            39,
            "服务端驱动执行行为组（TrampleDeActiveAction）",
            ["CreatureDataId", a],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleTrampleActivateActionByServerNotify(
            t,
            a,
            !1,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Wvs: {
        n = o.Wvs.m6n;
        let e = void 0;
        try {
          e = JSON.parse(n);
        } catch {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Gm", 39, "GM驱动行为列表: 行为列表解析失败", [
              "JsonStr",
              n,
            ]);
          break;
        }
        if (!Array.isArray(e) || 0 === e.length) break;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Gm", 39, "开始执行GM驱动行为列表"),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            e,
            LevelGeneralContextDefine_1.GmLevelActionContext.Create(),
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
            t.sS_,
          );
        break;
      }
      case Protocol_1.Aki.Protocol.TOs.Proto_EntityStateChangeConditionAction:
        e = MathUtils_1.MathUtils.LongToNumber(o.Zvs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityStateChangeConditionAction）",
            ["CreatureDataId", e],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateChangeConditionActionByServerNotify(
            t,
            e,
            o.Zvs.tps,
            o.Zvs.t5n,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.kvs:
        a = MathUtils_1.MathUtils.LongToNumber(o.kvs.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityConditionListeningAction）",
            ["CreatureDataId", a],
          ),
          LevelGeneralNetworks.xy1(t, a, o.kvs.aps);
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_HookLockPointActionCtx:
        (n = MathUtils_1.MathUtils.LongToNumber(o.IS_.eps.w5n)),
          (e = o.IS_.AS_);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            39,
            "服务端驱动执行行为组（HookLockPointActionCtx）",
            ["CreatureDataId", n],
            ["ActionType", e],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleHookLockPointActionByServerNotify(
            t,
            n,
            e,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.TS_:
        a = MathUtils_1.MathUtils.LongToNumber(o.TS_.eps.w5n);
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            31,
            "服务端驱动执行行为组（ExploreSkillCustomAction）",
            ["CreatureDataId", a],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleExploreSkillCustomActionByServerNotify(
            t,
            a,
          );
    }
  }),
  (LevelGeneralNetworks.sAe = (n) => {
    const l = MathUtils_1.MathUtils.LongToNumber(n.j5n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnBoardGridDynamicConfigChangeNotify",
      l,
      (e) => {
        if (e) {
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
          if (e) {
            var t = e.Entity.GetComponent(135);
            if (t)
              for (const a of n.aLs) {
                var o = new SceneItemJigsawBaseComponent_1.JigsawIndex(
                    a.zTs,
                    a.ZTs,
                  ),
                  r = MathUtils_1.MathUtils.LongToNumber(a.eLs);
                t.DynamicModifySocketState(o, r);
              }
          }
        }
      },
    );
  }),
  (LevelGeneralNetworks.HPl = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.j5n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnBoardCanMovePlacementNotify",
      o,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) &&
          (e = e.Entity.GetComponent(135)) &&
          e.OnBoardCanMovePlacementNotify(t.gI_);
      },
    );
  }),
  (LevelGeneralNetworks.aAe = (e) => {
    for (const t of e.KEs)
      ModelManager_1.ModelManager.FunctionModel?.UpdateFunctionOpenLockByBehaviorTree(
        t.d6n,
        !t.Sps,
      );
  }),
  (LevelGeneralNetworks.$Ja = (e) => {
    for (const t of e.KEs)
      t.h5n === Protocol_1.Aki.Protocol.Uw_.Proto_TeleportDungeon &&
        ControllerHolder_1.ControllerHolder.InstanceDungeonController.UpdateForbidDungeon(
          t.yIs,
          t.XE_?.KE_,
        );
  }),
  (LevelGeneralNetworks.hAe = (e) => {
    e.gvs
      ? LevelGamePlayUtils_1.LevelGamePlayUtils.ReleaseOperationRestriction()
      : e.C6n &&
        LevelGamePlayUtils_1.LevelGamePlayUtils.LevelOperationRestriction(
          e.C6n,
        );
  }),
  (LevelGeneralNetworks.lAe = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.g2s),
      o = e.i6n === Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
      r = [];
    for (const a of e.HKs) r.push(MathUtils_1.MathUtils.LongToNumber(a));
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnEntityAccessRangeNotify",
      t,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
          (e = e.Entity.GetComponent(84)) &&
          e.ServerUpdateEntitiesInRangeOnline(o, r);
      },
    );
  }),
  (LevelGeneralNetworks._Ae = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.g2s),
      o = e.i6n === Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
      r = e.f2s;
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnPlayerAccessRangeNotify",
      t,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
          (e = e.Entity.GetComponent(84)) &&
          e.ServerUpdatePlayerInRangeOnline(o, r);
      },
    );
  }),
  (LevelGeneralNetworks.uAe = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.v2s),
      o = e.p2s === Protocol_1.Aki.Protocol.p2s.Proto_Up;
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnTrampleGearTransitionNotify",
      t,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
          (e = e.Entity.GetComponent(150)) &&
          e.ChangeTransition(o);
      },
    );
  }),
  (LevelGeneralNetworks.URn = (e) => {
    var t;
    e.WEs &&
      ((t = MathUtils_1.MathUtils.LongToNumber(e.F4n)),
      (t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t))) &&
      t.Entity?.GetComponent(0)?.UpdateVar(e.jEs, e.WEs);
  }),
  (LevelGeneralNetworks.vd1 = (e) => {
    var t,
      o = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(o);
    o &&
      ((t = o.Entity?.GetComponent(0))?.SetEntityConditionalName(e.qa1),
      t?.SetEntityEntityConditionSecondName(e.Fa1),
      t?.SetEntityEntityConditionFunctionPath(e.Ga1),
      EventSystem_1.EventSystem.EmitWithTarget(
        o.Entity,
        EventDefine_1.EEventName.OnEntityNameChanged,
      ));
  }),
  (LevelGeneralNetworks.sQs = (e) => {
    if (e.f$s) {
      const t = [],
        o = [];
      for (const r of e.f$s) {
        const a = MathUtils_1.MathUtils.LongToNumber(r.d$s);
        t.push(a);
        for (const n of r.YQa)
          o.push(MathUtils_1.MathUtils.LongToNumber(n.CVn)),
            t.push(MathUtils_1.MathUtils.LongToNumber(n.CVn));
        WaitEntityTask_1.WaitEntityTask.Create(
          "LevelGeneralNetworks.OnConnectorConnectEntityNotify",
          t,
          (e) => {
            e
              ? LevelGeneralNetworks.aQs(a, o, r.C$s)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Level",
                  31,
                  "[OnConnectorConnectEntityNotify] 等待之后还是找不到对应的Entity",
                  ["ids", t],
                );
          },
        );
      }
    }
  }),
  (LevelGeneralNetworks.mla = (e) => {
    const a = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    a &&
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.OnFirecrackerEntityCreatedNotify",
        a,
        (e) => {
          var t, o, r;
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))
              ?.Valid &&
            ((t = (r =
              ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
                ?.Entity)?.GetComponent(64)),
            (r = r?.GetComponent(1)),
            t?.Valid) &&
            r?.Valid &&
            t.CanManipulate() &&
            ((o = MathUtils_1.MathUtils.CommonTempVector).Set(100, 0, 0),
            (r = r.ActorTransform.TransformPositionNoScale(o.ToUeVector())),
            e.Entity.GetComponent(200)?.SetActorLocation(r),
            t.TryManipulateSpecificItem(e.Entity));
        },
      );
  }),
  (LevelGeneralNetworks.u3a = (e) => {
    const a = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    if (a) {
      const n = MathUtils_1.MathUtils.LongToNumber(e.tT_);
      n &&
        WaitEntityTask_1.WaitEntityTask.Create(
          "LevelGeneralNetworks.OnPortalReplaceNotify",
          n,
          (e) => {
            var t, o, r;
            e &&
              (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))
                ?.Valid &&
              e.Entity?.Valid &&
              e.Entity?.IsInit &&
              (t = e.Entity.GetComponent(1))?.Valid &&
              (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(n))
                ?.Valid &&
              o.Entity?.Valid &&
              o?.IsInit &&
              (o = o.Entity.GetComponent(1))?.Valid &&
              (r = e.Entity.GetComponent(213))?.Valid &&
              (r.GetPortalEffectActor()?.Stop("移动传送门到新位置之前", !0),
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                e.Entity,
                !1,
                "移动传送门到新位置之前",
                !1,
              ),
              t.SetActorLocationAndRotation(
                o.ActorLocation,
                o.ActorRotation,
                "OnPortalReplaceNotify",
                !1,
              ),
              e.Entity.GetComponent(0)?.SetOwnerIncId(n),
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                e.Entity,
                !0,
                "移动传送门到新位置之后",
                !1,
              ));
          },
        );
    }
  }),
  (LevelGeneralNetworks.$rh = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
    o &&
      WaitEntityTask_1.WaitEntityTask.Create(
        "LevelGeneralNetworks.OnSceneItemAttributeChangeNotify",
        o,
        (e) => {
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))
              ?.IsInit &&
            (e = e.Entity?.GetComponent(128)) &&
            e.HandleAttributeChanged(t.EI_, t.lWn);
        },
      );
  }),
  (LevelGeneralNetworks.yMl = (e) => {
    AlertAreaController_1.AlertAreaController.UpdateAlertDataByServerNotify(e);
  }),
  (LevelGeneralNetworks.oEl = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnSceneItemAiDisableNotify",
      t,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
          (e = e.Entity.GetComponent(134)) &&
          e.ModifyAiEnableState(!1);
      },
    );
  }),
  (LevelGeneralNetworks.rEl = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnSceneItemAiEnableNotify",
      o,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid &&
          (e = e.Entity.GetComponent(134)) &&
          e.ModifyAiEnableState(!0, t.tVn?.RI_);
      },
    );
  }),
  (LevelGeneralNetworks.nEl = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnSceneItemAiPatrolPointNotify",
      o,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid &&
          (e = e.Entity.GetComponent(134)) &&
          e.UpdateLastPassIndex(t.AI_);
      },
    );
  }),
  (LevelGeneralNetworks.FTl = (r) => {
    const a = MathUtils_1.MathUtils.LongToNumber(r.F4n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnAnimalCollectStateNotify",
      a,
      (e) => {
        var t, o;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))?.Valid &&
          (t = e.Entity.GetComponent(169)) &&
          ((o = "Collected" + r.jjn),
          r.xI_ === Protocol_1.Aki.Protocol.$w_.Proto_SlotRefreshed
            ? (t.ShowPart(r.jjn),
              ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
                e.Id,
                o,
                !1,
              ))
            : (t.HidePart(r.jjn),
              ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
                e.Id,
                o,
                !0,
              )));
      },
    );
  }),
  (LevelGeneralNetworks.mwl = (e) => {
    for (const r of e.vS_) {
      var t = MathUtils_1.MathUtils.LongToNumber(r.F4n);
      if (!r.yS_) {
        t = EntitySystem_1.EntitySystem.Get(t);
        if (!t?.Valid)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 65, "Trigger Entity不存在")
          );
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          t,
          !0,
          "LevelEventSetClientEntityVisible",
          !0,
        );
      }
    }
    for (const a of e.pS_) {
      var o = MathUtils_1.MathUtils.LongToNumber(a.F4n);
      LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
        o,
        a.X5n,
        "ActionRelatedEntityInfoNotify",
      );
    }
  }),
  (LevelGeneralNetworks.ujl = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.oT_);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnHookLockPointInfoNotify",
      o,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid &&
          (e = e.Entity.GetComponent(83)) &&
          e.UpdateHookPointInfoByNotify(t);
      },
    );
  }),
  (LevelGeneralNetworks.R2_ = (e) => {
    const o = MathUtils_1.MathUtils.LongToNumber(e.bx_),
      r = MathUtils_1.MathUtils.LongToNumber(e.Lx_);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.AddHackingEntityNotify",
      [o, r],
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid &&
          (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid &&
          (e = e.Entity.GetComponent(274)) &&
          (ControllerHolder_1.ControllerHolder.FollowShooterHackController.AddRelationship(
            o,
            r,
          ),
          e.AddHackEntity(t.Entity));
      },
    );
  }),
  (LevelGeneralNetworks.A2_ = (e) => {
    const o = MathUtils_1.MathUtils.LongToNumber(e.bx_),
      r = MathUtils_1.MathUtils.LongToNumber(e.Lx_);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.RemoveHackingEntityNotify",
      [o, r],
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid &&
          (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid &&
          (e = e.Entity.GetComponent(274)) &&
          (ControllerHolder_1.ControllerHolder.FollowShooterHackController.RemoveRelationship(
            o,
            r,
          ),
          e.RemoveHackEntity(t.Entity));
      },
    );
  }),
  (LevelGeneralNetworks.kZ_ = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
    WaitEntityTask_1.WaitEntityTask.Create(
      "LevelGeneralNetworks.OnGravityFlipUpdateTypeNotify",
      o,
      (e) => {
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid &&
          (e = e.Entity.GetComponent(278)) &&
          e.OnNotifyUpdateGravityDirection(t.wY_);
      },
    );
  }),
  (LevelGeneralNetworks.ucc = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      o = !e.Avl,
      r = Vector_1.Vector.Create(e.P5n),
      a = Rotator_1.Rotator.Create(e.g8n),
      e = Vector_1.Vector.Create(e.ZE_);
    o ? _a.dcc(t) : _a.mcc(t, r, a, e);
  });
//# sourceMappingURL=LevelGeneralNetworks.js.map
