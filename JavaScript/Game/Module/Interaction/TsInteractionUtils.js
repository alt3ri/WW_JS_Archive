"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsInteractionUtils = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralContextUtil_1 = require("../../LevelGamePlay/LevelGeneralContextUtil"),
  LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiConfig_1 = require("../../Ui/Define/UiConfig"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../Ui/UiManager"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  FlowController_1 = require("../Plot/Flow/FlowController");
class TsInteractionUtils {
  static GetInteractionConfig(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(8, e);
  }
  static HandleInteractionOptionFromVision(e, t, n) {
    var i, r;
    0 === e.OptionType &&
      (r = e.Type) &&
      r.Actions &&
      1 === r.Actions.length &&
      "Collect" === r.Actions[0].Name &&
      (i = EntitySystem_1.EntitySystem.GetComponent(n, 0)) &&
      (t.HandleInteractRequest(),
      (r = e.InstanceId - 1),
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityInteractOption(
        t.CreatureData.GetCreatureDataId(),
        r,
        (e) => {
          t?.HandleInteractResponse(e.O4n, e.IIs);
        },
        i.GetCreatureDataId(),
      ));
  }
  static HandleInteractionOptionNew(t, n) {
    if (this.q_i)
      n.OnInteractActionEnd && n.OnInteractActionEnd(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Interaction",
            37,
            "当前正在等待交互协议返回，无法继续发送交互请求",
          );
    else
      switch (
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DynamicInteractServerResponse,
          t.Guid,
        ),
        3 !== t.OptionType &&
          Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(
            59,
          )?.CollectSampleAndSend(!0),
        t.DelayRemove ? 3 : t.OptionType)
      ) {
        case 0:
          (this.q_i = !0), n.HandleInteractRequest();
          var e = t.InstanceId - 1;
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityInteractOption(
            n.CreatureData.GetCreatureDataId(),
            e,
            (e) => {
              (this.q_i = !1), n?.HandleInteractResponse(e.O4n, e.IIs);
            },
          );
          break;
        case 1:
          (this.q_i = !0),
            n.HandleInteractRequest(),
            LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityDynamicInteractOption(
              n.CreatureData.GetCreatureDataId(),
              t.Guid,
              (e) => {
                (this.q_i = !1),
                  n?.HandleInteractResponse(e.O4n, e.IIs),
                  t &&
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.DynamicInteractServerResponse,
                      t.Guid,
                    );
              },
            );
          break;
        case 2:
          (this.q_i = !0),
            n.HandleInteractRequest(),
            LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityRandomInteractOption(
              n.CreatureData.GetCreatureDataId(),
              t.RandomOptionIndex,
              (e) => {
                (this.q_i = !1), n?.HandleInteractResponse(e.O4n, e.IIs);
              },
            );
          break;
        case 3:
          if ("Flow" === t.Type.Type) {
            var e = t.Type,
              i = LevelGeneralContextDefine_1.EntityContext.Create(n.EntityId);
            e &&
              FlowController_1.FlowController.StartFlow(
                e.Flow.FlowListName,
                e.Flow.FlowId,
                e.Flow.StateId,
                i,
              ),
              n?.OnInteractActionEnd && n.OnInteractActionEnd();
          } else if ("Actions" === t.Type.Type) {
            n?.HandleInteractClientAction();
            let e = t.Context;
            (e = e
              ? LevelGeneralContextDefine_1.GeneralContext.Copy(e)
              : LevelGeneralContextDefine_1.EntityContext.Create(n.EntityId)),
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                t.Type.Actions,
                e,
                (e) => {
                  n?.OnInteractActionEnd && n.OnInteractActionEnd(),
                    n?.FinishInteractClientAction();
                },
              );
          }
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Interaction", 19, "未定义的交互选项类型", [
              "optionType",
              t.OptionType,
            ]);
      }
  }
  static IsInteractHintViewOpened() {
    return TsInteractionUtils.G_i;
  }
  static get IsInteractWaitOpenViewName() {
    return void 0 !== this.WaitOpenViewName;
  }
  static async OpenInteractHintView() {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Interaction", 8, "[InteractionDebug]尝试打开交互界面"),
      this.IsInteractHintViewOpened())
    )
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Interaction",
            8,
            "[InteractionDebug]尝试打开交互界面时，交互界面已经打开，直接做刷新",
          ),
        this.UpdateInteractHintView(),
        !0
      );
    if (
      UiManager_1.UiManager.IsViewOpen("InteractionHintView") ||
      UiManager_1.UiManager.IsViewCreating("InteractionHintView")
    )
      return !0;
    if (this.WaitOpenViewName)
      return (
        UiManager_1.UiManager.IsViewShow(this.WaitOpenViewName) && this.N_i(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Interaction",
            8,
            "[InteractionDebug]尝试打开交互界面时，交互在等待打开其他界面，直接返回",
            ["WaitOpenViewName", this.WaitOpenViewName],
          ),
        !1
      );
    (TsInteractionUtils.G_i = !0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Interaction",
          8,
          "[InteractionDebug]尝试打开交互界面，开始打开交互界面",
        );
    var e = await UiManager_1.UiManager.OpenViewAsync("InteractionHintView");
    return (
      (TsInteractionUtils.G_i = void 0 !== e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Interaction",
          8,
          "[InteractionDebug]尝试打开交互界面，完成打开交互界面",
          ["bSuccess", TsInteractionUtils.G_i],
        ),
      TsInteractionUtils.G_i
    );
  }
  static CloseInteractHintView() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Interaction", 8, "[InteractionDebug]尝试关闭交互界面"),
      this.IsInteractHintViewOpened()
        ? UiManager_1.UiManager.IsViewDestroying("InteractionHintView")
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Interaction",
              8,
              "[InteractionDebug]尝试关闭交互界面时，交互界面已经在关闭中",
            )
          : UiManager_1.UiManager.CloseViewAsync("InteractionHintView").then(
              () => {
                (TsInteractionUtils.G_i = !1),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Interaction",
                      8,
                      "[InteractionDebug]尝试关闭交互界面完成",
                    );
              },
              () => {},
            )
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Interaction",
            8,
            "[InteractionDebug]尝试关闭交互界面时，检测到交互界面没有打开",
          );
  }
  static RegisterWaitOpenViewName(e) {
    e
      ? this.WaitOpenViewName !== e &&
        UiConfig_1.UiConfig.TryGetViewInfo(e)?.Type ===
          UiLayerType_1.ELayerType.Normal &&
        (this.WaitOpenViewName ||
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnViewDone,
            this.O_i,
          ),
        (this.WaitOpenViewName = e),
        InputDistributeController_1.InputDistributeController.RefreshInputTag(),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.WaitOpenViewName === e &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Interaction", 37, "等待界面打开超时"),
            this.N_i());
        }, 1e4))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Interaction", 37, "等待打开的界面为 Undefined");
  }
  static Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnStartLoadingState,
      this.hMe,
    ),
      (this.q_i = !1);
  }
  static Clear() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnStartLoadingState,
      this.hMe,
    ),
      this.ClearCurrentOpenViewName();
  }
  static RegisterOpenViewName(e) {
    this.k_i ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      (this.k_i = e);
  }
  static ClearCurrentOpenViewName() {
    this.k_i &&
      ((this.k_i = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ));
  }
  static GetCurrentOpenViewName() {
    return this.k_i;
  }
  static IsInteractionOpenView() {
    return void 0 !== this.k_i;
  }
  static N_i() {
    (this.WaitOpenViewName = void 0),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewDone,
        TsInteractionUtils.O_i,
      );
  }
  static UpdateInteractHintView() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.InteractionViewUpdate,
    );
  }
  static HandleEntityInteractByServerNotify(r, a, e) {
    WaitEntityTask_1.WaitEntityTask.Create(
      a,
      (t) => {
        if (t) {
          t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
          if (t) {
            t = t.Entity.GetComponent(181);
            if (t) {
              t = t.GetInteractController();
              if (t) {
                var n = t.GetOptionByIndex(e);
                if (n)
                  if ("Actions" !== n.Type.Type)
                    Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Interaction",
                        37,
                        "[基础交互选项继续执行]实体当前交互不是行为",
                      );
                  else {
                    var i = n.Type;
                    let e = n.Context;
                    if (
                      (e = e
                        ? LevelGeneralContextDefine_1.GeneralContext.Copy(e)
                        : LevelGeneralContextDefine_1.EntityContext.Create(
                            t.EntityId,
                          )) instanceof
                      LevelGeneralContextDefine_1.EntityContext
                    ) {
                      (n = ModelManager_1.ModelManager.InteractionModel),
                        (t = e.EntityId);
                      const a =
                        ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(
                          t,
                        );
                      n.SetInteractTarget(t), n.SetInterctCreatureDataId(a);
                    }
                    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
                      i.Actions,
                      e,
                      r.q5n,
                      r.T5n,
                      r.G5n,
                      r.avs,
                    );
                  }
                else
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Interaction",
                      37,
                      "[基础交互选项继续执行]实体当前交互选项为空",
                    );
              } else
                Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Interaction",
                    37,
                    "[基础交互选项继续执行]实体交互控制器为空",
                  );
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Interaction",
                  37,
                  "[基础交互选项继续执行]实体交互组件为空",
                );
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Interaction",
                37,
                "[基础交互选项继续执行]查找不到对应实体",
              );
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Interaction",
              37,
              "[基础交互选项继续执行]等待实体超时",
            );
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleEntityDynamicInteractByServerNotify(e, t) {
    var n,
      i,
      r,
      a =
        LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
          e?.nvs,
        );
    a
      ? (t = (n =
          ModelManager_1.ModelManager.InteractionModel).GetDynamicConfig(t))
        ? "Actions" !== t.Type.Type
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Interaction",
              37,
              "[动态交互选项继续执行]动态交互选项不是行为",
            )
          : (a instanceof LevelGeneralContextDefine_1.EntityContext &&
              ((i = a.EntityId),
              (r =
                ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(
                  i,
                )),
              n.SetInteractTarget(i),
              n.SetInterctCreatureDataId(r)),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              t.Type.Actions,
              a,
              e.q5n,
              e.T5n,
              e.G5n,
              e.avs,
            ))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Interaction",
            37,
            "[动态交互选项继续执行]动态交互选项为空",
          )
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Interaction", 37, "[动态交互选项继续执行]上下文缺失");
  }
}
(exports.TsInteractionUtils = TsInteractionUtils),
  ((_a = TsInteractionUtils).k_i = void 0),
  (TsInteractionUtils.q_i = !1),
  (TsInteractionUtils.G_i = !1),
  (TsInteractionUtils.WaitOpenViewName = void 0),
  (TsInteractionUtils.IsWaitForInteractOpenViewDone = !1),
  (TsInteractionUtils.O_i = (e, t) => {
    e === TsInteractionUtils.WaitOpenViewName && TsInteractionUtils.N_i();
  }),
  (TsInteractionUtils.$Ge = (e) => {
    e === TsInteractionUtils.k_i &&
      ((_a.k_i = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        _a.$Ge,
      ));
  }),
  (TsInteractionUtils.hMe = () => {
    _a.WaitOpenViewName && _a.O_i(_a.WaitOpenViewName, void 0),
      _a.k_i && _a.$Ge(_a.k_i);
  });
//# sourceMappingURL=TsInteractionUtils.js.map
