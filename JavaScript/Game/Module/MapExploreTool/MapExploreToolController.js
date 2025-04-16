"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExploreToolController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  Net_1 = require("../../../Core/Net/Net"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  MapExploreToolDefine_1 = require("./MapExploreToolDefine"),
  MAX_ROLE_HALF_HEIGHT = 85,
  MAX_ROLE_RADIUS = 25,
  TRACE_PROFILE_KEY = "CheckUpperSpaceEnoughForRole",
  TRACE_CHECK_ONENTITY_PROFILE_KEY = "CheckOnEntity";
class MapExploreToolController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static CheckUseMapExploreTool(e, o) {
    var r,
      t,
      a =
        ModelManager_1.ModelManager.MapExploreToolModel.GetPhantomSkillIdBySkillId(
          o,
        );
    a &&
      (r =
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          e,
        )?.Entity?.GetComponent(3)) &&
      (((t = new MapExploreToolDefine_1.MapExploreToolUsingInfo()).CharId = e),
      (t.Pos = r.FloorLocation),
      (t.Rot = r.ActorRotationProxy),
      (t.SkillId = o),
      (t.PhantomSkillId = a),
      this.EAi(t)
        ? (ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(
            !0,
          ),
          this.nPl(t))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 客户端检测未通过", [
              "UsingInfo",
              t,
            ]),
          this.IAi(t, !1)));
  }
  static async nPl(e) {
    (await this.sPl(e)) || this.$cl(e);
  }
  static TAi(o) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 请求正式使用探索工具", [
        "UsingInfo",
        o,
      ]),
      this.LAi(o, (e) => {
        e &&
        ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanSuccess(o, e)
          ? (this.PBn(o, "ExploreDeploySuccess"), this.DAi(o))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                39,
                "[MapExploreTool] 探索工具使用失败",
                ["UsingInfo", o],
                ["Response", e],
              ),
            this.IAi(o, !1));
      });
  }
  static IAi(e, o) {
    ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(!1),
      o ||
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.CharId)
          ?.Entity?.GetComponent(205)
          ?.ModifyCdTime([e.SkillId], 0, -1);
  }
  static EAi(e) {
    var o, r, t;
    return ModelManager_1.ModelManager.MapExploreToolModel.GetCharExploreSkillBusy()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Phantom",
            39,
            "[MapExploreTool] 使用过快，当前仍在请求使用探索工具中",
            ["UsingInfo", e],
          ),
        !1)
      : void 0 !== UiManager_1.UiManager.GetViewByName("WorldMapView")
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Phantom", 63, "[MapExploreTool] 地图界面中", [
              "UsingInfo",
              e,
            ]),
          !1)
        : ControllerHolder_1.ControllerHolder.FormationDataController
              .GlobalIsInFight
          ? (this.RAi(e, "ExploreFighting"),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Phantom", 63, "[MapExploreTool] 战斗状态中", [
                "UsingInfo",
                e,
              ]),
            !1)
          : ((t = (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
              e.CharId,
            ))?.Entity?.GetComponent(3)),
            (o = r?.Entity?.GetComponent(173)),
            r && t && o
              ? t.IsAutonomousProxy
                ? o.PositionState !==
                  CharacterUnifiedStateTypes_1.ECharPositionState.Ground
                  ? (this.RAi(e, "ExploreStateError"),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Phantom",
                        39,
                        "[MapExploreTool] 非贴地使用",
                        ["UsingInfo", e],
                      ),
                    !1)
                  : ((r =
                      ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
                    (t =
                      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                        r,
                      ))?.InstType !==
                      Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance ||
                    13 !== t?.InstSubType
                      ? (this.RAi(e, "ExplorePositionError"),
                        Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "Phantom",
                            39,
                            "[MapExploreTool] 非大世界使用",
                            ["UsingInfo", e],
                          ),
                        !1)
                      : 1010 !== e.PhantomSkillId || this.UAi(e))
                : (this.RAi(e, "OnylHostUse"),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Phantom",
                      39,
                      "[MapExploreTool] 非主控使用",
                      ["UsingInfo", e],
                    ),
                  !1)
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 使用者异常", [
                    "UsingInfo",
                    e,
                  ]),
                !1));
  }
  static UAi(e) {
    return !(
      1010 !== e.PhantomSkillId ||
      (ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(0)
        ? ModelManager_1.ModelManager.MapModel.IsInMapPolygon(e.Pos)
          ? ModelManager_1.ModelManager.MapModel.IsPlayerInStandardGravity
            ? this.AAi(e.Pos)
              ? !this.U4a(e.Pos) &&
                (this.RAi(e, "ExplorePositionError"),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Phantom",
                    18,
                    "[MapExploreTool] 临时传送点放置在实体上",
                    ["UsingInfo", e],
                  ),
                1)
              : (this.RAi(e, "ExplorePositionError"),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Phantom",
                    39,
                    "[MapExploreTool] 目标位置空余高度不足",
                    ["UsingInfo", e],
                  ),
                1)
            : (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "ErrorCode_2200054_Text",
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Phantom",
                  63,
                  "探索工具->不在正常重力环境下",
                  [
                    "IsPlayerInStandardGravity",
                    ModelManager_1.ModelManager.MapModel
                      .IsPlayerInStandardGravity,
                  ],
                  [
                    "PlayerGravityDirection",
                    ModelManager_1.ModelManager.MapModel
                      .CurrentPlayerGravityDirection,
                  ],
                  ["UsingInfo", e],
                ),
              1)
          : (this.RAi(e, "ExplorePositionError"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Phantom",
                39,
                "[MapExploreTool] 不在世界开放区域内",
                ["UsingInfo", e],
              ),
            1)
        : (this.RAi(e, "ExploreTeleporterBan"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              39,
              "[MapExploreTool] 放置临时传送点功能被禁用",
              ["UsingInfo", e],
            ),
          1))
    );
  }
  static AAi(e) {
    var o = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace();
    if (!o) return !1;
    (o.WorldContextObject = GlobalData_1.GlobalData.World),
      (o.HalfHeight = MAX_ROLE_HALF_HEIGHT),
      (o.Radius = MAX_ROLE_RADIUS);
    var r = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
      e =
        (r.DeepCopy(e),
        (r.Z += MAX_ROLE_HALF_HEIGHT),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, r),
        TraceElementCommon_1.TraceElementCommon.CapsuleTrace(
          o,
          TRACE_PROFILE_KEY,
        ));
    return (
      ModelManager_1.ModelManager.TraceElementModel.ClearCapsuleTrace(), !e
    );
  }
  static U4a(e) {
    var o = UE.NewObject(UE.TraceLineElement.StaticClass()),
      r =
        ((o.WorldContextObject = GlobalData_1.GlobalData.World),
        (o.bIsSingle = !0),
        (o.bIgnoreSelf = !0),
        o.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation),
      e =
        (r.DeepCopy(e),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r),
        (r.Z -= MAX_ROLE_HALF_HEIGHT),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, r),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          o,
          TRACE_CHECK_ONENTITY_PROFILE_KEY,
        )),
      r = o.HitResult;
    if (
      e &&
      r?.bBlockingHit &&
      0 < r.Actors.Num() &&
      r.Actors.Get(0)
        .RootComponent?.GetOwner()
        ?.Tags.Contains(CharacterNameDefines_1.CharacterNameDefines.INVALID_POS)
    )
      return !1;
    return !0;
  }
  static Xcl(e, o) {
    if (o) {
      var r = this.PAi(e, o),
        t = this.Ycl(e, o);
      if (
        ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanCheckPass(
          e,
          o,
        )
      )
        return void (t || (this.PBn(e, "ExploreDeploySuccess"), this.DAi(e)));
      if (1011 === e.PhantomSkillId) if (this.wAi(e, o)) return;
      r ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Phantom",
            39,
            "[MapExploreTool] 服务端检测结果未提示或处理，可能发生了意料之外的错误",
            ["UsingInfo", e],
            ["Response", o],
          ));
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          39,
          "[MapExploreTool] 服务端检测未通过",
          ["UsingInfo", e],
          ["Response", o],
        );
    this.IAi(e, !1);
  }
  static wAi(e, o) {
    return (
      1011 === e.PhantomSkillId &&
      o?.Content.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillIsEffect &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          39,
          "[MapExploreTool] 不请求正式使用探索工具，直接认为执行成功",
          ["UsingInfo", e],
          ["Response", o],
        ),
      this.DAi(e, !0),
      !0)
    );
  }
  static DAi(e, o = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Phantom",
        63,
        "[MapExploreTool] 探索工具使用成功",
        ["UsingInfo", e],
        ["useAgain", o],
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        e,
        o,
      ),
      this.IAi(e, !0);
  }
  static async sPl(e) {
    if (
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
    )
      return this.RAi(e, "OnylHostUse"), !0;
    if (1011 === e.PhantomSkillId) {
      if (
        !ModelManager_1.ModelManager.MapExploreToolModel.IsToolReachPlaceLimit(
          e.PhantomSkillId,
        )
      )
        return (
          (o = await this.CheckUseSoundBoxSkillRequestAsync()), this.PAi(e, o)
        );
      var o = ModelManager_1.ModelManager.MapModel.GetSoundBoxDetectMarkCalc();
      if (o)
        return (
          (e.MarkId = o[0]),
          (e.MarkType = o[1]),
          this.PBn(e, "ShengXiaDetectTip"),
          this.DAi(e, !0),
          !0
        );
    }
    return !1;
  }
  static $cl(r) {
    const e = () => {
      this.LAi(r, (e) => {
        this.Xcl(r, e);
      });
    };
    var t = ModelManager_1.ModelManager.MapExploreToolModel.GetConfirmBoxId(r);
    if (!t) return this.zcl(r) || e(), !1;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Phantom",
        63,
        "[MapExploreTool] 本地请求前预检查弹窗",
        ["UsingInfo", r],
        ["ConfirmBoxId", t],
      );
    var a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
    switch (t) {
      case 139:
      case 141:
      case 142: {
        let e = void 0;
        var n = void 0;
        let o = void 0;
        var l =
          ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
            r.PhantomSkillId,
          );
        l &&
          1 === l.size &&
          (([[n, o]] = l),
          (e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(n))),
          l
            ? (a.ItemIdMap = l)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                63,
                `[MapExploreTool] 查询不到确认框${t}对应的道具`,
              ),
          e && o
            ? a.SetTextArgs(e, o.toString())
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                63,
                `[MapExploreTool] 查询不到确认框${t}对应的文本参数`,
              );
        break;
      }
    }
    return (
      a.FunctionMap.set(1, () => {
        this.IAi(r, !1);
      }),
      a.FunctionMap.set(2, () => {
        this.zcl(r) || e();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        a,
      ),
      !0
    );
  }
  static Ycl(e, o) {
    var r = ModelManager_1.ModelManager.MapExploreToolModel.GetConfirmBoxId(
      e,
      o,
    );
    if (!r) return !1;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Phantom",
        63,
        "[MapExploreTool] 协议返回后弹窗",
        ["UsingInfo", e],
        ["Response", o],
        ["ConfirmBoxId", r],
      );
    o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(r);
    return (
      o.FunctionMap.set(1, () => {
        this.IAi(e, !1);
      }),
      o.FunctionMap.set(2, () => {
        this.zcl(e) || this.TAi(e);
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      ),
      !0
    );
  }
  static zcl(e) {
    let o = void 0,
      r = void 0;
    var t =
      ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
        e.PhantomSkillId,
      );
    if ((t && 1 === t.size && ([[o, r]] = t), o && r)) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(o);
      if (r > t)
        return (
          !!(t =
            ModelManager_1.ModelManager.MapExploreToolModel.GetNotEnoughTipsId(
              e,
            )) && (this.RAi(e, t), !0)
        );
    }
    return !1;
  }
  static PAi(e, o) {
    var r = ModelManager_1.ModelManager.MapExploreToolModel.GetRespTipsId(e, o);
    return (
      !!r &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Phantom",
          39,
          "[MapExploreTool] 根据消息处理飘字",
          ["UsingInfo", e],
          ["Response", o],
          ["PromptId", r],
        ),
      this.RAi(e, r),
      !0)
    );
  }
  static RAi(e, o) {
    var r = [];
    switch (o) {
      case "ExploreActivating":
        var t =
          ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(
            e.PhantomSkillId,
          );
        if (!t || t.length <= 0)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              39,
              `[MapExploreTool] 查询不到通用提示${o}对应的技能名参数`,
            )
          );
        r.push(t);
        break;
      case "ExploreTeleporterItemLack":
      case "ExploreShengXiaItemLack":
        t =
          ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
            e.PhantomSkillId,
          );
        if (!t || t.size <= 0) return;
        var [t] = t.keys(),
          t = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(t);
        if (!t || t.length <= 0)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              39,
              `[MapExploreTool] 查询不到通用提示${o}对应的道具名参数`,
            )
          );
        r.push(t);
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      o,
      r,
    );
  }
  static PBn(e, o) {
    var r = [];
    if ("ExploreDeploySuccess" === o) {
      e = ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(
        e.PhantomSkillId,
      );
      if (!e || e.length <= 0)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            39,
            `[MapExploreTool] 查询不到通用提示${o}对应的技能名参数`,
          )
        );
      r.push(e);
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      o,
      r,
    );
  }
  static LAi(e, o) {
    switch (e.PhantomSkillId) {
      case 1011:
        return void MapExploreToolController.Jcl(o);
      case 1012:
        return void MapExploreToolController.Zcl(o);
      case 1010:
        MapExploreToolController.eml(e, o);
    }
  }
  static Jcl(o) {
    var e = Protocol_1.Aki.Protocol.KC_.create();
    Net_1.Net.Call(29140, e, (e) => {
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillIsEffect
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            25310,
          )
        : o({ PhantomSkillId: 1011, Content: e });
    });
  }
  static Zcl(o) {
    var e = Protocol_1.Aki.Protocol.HC_.create();
    Net_1.Net.Call(15611, e, (e) => {
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreasureBoxAllActive
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            18322,
          )
        : (ModelManager_1.ModelManager.MapModel.UpdateBoxSlotInfo(e.IT_),
          o({ PhantomSkillId: 1012, Content: e }));
    });
  }
  static RemoveTreasureBoxSlotRequest(o) {
    var e = Protocol_1.Aki.Protocol.WC_.create();
    (e.b7n = o),
      Net_1.Net.Call(15363, e, (e) => {
        e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Cvs,
              28472,
            )
          : ModelManager_1.ModelManager.MapModel.RemoveBoxSlotInfo(o);
      });
  }
  static eml(e, o) {
    var r;
    (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
      (((r = Protocol_1.Aki.Protocol.YC_.create()).l8n = e.Pos),
      (r._8n = e.Rot),
      (r.Hac = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId() ?? 0),
      Net_1.Net.Call(20532, r, (e) => {
        e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Cvs,
              17889,
            )
          : o({ PhantomSkillId: 1010, Content: e });
      }));
  }
  static RemoveTemporaryTeleportRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.PCs.create();
    (r.R7n = e),
      Net_1.Net.Call(28274, r, (e) => {
        e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.G9n,
              21990,
            )
          : ModelManager_1.ModelManager.MapModel.RemoveTemporaryTeleportInfo(o);
      });
  }
  static async CheckUseSoundBoxSkillRequestAsync() {
    var e = Protocol_1.Aki.Protocol.r0_.create();
    return {
      PhantomSkillId: 1011,
      Content: await Net_1.Net.CallAsync(24568, e),
    };
  }
}
exports.MapExploreToolController = MapExploreToolController;
//# sourceMappingURL=MapExploreToolController.js.map
