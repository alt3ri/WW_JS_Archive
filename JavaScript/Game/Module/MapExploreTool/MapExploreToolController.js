"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExploreToolController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  MapExploreToolDefine_1 = require("./MapExploreToolDefine"),
  MAX_ROLE_HALF_HEIGHT = 85,
  MAX_ROLE_RADIUS = 25,
  TRACE_PROFILE_KEY = "CheckUpperSpaceEnoughForRole";
class MapExploreToolController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static CheckUseMapExploreTool(o, e) {
    var r =
      ModelManager_1.ModelManager.MapExploreToolModel.GetPhantomSkillIdBySkillId(
        e,
      );
    if (r) {
      var a =
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          o,
        )?.Entity?.GetComponent(3);
      if (a) {
        const t = new MapExploreToolDefine_1.MapExploreToolUsingInfo();
        (t.CharId = o),
          (t.Pos = a.FloorLocation),
          (t.Rot = a.ActorRotationProxy),
          (t.SkillId = e),
          (t.PhantomSkillId = r),
          this.SUi(t)
            ? (ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(
                !0,
              ),
              this.EUi(t, (o) => {
                this.yUi(t, o);
              }))
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Phantom",
                  40,
                  "[MapExploreTool] 客户端检测未通过",
                  ["UsingInfo", t],
                ),
              this.IUi(t, !1));
      }
    }
  }
  static TUi(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 请求正式使用探索工具", [
        "UsingInfo",
        e,
      ]),
      this.LUi(e, !0, (o) => {
        o &&
        ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanSuccess(e, o)
          ? (this.$xn(e, "ExploreDeploySuccess"), this.DUi(e, o))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                40,
                "[MapExploreTool] 探索工具使用失败",
                ["UsingInfo", e],
                ["Response", o],
              ),
            this.IUi(e, !1));
      });
  }
  static IUi(o, e) {
    ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(!1),
      e ||
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(o.CharId)
          ?.Entity?.GetComponent(186)
          ?.ModifyCdTime([o.SkillId], 0, -1);
  }
  static SUi(o) {
    var e, r, a;
    return ModelManager_1.ModelManager.MapExploreToolModel.GetCharExploreSkillBusy()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Phantom",
            40,
            "[MapExploreTool] 使用过快，当前仍在请求使用探索工具中",
            ["UsingInfo", o],
          ),
        !1)
      : ((a = (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          o.CharId,
        ))?.Entity?.GetComponent(3)),
        (e = r?.Entity?.GetComponent(158)),
        r && a && e
          ? a.IsAutonomousProxy
            ? e.PositionState !==
              CharacterUnifiedStateTypes_1.ECharPositionState.Ground
              ? (this.RUi(o, "ExploreStateError"),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 非贴地使用", [
                    "UsingInfo",
                    o,
                  ]),
                !1)
              : ((r =
                  ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
                (a =
                  ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                    r,
                  ))?.InstType !==
                  Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance ||
                13 !== a?.InstSubType
                  ? (this.RUi(o, "ExplorePositionError"),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Phantom",
                        40,
                        "[MapExploreTool] 非大世界使用",
                        ["UsingInfo", o],
                      ),
                    !1)
                  : 1010 !== o.PhantomSkillId || this.UUi(o))
            : (this.RUi(o, "OnylHostUse"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 非主控使用", [
                  "UsingInfo",
                  o,
                ]),
              !1)
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 使用者异常", [
                "UsingInfo",
                o,
              ]),
            !1));
  }
  static UUi(o) {
    return !(
      1010 !== o.PhantomSkillId ||
      (ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(0)
        ? ModelManager_1.ModelManager.MapModel.IsInMapPolygon(o.Pos)
          ? !this.AUi(o.Pos) &&
            (this.RUi(o, "ExplorePositionError"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Phantom",
                40,
                "[MapExploreTool] 目标位置空余高度不足",
                ["UsingInfo", o],
              ),
            1)
          : (this.RUi(o, "ExplorePositionError"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Phantom",
                40,
                "[MapExploreTool] 不在世界开放区域内",
                ["UsingInfo", o],
              ),
            1)
        : (this.RUi(o, "ExploreTeleporterBan"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              40,
              "[MapExploreTool] 放置临时传送点功能被禁用",
              ["UsingInfo", o],
            ),
          1))
    );
  }
  static AUi(o) {
    var e = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace();
    if (!e) return !1;
    (e.WorldContextObject = GlobalData_1.GlobalData.World),
      (e.HalfHeight = MAX_ROLE_HALF_HEIGHT),
      (e.Radius = MAX_ROLE_RADIUS);
    var r = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
      o =
        (r.DeepCopy(o),
        (r.Z += MAX_ROLE_HALF_HEIGHT),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, r),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, r),
        TraceElementCommon_1.TraceElementCommon.CapsuleTrace(
          e,
          TRACE_PROFILE_KEY,
        ));
    return (
      ModelManager_1.ModelManager.TraceElementModel.ClearCapsuleTrace(), !o
    );
  }
  static EUi(o, e) {
    this.LUi(o, !1, e);
  }
  static yUi(o, e) {
    if (e) {
      var r = this.PUi(o, e),
        a = this.xUi(o, e);
      if (
        ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanCheckPass(
          o,
          e,
        )
      )
        return void (a || this.TUi(o));
      if (1011 === o.PhantomSkillId) if (this.wUi(o, e)) return;
      r ||
        a ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Phantom",
            40,
            "[MapExploreTool] 服务端检测结果未提示或处理，可能发生了意料之外的错误",
            ["UsingInfo", o],
            ["Response", e],
          ));
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Phantom",
        40,
        "[MapExploreTool] 服务端检测未通过",
        ["UsingInfo", o],
        ["Response", e],
      ),
      this.IUi(o, !1);
  }
  static wUi(o, e) {
    return (
      1011 === o.PhantomSkillId &&
      e?.Kms === Protocol_1.Aki.Protocol.lkn.Proto_ErrSkillIsEffect &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          40,
          "[MapExploreTool] 不请求正式使用探索工具，直接认为执行成功",
          ["UsingInfo", o],
          ["Response", e],
        ),
      this.DUi(o),
      !0)
    );
  }
  static DUi(o, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 探索工具使用成功", [
        "UsingInfo",
        o,
      ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        o,
        e,
      ),
      this.IUi(o, !0);
  }
  static xUi(r, o) {
    var a = ModelManager_1.ModelManager.MapExploreToolModel.GetRespConfirmBoxId(
      r,
      o,
    );
    if (!a) return !1;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Phantom",
        40,
        "[MapExploreTool] 根据消息处理弹窗",
        ["UsingInfo", r],
        ["Response", o],
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
        let o = void 0;
        var i = void 0;
        let e = void 0;
        n &&
          1 === n.size &&
          (([[i, e]] = n),
          (o = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i))),
          n
            ? (t.ItemIdMap = n)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                40,
                `[MapExploreTool] 查询不到确认框${a}对应的道具`,
              ),
          o && e
            ? t.SetTextArgs(o, e.toString())
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
        this.IUi(r, !1);
      }),
      t.FunctionMap.set(2, () => {
        this.TUi(r);
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      ),
      !0
    );
  }
  static PUi(o, e) {
    var r = ModelManager_1.ModelManager.MapExploreToolModel.GetRespTipsId(o, e);
    return (
      !!r &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Phantom",
          40,
          "[MapExploreTool] 根据消息处理飘字",
          ["UsingInfo", o],
          ["Response", e],
          ["PromptId", r],
        ),
      this.RUi(o, r),
      !0)
    );
  }
  static RUi(o, e) {
    var r = [];
    switch (e) {
      case "ExploreActivating":
        var a =
          ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(
            o.PhantomSkillId,
          );
        if (!a || a.length <= 0)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              40,
              `[MapExploreTool] 查询不到通用提示${e}对应的技能名参数`,
            )
          );
        r.push(a);
        break;
      case "ExploreTeleporterItemLack":
      case "ExploreShengXiaItemLack":
        a =
          ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
            o.PhantomSkillId,
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
              `[MapExploreTool] 查询不到通用提示${e}对应的道具名参数`,
            )
          );
        r.push(a);
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      e,
      r,
    );
  }
  static $xn(o, e) {
    var r = [];
    if ("ExploreDeploySuccess" === e) {
      o = ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(
        o.PhantomSkillId,
      );
      if (!o || o.length <= 0)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            40,
            `[MapExploreTool] 查询不到通用提示${e}对应的技能名参数`,
          )
        );
      r.push(o);
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      e,
      r,
    );
  }
  static LUi(o, e, r) {
    var a = Protocol_1.Aki.Protocol.SJn.create();
    (a.M3n = o.Pos),
      (a.S3n = o.Rot),
      (a.vkn = o.PhantomSkillId),
      (a.$6n = e),
      Net_1.Net.Call(22248, a, r);
  }
}
exports.MapExploreToolController = MapExploreToolController;
//# sourceMappingURL=MapExploreToolController.js.map
