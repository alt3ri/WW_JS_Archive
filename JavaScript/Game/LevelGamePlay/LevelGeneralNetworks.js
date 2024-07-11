"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralNetworks = exports.WAIT_ENTITY_ERROR_TIME = void 0);
const Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  Net_1 = require("../../Core/Net/Net"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GeneralLogicTreeDefine_1 = require("../Module/GeneralLogicTree/Define/GeneralLogicTreeDefine"),
  TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils"),
  WorldMapController_1 = require("../Module/WorldMap/WorldMapController"),
  SceneItemDynamicAttachTargetComponent_1 = require("../NewWorld/SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
  SceneItemJigsawBaseComponent_1 = require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
  SceneItemUtility_1 = require("../NewWorld/SceneItem/Util/SceneItemUtility"),
  GameModeController_1 = require("../World/Controller/GameModeController"),
  WaitEntityTask_1 = require("../World/Define/WaitEntityTask"),
  LevelGamePlayUtils_1 = require("./LevelGamePlayUtils"),
  LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine"),
  LevelGeneralContextUtil_1 = require("./LevelGeneralContextUtil"),
  LevelGeneralController_1 = require("./LevelGeneralController");
exports.WAIT_ENTITY_ERROR_TIME = 9e4;
class LevelGeneralNetworks {
  static Register() {
    Net_1.Net.Register(13209, this.QUe),
      Net_1.Net.Register(19161, LevelGeneralNetworks.XUe),
      Net_1.Net.Register(14574, LevelGeneralNetworks.$Ue),
      Net_1.Net.Register(26574, LevelGeneralNetworks.YUe),
      Net_1.Net.Register(15044, LevelGeneralNetworks.JUe),
      Net_1.Net.Register(9779, this.zUe),
      Net_1.Net.Register(22777, this.ZUe),
      Net_1.Net.Register(6606, this.Cqn),
      Net_1.Net.Register(7965, this.eAe),
      Net_1.Net.Register(22483, this.tAe),
      Net_1.Net.Register(10483, this.iAe),
      Net_1.Net.Register(2020, this.oAe),
      Net_1.Net.Register(23404, this.rAe),
      Net_1.Net.Register(14982, this.nAe),
      Net_1.Net.Register(5753, this.sAe),
      Net_1.Net.Register(10156, this.aAe),
      Net_1.Net.Register(5588, this.hAe),
      Net_1.Net.Register(8243, this.lAe),
      Net_1.Net.Register(13938, this._Ae),
      Net_1.Net.Register(3673, this.uAe),
      Net_1.Net.Register(11390, this.URn),
      Net_1.Net.Register(11582, this.xsa);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(13209),
      Net_1.Net.UnRegister(19161),
      Net_1.Net.UnRegister(14574),
      Net_1.Net.UnRegister(26574),
      Net_1.Net.UnRegister(9779),
      Net_1.Net.UnRegister(22777),
      Net_1.Net.UnRegister(6606),
      Net_1.Net.UnRegister(15142),
      Net_1.Net.UnRegister(10483),
      Net_1.Net.UnRegister(2020),
      Net_1.Net.UnRegister(23404),
      Net_1.Net.UnRegister(5753),
      Net_1.Net.UnRegister(10156),
      Net_1.Net.UnRegister(8243),
      Net_1.Net.UnRegister(13938),
      Net_1.Net.UnRegister(3673),
      Net_1.Net.UnRegister(11390),
      Net_1.Net.UnRegister(11582);
  }
  static cAe(e) {
    var t,
      a = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      a =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          a,
        )?.Entity?.GetComponent(142);
    a
      ? ((t = MathUtils_1.MathUtils.LongToNumber(e.RDs)),
        a.SetControllerId(t),
        e.DDs && a.ResetItemLocationAndRotation())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          32,
          "[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent",
        );
  }
  static gqn(t) {
    var a = MathUtils_1.MathUtils.LongToNumber(t.P4n),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a),
      o = a?.Entity?.GetComponent(142);
    if (o) {
      (t = MathUtils_1.MathUtils.LongToNumber(t.TIs)),
        (o = (o.SetAutonomousId(t), a.Entity.GetComponent(185)));
      let e = !1;
      0 !== t &&
        ((r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (e = r === t));
      var r = a.Entity.GetComponent(144);
      0 !== t
        ? r?.SetEnableMovementSync(!0, "LevelGeneralNetworks")
        : r?.SetEnableMovementSync(!1, "LevelGeneralNetworks"),
        o.IsMoveAutonomousProxy && !e && r?.CollectSampleAndSend(!0),
        o.SetAutonomous(e);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          32,
          "[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent",
        );
  }
  static mAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.LDs),
      a = MathUtils_1.MathUtils.LongToNumber(e.TDs),
      e = e.DIs - 1,
      o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
    o?.Valid
      ? EventSystem_1.EventSystem.EmitWithTarget(
          o.Entity,
          EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation,
          a,
          e,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          32,
          "RelationIdNotify下发的Id找不到对应的Entity",
          ["EntityConfigId", t],
        );
  }
  static dAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      a = MathUtils_1.MathUtils.LongToNumber(e.RDs),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a),
      o = a?.Entity?.GetComponent(3);
    o &&
      !o.IsRoleAndCtrlByMe &&
      ((o = a.Entity.GetComponent(56)),
      e.D5n ? o.ActiveHandFX(t.Entity) : o.DeactiveHandFx());
  }
  static CAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.A5n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      a = t.Entity.GetComponent(123),
      t = t.Entity.GetComponent(147).Config.Config.Type,
      o = MathUtils_1.MathUtils.LongToNumber(e.U5n),
      o =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          o,
        ).Entity.GetComponent(124),
      r = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.x5n.R5n, e.x5n.P5n);
    (o.Rotation = e.x5n.B5n),
      0 === e.w5n ? a.OnPickUpItem(o, t, !1) : a.OnPutDownItem(o, r, t, !1);
  }
  static gAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.A5n),
      t =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t,
        ).Entity.GetComponent(123),
      a = MathUtils_1.MathUtils.LongToNumber(e.U5n),
      a =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          a,
        ).Entity.GetComponent(124),
      o = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.x5n.R5n, e.x5n.P5n);
    (a.Rotation = e.x5n.B5n),
      t.OnPickUpItem(a, IComponent_1.EItemFoundation.BuildingBlock, !1),
      t.OnPutDownItem(a, o, IComponent_1.EItemFoundation.BuildingBlock, !1);
  }
  static fAe(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e.b5n);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
      .Entity.GetComponent(123)
      .OnFinish();
  }
  static pAe(o, r, l, n) {
    LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityGroupAction，等待创建Entity",
        ["CreatureDataId", r],
        ["PlayerId", o.q5n],
        ["SessionId", o.T5n],
        ["StartIndex", o.G5n],
        ["EndIndex", o.avs],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        r,
        (t) => {
          if (t) {
            t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
            if (t) {
              var a = t.Entity.GetComponent(0)?.GetPbEntityInitData();
              if (a) {
                a = (0, IComponent_1.getComponent)(
                  a.ComponentsData,
                  "EntityGroupComponent",
                );
                if (a && a?.StateTriggers?.length) {
                  let e = a.StateTriggers[n]?.SuccessActions;
                  (e = l ? e : a.StateTriggers[n]?.FailActions)?.length &&
                    (LevelGeneralController_1.LevelGeneralController
                      .LevelEventLogOpen &&
                      Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "LevelEvent",
                        7,
                        "执行EntityGroupAction，Entity创建完毕",
                        ["CreatureDataId", r],
                        ["PlayerId", o.q5n],
                        ["SessionId", o.T5n],
                        ["StartIndex", o.G5n],
                        ["EndIndex", o.avs],
                      ),
                    LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
                      e,
                      LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
                      o.q5n,
                      o.T5n,
                      o.G5n,
                      o.avs,
                    ));
                }
              }
            }
          }
        },
        !1,
        exports.WAIT_ENTITY_ERROR_TIME,
        !0,
        !0,
      );
  }
  static RequestSceneItemStateChange(e, t) {
    var a = Protocol_1.Aki.Protocol._ms.create();
    (a.P4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.O5n = t),
      Net_1.Net.Call(23430, a, (e) => {});
  }
  static RequestActiveOrDeactiveManipulateFx(e, t) {
    var a = Protocol_1.Aki.Protocol.Mds.create();
    (a.P4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.D5n = t),
      Net_1.Net.Call(20464, a, (e) => {});
  }
  static RequestAwakePbEntity(e, t) {}
  static RequestSpawnPbEntity(e, t) {
    t(!0);
  }
  static RequestChangeEntityState(t, e) {
    var a = Protocol_1.Aki.Protocol.cds.create();
    (a.P4n = t.EntityId),
      (a.N5n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.State)),
      Net_1.Net.Call(29258, a, (e) => {
        e &&
          e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Level",
            7,
            "[LevelGeneralController.RequestChangeEntityState] 请求实体状态改变成功",
            ["PbDataId:", t.EntityId],
            ["TargetState:", t.State],
          );
      });
  }
  static RequestEntitySendEvent(t, a) {
    var e = Protocol_1.Aki.Protocol.Qes.create();
    (e.P4n = t),
      (e.k5n = a),
      Net_1.Net.Call(12684, e, (e) => {
        e &&
          e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Level",
            36,
            "[LevelGeneralController.EntitySendEventResponse] 请求实体监听事件成功",
            ["entityId:", t],
            ["enventKey:", a],
          );
      });
  }
  static RequestDoAction(e, t) {}
  static RequestSetInitTagRequest(e) {
    var t;
    e &&
      (((t = Protocol_1.Aki.Protocol.Bds.create()).P4n =
        MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(21064, t, (e) => {}));
  }
  static RequestActionsFinish(e, t, a, o, r) {
    var l = Protocol_1.Aki.Protocol.d$n.create();
    (l.q5n = e),
      (l.T5n = t),
      (l.G5n = a),
      (l.V5n = o),
      Net_1.Net.Call(13516, l, r);
  }
  static RequestEntityInteractOption(e, t, a, o) {
    var r = Protocol_1.Aki.Protocol.Mes.create();
    (r.P4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (r.H5n = t),
      o && (r.j5n = o),
      Net_1.Net.Call(9563, r, a);
  }
  static RequestEntityDynamicInteractOption(e, t, a) {
    var o = Protocol_1.Aki.Protocol.Ies.create();
    (o.P4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.W5n = t),
      Net_1.Net.Call(21072, o, a);
  }
  static RequestEntityRandomInteractOption(e, t, a) {
    var o = Protocol_1.Aki.Protocol.Ees.create();
    (o.P4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.H5n = t),
      Net_1.Net.Call(12010, o, a);
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
    let a = !1;
    switch (e) {
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest:
        a = LevelGeneralNetworks.vAe(t);
        break;
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay:
        a = LevelGeneralNetworks.MAe(t);
        break;
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeInst:
        a = LevelGeneralNetworks.EAe(t);
    }
    return a;
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
      !!GameModeController_1.GameModeController.IsInInstance() &&
      ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === e
    );
  }
  static RequestPlayerAccessEffectArea(e, t) {
    var a = Protocol_1.Aki.Protocol.Ags.create();
    (a.K5n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.Q5n = t
        ? Protocol_1.Aki.Protocol.Q5n.Proto_RangeEnter
        : Protocol_1.Aki.Protocol.Q5n.Proto_RangeLeave),
      Net_1.Net.Call(10183, a, (e) => {});
  }
  static PushEntityTimeDilation(e, t) {
    var a = Protocol_1.Aki.Protocol.aLa.create();
    (a.P4n = e), (a.nKn = t), Net_1.Net.Send(7578, a);
  }
  static CheckEntityCanPushTimeDilation(e) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti && 1 === e;
  }
}
(exports.LevelGeneralNetworks = LevelGeneralNetworks),
  ((_a = LevelGeneralNetworks).XUe = (a) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      MathUtils_1.MathUtils.LongToNumber(a.P4n),
      (e) => {
        var t;
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(a.P4n),
            ))?.Valid &&
            ((t =
              LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
                a.nvs,
              )),
            ModelManager_1.ModelManager.InteractionModel.AddInteractOption(
              e.Entity,
              a.W5n,
              t,
              a.SIs,
              a.dca,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[EntityAddDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToBigInt(a.P4n)],
            );
      },
      !1,
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.$Ue = (t) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      MathUtils_1.MathUtils.LongToNumber(t.P4n),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.P4n),
            )) &&
            ModelManager_1.ModelManager.InteractionModel.RemoveInteractOption(
              e.Entity,
              t.W5n,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[EntityRemoveDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToNumber(t.P4n)],
            );
      },
      !1,
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.YUe = (t) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      MathUtils_1.MathUtils.LongToNumber(t.P4n),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.P4n),
            )) &&
            ModelManager_1.ModelManager.InteractionModel.ChangeOptionText(
              e.Entity,
              t.W5n,
              t.SIs,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[OnEntityChangeDynamicInteractTextNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToNumber(t.P4n)],
            );
      },
      !1,
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.JUe = (t) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      MathUtils_1.MathUtils.LongToNumber(t.P4n),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.P4n),
            ))?.Valid &&
            ModelManager_1.ModelManager.InteractionModel.LockInteraction(
              e.Entity,
              t.lTs,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[EntityInteractFinishNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToBigInt(t.P4n)],
            );
      },
      !1,
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.zUe = (e) => {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.P4n),
    );
    t && t.Entity.GetComponent(119)?.UpdateState(e.o5n, e.hTs);
  }),
  (LevelGeneralNetworks.ZUe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.P4n),
      a = MathUtils_1.MathUtils.LongToNumber(t.RDs);
    const o = new Array();
    o.push(e),
      0 !== a && o.push(a),
      WaitEntityTask_1.WaitEntityTask.Create(o, (e) => {
        e
          ? LevelGeneralNetworks.cAe(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity",
              ["ids", o],
            );
      });
  }),
  (LevelGeneralNetworks.Cqn = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.P4n),
      a = MathUtils_1.MathUtils.LongToNumber(t.TIs);
    const o = new Array();
    o.push(e),
      0 !== a && o.push(a),
      WaitEntityTask_1.WaitEntityTask.Create(o, (e) => {
        e
          ? LevelGeneralNetworks.gqn(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity",
              ["ids", o],
            );
      });
  }),
  (LevelGeneralNetworks.eAe = (t) => {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (e === t.X5n) {
      const a = new Array();
      a.push(MathUtils_1.MathUtils.LongToNumber(t.LDs)),
        0 !== t.TDs && a.push(MathUtils_1.MathUtils.LongToNumber(t.TDs)),
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(a, (e) => {
          e
            ? LevelGeneralNetworks.mAe(t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                32,
                "[RelationIdModifyNotif] 等待之后还是找不到对应的Entity",
                ["ids", a],
              );
        });
    }
  }),
  (LevelGeneralNetworks.tAe = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (a?.Valid) {
      var o = a?.Entity?.GetComponent(112);
      if (o) {
        var r = new SceneItemDynamicAttachTargetComponent_1.AttachParam();
        switch (
          ((r.PosAttachType = 2),
          (r.PosAttachOffset = e.$5n),
          (r.PosAbsolute = !1),
          (r.RotAttachType = 2),
          (r.RotAttachOffset = e.Y5n),
          (r.RotAbsolute = !1),
          e.J5n)
        ) {
          case Protocol_1.Aki.Protocol.z3s.Proto_AttachTargetEntity:
            o.IsRegTarget() &&
              o.UnRegTarget("[EntityAttachChangeNotify] AttachTargetEntity"),
              o.RegEntityTarget(
                e.Z5n.z5n,
                e.Z5n.e6n,
                r,
                "[EntityAttachChangeNotify] AttachTargetEntity",
              );
            break;
          case Protocol_1.Aki.Protocol.z3s.Proto_AttachTargetActorPath:
            o.IsRegTarget() &&
              o.UnRegTarget("[EntityAttachChangeNotify] AttachTargetActorPath"),
              o.RegRefActorTarget(
                e.t6n,
                r,
                "[EntityAttachChangeNotify] AttachTargetActorPath",
              );
            break;
          case Protocol_1.Aki.Protocol.z3s.Proto_AttachTargetNone:
            o.UnRegTarget("[EntityAttachChangeNotify] AttachTargetNone");
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            40,
            "EntityAttachChangeNotify指定的Entity缺少DynamicAttachComp",
            ["EntityConfigId", t],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          40,
          "EntityAttachChangeNotify下发的EntityId找不到对应的Entity",
          ["EntityConfigId", t],
        );
  }),
  (LevelGeneralNetworks.iAe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.P4n),
      a = MathUtils_1.MathUtils.LongToNumber(t.RDs);
    const o = new Array();
    o.push(e),
      o.push(a),
      WaitEntityTask_1.WaitEntityTask.Create(o, (e) => {
        e
          ? LevelGeneralNetworks.dAe(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[FxShowNotify] 等待之后还是找不到对应的Entity",
              ["ids", o],
            );
      });
  }),
  (LevelGeneralNetworks.oAe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.A5n),
      a = MathUtils_1.MathUtils.LongToNumber(t.U5n);
    const o = new Array();
    o.push(e),
      o.push(a),
      WaitEntityTask_1.WaitEntityTask.Create(o, (e) => {
        e
          ? LevelGeneralNetworks.CAe(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
              ["ids", o],
            );
      });
  }),
  (LevelGeneralNetworks.rAe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.A5n),
      a = MathUtils_1.MathUtils.LongToNumber(t.U5n);
    const o = new Array();
    o.push(e),
      o.push(a),
      WaitEntityTask_1.WaitEntityTask.Create(o, (e) => {
        e
          ? LevelGeneralNetworks.gAe(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
              ["ids", o],
            );
      });
  }),
  (LevelGeneralNetworks.nAe = (t) => {
    const a = MathUtils_1.MathUtils.LongToNumber(t.b5n);
    WaitEntityTask_1.WaitEntityTask.Create(a, (e) => {
      e
        ? _a.fAe(t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            32,
            "[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
            ["baseId", a],
          );
    });
  }),
  (LevelGeneralNetworks.QUe = (t) => {
    var a = t.nvs,
      o = t.T5n;
    if (LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen) {
      let e = "";
      try {
        e = JSON.stringify(a);
      } catch {
        e = "Context序列化解析失败";
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LevelEvent",
          7,
          "服务端驱动执行行为组",
          ["Context", e],
          ["PlayerId", t.q5n],
          ["SessionId", o],
          ["Total", t.svs],
          ["StartIndex", t.G5n],
          ["EndIndex", t.avs],
        );
    }
    switch (a._vs) {
      case Protocol_1.Aki.Protocol.vOs.mvs:
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（动态交互）"),
          TsInteractionUtils_1.TsInteractionUtils.HandleEntityDynamicInteractByServerNotify(
            t,
            a.mvs.W5n,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Evs:
        var e = a.Evs.rps,
          r =
            ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
              e,
            );
        r
          ? (l = r.LevelPlayOpenAction) &&
            0 !== l.length &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneGameplay", 19, "开始执行玩法开启/刷新动作"),
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
              l,
              LevelGeneralContextDefine_1.LevelPlayContext.Create(r.Id),
              t.q5n,
              t.T5n,
              t.G5n,
              t.avs,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay
                ],
              ],
              ["treeId", e],
            );
        break;
      case Protocol_1.Aki.Protocol.vOs.Proto_LeaveInstEscActionCtx:
        var l = a.qua?.Oua,
          r =
            ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
        r
          ? (e = r.FinishEscAction) && 0 !== e.length
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneGameplay",
                  19,
                  "开始执行副本玩法执行ESC退出行为",
                ),
              LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
                e,
                LevelGeneralContextDefine_1.InstanceDungeonContext.Create(l),
                t.q5n,
                t.T5n,
                t.G5n,
                t.avs,
              ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                7,
                "服务器通知副本玩法执行ESC退出行为时：对应的行为数据不存在或者长度为0，联系程序检查Bug",
                [
                  "treeType",
                  GeneralLogicTreeDefine_1.btTypeLogString[
                    Protocol_1.Aki.Protocol.tps.Proto_BtTypeInst
                  ],
                ],
                ["treeId", l],
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              7,
              "服务器通知玩法执行ESC退出行为时：对应的副本玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.tps.Proto_BtTypeInst
                ],
              ],
              ["treeId", l],
            );
        break;
      case Protocol_1.Aki.Protocol.vOs.yvs:
        (r = a.yvs.rps),
          (e =
            ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
              r,
            ));
        e
          ? (l = e.AfterGetRewardAction) &&
            0 !== l.length &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneGameplay", 19, "开始执行玩法开启/刷新动作"),
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
              l,
              LevelGeneralContextDefine_1.LevelPlayContext.Create(e.Id),
              t.q5n,
              t.T5n,
              t.G5n,
              t.avs,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay
                ],
              ],
              ["treeId", r],
            );
        break;
      case Protocol_1.Aki.Protocol.vOs.Ivs:
        (l = a.Ivs.I5n),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(l));
        if (!e)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", l],
            )
          );
        r = e.ActiveActions;
        r &&
          0 !== r.length &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            r,
            LevelGeneralContextDefine_1.QuestContext.Create(l),
            t.q5n,
            t.T5n,
            t.G5n,
            t.avs,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Tvs:
        (e = a.Tvs.I5n),
          (r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e));
        if (!r)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", e],
            )
          );
        l = r.AcceptActions;
        l &&
          0 !== l.length &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            l,
            LevelGeneralContextDefine_1.QuestContext.Create(e),
            t.q5n,
            t.T5n,
            t.G5n,
            t.avs,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Lvs:
        (r = a.Lvs.I5n),
          (l = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r));
        if (!l)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", r],
            )
          );
        e = l.FinishActions;
        e &&
          0 !== e.length &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            e,
            LevelGeneralContextDefine_1.QuestContext.Create(r),
            t.q5n,
            t.T5n,
            t.G5n,
            t.avs,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.$vs:
        (l = a.$vs.I5n),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(l));
        if (!e)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest
                ],
              ],
              ["treeId", l],
            )
          );
        r = e.TerminateActions;
        r &&
          0 !== r.length &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            r,
            LevelGeneralContextDefine_1.QuestContext.Create(l),
            t.q5n,
            t.T5n,
            t.G5n,
            t.avs,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Rvs:
      case Protocol_1.Aki.Protocol.vOs.Dvs:
      case Protocol_1.Aki.Protocol.vOs.Avs:
      case Protocol_1.Aki.Protocol.vOs.Pvs:
      case Protocol_1.Aki.Protocol.vOs.Uvs:
      case Protocol_1.Aki.Protocol.vOs.qvs:
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BehaviorTreeStartActionSession,
          t,
        );
        break;
      case Protocol_1.Aki.Protocol.vOs.dvs:
        e = MathUtils_1.MathUtils.LongToNumber(a.dvs.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
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
            a.dvs.H5n,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Proto_EntityStateChangeAction:
        r = MathUtils_1.MathUtils.LongToNumber(a.gvs.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityStateChangeAction）",
            ["CreatureDataId", r],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateActionByServerNotify(
            t,
            r,
            a.gvs.Qvs,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.fvs:
        l = MathUtils_1.MathUtils.LongToNumber(a.fvs.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityGroupAction）",
            ["CreatureDataId", l],
          ),
          LevelGeneralNetworks.pAe(t, l, a.fvs.i6n, a.fvs.Xvs);
        break;
      case Protocol_1.Aki.Protocol.vOs.vvs:
        (e = MathUtils_1.MathUtils.LongToNumber(a.vvs.Kvs.T5n)),
          (r = MathUtils_1.MathUtils.LongToNumber(a.vvs.Yvs));
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityTriggerAction）",
            ["CreatureDataId", e],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleTriggerStateActionByServerNotify(
            t,
            e,
            r,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Proto_EntityLeaveTrigger:
        (l = MathUtils_1.MathUtils.LongToNumber(a.pvs.Kvs.T5n)),
          (e = MathUtils_1.MathUtils.LongToNumber(a.pvs.Yvs));
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityLeaveTriggerAction）",
            ["CreatureDataId", l],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleExitTriggerStateActionByServerNotify(
            t,
            l,
            e,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Gvs:
        r = MathUtils_1.MathUtils.LongToNumber(a.Gvs.Kvs.T5n);
        SceneItemUtility_1.SceneItemUtility.HandleExploreInteractActionByServerNotify(
          t,
          r,
        );
        break;
      case Protocol_1.Aki.Protocol.vOs.Mvs:
        l = MathUtils_1.MathUtils.LongToNumber(a.Mvs.Kvs.T5n);
        SceneItemUtility_1.SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify(
          t,
          l,
        );
        break;
      case Protocol_1.Aki.Protocol.vOs.Svs:
        e = MathUtils_1.MathUtils.LongToNumber(a.Svs.Kvs.T5n);
        SceneItemUtility_1.SceneItemUtility.HandleTimeTrackControlActionByServerNotify(
          t,
          e,
          a.Svs,
        );
        break;
      case Protocol_1.Aki.Protocol.vOs.Proto_SceneItemLifeCycleComponentCreate:
        r = MathUtils_1.MathUtils.LongToNumber(a.Nvs.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（LifeCycleCreateAction）",
            ["CreatureDataId", r],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
            t,
            r,
            !0,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Proto_SceneItemLifeCycleComponentDetroy:
        l = MathUtils_1.MathUtils.LongToNumber(a.Fvs.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（LifeCycleDestroyAction）",
            ["CreatureDataId", l],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
            t,
            l,
            !1,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Hvs:
        (e = MathUtils_1.MathUtils.LongToNumber(a.Hvs.Kvs.T5n)),
          (r = a.Hvs.r6n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            40,
            "服务端驱动执行行为组（EntityBeamReceiveAction）",
            ["CreatureDataId", e],
            ["ReceiveType", r],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleBeamReceiveActionByServerNotify(
            t,
            e,
            r,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Proto_TrampleActiveActionCtx:
        l = MathUtils_1.MathUtils.LongToNumber(a.yma.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            40,
            "服务端驱动执行行为组（TrampleActiveAction）",
            ["CreatureDataId", l],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleTrampleActivateActionByServerNotify(
            t,
            l,
            !0,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.Proto_TrampleDeActiveActionCtx:
        e = MathUtils_1.MathUtils.LongToNumber(a.Ima.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            40,
            "服务端驱动执行行为组（TrampleDeActiveAction）",
            ["CreatureDataId", e],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleTrampleActivateActionByServerNotify(
            t,
            e,
            !1,
          );
        break;
      case Protocol_1.Aki.Protocol.vOs.kvs: {
        r = a.kvs.o6n;
        let e = void 0;
        try {
          e = JSON.parse(r);
        } catch {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Gm", 40, "GM驱动行为列表: 行为列表解析失败", [
              "JsonStr",
              r,
            ]);
          break;
        }
        if (!Array.isArray(e) || 0 === e.length) break;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Gm", 40, "开始执行GM驱动行为列表"),
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            e,
            LevelGeneralContextDefine_1.GmLevelActionContext.Create(),
            t.q5n,
            t.T5n,
            t.G5n,
            t.avs,
          );
        break;
      }
      case Protocol_1.Aki.Protocol.vOs.Proto_EntityStateChangeConditionAction:
        l = MathUtils_1.MathUtils.LongToNumber(a.Wvs.Kvs.T5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityStateChangeConditionAction）",
            ["CreatureDataId", l],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateChangeConditionActionByServerNotify(
            t,
            l,
            a.Wvs.Qvs,
            a.Wvs.K4n,
          );
    }
  }),
  (LevelGeneralNetworks.sAe = (l) => {
    const n = MathUtils_1.MathUtils.LongToNumber(l.b5n);
    WaitEntityTask_1.WaitEntityTask.Create(n, (e) => {
      if (e) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (e) {
          var t = e.Entity.GetComponent(123);
          if (t)
            for (const r of l.eLs) {
              var a = new SceneItemJigsawBaseComponent_1.JigsawIndex(
                  r.jTs,
                  r.WTs,
                ),
                o = MathUtils_1.MathUtils.LongToNumber(r.KTs);
              t.DynamicModifySocketState(a, o);
            }
        }
      }
    });
  }),
  (LevelGeneralNetworks.aAe = (e) => {
    for (const t of e.NEs)
      10015 === t.n6n &&
        WorldMapController_1.WorldMapController.LockView(t.dps);
  }),
  (LevelGeneralNetworks.hAe = (e) => {
    e.lvs
      ? LevelGamePlayUtils_1.LevelGamePlayUtils.ReleaseOperationRestriction()
      : e.s6n &&
        LevelGamePlayUtils_1.LevelGamePlayUtils.LevelOperationRestriction(
          e.s6n,
        );
  }),
  (LevelGeneralNetworks.lAe = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.l2s),
      a = e.Q5n === Protocol_1.Aki.Protocol.Q5n.Proto_RangeEnter,
      o = [];
    for (const r of e._$s) o.push(MathUtils_1.MathUtils.LongToNumber(r));
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(76)) &&
        e.ServerUpdateEntitiesInRangeOnline(a, o);
    });
  }),
  (LevelGeneralNetworks._Ae = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.l2s),
      a = e.Q5n === Protocol_1.Aki.Protocol.Q5n.Proto_RangeEnter,
      o = e._2s;
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(76)) &&
        e.ServerUpdatePlayerInRangeOnline(a, o);
    });
  }),
  (LevelGeneralNetworks.uAe = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.u2s),
      a = e.c2s === Protocol_1.Aki.Protocol.c2s.Proto_Up;
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(138)) &&
        e.ChangeTransition(a);
    });
  }),
  (LevelGeneralNetworks.URn = (e) => {
    var t;
    e.kEs &&
      ((t = MathUtils_1.MathUtils.LongToNumber(e.P4n)),
      (t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t))) &&
      t.Entity?.GetComponent(0)?.UpdateVar(e.OEs, e.kEs);
  }),
  (LevelGeneralNetworks.xsa = (e) => {
    const r = MathUtils_1.MathUtils.LongToNumber(e.P4n);
    r &&
      WaitEntityTask_1.WaitEntityTask.Create(r, (e) => {
        var t, a, o;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid &&
          ((t = (o =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
              ?.Entity)?.GetComponent(56)),
          (o = o?.GetComponent(1)),
          t?.Valid) &&
          o?.Valid &&
          ((a = MathUtils_1.MathUtils.CommonTempVector).Set(100, 0, 0),
          (o = o.ActorTransform.TransformPositionNoScale(a.ToUeVector())),
          e.Entity.GetComponent(185)?.SetActorLocation(o),
          t.TryManipulateSpecificItem(e.Entity));
      });
  });
//# sourceMappingURL=LevelGeneralNetworks.js.map
