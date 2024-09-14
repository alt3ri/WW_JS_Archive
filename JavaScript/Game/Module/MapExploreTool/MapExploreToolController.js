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
    var r =
      ModelManager_1.ModelManager.MapExploreToolModel.GetPhantomSkillIdBySkillId(
        o,
      );
    if (r) {
      var a =
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          e,
        )?.Entity?.GetComponent(3);
      if (a) {
        const t = new MapExploreToolDefine_1.MapExploreToolUsingInfo();
        (t.CharId = e),
          (t.Pos = a.FloorLocation),
          (t.Rot = a.ActorRotationProxy),
          (t.SkillId = o),
          (t.PhantomSkillId = r),
          this.EAi(t)
            ? (ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(
                !0,
              ),
              this.SAi(t, (e) => {
                this.yAi(t, e);
              }))
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Phantom",
                  40,
                  "[MapExploreTool] 客户端检测未通过",
                  ["UsingInfo", t],
                ),
              this.IAi(t, !1));
      }
    }
  }
  static TAi(o) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 请求正式使用探索工具", [
        "UsingInfo",
        o,
      ]),
      this.LAi(o, !0, (e) => {
        e &&
        ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanSuccess(o, e)
          ? (this.PBn(o, "ExploreDeploySuccess"), this.DAi(o, e))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                40,
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
          ?.Entity?.GetComponent(192)
          ?.ModifyCdTime([e.SkillId], 0, -1);
  }
  static EAi(e) {
    var o, r, a;
    return ModelManager_1.ModelManager.MapExploreToolModel.GetCharExploreSkillBusy()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Phantom",
            40,
            "[MapExploreTool] 使用过快，当前仍在请求使用探索工具中",
            ["UsingInfo", e],
          ),
        !1)
      : ((a = (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          e.CharId,
        ))?.Entity?.GetComponent(3)),
        (o = r?.Entity?.GetComponent(161)),
        r && a && o
          ? a.IsAutonomousProxy
            ? o.PositionState !==
              CharacterUnifiedStateTypes_1.ECharPositionState.Ground
              ? (this.RAi(e, "ExploreStateError"),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 非贴地使用", [
                    "UsingInfo",
                    e,
                  ]),
                !1)
              : ((r =
                  ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
                (a =
                  ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                    r,
                  ))?.InstType !==
                  Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance ||
                13 !== a?.InstSubType
                  ? (this.RAi(e, "ExplorePositionError"),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Phantom",
                        40,
                        "[MapExploreTool] 非大世界使用",
                        ["UsingInfo", e],
                      ),
                    !1)
                  : 1010 !== e.PhantomSkillId || this.UAi(e))
            : (this.RAi(e, "OnylHostUse"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 非主控使用", [
                  "UsingInfo",
                  e,
                ]),
              !1)
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 使用者异常", [
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
          ? this.AAi(e.Pos)
            ? !this.dFa(e.Pos) &&
              (this.RAi(e, "ExplorePositionError"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Phantom",
                  19,
                  "[MapExploreTool] 临时传送点放置在实体上",
                  ["UsingInfo", e],
                ),
              1)
            : (this.RAi(e, "ExplorePositionError"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Phantom",
                  40,
                  "[MapExploreTool] 目标位置空余高度不足",
                  ["UsingInfo", e],
                ),
              1)
          : (this.RAi(e, "ExplorePositionError"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Phantom",
                40,
                "[MapExploreTool] 不在世界开放区域内",
                ["UsingInfo", e],
              ),
            1)
        : (this.RAi(e, "ExploreTeleporterBan"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              40,
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
  static dFa(e) {
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
  static SAi(e, o) {
    this.LAi(e, !1, o);
  }
  static yAi(e, o) {
    if (o) {
      var r = this.PAi(e, o),
        a = this.xAi(e, o);
      if (
        ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanCheckPass(
          e,
          o,
        )
      )
        return void (a || this.TAi(e));
      if (1011 === e.PhantomSkillId) if (this.wAi(e, o)) return;
      r ||
        a ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Phantom",
            40,
            "[MapExploreTool] 服务端检测结果未提示或处理，可能发生了意料之外的错误",
            ["UsingInfo", e],
            ["Response", o],
          ));
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Phantom",
        40,
        "[MapExploreTool] 服务端检测未通过",
        ["UsingInfo", e],
        ["Response", o],
      ),
      this.IAi(e, !1);
  }
  static wAi(e, o) {
    return (
      1011 === e.PhantomSkillId &&
      o?.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillIsEffect &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          40,
          "[MapExploreTool] 不请求正式使用探索工具，直接认为执行成功",
          ["UsingInfo", e],
          ["Response", o],
        ),
      this.DAi(e),
      !0)
    );
  }
  static DAi(e, o) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 探索工具使用成功", [
        "UsingInfo",
        e,
      ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        e,
        o,
      ),
      this.IAi(e, !0);
  }
  static xAi(r, e) {
    var a = ModelManager_1.ModelManager.MapExploreToolModel.GetRespConfirmBoxId(
      r,
      e,
    );
    if (!a) return !1;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Phantom",
        40,
        "[MapExploreTool] 根据消息处理弹窗",
        ["UsingInfo", r],
        ["Response", e],
        ["ConfirmBoxId", a],
      );
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(a);
    switch (a) {
      case 139:
      case 141:
      case 142: {
        var n =
          ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
            r.PhantomSkillId,
          );
        let e = void 0;
        var i = void 0;
        let o = void 0;
        n &&
          1 === n.size &&
          (([[i, o]] = n),
          (e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i))),
          n
            ? (t.ItemIdMap = n)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                40,
                `[MapExploreTool] 查询不到确认框${a}对应的道具`,
              ),
          e && o
            ? t.SetTextArgs(e, o.toString())
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                40,
                `[MapExploreTool] 查询不到确认框${a}对应的文本参数`,
              );
        break;
      }
    }
    return (
      t.FunctionMap.set(1, () => {
        this.IAi(r, !1);
      }),
      t.FunctionMap.set(2, () => {
        this.TAi(r);
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      ),
      !0
    );
  }
  static PAi(e, o) {
    var r = ModelManager_1.ModelManager.MapExploreToolModel.GetRespTipsId(e, o);
    return (
      !!r &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Phantom",
          40,
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
        var a =
          ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(
            e.PhantomSkillId,
          );
        if (!a || a.length <= 0)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              40,
              `[MapExploreTool] 查询不到通用提示${o}对应的技能名参数`,
            )
          );
        r.push(a);
        break;
      case "ExploreTeleporterItemLack":
      case "ExploreShengXiaItemLack":
        a =
          ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
            e.PhantomSkillId,
          );
        if (!a || a.size <= 0) return;
        var [a] = a.keys(),
          a = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(a);
        if (!a || a.length <= 0)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              40,
              `[MapExploreTool] 查询不到通用提示${o}对应的道具名参数`,
            )
          );
        r.push(a);
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
            40,
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
  static LAi(e, o, r) {
    var a = Protocol_1.Aki.Protocol.Ets.create();
    (a.l8n = e.Pos),
      (a._8n = e.Rot),
      (a.r5n = e.PhantomSkillId),
      (a.q7n = o),
      Net_1.Net.Call(23511, a, r);
  }
}
exports.MapExploreToolController = MapExploreToolController;
//# sourceMappingURL=MapExploreToolController.js.map
