"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubLevelController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  CameraUtility_1 = require("../../Camera/CameraUtility"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  AsyncTask_1 = require("../Task/AsyncTask"),
  TaskSystem_1 = require("../Task/TaskSystem"),
  WorldGlobal_1 = require("../WorldGlobal");
class SubLevelInfo {
  constructor(e, o, r, l, a, t) {
    (this.UnloadLevels = void 0),
      (this.Levels = void 0),
      (this.ScreenEffect = 0),
      (this.Location = void 0),
      (this.Rotator = void 0),
      (this.Callback = void 0),
      (this.UnloadLevels = e),
      (this.Levels = o),
      (this.ScreenEffect = r),
      (this.Location = l ?? void 0),
      (this.Rotator = a ?? void 0),
      (this.Callback = t ?? void 0);
  }
  Clear() {
    (this.UnloadLevels = void 0),
      (this.Levels = void 0),
      (this.ScreenEffect = 0),
      (this.Location = void 0),
      (this.Rotator = void 0),
      (this.Callback = void 0);
  }
}
class SubLevelController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    var e = super.OnInit();
    return this.OnRegisterNetEvent(), (this.aWs = new Queue_1.Queue()), e;
  }
  static Clear() {
    return (
      this.OnUnRegisterNetEvent(),
      this.aWs?.Clear(),
      (this.aWs = void 0),
      super.Clear()
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25855, SubLevelController.b0r),
      Net_1.Net.Register(15360, SubLevelController.q0r);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25855), Net_1.Net.UnRegister(15360);
  }
  static LoadOrUnloadSubLevel(e, r) {
    if (e?.length) {
      var o = ModelManager_1.ModelManager.SubLevelModel.GetAllSubLevels();
      const n = new Array(),
        i = new Array();
      var l,
        a = new Set();
      for (const L of e) {
        a.add(L);
        var t = ModelManager_1.ModelManager.SubLevelModel.GetSubLevel(L);
        (t && t.IsVisible === !r.includes(L)) || i.push(L);
      }
      for ([l] of o) a.has(l) || n.push(l);
      (n.length || i.length) &&
        (ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
          "LoadOrUnloadSubLevel",
        ),
        (e = new AsyncTask_1.AsyncTask("LoadOrUnloadSubLevel", async () => {
          const o = new CustomPromise_1.CustomPromise();
          return (
            SubLevelController.ChangeSubLevel(
              n,
              i,
              0,
              void 0,
              void 0,
              (e) => {
                e ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "InstanceDungeon",
                      3,
                      "SubLevelController.加载或者卸载子关卡失败",
                      ["unloads", n],
                      ["newLoads", i],
                    )),
                  ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
                    "LoadOrUnloadSubLevel",
                  ),
                  e &&
                    ModelManager_1.ModelManager.GameModeModel.MapDone &&
                    ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
                      Protocol_1.Aki.Protocol.Nks.Proto_Normal,
                    ),
                  o.SetResult(e);
              },
              r,
            ),
            o.Promise
          );
        })),
        TaskSystem_1.TaskSystem.AddTask(e),
        TaskSystem_1.TaskSystem.Run());
    }
  }
  static ChangeSubLevel(e, o, r, l, a, t, n) {
    var i = new Map();
    for (const _ of o) {
      var L = n?.indexOf(_) ?? -1;
      i.set(_, L < 0);
    }
    this.Lfr(e, i, r, l, a, t);
  }
  static hWs(e) {
    e && this.aWs?.Push(e);
  }
  static async Lfr(o, r, l, a, t, n) {
    var e = ModelManager_1.ModelManager.GameModeModel,
      i = ModelManager_1.ModelManager.SubLevelLoadingModel;
    if (e.WorldDone)
      if (i.LoadSubLeveling)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameMode",
            3,
            "SubLevelController.当前正在加载子关卡，等所有子关卡加载完成才能继续加载新的子关卡。",
          ),
          this.hWs(new SubLevelInfo(o, r, l, a, t, n));
      else {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            3,
            "SubLevelController.切换子关卡:(开始)",
            ["卸载的子关卡", o?.join()],
            ["加载的子关卡", r?.keys()],
            ["位置", a],
            ["旋转", t],
          ),
          (i.LoadSubLeveling = !0),
          (i.LoadSubLevelPromise = new GameModePromise_1.GameModePromise()),
          0 !==
            (ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect =
              l) &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                3,
                "SubLevelController.切换子关卡:打开黑幕Loading界面(开始)",
              ),
            await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(
              14,
              3,
            ),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "SubLevelController.切换子关卡:打开黑幕Loading界面(完成)",
            );
        let e = !1;
        for (var [L] of r) {
          L =
            ModelManager_1.ModelManager.SubLevelModel.GetPreloadOrLoadedSubLevel(
              L,
            );
          if (!L || 1 === L.LoadType) {
            e = !0;
            break;
          }
        }
        if (
          (e &&
            !ModelManager_1.ModelManager.LevelLoadingModel.CheckLoadingPerformsEmpty() &&
            ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
              GlobalData_1.GlobalData.World,
              "SubLevelController.ChangeSubLevelInternal",
            ),
          a &&
            Global_1.Global.BaseCharacter?.KuroSetMovementMode({
              Mode: 0,
              Context: "[SubLevelController.ChangeSubLevelInternal]",
            }),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              29,
              "SubLevelController.切换子关卡:等待之前的子关卡列表卸载(开始)",
            ),
          await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsUnLoad(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              29,
              "SubLevelController.切换子关卡:等待之前的子关卡列表卸载(结束)",
            ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              29,
              "SubLevelController.切换子关卡:等待之前的子关卡列表加载(开始)",
            ),
          await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsLoad(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              29,
              "SubLevelController.切换子关卡:等待之前的子关卡列表加载(结束)",
            ),
          o?.length)
        ) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "SubLevelController.切换子关卡:卸载子关卡列表(开始)",
            );
          for (const _ of o)
            ModelManager_1.ModelManager.SubLevelModel.RemoveSubLevel(_);
          await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsUnLoad(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                3,
                "SubLevelController.切换子关卡:卸载子关卡列表(完成)",
              );
        }
        r?.size &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "SubLevelController.切换子关卡:加载子关卡列表(开始)",
            ),
          await ControllerHolder_1.ControllerHolder.SubLevelController.LoadSubLevels(
            r,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSubLevelAdded,
          ),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "GameMode",
            3,
            "SubLevelController.切换子关卡:加载子关卡列表(完成)",
          ),
          await SubLevelController.Dfr(a, t),
          1 === ResourceSystem_1.ResourceSystem.GetLoadMode() &&
            ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
              GlobalData_1.GlobalData.World,
              "SubLevelController.ChangeSubLevelInternal",
            ),
          0 !== l &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                3,
                "SubLevelController.切换子关卡:关闭黑幕Loading界面(开始)",
              ),
            await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(
              14,
              1,
            ),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "SubLevelController.切换子关卡:关闭黑幕Loading界面(完成)",
            ),
          i.LoadSubLevelPromise.SetResult(!0),
          (i.LoadSubLevelPromise = void 0),
          (i.LoadSubLeveling = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "SubLevelController.切换子关卡:(完成)",
            ),
          n?.(!0),
          this.lWs();
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GameMode",
          3,
          "SubLevelController.切换子关卡:WorldDone为false,切换子关卡失败。",
        ),
        n?.(!1);
  }
  static lWs() {
    var e;
    !this.aWs ||
      this.aWs.Size <= 0 ||
      (0 !== this.aWs.Size &&
        ((e = this.aWs.Front)
          ? (this.aWs.Pop(),
            this.Lfr(
              e.UnloadLevels,
              e.Levels,
              e.ScreenEffect,
              e.Location,
              e.Rotator,
              e.Callback,
            ))
          : this.aWs.Pop()));
  }
  static async Dfr(e, o) {
    Global_1.Global.BaseCharacter ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("GameMode", 3, "SubLevelController:等待加载编队(开始)"),
      await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise,
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("GameMode", 3, "SubLevelController:等待加载编队(完成)")),
      e &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            3,
            "SubLevelController.切换子关卡:设置玩家位置、地面修正(开始)",
            ["Location", e],
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TeleportStart,
          !0,
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          !0,
        ),
        ControllerHolder_1.ControllerHolder.GameModeController.FixBornLocation(
          e,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BeforeTeleportComplete,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TeleportComplete,
          0,
        ),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "GameMode",
          3,
          "SubLevelController.切换子关卡:设置玩家位置、地面修正(结束)",
          [
            "修正后的Location",
            Global_1.Global.BaseCharacter.CharacterActorComponent
              .ActorLocationProxy,
          ],
        ),
      o &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            3,
            "SubLevelController.切换子关卡:设置玩家旋转(开始)",
            ["Rotator", o],
          ),
        Global_1.Global.BaseCharacter.CharacterActorComponent.SetInputRotator(
          o,
        ),
        Global_1.Global.BaseCharacter.CharacterActorComponent.SetActorRotation(
          WorldGlobal_1.WorldGlobal.ToUeRotator(o),
          "SubLevelController.切换子关卡:设置玩家旋转",
          !1,
        ),
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
        ),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "GameMode",
          3,
          "SubLevelController.切换子关卡:设置玩家旋转(结束)",
          [
            "Rotator",
            Global_1.Global.BaseCharacter.CharacterActorComponent
              .ActorRotationProxy,
          ],
        );
  }
  static async PreloadSubLevel(e) {
    var o = ModelManager_1.ModelManager.SubLevelModel;
    if (!ModelManager_1.ModelManager.GameModeModel.WorldDone)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameMode",
            29,
            "SubLevelController.预加载子关卡:WorldDone为false,预加载子关卡失败",
          ),
        !1
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("GameMode", 29, "SubLevelController.预加载子关卡:(开始)", [
        "加载的子关卡",
        e?.join(),
      ]);
    var r = new Array();
    for (const l of e) o.GetPreloadOrLoadedSubLevel(l) || r.push(l);
    return (
      r?.length && (await SubLevelController.yW_(r)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "GameMode",
          29,
          "SubLevelController.预加载子关卡:(完成)",
        ),
      !0
    );
  }
  static async yW_(e) {
    var o = ModelManager_1.ModelManager.SubLevelModel,
      r = new Array();
    for (const t of e) {
      var l,
        a = o.AddPreloadSubLevel(t);
      a &&
        ((a.IsPreload = !0),
        (a.LoadType = 1),
        r.push(a.LoadPromise.Promise),
        (l =
          GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(
            FNameUtil_1.FNameUtil.GetDynamicFName(t),
            a.IsVisible,
            !1,
          )),
        (a.LinkId = l),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "World",
          3,
          "SubLevelController.切换子关卡:加载子关卡(预加载)",
          ["Path", a.Path],
          ["LinkId", l],
        );
    }
    return await Promise.all(r), !0;
  }
  static async CheckLoadSubLevels(e) {
    var o = new Map();
    if (e.URs?.length)
      for (const a of e.URs) {
        var r = e.j$_.indexOf(a);
        o.set(a, r < 0);
      }
    else {
      var l =
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.SubLevels;
      if (l) for (const t of l) o.set(t, !0);
    }
    return !o.size || this.LoadSubLevels(o);
  }
  static async LoadSubLevel(e, o) {
    var r = ModelManager_1.ModelManager.SubLevelModel;
    let l = r.GetPreloadSubLevel(e);
    if (l)
      return (
        r.MovePreloadSubLevelToSubLevel(e),
        1 === l.LoadType && (await l.LoadPromise.Promise),
        await l.SetLevelVisible(o, "SubLevelController.LoadSubLevel"),
        !0
      );
    if ((l = r.GetSubLevel(e))) {
      if (2 === l.LoadType)
        return (
          await l.SetLevelVisible(o, "SubLevelController.LoadSubLevel"), !0
        );
    } else l = r.AddSubLevel(e, o);
    return (
      0 === l.LoadType &&
        ((r =
          GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(
            FNameUtil_1.FNameUtil.GetDynamicFName(e),
            l.IsVisible,
            !1,
          )),
        (l.LinkId = r),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "World",
          3,
          "SubLevelController:加载子关卡",
          ["Path", e],
          ["LinkId", r],
        ),
      await l.LoadPromise.Promise
    );
  }
  static async LoadSubLevels(e) {
    var o,
      r,
      l,
      a,
      t = new Array();
    for ([o, r] of e) r && t.push(SubLevelController.LoadSubLevel(o, r));
    for ([l, a] of e) a || t.push(SubLevelController.LoadSubLevel(l, a));
    return await Promise.all(t), !0;
  }
  static async WaitSubLevelsLoad() {
    var e = ModelManager_1.ModelManager.SubLevelModel,
      o = e.GetAllSubLevels(),
      e = e.GetAllPreloadSubLevels();
    if (o.size || e.size) {
      var r,
        l,
        a = new Array();
      for ([, r] of e) 1 === r.LoadType && a.push(r.LoadPromise.Promise);
      for ([, l] of o) 1 === l.LoadType && a.push(l.LoadPromise.Promise);
      a.length && (await Promise.all(a));
    }
    return !0;
  }
  static async WaitSubLevelsUnLoad() {
    var e = ModelManager_1.ModelManager.SubLevelModel.GetAllUnloadSubLevels();
    if (e.size) {
      var o,
        r = new Array();
      for ([, o] of e) r.push(o.UnLoadPromise.Promise);
      r.length && (await Promise.all(r));
    }
    return !0;
  }
  static RequestSetSubLevelVisible(e, o) {
    e = Protocol_1.Aki.Protocol.N$_.create({ $$_: e, j$_: o });
    Net_1.Net.Call(15769, e, (e) => {});
  }
  static OnLoadSubLevel(e, o, r) {
    var l,
      a = ModelManager_1.ModelManager.SubLevelModel;
    let t = void 0;
    for ([, l] of a.GetAllPreloadSubLevels())
      if (l.LinkId === e) {
        t = l;
        break;
      }
    if (!t)
      for (var [, n] of a.GetAllSubLevels())
        if (n.LinkId === e) {
          t = n;
          break;
        }
    if (!t && (t = a.GetUnloadSubLevel(o)))
      return (
        t.LoadPromise?.SetResult(!0),
        (a = FNameUtil_1.FNameUtil.GetDynamicFName(t.Path)),
        void (t.UnLoadLinkId =
          GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(
            a,
            !0,
          ))
      );
    t
      ? (t.OnLevelLoad(r),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            18,
            "SubLevelController:子关卡加载完成",
            ["Level", o],
            ["IsPreload", t.IsPreload],
            ["LevelStreaming", r?.IsValid()],
          ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "GameMode",
          3,
          "SubLevelController:加载的子关卡不存在",
          ["LinkId", e],
          ["Level", o],
          ["LevelStreaming", r?.IsValid()],
        );
  }
  static OnUnLoadSubLevel(e, o) {
    var r = ModelManager_1.ModelManager.SubLevelModel,
      l = r.GetUnloadSubLevel(o);
    l
      ? (r.RemoveUnloadSubLevel(o),
        l.UnLoadPromise.SetResult(!0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            3,
            "SubLevelController.切换子关卡:子关卡卸载完成",
            ["Level", o],
            ["LinkId", e],
            ["LoadLinkId", l.LinkId],
          ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "GameMode",
          3,
          "SubLevelController.切换子关卡:卸载的子关卡不存在",
          ["LinkId", e],
          ["Level", o],
        );
  }
}
((exports.SubLevelController = SubLevelController).aWs = void 0),
  (SubLevelController.b0r = (e) => {
    let o = void 0,
      r = void 0;
    var l = ModelManager_1.ModelManager.AutoRunModel;
    if (e.$Ds && -1 !== e.$Ds) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.$Ds);
      if (a) {
        var t = a.Transform.Pos,
          t =
            (t && (o = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
            a.Transform.Rot);
        t && (r = Rotator_1.Rotator.Create(t.Y ?? 0, t.Z ?? 0, t.X ?? 0));
      } else if (
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[SubLevelController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。",
            ["TeleportEntityId", e.$Ds],
          ),
        !l?.IsInAfterRunningState())
      )
        return;
    }
    l?.IsInAfterRunningState() &&
      (l.ShouldTpAfterSkip
        ? (a = l.GetOverrideTpInfo() ?? l.GetGuaranteeTpInfo()) &&
          ((o = a.Location), (r = a.Rotator))
        : ((o = void 0), (r = void 0)));
    const n = new Array();
    var i = new Array();
    const L = new Array();
    t = ModelManager_1.ModelManager.SubLevelModel.GetAllSubLevels();
    if (t) for (var [_] of t) (e.FDs.includes(_) ? i : n).push(_);
    for (const s of e.FDs) i.includes(s) || L.push(s);
    SubLevelController.ChangeSubLevel(n, L, 0, o, r, (e) => {
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            39,
            "SubLevelController 加载子关卡失败",
            ["unloads", n],
            ["newLoads", L],
          )),
        ModelManager_1.ModelManager.AutoRunModel?.IsInAfterRunningState() &&
          ModelManager_1.ModelManager.AutoRunModel.StopAutoRunAndClearInfo();
    });
  }),
  (SubLevelController.q0r = (e) => {
    SubLevelController.LoadOrUnloadSubLevel(e.HDs, e.H$_);
  });
//# sourceMappingURL=SubLevelController.js.map
