"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiManager = void 0);
const cpp_1 = require("cpp"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  Info_1 = require("../../Core/Common/Info"),
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
    if (UiManager.iVe(e, a, i)) {
      a = UiManager.BCr(e);
      if (a) {
        (a.OpenParam = i),
          (a.OpenPromise = new CustomPromise_1.CustomPromise());
        i = await Promise.all([
          UiManager.bCr.get(a.Info.Type).OpenViewAsync(a),
          a.OpenPromise.Promise,
        ]);
        if (((a.OpenPromise = void 0), i[1]))
          return (
            a.TryEmitInterruptOpExitView(),
            !0 === a.Info?.IsFullScreen
              ? cpp_1.FKuroPerfSightHelper.BeginExtTag(
                  `UiViewInFullScreen[${a.Info.Name}]`,
                )
              : !1 === a.Info?.IsFullScreen &&
                cpp_1.FKuroPerfSightHelper.BeginExtTag(
                  `UiViewInWindow[${a.Info.Name}]`,
                ),
            a.GetViewId()
          );
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            17,
            "[OpenViewAsync]打开界面失败, 界面在缓存队列中被清理",
            ["name", e],
          );
      } else
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
    var i = this.Ncr.get(e);
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
    var i = this.qCr.get(e);
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
      e.OpenPromise && e.OpenPromise.SetResult(!0),
      e.ClosePromise || (e.ClosePromise = new CustomPromise_1.CustomPromise()),
      await UiManager.bCr.get(i.Type).CloseViewAsync(e),
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
      !0 === e.Info?.IsFullScreen
        ? cpp_1.FKuroPerfSightHelper.EndExtTag(
            `UiViewInFullScreen[${e.Info.Name}]`,
          )
        : !1 === e.Info?.IsFullScreen &&
          cpp_1.FKuroPerfSightHelper.EndExtTag(
            `UiViewInWindow[${e.Info.Name}]`,
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
      : (r = UiManager.GCr(e))
        ? ((n = !!a && a?.IsMultipleView),
          UiManager.iVe(i, n, a)
            ? (((n = UiManager.BCr(i)).OpenParam = a),
              await UiManager.bCr
                .get(UiLayerType_1.ELayerType.Normal)
                .CloseAndOpenNewAsync(r, n),
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
    var i = UiManager.BCr(e);
    if (i)
      return (
        i.OnPreOpen(),
        UiManager.NCr.set(i.GetViewId(), i),
        await UiManager.bCr.get(i.Info.Type).PreOpenViewAsync(i),
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
      n = UiManager.NCr.get(e);
    return !(
      !n ||
      ((a = n.Info.Name),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          17,
          "[OpenViewAfterPreOpenedAsync](已预打开过)请求打开界面",
          ["界面名称", a],
        ),
      (r = !!i && i?.IsMultipleView),
      UiManager.iVe(a, r, i)
        ? ((n.OpenParam = i),
          (n.OpenPromise = new CustomPromise_1.CustomPromise()),
          UiManager.RemovePreOpenView(e),
          await Promise.all([
            UiManager.bCr.get(n.Info.Type).OpenViewAfterPreOpenedAsync(n),
            n.OpenPromise.Promise,
          ]),
          (n.OpenPromise = void 0))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              17,
              "[OpenViewAfterPreOpenedAsync](已预打开过)打开界面失败, 不满足界面打开条件",
              ["界面名称", a],
            ),
          1))
    );
  }
  static RemovePreOpenView(e) {
    UiManager.NCr.delete(e);
  }
  static hPn() {
    for (const e of UiManager.NCr.values())
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
    UiManager.NCr.clear();
  }
  static IsViewShow(e) {
    e = UiManager.Ncr.get(e);
    if (e)
      for (const i of e) {
        if (i.IsPreOpening) return !1;
        if (i.IsShowOrShowing) return !0;
      }
    return !1;
  }
  static IsViewOpen(e) {
    e = UiManager.Ncr.get(e);
    if (e)
      for (const i of e) {
        if (i.IsPreOpening) return !1;
        if (i.WaitToDestroy) return !1;
        if (!i.IsDestroyOrDestroying && !i.IsHideOrHiding) return !0;
      }
    return !1;
  }
  static IsViewCreating(e) {
    e = UiManager.Ncr.get(e);
    if (e) for (const i of e) if (i.IsCreating) return !0;
    return !1;
  }
  static IsViewDestroying(e) {
    e = UiManager.Ncr.get(e);
    if (e) for (const i of e) if (i.IsDestroying) return !0;
    return !1;
  }
  static IsViewHide(e) {
    e = UiManager.Ncr.get(e);
    if (e) for (const i of e) if (i.IsHideOrHiding) return !0;
    return !1;
  }
  static OCr() {
    UiManager.bCr.clear(),
      UiManager.bCr.set(
        UiLayerType_1.ELayerType.HUD,
        new UiViewSetContainer_1.UiViewSetContainer(UiModel_1.UiModel.HudMap),
      );
    var e = new UiViewStackContainer_1.UiViewStackContainer(
      UiModel_1.UiModel.NormalStack,
    );
    UiManager.bCr.set(UiLayerType_1.ELayerType.Normal, e),
      UiManager.bCr.set(UiLayerType_1.ELayerType.CG, e),
      UiManager.bCr.set(
        UiLayerType_1.ELayerType.Pop,
        new UiViewListContainer_1.UiViewListContainer(
          UiModel_1.UiModel.PopList,
        ),
      ),
      UiManager.bCr.set(
        UiLayerType_1.ELayerType.Float,
        new UiViewFloatContainer_1.UiViewFloatContainer(
          UiModel_1.UiModel.FloatQueueMap,
          UiModel_1.UiModel.ShowViewMap,
          UiModel_1.UiModel.HideViewMap,
        ),
      ),
      UiManager.bCr.set(
        UiLayerType_1.ELayerType.Guide,
        new UiViewListContainer_1.UiViewListContainer(
          UiModel_1.UiModel.GuideList,
        ),
      ),
      UiManager.bCr.set(
        UiLayerType_1.ELayerType.Loading,
        new UiViewSetContainer_1.UiViewSetContainer(
          UiModel_1.UiModel.LoadingMap,
        ),
      ),
      UiManager.bCr.set(
        UiLayerType_1.ELayerType.NetWork,
        new UiViewListContainer_1.UiViewListContainer(
          UiModel_1.UiModel.NetWorkList,
        ),
      ),
      Info_1.Info.IsBuildShipping ||
        UiManager.bCr.set(
          UiLayerType_1.ELayerType.Debug,
          new UiViewSetContainer_1.UiViewSetContainer(
            UiModel_1.UiModel.DebugMap,
          ),
        );
  }
  static dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ResetToBattleView,
      UiManager.kCr,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ExitNormalQueueState,
        UiManager.FCr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        UiManager.VCr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        UiManager.HCr,
      );
  }
  static ResetToBattleView(e) {
    UiManager.bCr.get(UiLayerType_1.ELayerType.Pop).CloseAllView(),
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
    var i = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal),
      a = UiManager.GCr(e);
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
    var i = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal);
    void 0 !== i && (await i.CloseHistoryRingViewAsync(e));
  }
  static AddTickView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[AddTickView] 添加界面Tick", [
        "name",
        e.constructor.name,
      ]),
      UiManager.jCr.add(e);
  }
  static RemoveTickView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[RemoveTickView] 移除界面Tick", [
        "name",
        e.constructor.name,
      ]),
      UiManager.jCr.delete(e);
  }
  static BCr(e) {
    var i,
      a = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (a)
      return (
        (i = new a.Ctor(a)).InitRootActorLoadInfo(),
        0 < a.CommonPopBg &&
          ((a = new UiPopFrameView_1.UiPopFrameView(a)),
          (i.ChildPopView = a),
          i.AddChild(a)),
        UiManager.WCr(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CreateViewInstance,
          i,
        ),
        i
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiCore", 17, "界面信息viewInfo获取失败", ["name", e]);
  }
  static KCr() {
    UiManager.bCr.get(UiLayerType_1.ELayerType.Float).StartWaitingNormalView();
  }
  static GCr(e) {
    e = this.Ncr.get(e);
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
        UiManager.OCr(),
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
      (UiManager.QCr = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 17, "[UIManager.UnLockOpen] 禁止打开界面");
  }
  static UnLockOpen() {
    (UiManager.QCr = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 17, "[UIManager.UnLockOpen] 恢复打开界面");
  }
  static get IsLockOpen() {
    return UiManager.QCr;
  }
  static async ClearAsync(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "[UIManager.ClearAsync] 清理UIManager 开始");
    for (var [i, a] of UiManager.bCr)
      0 < (i & UiLayerType_1.NORMAL_CONTAINER_TYPE) || a.ClearContainer(e);
    var r = [];
    for (const t of UiManager.qCr.values())
      t.Info?.IsPermanent ||
        0 < (t.Info.Type & UiLayerType_1.NORMAL_CONTAINER_TYPE) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            11,
            "[UIManager.ClearAsync] 需要等待销毁的界面-非stack容器",
            ["Name", t.constructor.name],
            ["ComponentId", t.ComponentId],
          ),
        r.push(t.DeadPromise?.Promise));
    await Promise.all(r), UiManager.hPn();
    var n = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal),
      o = (await n.BeforeClearContainerAsync(), n.ClearContainer(e), []);
    for (const g of UiManager.qCr.values())
      g.Info.IsPermanent ||
        (g.Info.Type & UiLayerType_1.NORMAL_CONTAINER_TYPE) <= 0 ||
        (e && UiModel_1.UiModel.SeamlessStackWhileList.has(g.Info.Name)) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            11,
            "[UIManager.ClearAsync] 需要等待销毁的界面-stack容器",
            ["Name", g.constructor.name],
            ["ComponentId", g.ComponentId],
          ),
        o.push(g.DeadPromise?.Promise));
    await Promise.all(o),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUiManagerClearAsync,
      ),
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
    UiManager.fbo.Start();
    for (const i of this.jCr) i.Tick(e);
    UiActorPool_1.UiActorPool.Tick(e), UiManager.fbo.Stop();
  }
  static AfterTick(e) {
    for (const i of this.jCr) i.AfterTick(e);
  }
  static iVe(e, i = !1, a = void 0) {
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
    if (UiManager.QCr)
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
    var r = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (!r)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("UiCore", 17, "[CanOpenView] 界面配置不存在", [
            "ViewName",
            e,
          ]),
        !1
      );
    var n = 0 < (r.Type & UiLayerType_1.MULTIPLE_VIEW_TYPE);
    if (!n && !i && UiManager.IsViewOpen(e))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("UiCore", 17, "[CanOpenView] 界面重复打开", [
            "ViewName",
            e,
          ]),
        !1
      );
    if (r.ScenePointTag)
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
    if (0 < r.BeObstructView.length)
      for (const o of r.BeObstructView)
        if (UiManager.IsViewShow(o))
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiCore",
                17,
                "[CanOpenView] 检测到表格配置了界面互斥",
                ["ViewName", e],
                ["ViewOpenCheck", o],
              ),
            !1
          );
    return UiManager.XCr(e, !1, a)
      ? !!UiManager.XCr(e, !0, a) ||
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
    let r = UiManager.$Cr.get(e);
    r || ((r = new Map()), UiManager.$Cr.set(e, r)), r.set(i, a);
  }
  static RemoveOpenViewCheckFunction(e, i) {
    var a = UiManager.$Cr.get(e);
    a && (a.delete(i), 0 === a.size) && UiManager.$Cr.delete(e);
  }
  static XCr(e, i = !1, a = void 0) {
    i = UiManager.$Cr.get(i ? "All" : e);
    if (i && 0 < i.size)
      for (var [r, n] of i)
        if (!r(e, a))
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiCore",
                17,
                "外部注册的OpenView检查函数不通过",
                ["viewName", e],
                ["reason", n],
              ),
            !1
          );
    return !0;
  }
  static GetViewByName(e) {
    return UiManager.GCr(e);
  }
  static GetView(e) {
    return this.qCr.get(e);
  }
  static WCr(e) {
    UiManager.qCr.set(e.GetViewId(), e);
    var i = e.Info.Name;
    let a = UiManager.Ncr.get(i);
    a || ((a = new Set()), UiManager.Ncr.set(i, a)), a.add(e);
  }
  static RemoveView(e) {
    var i,
      a = UiManager.qCr.get(e);
    a &&
      (UiManager.qCr.delete(e),
      (e = a.Info.Name),
      (i = UiManager.Ncr.get(e))) &&
      (i.delete(a), i.size || UiManager.Ncr.delete(e));
  }
  static GmClearFloatContainer() {
    UiManager.bCr.get(UiLayerType_1.ELayerType.Float).ClearContainer();
  }
}
((exports.UiManager = UiManager).Ife = 0),
  (UiManager.bCr = new Map()),
  (UiManager.$Cr = new Map()),
  (UiManager.fbo = Stats_1.Stat.Create("UiManger")),
  (UiManager.qCr = new Map()),
  (UiManager.Ncr = new Map()),
  (UiManager.jCr = new Set()),
  (UiManager.NCr = new Map()),
  (UiManager.kCr = () => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 17, "重置回到主界面"),
      UiManager.bCr.get(UiLayerType_1.ELayerType.Pop).CloseAllView(),
      UiManager.NormalResetToView("BattleView");
  }),
  (UiManager.FCr = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "退出队列状态,重置回到主界面"),
      UiManager.KCr();
  }),
  (UiManager.VCr = () => {
    (UiModel_1.UiModel.IsInMainView = !0),
      UiManager.bCr.get(UiLayerType_1.ELayerType.Float).ShowFloatTips();
  }),
  (UiManager.HCr = () => {
    (UiModel_1.UiModel.IsInMainView = !1),
      UiManager.bCr.get(UiLayerType_1.ELayerType.Float).HideFloatTips();
  }),
  (UiManager.QCr = !1);
//# sourceMappingURL=UiManager.js.map
