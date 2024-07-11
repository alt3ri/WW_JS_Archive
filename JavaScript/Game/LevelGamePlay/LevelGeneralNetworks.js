"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralNetworks = exports.WAIT_ENTITY_ERROR_TIME = void 0);
const Log_1 = require("../../Core/Common/Log");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const Net_1 = require("../../Core/Net/Net");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const IComponent_1 = require("../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const GeneralLogicTreeDefine_1 = require("../Module/GeneralLogicTree/Define/GeneralLogicTreeDefine");
const TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils");
const WorldMapController_1 = require("../Module/WorldMap/WorldMapController");
const SceneItemDynamicAttachTargetComponent_1 = require("../NewWorld/SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent");
const SceneItemJigsawBaseComponent_1 = require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const SceneItemUtility_1 = require("../NewWorld/SceneItem/Util/SceneItemUtility");
const GameModeController_1 = require("../World/Controller/GameModeController");
const WaitEntityTask_1 = require("../World/Define/WaitEntityTask");
const LevelGamePlayUtils_1 = require("./LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
const LevelGeneralContextUtil_1 = require("./LevelGeneralContextUtil");
const LevelGeneralController_1 = require("./LevelGeneralController");
exports.WAIT_ENTITY_ERROR_TIME = 18e4;
class LevelGeneralNetworks {
  static Register() {
    Net_1.Net.Register(29653, this.QUe),
      Net_1.Net.Register(2821, LevelGeneralNetworks.XUe),
      Net_1.Net.Register(24649, LevelGeneralNetworks.$Ue),
      Net_1.Net.Register(13620, LevelGeneralNetworks.YUe),
      Net_1.Net.Register(2956, LevelGeneralNetworks.JUe),
      Net_1.Net.Register(6737, this.zUe),
      Net_1.Net.Register(11508, this.ZUe),
      Net_1.Net.Register(5744, this.tBn),
      Net_1.Net.Register(12225, this.eAe),
      Net_1.Net.Register(29374, this.tAe),
      Net_1.Net.Register(6271, this.iAe),
      Net_1.Net.Register(16317, this.oAe),
      Net_1.Net.Register(4137, this.rAe),
      Net_1.Net.Register(13156, this.nAe),
      Net_1.Net.Register(28949, this.sAe),
      Net_1.Net.Register(9995, this.aAe),
      Net_1.Net.Register(2532, this.hAe),
      Net_1.Net.Register(25911, this.lAe),
      Net_1.Net.Register(22332, this._Ae),
      Net_1.Net.Register(10380, this.uAe),
      Net_1.Net.Register(6817, this.WTn);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(29653),
      Net_1.Net.UnRegister(2821),
      Net_1.Net.UnRegister(24649),
      Net_1.Net.UnRegister(13620),
      Net_1.Net.UnRegister(6737),
      Net_1.Net.UnRegister(11508),
      Net_1.Net.UnRegister(5744),
      Net_1.Net.UnRegister(2719),
      Net_1.Net.UnRegister(6271),
      Net_1.Net.UnRegister(16317),
      Net_1.Net.UnRegister(4137),
      Net_1.Net.UnRegister(28949),
      Net_1.Net.UnRegister(9995),
      Net_1.Net.UnRegister(25911),
      Net_1.Net.UnRegister(22332),
      Net_1.Net.UnRegister(10380),
      Net_1.Net.UnRegister(6817);
  }
  static cAe(e) {
    let t;
    var a = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    var a =
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        a,
      )?.Entity?.GetComponent(140);
    a
      ? ((t = MathUtils_1.MathUtils.LongToNumber(e.hIs)),
        a.SetControllerId(t),
        e.lIs && a.ResetItemLocationAndRotation())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          32,
          "[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent",
        );
  }
  static iBn(t) {
    var a = MathUtils_1.MathUtils.LongToNumber(t.rkn);
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
    let o = a?.Entity?.GetComponent(140);
    if (o) {
      (t = MathUtils_1.MathUtils.LongToNumber(t.lMs)),
        (o = (o.SetAutonomousId(t), a.Entity.GetComponent(182)));
      let e = !1;
      t !== 0 &&
        ((r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (e = r === t));
      var r = a.Entity.GetComponent(142);
      t !== 0
        ? r?.TryEnable()
        : r?.TryDisable("[ControllerIdModifyInternal] RoleEntityId === 0"),
        o.IsMoveAutonomousProxy && !e && r?.ForceSendPendingMoveInfos(),
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
    const t = MathUtils_1.MathUtils.LongToNumber(e.aIs);
    const a = MathUtils_1.MathUtils.LongToNumber(e.sIs);
    var e = e.cMs - 1;
    const o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
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
    var t = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    var a = MathUtils_1.MathUtils.LongToNumber(e.hIs);
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
    let o = a?.Entity?.GetComponent(3);
    o &&
      !o.IsRoleAndCtrlByMe &&
      ((o = a.Entity.GetComponent(55)),
      e.zkn ? o.ActiveHandFX(t.Entity) : o.DeactiveHandFx());
  }
  static CAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.Zkn);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    const a = t.Entity.GetComponent(121);
    var t = t.Entity.GetComponent(145).Config.Config.Type;
    var o = MathUtils_1.MathUtils.LongToNumber(e.eFn);
    var o =
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        o,
      ).Entity.GetComponent(122);
    const r = new SceneItemJigsawBaseComponent_1.JigsawIndex(
      e.iFn.tFn,
      e.iFn.rFn,
    );
    (o.Rotation = e.iFn.oFn),
      e.nFn === 0 ? a.OnPickUpItem(o, t, !1) : a.OnPutDownItem(o, r, t, !1);
  }
  static gAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.Zkn);
    var t =
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        t,
      ).Entity.GetComponent(121);
    var a = MathUtils_1.MathUtils.LongToNumber(e.eFn);
    var a =
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        a,
      ).Entity.GetComponent(122);
    const o = new SceneItemJigsawBaseComponent_1.JigsawIndex(
      e.iFn.tFn,
      e.iFn.rFn,
    );
    (a.Rotation = e.iFn.oFn),
      t.OnPickUpItem(a, IComponent_1.EItemFoundation.BuildingBlock, !1),
      t.OnPutDownItem(a, o, IComponent_1.EItemFoundation.BuildingBlock, !1);
  }
  static fAe(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e.sFn);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
      .Entity.GetComponent(121)
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
        ["PlayerId", o.aFn],
        ["SessionId", o.Ykn],
        ["StartIndex", o.hFn],
        ["EndIndex", o.Wms],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        r,
        (t) => {
          if (t) {
            t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
            if (t) {
              let a = t.Entity.GetComponent(0)?.GetPbEntityInitData();
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
                        ["PlayerId", o.aFn],
                        ["SessionId", o.Ykn],
                        ["StartIndex", o.hFn],
                        ["EndIndex", o.Wms],
                      ),
                    LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
                      e,
                      LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
                      o.aFn,
                      o.Ykn,
                      o.hFn,
                      o.Wms,
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
    const a = Protocol_1.Aki.Protocol.C_s.create();
    (a.rkn = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.lFn = t),
      Net_1.Net.Call(22981, a, (e) => {});
  }
  static RequestActiveOrDeactiveManipulateFx(e, t) {
    const a = Protocol_1.Aki.Protocol.L1s.create();
    (a.rkn = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.zkn = t),
      Net_1.Net.Call(29392, a, (e) => {});
  }
  static RequestAwakePbEntity(e, t) {}
  static RequestSpawnPbEntity(e, t) {
    t(!0);
  }
  static RequestChangeEntityState(t, e) {
    const a = Protocol_1.Aki.Protocol.v1s.create();
    (a.rkn = t.EntityId),
      (a._Fn = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.State)),
      Net_1.Net.Call(17700, a, (e) => {
        e &&
          e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
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
    const e = Protocol_1.Aki.Protocol.eJn.create();
    (e.rkn = t),
      (e.uFn = a),
      Net_1.Net.Call(26450, e, (e) => {
        e &&
          e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
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
  static RequestEntityChangeLock(t, a) {
    const e = Protocol_1.Aki.Protocol.nYn.create();
    (e.cFn = a),
      (e.rkn = t),
      Net_1.Net.Call(12769, e, (e) => {
        e &&
          e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Level",
            7,
            "[LevelGeneralController.RequestEntityChangeLock] 请求实体解锁状态",
            ["PbDataId:", t],
            ["TargetState:", a],
          );
      });
  }
  static RequestDoAction(e, t) {}
  static RequestSetInitTagRequest(e) {
    let t;
    e &&
      (((t = Protocol_1.Aki.Protocol.N1s.create()).rkn =
        MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(28434, t, (e) => {}));
  }
  static RequestActionsFinish(e, t, a, o, r) {
    const l = Protocol_1.Aki.Protocol.d$n.create();
    (l.aFn = e),
      (l.Ykn = t),
      (l.hFn = a),
      (l.mFn = o),
      Net_1.Net.Call(13673, l, r);
  }
  static RequestEntityInteractOption(e, t, a, o) {
    const r = Protocol_1.Aki.Protocol.LYn.create();
    (r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      (r.dFn = t),
      o && (r.CFn = o),
      Net_1.Net.Call(15563, r, a);
  }
  static RequestEntityDynamicInteractOption(e, t, a) {
    const o = Protocol_1.Aki.Protocol.PYn.create();
    (o.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.gFn = t),
      Net_1.Net.Call(24392, o, a);
  }
  static RequestEntityRandomInteractOption(e, t, a) {
    const o = Protocol_1.Aki.Protocol.DYn.create();
    (o.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.dFn = t),
      Net_1.Net.Call(22687, o, a);
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
        t = LevelGeneralNetworks.SAe(e.InstanceDungeonId);
        break;
      case 6:
        t = LevelGeneralNetworks.EAe(e.BtType, e.TreeConfigId);
        break;
      case 1:
        t = !0;
    }
    return t;
  }
  static EAe(e, t) {
    let a = !1;
    switch (e) {
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
        a = LevelGeneralNetworks.vAe(t);
        break;
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
        a = LevelGeneralNetworks.MAe(t);
        break;
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
        a = LevelGeneralNetworks.SAe(t);
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
  static SAe(e) {
    return (
      !!GameModeController_1.GameModeController.IsInInstance() &&
      ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === e
    );
  }
  static RequestPlayerAccessEffectArea(e, t) {
    const a = Protocol_1.Aki.Protocol.Bds.create();
    (a.fFn = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    )),
      (a.pFn = t
        ? Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter
        : Protocol_1.Aki.Protocol.pFn.Proto_RangeLeave),
      Net_1.Net.Call(13194, a, (e) => {});
  }
}
(exports.LevelGeneralNetworks = LevelGeneralNetworks),
  ((_a = LevelGeneralNetworks).XUe = (a) => {
    WaitEntityTask_1.WaitEntityTask.Create(
      MathUtils_1.MathUtils.LongToNumber(a.rkn),
      (e) => {
        let t;
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(a.rkn),
            ))?.Valid &&
            ((t =
              LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
                a.Hms,
              )),
            ModelManager_1.ModelManager.InteractionModel.AddInteractOption(
              e.Entity,
              a.gFn,
              t,
              a.nMs,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[EntityAddDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToBigInt(a.rkn)],
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
      MathUtils_1.MathUtils.LongToNumber(t.rkn),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.rkn),
            )) &&
            ModelManager_1.ModelManager.InteractionModel.RemoveInteractOption(
              e.Entity,
              t.gFn,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[EntityRemoveDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToNumber(t.rkn)],
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
      MathUtils_1.MathUtils.LongToNumber(t.rkn),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.rkn),
            )) &&
            ModelManager_1.ModelManager.InteractionModel.ChangeOptionText(
              e.Entity,
              t.gFn,
              t.nMs,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[OnEntityChangeDynamicInteractTextNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToNumber(t.rkn)],
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
      MathUtils_1.MathUtils.LongToNumber(t.rkn),
      (e) => {
        e
          ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(t.rkn),
            ))?.Valid &&
            ModelManager_1.ModelManager.InteractionModel.LockInteraction(
              e.Entity,
              t.KMs,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              37,
              "[EntityInteractFinishNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
              ["id", MathUtils_1.MathUtils.LongToBigInt(t.rkn)],
            );
      },
      !1,
      exports.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }),
  (LevelGeneralNetworks.zUe = (e) => {
    const t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.rkn),
    );
    t && t.Entity.GetComponent(117)?.UpdateState(e.Ukn, e.WMs);
  }),
  (LevelGeneralNetworks.ZUe = (t) => {
    const e = MathUtils_1.MathUtils.LongToNumber(t.rkn);
    const a = MathUtils_1.MathUtils.LongToNumber(t.hIs);
    const o = new Array();
    o.push(e),
      a !== 0 && o.push(a),
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
  (LevelGeneralNetworks.tBn = (t) => {
    const e = MathUtils_1.MathUtils.LongToNumber(t.rkn);
    const a = MathUtils_1.MathUtils.LongToNumber(t.lMs);
    const o = new Array();
    o.push(e),
      a !== 0 && o.push(a),
      WaitEntityTask_1.WaitEntityTask.Create(o, (e) => {
        e
          ? LevelGeneralNetworks.iBn(t)
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
    const e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (e === t.vFn) {
      const a = new Array();
      a.push(MathUtils_1.MathUtils.LongToNumber(t.aIs)),
        t.sIs !== 0 && a.push(MathUtils_1.MathUtils.LongToNumber(t.sIs)),
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
    const t = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    const a = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (a?.Valid) {
      const o = a?.Entity?.GetComponent(110);
      if (o) {
        const r = new SceneItemDynamicAttachTargetComponent_1.AttachParam();
        switch (
          ((r.PosAttachType = 2),
          (r.PosAttachOffset = e.MFn),
          (r.PosAbsolute = !1),
          (r.RotAttachType = 2),
          (r.RotAttachOffset = e.SFn),
          (r.RotAbsolute = !1),
          e.EFn)
        ) {
          case Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetEntity:
            o.IsRegTarget() &&
              o.UnRegTarget("[EntityAttachChangeNotify] AttachTargetEntity"),
              o.RegEntityTarget(
                e.IFn.yFn,
                e.IFn.TFn,
                r,
                "[EntityAttachChangeNotify] AttachTargetEntity",
              );
            break;
          case Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetActorPath:
            o.IsRegTarget() &&
              o.UnRegTarget("[EntityAttachChangeNotify] AttachTargetActorPath"),
              o.RegRefActorTarget(
                e.LFn,
                r,
                "[EntityAttachChangeNotify] AttachTargetActorPath",
              );
            break;
          case Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetNone:
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
    const e = MathUtils_1.MathUtils.LongToNumber(t.rkn);
    const a = MathUtils_1.MathUtils.LongToNumber(t.hIs);
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
    const e = MathUtils_1.MathUtils.LongToNumber(t.Zkn);
    const a = MathUtils_1.MathUtils.LongToNumber(t.eFn);
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
    const e = MathUtils_1.MathUtils.LongToNumber(t.Zkn);
    const a = MathUtils_1.MathUtils.LongToNumber(t.eFn);
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
    const a = MathUtils_1.MathUtils.LongToNumber(t.sFn);
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
    const a = t.Hms;
    const o = t.Ykn;
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
          ["PlayerId", t.aFn],
          ["SessionId", o],
          ["Total", t.jms],
          ["StartIndex", t.hFn],
          ["EndIndex", t.Wms],
        );
    }
    switch (a.Xms) {
      case Protocol_1.Aki.Protocol.Pbs.Zms:
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（动态交互）"),
          TsInteractionUtils_1.TsInteractionUtils.HandleEntityDynamicInteractByServerNotify(
            t,
            a.Zms.gFn,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.aCs:
        var r = a.aCs.VCs;
        var e =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            r,
          );
        e
          ? (l = e.LevelPlayOpenAction) &&
            l.length !== 0 &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneGameplay", 19, "开始执行玩法开启/刷新动作"),
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
              l,
              LevelGeneralContextDefine_1.LevelPlayContext.Create(e.Id),
              t.aFn,
              t.Ykn,
              t.hFn,
              t.Wms,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay
                ],
              ],
              ["treeId", r],
            );
        break;
      case Protocol_1.Aki.Protocol.Pbs.hCs:
        var l = a.hCs.VCs;
        var e =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            l,
          );
        e
          ? (r = e.AfterGetRewardAction) &&
            r.length !== 0 &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneGameplay", 19, "开始执行玩法开启/刷新动作"),
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
              r,
              LevelGeneralContextDefine_1.LevelPlayContext.Create(e.Id),
              t.aFn,
              t.Ykn,
              t.hFn,
              t.Wms,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
              [
                "treeType",
                GeneralLogicTreeDefine_1.btTypeLogString[
                  Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay
                ],
              ],
              ["treeId", l],
            );
        break;
      case Protocol_1.Aki.Protocol.Pbs.lCs:
        (r = a.lCs.Xkn),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r));
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
                  Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
                ],
              ],
              ["treeId", r],
            )
          );
        l = e.ActiveActions;
        l &&
          l.length !== 0 &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            l,
            LevelGeneralContextDefine_1.QuestContext.Create(r),
            t.aFn,
            t.Ykn,
            t.hFn,
            t.Wms,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs._Cs:
        (e = a._Cs.Xkn),
          (l = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e));
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
                  Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
                ],
              ],
              ["treeId", e],
            )
          );
        r = l.AcceptActions;
        r &&
          r.length !== 0 &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            r,
            LevelGeneralContextDefine_1.QuestContext.Create(e),
            t.aFn,
            t.Ykn,
            t.hFn,
            t.Wms,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.uCs:
        (l = a.uCs.Xkn),
          (r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(l));
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
                  Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
                ],
              ],
              ["treeId", l],
            )
          );
        e = r.FinishActions;
        e &&
          e.length !== 0 &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            e,
            LevelGeneralContextDefine_1.QuestContext.Create(l),
            t.aFn,
            t.Ykn,
            t.hFn,
            t.Wms,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.DCs:
        (r = a.DCs.Xkn),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r));
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
                  Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
                ],
              ],
              ["treeId", r],
            )
          );
        l = e.TerminateActions;
        l &&
          l.length !== 0 &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            l,
            LevelGeneralContextDefine_1.QuestContext.Create(r),
            t.aFn,
            t.Ykn,
            t.hFn,
            t.Wms,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.cCs:
      case Protocol_1.Aki.Protocol.Pbs.dCs:
      case Protocol_1.Aki.Protocol.Pbs.mCs:
      case Protocol_1.Aki.Protocol.Pbs.CCs:
      case Protocol_1.Aki.Protocol.Pbs.gCs:
      case Protocol_1.Aki.Protocol.Pbs.SCs:
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BehaviorTreeStartActionSession,
          t,
        );
        break;
      case Protocol_1.Aki.Protocol.Pbs.zms:
        e = MathUtils_1.MathUtils.LongToNumber(a.zms.wCs.Ykn);
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
            a.zms.dFn,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.Proto_EntityStateChangeAction:
        l = MathUtils_1.MathUtils.LongToNumber(a.tCs.wCs.Ykn);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityStateChangeAction）",
            ["CreatureDataId", l],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateActionByServerNotify(
            t,
            l,
            a.tCs.xCs,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.iCs:
        r = MathUtils_1.MathUtils.LongToNumber(a.iCs.wCs.Ykn);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityGroupAction）",
            ["CreatureDataId", r],
          ),
          LevelGeneralNetworks.pAe(t, r, a.iCs.DFn, a.iCs.bCs);
        break;
      case Protocol_1.Aki.Protocol.Pbs.rCs:
        (e = MathUtils_1.MathUtils.LongToNumber(a.rCs.wCs.Ykn)),
          (l = MathUtils_1.MathUtils.LongToNumber(a.rCs.BCs));
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
            l,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.Proto_EntityLeaveTrigger:
        (r = MathUtils_1.MathUtils.LongToNumber(a.oCs.wCs.Ykn)),
          (e = MathUtils_1.MathUtils.LongToNumber(a.oCs.BCs));
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（EntityLeaveTriggerAction）",
            ["CreatureDataId", r],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleExitTriggerStateActionByServerNotify(
            t,
            r,
            e,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.ECs:
        l = MathUtils_1.MathUtils.LongToNumber(a.ECs.wCs.Ykn);
        SceneItemUtility_1.SceneItemUtility.HandleExploreInteractActionByServerNotify(
          t,
          l,
        );
        break;
      case Protocol_1.Aki.Protocol.Pbs.nCs:
        r = MathUtils_1.MathUtils.LongToNumber(a.nCs.wCs.Ykn);
        SceneItemUtility_1.SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify(
          t,
          r,
        );
        break;
      case Protocol_1.Aki.Protocol.Pbs.sCs:
        e = MathUtils_1.MathUtils.LongToNumber(a.sCs.wCs.Ykn);
        SceneItemUtility_1.SceneItemUtility.HandleTimeTrackControlActionByServerNotify(
          t,
          e,
          a.sCs,
        );
        break;
      case Protocol_1.Aki.Protocol.Pbs.Proto_SceneItemLifeCycleComponentCreate:
        l = MathUtils_1.MathUtils.LongToNumber(a.TCs.wCs.Ykn);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（LifeCycleCreateAction）",
            ["CreatureDataId", l],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
            t,
            l,
            !0,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.Proto_SceneItemLifeCycleComponentDetroy:
        r = MathUtils_1.MathUtils.LongToNumber(a.LCs.wCs.Ykn);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "服务端驱动执行行为组（LifeCycleDestroyAction）",
            ["CreatureDataId", r],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
            t,
            r,
            !1,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.ACs:
        (e = MathUtils_1.MathUtils.LongToNumber(a.ACs.wCs.Ykn)),
          (l = a.ACs.AFn);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            40,
            "服务端驱动执行行为组（EntityBeamReceiveAction）",
            ["CreatureDataId", e],
            ["ReceiveType", l],
          ),
          SceneItemUtility_1.SceneItemUtility.HandleBeamReceiveActionByServerNotify(
            t,
            e,
            l,
          );
        break;
      case Protocol_1.Aki.Protocol.Pbs.ICs: {
        r = a.ICs.UFn;
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
        if (!Array.isArray(e) || e.length === 0) break;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Gm", 40, "开始执行GM驱动行为列表"),
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            e,
            LevelGeneralContextDefine_1.GmLevelActionContext.Create(),
            t.aFn,
            t.Ykn,
            t.hFn,
            t.Wms,
          );
        break;
      }
      case Protocol_1.Aki.Protocol.Pbs.Proto_EntityStateChangeConditionAction:
        e = MathUtils_1.MathUtils.LongToNumber(a.UCs.wCs.Ykn);
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
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
            a.UCs.xCs,
            a.UCs.fkn,
          );
    }
  }),
  (LevelGeneralNetworks.sAe = (l) => {
    const n = MathUtils_1.MathUtils.LongToNumber(l.sFn);
    WaitEntityTask_1.WaitEntityTask.Create(n, (e) => {
      if (e) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (e) {
          const t = e.Entity.GetComponent(121);
          if (t)
            for (const r of l.BSs) {
              const a = new SceneItemJigsawBaseComponent_1.JigsawIndex(
                r.LSs,
                r.RSs,
              );
              const o = MathUtils_1.MathUtils.LongToNumber(r.DSs);
              t.DynamicModifySocketState(a, o);
            }
        }
      }
    });
  }),
  (LevelGeneralNetworks.aAe = (e) => {
    for (const t of e.yvs)
      t.RFn === 10015 &&
        WorldMapController_1.WorldMapController.LockView(t.zCs);
  }),
  (LevelGeneralNetworks.hAe = (e) => {
    e.Qms
      ? LevelGamePlayUtils_1.LevelGamePlayUtils.ReleaseOperationRestriction()
      : e.xFn &&
        LevelGamePlayUtils_1.LevelGamePlayUtils.LevelOperationRestriction(
          e.xFn,
        );
  }),
  (LevelGeneralNetworks.lAe = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.HUs);
    const a = e.pFn === Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter;
    const o = [];
    for (const r of e.W5s) o.push(MathUtils_1.MathUtils.LongToNumber(r));
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(74)) &&
        e.ServerUpdateEntitiesInRangeOnline(a, o);
    });
  }),
  (LevelGeneralNetworks._Ae = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.HUs);
    const a = e.pFn === Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter;
    const o = e.jUs;
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(74)) &&
        e.ServerUpdatePlayerInRangeOnline(a, o);
    });
  }),
  (LevelGeneralNetworks.uAe = (e) => {
    const t = MathUtils_1.MathUtils.LongToNumber(e.WUs);
    const a = e.KUs === Protocol_1.Aki.Protocol.KUs.Proto_Up;
    WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
      e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
        (e = e.Entity.GetComponent(136)) &&
        e.ChangeTransition(a);
    });
  }),
  (LevelGeneralNetworks.WTn = (e) => {
    let t;
    e.Evs &&
      ((t = MathUtils_1.MathUtils.LongToNumber(e.rkn)),
      (t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t))) &&
      t.Entity?.GetComponent(0)?.UpdateVar(e.Svs, e.Evs);
  });
// # sourceMappingURL=LevelGeneralNetworks.js.map
