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
  SceneItemDynamicAttachTargetComponent_1 = require("../NewWorld/SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
  SceneItemJigsawBaseComponent_1 = require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
  SceneItemUtility_1 = require("../NewWorld/SceneItem/Util/SceneItemUtility"),
  PreloadControllerClassPart2_1 = require("../Preload/PreloadControllerClassPart2"),
  CreatureController_1 = require("../World/Controller/CreatureController"),
  GameModeController_1 = require("../World/Controller/GameModeController"),
  WaitEntityTask_1 = require("../World/Define/WaitEntityTask"),
  LevelGamePlayUtils_1 = require("./LevelGamePlayUtils"),
  LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine"),
  LevelGeneralContextUtil_1 = require("./LevelGeneralContextUtil"),
  LevelGeneralController_1 = require("./LevelGeneralController");
exports.WAIT_ENTITY_ERROR_TIME = 9e4;
class LevelGeneralNetworks {
  static Register() {
    Net_1.Net.Register(18230, this.QUe),
      Net_1.Net.Register(15984, LevelGeneralNetworks.XUe),
      Net_1.Net.Register(28696, LevelGeneralNetworks.$Ue),
      Net_1.Net.Register(20089, LevelGeneralNetworks.YUe),
      Net_1.Net.Register(16711, LevelGeneralNetworks.JUe),
      Net_1.Net.Register(24225, this.zUe),
      Net_1.Net.Register(18587, this.ZUe),
      Net_1.Net.Register(16386, this.Iqn),
      Net_1.Net.Register(16044, this.eAe),
      Net_1.Net.Register(18377, this.tAe),
      Net_1.Net.Register(24571, this.iAe),
      Net_1.Net.Register(20048, this.GQa),
      Net_1.Net.Register(28171, this.kQa),
      Net_1.Net.Register(17282, this.rAe),
      Net_1.Net.Register(24470, this.nAe),
      Net_1.Net.Register(25265, this.sAe),
      Net_1.Net.Register(16002, this.aAe),
      Net_1.Net.Register(21194, this.hAe),
      Net_1.Net.Register(20410, this.lAe),
      Net_1.Net.Register(19640, this._Ae),
      Net_1.Net.Register(26371, this.uAe),
      Net_1.Net.Register(19624, this.URn),
      Net_1.Net.Register(20130, this.sQs),
      Net_1.Net.Register(29416, this.mla),
      Net_1.Net.Register(15619, this.hNa),
      Net_1.Net.Register(19060, this.uXa);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(18230),
      Net_1.Net.UnRegister(15984),
      Net_1.Net.UnRegister(28696),
      Net_1.Net.UnRegister(20089),
      Net_1.Net.UnRegister(24225),
      Net_1.Net.UnRegister(18587),
      Net_1.Net.UnRegister(16386),
      Net_1.Net.UnRegister(23259),
      Net_1.Net.UnRegister(24571),
      Net_1.Net.UnRegister(20048),
      Net_1.Net.UnRegister(28171),
      Net_1.Net.UnRegister(17282),
      Net_1.Net.UnRegister(25265),
      Net_1.Net.UnRegister(16002),
      Net_1.Net.UnRegister(20410),
      Net_1.Net.UnRegister(19640),
      Net_1.Net.UnRegister(26371),
      Net_1.Net.UnRegister(19624),
      Net_1.Net.UnRegister(29416),
      Net_1.Net.UnRegister(15619),
      Net_1.Net.UnRegister(19060);
  }
  static cAe(e) {
    var t,
      a = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      a =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          a,
        )?.Entity?.GetComponent(143);
    a
      ? ((t = MathUtils_1.MathUtils.LongToNumber(e.bDs)),
        a.SetControllerId(t),
        e.BDs && a.ResetItemLocationAndRotation())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          32,
          "[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent",
        );
  }
  static Tqn(t) {
    var a = MathUtils_1.MathUtils.LongToNumber(t.F4n),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a),
      o = a?.Entity?.GetComponent(143);
    if (o) {
      (t = MathUtils_1.MathUtils.LongToNumber(t.wIs)),
        (o = (o.SetAutonomousId(t), a.Entity.GetComponent(187)));
      let e = !1;
      0 !== t &&
        ((r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (e = r === t));
      var r = a.Entity.GetComponent(145);
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
    var t = MathUtils_1.MathUtils.LongToNumber(e.xDs),
      a = MathUtils_1.MathUtils.LongToNumber(e.wDs),
      e = e.BIs - 1,
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
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      a = MathUtils_1.MathUtils.LongToNumber(e.bDs),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a),
      o = a?.Entity?.GetComponent(3);
    o &&
      !o.IsRoleAndCtrlByMe &&
      ((o = a.Entity.GetComponent(57)),
      e.q5n ? o.ActiveHandFX(t.Entity) : o.DeactiveHandFx());
  }
  static NQa(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.srh),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t),
      a = t.Entity.GetComponent(124),
      t = t.Entity.GetComponent(148).Config.Config.Type,
      o = MathUtils_1.MathUtils.LongToNumber(e.nLs.iLs),
      o =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          o,
        ).Entity.GetComponent(125),
      r = new SceneItemJigsawBaseComponent_1.JigsawIndex(
        e.nLs.l8n.N5n,
        e.nLs.l8n.F5n,
      );
    (o.Rotation = e.nLs.l8n.V5n), a.PutDownItem(o, r, t);
  }
  static FQa(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.srh),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t),
      a = t.Entity.GetComponent(124),
      t = t.Entity.GetComponent(148).Config.Config.Type,
      o = MathUtils_1.MathUtils.LongToNumber(e.nLs.iLs),
      o =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          o,
        ).Entity.GetComponent(125),
      r = new SceneItemJigsawBaseComponent_1.JigsawIndex(
        e.nLs.l8n.N5n,
        e.nLs.l8n.F5n,
      );
    (o.Rotation = e.nLs.l8n.V5n), a.PickUpItem(o, r, t);
  }
  static gAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.G5n),
      t =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t,
        ).Entity.GetComponent(124),
      a = MathUtils_1.MathUtils.LongToNumber(e.O5n),
      a =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          a,
        ).Entity.GetComponent(125),
      o = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.k5n.N5n, e.k5n.F5n);
    (a.Rotation = e.k5n.V5n),
      t.PickUpItem(a, o, IComponent_1.EItemFoundation.BuildingBlock),
      t.PutDownItem(a, o, IComponent_1.EItemFoundation.BuildingBlock);
  }
  static fAe(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e.j5n);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
      .Entity.GetComponent(124)
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
        ["PlayerId", o.W5n],
        ["SessionId", o.w5n],
        ["StartIndex", o.K5n],
        ["EndIndex", o.mvs],
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
                        ["PlayerId", o.W5n],
                        ["SessionId", o.w5n],
                        ["StartIndex", o.K5n],
                        ["EndIndex", o.mvs],
                      ),
                    LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
                      e,
                      LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
                      o.W5n,
                      o.w5n,
                      o.K5n,
                      o.mvs,
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
  static RequestSceneItemStateChange(e, t) {
    var a = Protocol_1.Aki.Protocol.fms.create();
    (a.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.Q5n = t),
      Net_1.Net.Call(29693, a, (e) => {});
  }
  static RequestActiveOrDeactiveManipulateFx(e, t) {
    var a = Protocol_1.Aki.Protocol.Dds.create();
    (a.F4n = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.q5n = t),
      Net_1.Net.Call(24100, a, (e) => {});
  }
  static RequestAwakePbEntity(e, t) {}
  static RequestSpawnPbEntity(e, t) {
    t(!0);
  }
  static RequestChangeEntityState(t, e) {
    var a = Protocol_1.Aki.Protocol.pds.create();
    (a.F4n = t.EntityId),
      (a.X5n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.State)),
      Net_1.Net.Call(19137, a, (e) => {
        e &&
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
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
    var e = Protocol_1.Aki.Protocol.tts.create();
    (e.F4n = t),
      (e.$5n = a),
      Net_1.Net.Call(17998, e, (e) => {
        e &&
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
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
      (((t = Protocol_1.Aki.Protocol.Vds.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(15343, t, (e) => {}));
  }
  static RequestActionsFinish(e, t, a, o, r) {
    var l = Protocol_1.Aki.Protocol.d$n.create();
    (l.W5n = e),
      (l.w5n = t),
      (l.K5n = a),
      (l.J5n = o),
      Net_1.Net.Call(20115, l, r);
  }
  static RequestEntityInteractOption(e, t, a, o) {
    var r = Protocol_1.Aki.Protocol.Res.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (r.z5n = t),
      o && (r.Z5n = o),
      Net_1.Net.Call(17792, r, a);
  }
  static RequestEntityDynamicInteractOption(e, t, a) {
    var o = Protocol_1.Aki.Protocol.Ues.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.e6n = t),
      Net_1.Net.Call(21447, o, a);
  }
  static RequestEntityRandomInteractOption(e, t, a) {
    var o = Protocol_1.Aki.Protocol.Aes.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.z5n = t),
      Net_1.Net.Call(28742, o, a);
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
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        a = LevelGeneralNetworks.vAe(t);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        a = LevelGeneralNetworks.MAe(t);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
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
    var a = Protocol_1.Aki.Protocol.Ugs.create();
    (a.zWn = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.i6n = t
        ? Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter
        : Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave),
      Net_1.Net.Call(22323, a, (e) => {});
  }
  static aQs(e, t, a) {
    e =
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        e,
      )?.Entity?.GetComponent(209);
    e && (a ? e.ServerConnectEntities(t) : e.ServerDisconnectEntities(t));
  }
  static PushEntityTimeDilation(e, t) {
    var a = Protocol_1.Aki.Protocol.Reh.create();
    (a.F4n = e), (a.dKn = t), Net_1.Net.Send(19859, a);
  }
  static CheckEntityCanPushTimeDilation(e) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti && 1 === e;
  }
}
(exports.LevelGeneralNetworks = LevelGeneralNetworks),
  ((_a = LevelGeneralNetworks).XUe = (a) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      MathUtils_1.MathUtils.LongToNumber(a.F4n),
      (e) => {
        var t;
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(a.F4n),
            ))?.Valid &&
            ((t =
              LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
                a.cvs,
              )),
            ModelManager_1.ModelManager.InteractionModel.AddInteractOption(
              e.Entity,
              a.e6n,
              t,
              a.DIs,
              a.eCa,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[EntityAddDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToBigInt(a.F4n)],
            );
      },
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.$Ue = (t) => {
    WaitEntityTask_1.WaitEntityTask.Create(
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
              37,
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
              37,
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
              37,
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
    t && t.Entity.GetComponent(120)?.UpdateState(e.m5n, e.CTs);
  }),
  (LevelGeneralNetworks.ZUe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.F4n),
      a = MathUtils_1.MathUtils.LongToNumber(t.bDs);
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
  (LevelGeneralNetworks.Iqn = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.F4n),
      a = MathUtils_1.MathUtils.LongToNumber(t.wIs);
    const o = new Array();
    o.push(e),
      0 !== a && o.push(a),
      WaitEntityTask_1.WaitEntityTask.Create(o, (e) => {
        e
          ? LevelGeneralNetworks.Tqn(t)
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
    if (e === t.r6n) {
      const a = new Array();
      a.push(MathUtils_1.MathUtils.LongToNumber(t.xDs)),
        0 !== t.wDs && a.push(MathUtils_1.MathUtils.LongToNumber(t.wDs)),
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
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (a?.Valid) {
      var o = a?.Entity?.GetComponent(113);
      if (o) {
        var r = new SceneItemDynamicAttachTargetComponent_1.AttachParam();
        switch (
          ((r.PosAttachType = 2),
          (r.PosAttachOffset = e.o6n),
          (r.PosAbsolute = !1),
          (r.RotAttachType = 2),
          (r.RotAttachOffset = e.n6n),
          (r.RotAbsolute = !1),
          e.s6n)
        ) {
          case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetEntity:
            o.IsRegTarget() &&
              o.UnRegTarget("[EntityAttachChangeNotify] AttachTargetEntity"),
              o.RegEntityTarget(
                e.h6n.a6n,
                e.h6n.l6n,
                r,
                "[EntityAttachChangeNotify] AttachTargetEntity",
              );
            break;
          case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetActorPath:
            o.IsRegTarget() &&
              o.UnRegTarget("[EntityAttachChangeNotify] AttachTargetActorPath"),
              o.RegRefActorTarget(
                e._6n,
                r,
                "[EntityAttachChangeNotify] AttachTargetActorPath",
              );
            break;
          case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetNone:
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
    var e = MathUtils_1.MathUtils.LongToNumber(t.F4n),
      a = MathUtils_1.MathUtils.LongToNumber(t.bDs);
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
  (LevelGeneralNetworks.GQa = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.srh),
      a = MathUtils_1.MathUtils.LongToNumber(t.nLs.iLs);
    const o = new Array();
    o.push(e),
      o.push(a),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(o, (e) => {
        e
          ? LevelGeneralNetworks.NQa(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[OnAddPlacementNotify] 等待之后还是找不到对应的Entity",
              ["ids", o],
            );
      });
  }),
  (LevelGeneralNetworks.kQa = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.srh),
      a = MathUtils_1.MathUtils.LongToNumber(t.nLs.iLs);
    const o = new Array();
    o.push(e),
      o.push(a),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(o, (e) => {
        e
          ? LevelGeneralNetworks.FQa(t)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[OnRemovePlacementFromBoardNotify] 等待之后还是找不到对应的Entity",
              ["ids", o],
            );
      });
  }),
  (LevelGeneralNetworks.rAe = (t) => {
    var e = MathUtils_1.MathUtils.LongToNumber(t.G5n),
      a = MathUtils_1.MathUtils.LongToNumber(t.O5n);
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
    const a = MathUtils_1.MathUtils.LongToNumber(t.j5n);
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
    var a = t.cvs,
      o = t.w5n;
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
          ["PlayerId", t.W5n],
          ["SessionId", o],
          ["Total", t.dvs],
          ["StartIndex", t.K5n],
          ["EndIndex", t.mvs],
        );
    }
    switch (a.fvs) {
      case Protocol_1.Aki.Protocol.TOs.Svs:
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（动态交互）"),
          TsInteractionUtils_1.TsInteractionUtils.HandleEntityDynamicInteractByServerNotify(
            t,
            a.Svs.e6n,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Avs:
        var e = a.Avs._ps,
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
              t.W5n,
              t.w5n,
              t.K5n,
              t.mvs,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
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
        var l = a.$ma?.jma,
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
                t.W5n,
                t.w5n,
                t.K5n,
                t.mvs,
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
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst
                ],
              ],
              ["treeId", l],
            );
        break;
      case Protocol_1.Aki.Protocol.TOs.Pvs:
        (r = a.Pvs._ps),
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
              t.W5n,
              t.w5n,
              t.K5n,
              t.mvs,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay
                ],
              ],
              ["treeId", r],
            );
        break;
      case Protocol_1.Aki.Protocol.TOs.Uvs:
        (l = a.Uvs.B5n),
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
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
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
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.wvs:
        (e = a.wvs.B5n),
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
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
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
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.xvs:
        (r = a.xvs.B5n),
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
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
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
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Yvs:
        (l = a.Yvs.B5n),
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
                  Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
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
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
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
        e = MathUtils_1.MathUtils.LongToNumber(a.Mvs.eps.w5n);
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
            a.Mvs.z5n,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_EntityStateChangeAction:
        r = MathUtils_1.MathUtils.LongToNumber(a.yvs.eps.w5n);
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
            a.yvs.tps,
          );
        break;
      case Protocol_1.Aki.Protocol.TOs.Ivs:
        l = MathUtils_1.MathUtils.LongToNumber(a.Ivs.eps.w5n);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityGroupAction）",
            ["CreatureDataId", l],
          ),
          LevelGeneralNetworks.pAe(t, l, a.Ivs.u6n, a.Ivs.ips);
        break;
      case Protocol_1.Aki.Protocol.TOs.Tvs:
        (e = MathUtils_1.MathUtils.LongToNumber(a.Tvs.eps.w5n)),
          (r = MathUtils_1.MathUtils.LongToNumber(a.Tvs.rps));
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
      case Protocol_1.Aki.Protocol.TOs.Proto_EntityLeaveTrigger:
        (l = MathUtils_1.MathUtils.LongToNumber(a.Lvs.eps.w5n)),
          (e = MathUtils_1.MathUtils.LongToNumber(a.Lvs.rps));
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
      case Protocol_1.Aki.Protocol.TOs.Hvs:
        r = MathUtils_1.MathUtils.LongToNumber(a.Hvs.eps.w5n);
        SceneItemUtility_1.SceneItemUtility.HandleExploreInteractActionByServerNotify(
          t,
          r,
        );
        break;
      case Protocol_1.Aki.Protocol.TOs.Rvs:
        l = MathUtils_1.MathUtils.LongToNumber(a.Rvs.eps.w5n);
        SceneItemUtility_1.SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify(
          t,
          l,
        );
        break;
      case Protocol_1.Aki.Protocol.TOs.Dvs:
        e = MathUtils_1.MathUtils.LongToNumber(a.Dvs.eps.w5n);
        SceneItemUtility_1.SceneItemUtility.HandleTimeTrackControlActionByServerNotify(
          t,
          e,
          a.Dvs,
        );
        break;
      case Protocol_1.Aki.Protocol.TOs.Proto_SceneItemLifeCycleComponentCreate:
        r = MathUtils_1.MathUtils.LongToNumber(a.Kvs.eps.w5n);
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
      case Protocol_1.Aki.Protocol.TOs.Proto_SceneItemLifeCycleComponentDetroy:
        l = MathUtils_1.MathUtils.LongToNumber(a.Qvs.eps.w5n);
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
      case Protocol_1.Aki.Protocol.TOs.Jvs:
        (e = MathUtils_1.MathUtils.LongToNumber(a.Jvs.eps.w5n)),
          (r = a.Jvs.c6n);
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
      case Protocol_1.Aki.Protocol.TOs.Proto_TrampleActiveActionCtx:
        l = MathUtils_1.MathUtils.LongToNumber(a.Yga.eps.w5n);
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
      case Protocol_1.Aki.Protocol.TOs.Proto_TrampleDeActiveActionCtx:
        e = MathUtils_1.MathUtils.LongToNumber(a.Jga.eps.w5n);
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
      case Protocol_1.Aki.Protocol.TOs.Wvs: {
        r = a.Wvs.m6n;
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
            t.W5n,
            t.w5n,
            t.K5n,
            t.mvs,
          );
        break;
      }
      case Protocol_1.Aki.Protocol.TOs.Proto_EntityStateChangeConditionAction:
        l = MathUtils_1.MathUtils.LongToNumber(a.Zvs.eps.w5n);
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
            a.Zvs.tps,
            a.Zvs.t5n,
          );
    }
  }),
  (LevelGeneralNetworks.sAe = (l) => {
    const n = MathUtils_1.MathUtils.LongToNumber(l.j5n);
    WaitEntityTask_1.WaitEntityTask.Create(n, (e) => {
      if (e) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (e) {
          var t = e.Entity.GetComponent(124);
          if (t)
            for (const r of l.aLs) {
              var a = new SceneItemJigsawBaseComponent_1.JigsawIndex(
                  r.zTs,
                  r.ZTs,
                ),
                o = MathUtils_1.MathUtils.LongToNumber(r.eLs);
              t.DynamicModifySocketState(a, o);
            }
        }
      }
    });
  }),
  (LevelGeneralNetworks.aAe = (e) => {
    for (const t of e.KEs)
      ModelManager_1.ModelManager.FunctionModel?.UpdateFunctionOpenLockByBehaviorTree(
        t.d6n,
        !t.Sps,
      );
  }),
  (LevelGeneralNetworks.uXa = (e) => {
    for (const t of e.KEs)
      t.h5n === Protocol_1.Aki.Protocol.coh.Proto_TeleportDungeon &&
        PreloadControllerClassPart2_1.InstanceDungeonController.UpdateForbidDungeon(
          t.yIs,
          t.Zih?.Jih,
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
      a = e.i6n === Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
      o = [];
    for (const r of e.HKs) o.push(MathUtils_1.MathUtils.LongToNumber(r));
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(77)) &&
        e.ServerUpdateEntitiesInRangeOnline(a, o);
    });
  }),
  (LevelGeneralNetworks._Ae = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.g2s),
      a = e.i6n === Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
      o = e.f2s;
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(77)) &&
        e.ServerUpdatePlayerInRangeOnline(a, o);
    });
  }),
  (LevelGeneralNetworks.uAe = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.v2s),
      a = e.p2s === Protocol_1.Aki.Protocol.p2s.Proto_Up;
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(139)) &&
        e.ChangeTransition(a);
    });
  }),
  (LevelGeneralNetworks.URn = (e) => {
    var t;
    e.WEs &&
      ((t = MathUtils_1.MathUtils.LongToNumber(e.F4n)),
      (t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t))) &&
      t.Entity?.GetComponent(0)?.UpdateVar(e.jEs, e.WEs);
  }),
  (LevelGeneralNetworks.sQs = (e) => {
    if (e.f$s) {
      const t = [],
        a = [];
      for (const o of e.f$s) {
        const r = MathUtils_1.MathUtils.LongToNumber(o.d$s);
        t.push(r);
        for (const l of o.KHa)
          a.push(MathUtils_1.MathUtils.LongToNumber(l.CVn)),
            t.push(MathUtils_1.MathUtils.LongToNumber(l.CVn));
        WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
          e
            ? LevelGeneralNetworks.aQs(r, a, o.C$s)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                32,
                "[OnConnectorConnectEntityNotify] 等待之后还是找不到对应的Entity",
                ["ids", t],
              );
        });
      }
    }
  }),
  (LevelGeneralNetworks.mla = (e) => {
    const r = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    r &&
      WaitEntityTask_1.WaitEntityTask.Create(r, (e) => {
        var t, a, o;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid &&
          ((t = (o =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
              ?.Entity)?.GetComponent(57)),
          (o = o?.GetComponent(1)),
          t?.Valid) &&
          o?.Valid &&
          t.CanManipulate() &&
          ((a = MathUtils_1.MathUtils.CommonTempVector).Set(100, 0, 0),
          (o = o.ActorTransform.TransformPositionNoScale(a.ToUeVector())),
          e.Entity.GetComponent(187)?.SetActorLocation(o),
          t.TryManipulateSpecificItem(e.Entity));
      });
  }),
  (LevelGeneralNetworks.hNa = (e) => {
    var t,
      a,
      o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    o &&
      (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid &&
      o.Entity?.Valid &&
      o.Entity?.IsInit &&
      (t = o.Entity.GetComponent(1))?.Valid &&
      (e = MathUtils_1.MathUtils.LongToNumber(e.crh)) &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e))?.Valid &&
      e.Entity?.Valid &&
      (e = e.Entity.GetComponent(1))?.Valid &&
      (a = o.Entity.GetComponent(200))?.Valid &&
      (a.GetPortalEffectActor()?.Stop("移动传送门到新位置之前", !0),
      CreatureController_1.CreatureController.SetEntityEnable(
        o.Entity,
        !1,
        "移动传送门到新位置之前",
        !1,
      ),
      t.SetActorLocationAndRotation(
        e.ActorLocation,
        e.ActorRotation,
        "OnPortalReplaceNotify",
        !1,
      ),
      CreatureController_1.CreatureController.SetEntityEnable(
        o.Entity,
        !0,
        "移动传送门到新位置之后",
        !1,
      ));
  });
//# sourceMappingURL=LevelGeneralNetworks.js.map
