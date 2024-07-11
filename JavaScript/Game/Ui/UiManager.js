"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiManager = void 0);
const ue_1 = require("ue"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GlobalData_1 = require("../GlobalData"),
  UiCameraAnimationManager_1 = require("../Module/UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../Module/UiComponent/UiSceneManager"),
  NavigationRegisterCenter_1 = require("../Module/UiNavigation/New/NavigationRegisterCenter"),
  UiNavigationViewManager_1 = require("../Module/UiNavigation/New/UiNavigationViewManager"),
  LguiUtil_1 = require("../Module/Util/LguiUtil"),
  UiPopFrameView_1 = require("./Base/UiPopFrameView"),
  UiViewFloatContainer_1 = require("./Container/Float/UiViewFloatContainer"),
  UiViewListContainer_1 = require("./Container/UiViewListContainer"),
  UiViewSetContainer_1 = require("./Container/UiViewSetContainer"),
  UiViewStackContainer_1 = require("./Container/UiViewStackContainer"),
  UiConfig_1 = require("./Define/UiConfig"),
  UiLayerType_1 = require("./Define/UiLayerType"),
  LguiEventSystemManager_1 = require("./LguiEventSystem/LguiEventSystemManager"),
  UiActorPool_1 = require("./UiActorPool"),
  UIGlobalMaterialParam_1 = require("./UIGlobalMaterialParam"),
  UiLayer_1 = require("./UiLayer"),
  UiModel_1 = require("./UiModel");
class UiManager {
  static get IsInited() {
    return 2 === UiManager.Ife;
  }
  static OpenView(i, e = void 0, a) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenViewBegined, i),
      UiManager.OpenViewAsync(i, e).then(
        (e) => {
          void 0 !== e
            ? (a?.(!0, e),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiCore",
                  17,
                  "[OpenView]流程执行成功",
                  ["ViewName", i],
                  ["ViewId", e],
                ))
            : (a?.(!1, 0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OpenViewFail,
                i,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 17, "[OpenView]流程执行失败", [
                  "ViewName",
                  i,
                ]));
        },
        (e) => {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "UiCore",
                17,
                "[OpenView]流程执行异常",
                e,
                ["error", e.message],
                ["ViewName", i],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "UiCore",
                17,
                "[OpenView]流程执行异常",
                ["ViewName", i],
                ["error", e],
              ),
            a?.(!1, 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OpenViewFail,
              i,
            );
        },
      );
  }
  static async OpenViewAsync(e, i = void 0) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[OpenViewAsync]请求打开界面", [
        "界面名称",
        e,
      ]);
    var a = !!i && i?.IsMultipleView;
    if (UiManager.V4e(e, a)) {
      a = UiManager.Gdr(e);
      if (a)
        return (
          (a.OpenParam = i),
          (a.OpenPromise = new CustomPromise_1.CustomPromise()),
          await Promise.all([
            UiManager.Ndr.get(a.Info.Type).OpenViewAsync(a),
            a.OpenPromise.Promise,
          ]),
          (a.OpenPromise = void 0),
          a.TryEmitInterruptOpExitView(),
          a.GetViewId()
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          17,
          "[OpenViewAsync]打开界面失败, 注册界面失败",
          ["name", e],
        );
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          17,
          "[OpenViewAsync]打开界面失败, 不满足界面打开条件",
          ["界面名称", e],
        );
  }
  static CloseView(i, a) {
    UiManager.CloseViewAsync(i).then(
      () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "[CloseView]流程执行成功", [
            "ViewName",
            i,
          ]),
          a?.(!0);
      },
      (e) => {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              17,
              "[CloseView]流程执行异常",
              e,
              ["error", e.message],
              ["ViewName", i],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[CloseView]流程执行异常",
              ["ViewName", i],
              ["error", e],
            ),
          a?.(!1);
      },
    );
  }
  static async CloseViewAsync(e) {
    var i = this.Fur.get(e);
    if (!i)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            17,
            "[CloseViewAsync]关闭界面失败, 界面不存在",
            ["界面名称", e],
          ),
        !1
      );
    const a = [];
    return (
      i.forEach((e) => a.push(UiManager.CloseViewImplementAsync(e))),
      (await Promise.all(a)).every((e) => e)
    );
  }
  static CloseViewById(i, a) {
    UiManager.CloseViewByIdAsync(i).then(
      () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "[CloseViewById]流程执行成功", [
            "viewId",
            i,
          ]),
          a?.(!0);
      },
      (e) => {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              17,
              "[CloseViewById]流程执行异常",
              e,
              ["error", e.message],
              ["viewId", i],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[CloseViewById]流程执行异常",
              ["viewId", i],
              ["error", e],
            ),
          a?.(!1);
      },
    );
  }
  static async CloseViewByIdAsync(e) {
    var i = this.Odr.get(e);
    return i
      ? UiManager.CloseViewImplementAsync(i)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            17,
            "[CloseViewByIdAsync]关闭界面失败, 界面不存在",
            ["viewId", e],
          ),
        !1);
  }
  static async CloseViewImplementAsync(e) {
    var i = e.Info;
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          17,
          "[CloseViewAsync]请求关闭界面",
          ["界面名称", i.Name],
          ["ViewId", e.GetViewId()],
        ),
      e.OpenPromise && e.OpenPromise.SetResult(void 0),
      e.ClosePromise || (e.ClosePromise = new CustomPromise_1.CustomPromise()),
      await UiManager.Ndr.get(i.Type).CloseViewAsync(e),
      await e.ClosePromise?.Promise,
      (e.ClosePromise = void 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          17,
          "[CloseViewAsync]关闭界面成功",
          ["界面名称", i.Name],
          ["ViewId", e.GetViewId()],
        ),
      !0
    );
  }
  static CloseAndOpenView(i, a, e = void 0, r) {
    UiManager.CloseAndOpenViewAsync(i, a, e).then(
      () => {
        r?.(!0);
      },
      (e) => {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              17,
              "[CloseAndOpenView]流程执行异常",
              e,
              ["error", e.message],
              ["closeViewName", i],
              ["openViewName", a],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[CloseAndOpenView]流程执行异常",
              ["closeViewName", i],
              ["openViewName", a],
              ["error", e],
            ),
          r?.(!1),
          r?.(!1);
      },
    );
  }
  static async CloseAndOpenViewAsync(e, i, a) {
    var r, n;
    return UiConfig_1.UiConfig.TryGetViewInfo(i).Type !==
      UiLayerType_1.ELayerType.Normal
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            17,
            "[CloseAndOpenViewAsync]非栈容器的界面不允许使用该接口",
          ),
        !1)
      : (r = UiManager.kdr(e))
        ? ((n = !!a && a?.IsMultipleView),
          UiManager.V4e(i, n)
            ? (((n = UiManager.Gdr(i)).OpenParam = a),
              await UiManager.Ndr.get(
                UiLayerType_1.ELayerType.Normal,
              ).CloseAndOpenNewAsync(r, n),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiCore",
                  17,
                  "[CloseAndOpenView]流程执行成功",
                  ["closeViewName", e],
                  ["openViewName", i],
                ),
              !0)
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiCore",
                  17,
                  "[CloseAndOpenView]流程执行失败, 不满足界面打开条件",
                  ["closeViewName", e],
                  ["openViewName", i],
                ),
              !1))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[CloseAndOpenViewAsync]未找到待关闭界面",
              ["closeViewName", e],
            ),
          !1);
  }
  static async PreOpenViewAsync(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[OpenViewAsync]请求预打开界面", [
        "界面名称",
        e,
      ]);
    var i = UiManager.Gdr(e);
    if (i)
      return (
        i.OnPreOpen(),
        UiManager.Fdr.set(i.GetViewId(), i),
        await UiManager.Ndr.get(i.Info.Type).PreOpenViewAsync(i),
        i.GetViewId()
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "UiCore",
        17,
        "[OpenViewAsync]打开界面失败, 注册界面失败",
        ["name", e],
      );
  }
  static async OpenViewAfterPreOpenedAsync(e, i) {
    var a,
      r,
      n = UiManager.Fdr.get(e);
    return n
      ? ((a = n.Info.Name),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            17,
            "[OpenViewAfterPreOpenedAsync](已预打开过)请求打开界面",
            ["界面名称", a],
          ),
        (r = !!i && i?.IsMultipleView),
        UiManager.V4e(a, r)
          ? ((n.OpenParam = i),
            (n.OpenPromise = new CustomPromise_1.CustomPromise()),
            UiManager.RemovePreOpenView(e),
            await Promise.all([
              UiManager.Ndr.get(n.Info.Type).OpenViewAfterPreOpenedAsync(n),
              n.OpenPromise.Promise,
            ]),
            !(n.OpenPromise = void 0))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiCore",
                17,
                "[OpenViewAfterPreOpenedAsync](已预打开过)打开界面失败, 不满足界面打开条件",
                ["界面名称", a],
              ),
            !1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            17,
            "[OpenViewAfterPreOpenedAsync](已预打开过)打开界面失败, 界面实例不存在",
          ),
        !1);
  }
  static RemovePreOpenView(e) {
    UiManager.Fdr.delete(e);
  }
  static wRn() {
    for (const e of UiManager.Fdr.values())
      try {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            11,
            "[Clear] 尝试执行销毁的界面",
            ["Name", e.constructor.name],
            ["ComponentId", e.ComponentId],
          ),
          e.OnOpenAfterPreOpened(),
          e.ClearAsync();
      } catch (e) {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              11,
              "界面同步关闭异常,业务变量可能未初始化完成,需要关注",
              e,
              ["error", e.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              11,
              "界面同步关闭异常,业务变量可能未初始化完成,需要关注",
              ["error", e],
            );
      }
    UiManager.Fdr.clear();
  }
  static IsViewShow(e) {
    e = UiManager.Fur.get(e);
    if (e)
      for (const i of e) {
        if (i.IsPreOpening) return !1;
        if (i.IsShowOrShowing) return !0;
      }
    return !1;
  }
  static IsViewOpen(e) {
    e = UiManager.Fur.get(e);
    if (e)
      for (const i of e) {
        if (i.IsPreOpening) return !1;
        if (i.WaitToDestroy) return !1;
        if (!i.IsDestroyOrDestroying && !i.IsHideOrHiding) return !0;
      }
    return !1;
  }
  static IsViewCreating(e) {
    e = UiManager.Fur.get(e);
    if (e) for (const i of e) if (i.IsCreating) return !0;
    return !1;
  }
  static IsViewDestroying(e) {
    e = UiManager.Fur.get(e);
    if (e) for (const i of e) if (i.IsDestroying) return !0;
    return !1;
  }
  static Vdr() {
    UiManager.Ndr.clear(),
      UiManager.Ndr.set(
        UiLayerType_1.ELayerType.HUD,
        new UiViewSetContainer_1.UiViewSetContainer(UiModel_1.UiModel.HudMap),
      );
    var e = new UiViewStackContainer_1.UiViewStackContainer(
      UiModel_1.UiModel.NormalStack,
    );
    UiManager.Ndr.set(UiLayerType_1.ELayerType.Normal, e),
      UiManager.Ndr.set(UiLayerType_1.ELayerType.CG, e),
      UiManager.Ndr.set(
        UiLayerType_1.ELayerType.Pop,
        new UiViewListContainer_1.UiViewListContainer(
          UiModel_1.UiModel.PopList,
        ),
      ),
      UiManager.Ndr.set(
        UiLayerType_1.ELayerType.Float,
        new UiViewFloatContainer_1.UiViewFloatContainer(
          UiModel_1.UiModel.FloatQueueMap,
          UiModel_1.UiModel.ShowViewMap,
          UiModel_1.UiModel.HideViewMap,
        ),
      ),
      UiManager.Ndr.set(
        UiLayerType_1.ELayerType.Guide,
        new UiViewListContainer_1.UiViewListContainer(
          UiModel_1.UiModel.GuideList,
        ),
      ),
      UiManager.Ndr.set(
        UiLayerType_1.ELayerType.Loading,
        new UiViewSetContainer_1.UiViewSetContainer(
          UiModel_1.UiModel.LoadingMap,
        ),
      ),
      UiManager.Ndr.set(
        UiLayerType_1.ELayerType.NetWork,
        new UiViewListContainer_1.UiViewListContainer(
          UiModel_1.UiModel.NetWorkList,
        ),
      ),
      ue_1.KuroStaticLibrary.IsBuildShipping() ||
        UiManager.Ndr.set(
          UiLayerType_1.ELayerType.Debug,
          new UiViewSetContainer_1.UiViewSetContainer(
            UiModel_1.UiModel.DebugMap,
          ),
        );
  }
  static dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ResetToBattleView,
      UiManager.Hdr,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ExitNormalQueueState,
        UiManager.jdr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        UiManager.Wdr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        UiManager.Kdr,
      );
  }
  static ResetToBattleView(e) {
    UiManager.Ndr.get(UiLayerType_1.ELayerType.Pop).CloseAllView(),
      UiManager.NormalResetToView("BattleView", e);
  }
  static NormalResetToView(i, a) {
    UiManager.NormalResetToViewAsync(i).then(
      () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "[NormalResetToView]流程执行成功", [
            "ViewName",
            i,
          ]),
          a?.(!0);
      },
      (e) => {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              17,
              "[NormalResetToView]流程执行异常",
              e,
              ["error", e.message],
              ["ViewName", i],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[NormalResetToView]流程执行异常",
              ["ViewName", i],
              ["error", e],
            ),
          a?.(!1);
      },
    );
  }
  static async NormalResetToViewAsync(e) {
    var i = UiManager.Ndr.get(UiLayerType_1.ELayerType.Normal),
      a = UiManager.kdr(e);
    a
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "[NormalResetToView]重置到界面", [
            "viewName",
            e,
          ]),
        await i.ResetToViewAsync(a))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiCore", 17, "未找到待重置界面", ["viewName", e]);
  }
  static CloseHistoryRingView(i, a) {
    UiManager.CloseHistoryRingViewAsync(i).then(
      () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "[CloseHistoryRingView]流程执行成功", [
            "ViewName",
            i,
          ]),
          a?.(!0);
      },
      (e) => {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              17,
              "[CloseHistoryRingView]流程执行异常",
              e,
              ["error", e.message],
              ["ViewName", i],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[CloseHistoryRingView]流程执行异常",
              ["ViewName", i],
              ["error", e],
            ),
          a?.(!1);
      },
    );
  }
  static async CloseHistoryRingViewAsync(e) {
    var i = UiManager.Ndr.get(UiLayerType_1.ELayerType.Normal);
    void 0 !== i && (await i.CloseHistoryRingViewAsync(e));
  }
  static AddTickView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[AddTickView] 添加界面Tick", [
        "name",
        e.constructor.name,
      ]),
      UiManager.Qdr.add(e);
  }
  static RemoveTickView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[RemoveTickView] 移除界面Tick", [
        "name",
        e.constructor.name,
      ]),
      UiManager.Qdr.delete(e);
  }
  static Gdr(e) {
    var i,
      a = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (a)
      return (
        (i = new a.Ctor(a)).InitRootActorLoadInfo(),
        0 < a.CommonPopBg &&
          ((a = new UiPopFrameView_1.UiPopFrameView(a)),
          (i.ChildPopView = a),
          i.AddChild(a)),
        UiManager.Xdr(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CreateViewInstance,
          i,
        ),
        i
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiCore", 17, "界面信息viewInfo获取失败", ["name", e]);
  }
  static $dr() {
    UiManager.Ndr.get(UiLayerType_1.ELayerType.Float).StartWaitingNormalView();
  }
  static kdr(e) {
    e = this.Fur.get(e);
    if (e && 0 !== e.size) for (const i of e.values()) return i;
  }
  static async Initialize() {
    GlobalData_1.GlobalData.World
      ? 0 === UiManager.Ife &&
        ((UiManager.Ife = 1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "[Initialize]初始化UiManager"),
        NavigationRegisterCenter_1.NavigationRegisterCenter.Init(),
        await Promise.all([
          UiLayer_1.UiLayer.Initialize(),
          LguiEventSystemManager_1.LguiEventSystemManager.Initialize(),
        ]),
        await UiActorPool_1.UiActorPool.Init(),
        UiManager.Vdr(),
        UiNavigationViewManager_1.UiNavigationViewManager.Initialize(),
        UIGlobalMaterialParam_1.UiGlobalMaterialParam.Init(),
        UiManager.dde(),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiManagerInit),
        (UiManager.Ife = 2))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCore", 17, "游戏世界不存在");
  }
  static LockOpen() {
    LguiUtil_1.LguiUtil.SetActorIsPermanent(UiLayer_1.UiLayer.UiRoot, !0, !0),
      (UiManager.Ydr = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 17, "[UIManager.UnLockOpen] 禁止打开界面");
  }
  static UnLockOpen() {
    (UiManager.Ydr = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 17, "[UIManager.UnLockOpen] 恢复打开界面");
  }
  static get IsLockOpen() {
    return UiManager.Ydr;
  }
  static async ClearAsync() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[UIManager.ClearAsync] 清理UIManager 开始");
    for (var [e, i] of UiManager.Ndr)
      0 < (e & UiLayerType_1.NORMAL_CONTAINER_TYPE) || i.ClearContainer();
    var a = [];
    for (const n of UiManager.Odr.values())
      n.Info?.IsPermanent ||
        0 < (n.Info.Type & UiLayerType_1.NORMAL_CONTAINER_TYPE) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            11,
            "[UIManager.ClearAsync] 需要等待销毁的界面-非stack容器",
            ["Name", n.constructor.name],
            ["ComponentId", n.ComponentId],
          ),
        a.push(n.DeadPromise?.Promise));
    await Promise.all(a),
      UiManager.wRn(),
      UiManager.Ndr.get(UiLayerType_1.ELayerType.Normal)?.ClearContainer();
    var r = [];
    for (const o of UiManager.Odr.values())
      o.Info?.IsPermanent ||
        (o.Info.Type & UiLayerType_1.NORMAL_CONTAINER_TYPE) <= 0 ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            11,
            "[UIManager.ClearAsync] 需要等待销毁的界面-stack容器",
            ["Name", o.constructor.name],
            ["ComponentId", o.ComponentId],
          ),
        r.push(o.DeadPromise?.Promise));
    await Promise.all(r),
      UiActorPool_1.UiActorPool.ClearPool(),
      UiSceneManager_1.UiSceneManager.Clear();
    try {
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Game",
            3,
            "[Game.LeaveLevel] 调用UiCameraAnimationManager.ResetUiCameraAnimationManager异常。",
            e,
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            3,
            "[Game.LeaveLevel] 调用UiCameraAnimationManager.ResetUiCameraAnimationManager异常。",
            ["error", e],
          );
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[UIManager.ClearAsync] 清理UIManager 完成");
  }
  static Tick(e) {
    for (const i of this.Qdr) i.Tick(e);
    UiActorPool_1.UiActorPool.Tick(e);
  }
  static AfterTick(e) {
    for (const i of this.Qdr) i.AfterTick(e);
  }
  static V4e(e, i = !1) {
    if (
      GlobalData_1.GlobalData.IsSceneClearing &&
      !UiConfig_1.UiConfig.CanOpenWhileClearSceneViewNameSet.has(e)
    )
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            17,
            "[CanOpenView] 退出场景清理时不允许打开UI界面",
            ["ViewName", e],
          ),
        !1
      );
    if (UiManager.Ydr)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            17,
            "[CanOpenView] 无缝加载期间不允许打开UI界面",
            ["ViewName", e],
          ),
        !1
      );
    var a = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (!a)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("UiCore", 17, "[CanOpenView] 界面配置不存在", [
            "ViewName",
            e,
          ]),
        !1
      );
    var r = 0 < (a.Type & UiLayerType_1.MULTIPLE_VIEW_TYPE);
    if (!r && !i && UiManager.IsViewOpen(e))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("UiCore", 17, "[CanOpenView] 界面重复打开", [
            "ViewName",
            e,
          ]),
        !1
      );
    if (a.ScenePointTag)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            17,
            "[CanOpenView] ScenePointTag不允许配置",
            ["ViewName", e],
          ),
        !1
      );
    if (0 < a.BeObstructView.length)
      for (const n of a.BeObstructView)
        if (UiManager.IsViewShow(n))
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiCore",
                17,
                "[CanOpenView] 检测到表格配置了界面互斥",
                ["ViewName", e],
                ["ViewOpenCheck", n],
              ),
            !1
          );
    return UiManager.Jdr(e)
      ? !!UiManager.Jdr(e, !0) ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              17,
              "[CanOpenView] 外部注册的全局界面OpenView检查函数不通过",
              ["viewName", e],
            ),
          !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            17,
            "[CanOpenView] 外部注册的单个界面OpenView检查函数不通过",
            ["viewName", e],
          ),
        !1);
  }
  static AddOpenViewCheckFunction(e, i, a) {
    let r = UiManager.zdr.get(e);
    r || ((r = new Map()), UiManager.zdr.set(e, r)), r.set(i, a);
  }
  static RemoveOpenViewCheckFunction(e, i) {
    var a = UiManager.zdr.get(e);
    a && (a.delete(i), 0 === a.size) && UiManager.zdr.delete(e);
  }
  static Jdr(e, i = !1) {
    i = UiManager.zdr.get(i ? "All" : e);
    if (i && 0 < i.size)
      for (var [a, r] of i)
        if (!a(e))
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiCore",
                17,
                "外部注册的OpenView检查函数不通过",
                ["viewName", e],
                ["reason", r],
              ),
            !1
          );
    return !0;
  }
  static GetViewByName(e) {
    return UiManager.kdr(e);
  }
  static GetView(e) {
    return this.Odr.get(e);
  }
  static Xdr(e) {
    UiManager.Odr.set(e.GetViewId(), e);
    var i = e.Info.Name;
    let a = UiManager.Fur.get(i);
    a || ((a = new Set()), UiManager.Fur.set(i, a)), a.add(e);
  }
  static RemoveView(e) {
    var i,
      a = UiManager.Odr.get(e);
    a &&
      (UiManager.Odr.delete(e),
      (e = a.Info.Name),
      (i = UiManager.Fur.get(e))) &&
      (i.delete(a), i.size || UiManager.Fur.delete(e));
  }
}
((exports.UiManager = UiManager).Ife = 0),
  (UiManager.Ndr = new Map()),
  (UiManager.zdr = new Map()),
  (UiManager.MBo = void 0),
  (UiManager.Odr = new Map()),
  (UiManager.Fur = new Map()),
  (UiManager.Qdr = new Set()),
  (UiManager.Fdr = new Map()),
  (UiManager.Hdr = () => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 17, "重置回到主界面"),
      UiManager.Ndr.get(UiLayerType_1.ELayerType.Pop).CloseAllView(),
      UiManager.NormalResetToView("BattleView");
  }),
  (UiManager.jdr = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "退出队列状态,重置回到主界面"),
      UiManager.$dr();
  }),
  (UiManager.Wdr = () => {
    (UiModel_1.UiModel.IsInMainView = !0),
      UiManager.Ndr.get(UiLayerType_1.ELayerType.Float).ShowFloatTips();
  }),
  (UiManager.Kdr = () => {
    (UiModel_1.UiModel.IsInMainView = !1),
      UiManager.Ndr.get(UiLayerType_1.ELayerType.Float).HideFloatTips();
  }),
  (UiManager.Ydr = !1);
//# sourceMappingURL=UiManager.js.map
