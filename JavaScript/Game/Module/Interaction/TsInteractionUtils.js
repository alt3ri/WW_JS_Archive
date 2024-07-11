"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsInteractionUtils = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralContextUtil_1 = require("../../LevelGamePlay/LevelGeneralContextUtil");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiConfig_1 = require("../../Ui/Define/UiConfig");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../Ui/UiManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
class TsInteractionUtils {
  static GetInteractionConfig(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(8, e);
  }
  static HandleInteractionOptionFromVision(e, t, n) {
    let i, r;
    e.OptionType === 0 &&
      (r = e.Type) &&
      r.Actions &&
      r.Actions.length === 1 &&
      r.Actions[0].Name === "Collect" &&
      (i = EntitySystem_1.EntitySystem.GetComponent(n, 0)) &&
      (t.HandleInteractRequest(),
      (r = e.InstanceId - 1),
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityInteractOption(
        t.CreatureData.GetCreatureDataId(),
        r,
        (e) => {
          t?.HandleInteractResponse(e.lkn, e.hMs);
        },
        i.GetCreatureDataId(),
      ));
  }
  static HandleInteractionOptionNew(t, n) {
    if (this.q1i)
      n.OnInteractActionEnd && n.OnInteractActionEnd(),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
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
        t.OptionType !== 3 &&
          Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(
            57,
          )?.CollectSampleAndSend(!0),
        t.OptionType)
      ) {
        case 0:
          (this.q1i = !0), n.HandleInteractRequest();
          var e = t.InstanceId - 1;
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityInteractOption(
            n.CreatureData.GetCreatureDataId(),
            e,
            (e) => {
              (this.q1i = !1), n?.HandleInteractResponse(e.lkn, e.hMs);
            },
          );
          break;
        case 1:
          (this.q1i = !0),
            n.HandleInteractRequest(),
            LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityDynamicInteractOption(
              n.CreatureData.GetCreatureDataId(),
              t.Guid,
              (e) => {
                (this.q1i = !1),
                  n?.HandleInteractResponse(e.lkn, e.hMs),
                  t &&
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.DynamicInteractServerResponse,
                      t.Guid,
                    );
              },
            );
          break;
        case 2:
          (this.q1i = !0),
            n.HandleInteractRequest(),
            LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityRandomInteractOption(
              n.CreatureData.GetCreatureDataId(),
              t.RandomOptionIndex,
              (e) => {
                (this.q1i = !1), n?.HandleInteractResponse(e.lkn, e.hMs);
              },
            );
          break;
        case 3:
          if (t.Type.Type === "Flow")
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Plot", 18, "交互触发剧情必须由服务端下发"),
              n?.OnInteractActionEnd && n.OnInteractActionEnd();
          else if (t.Type.Type === "Actions") {
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
    return TsInteractionUtils.G1i;
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
        UiManager_1.UiManager.IsViewShow(this.WaitOpenViewName) && this.N1i(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Interaction",
            8,
            "[InteractionDebug]尝试打开交互界面时，交互在等待打开其他界面，直接返回",
            ["WaitOpenViewName", this.WaitOpenViewName],
          ),
        !1
      );
    (TsInteractionUtils.G1i = !0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Interaction",
          8,
          "[InteractionDebug]尝试打开交互界面，开始打开交互界面",
        );
    const e = await UiManager_1.UiManager.OpenViewAsync("InteractionHintView");
    return (
      (TsInteractionUtils.G1i = void 0 !== e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Interaction",
          8,
          "[InteractionDebug]尝试打开交互界面，完成打开交互界面",
          ["bSuccess", TsInteractionUtils.G1i],
        ),
      TsInteractionUtils.G1i
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
                (TsInteractionUtils.G1i = !1),
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
            this.O1i,
          ),
        (this.WaitOpenViewName = e),
        InputDistributeController_1.InputDistributeController.RefreshInputTag(),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.WaitOpenViewName === e &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Interaction", 37, "等待界面打开超时"),
            this.N1i());
        }, 1e4))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Interaction", 37, "等待打开的界面为 Undefined");
  }
  static Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnStartLoadingState,
      this.hMe,
    ),
      (this.q1i = !1);
  }
  static Clear() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnStartLoadingState,
      this.hMe,
    ),
      this.ClearCurrentOpenViewName();
  }
  static RegisterOpenViewName(e) {
    this.k1i ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      (this.k1i = e);
  }
  static ClearCurrentOpenViewName() {
    this.k1i &&
      ((this.k1i = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ));
  }
  static GetCurrentOpenViewName() {
    return this.k1i;
  }
  static IsInteractionOpenView() {
    return void 0 !== this.k1i;
  }
  static N1i() {
    (this.WaitOpenViewName = void 0),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewDone,
        TsInteractionUtils.O1i,
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
            t = t.Entity.GetComponent(178);
            if (t) {
              t = t.GetInteractController();
              if (t) {
                let n = t.GetOptionByIndex(e);
                if (n)
                  if (n.Type.Type !== "Actions")
                    Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Interaction",
                        37,
                        "[基础交互选项继续执行]实体当前交互不是行为",
                      );
                  else {
                    const i = n.Type;
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
                      r.aFn,
                      r.Ykn,
                      r.hFn,
                      r.Wms,
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
    let n;
    let i;
    let r;
    const a =
      LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
        e?.Hms,
      );
    a
      ? (t = (n =
          ModelManager_1.ModelManager.InteractionModel).GetDynamicConfig(t))
        ? t.Type.Type !== "Actions"
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
              e.aFn,
              e.Ykn,
              e.hFn,
              e.Wms,
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
  ((_a = TsInteractionUtils).k1i = void 0),
  (TsInteractionUtils.q1i = !1),
  (TsInteractionUtils.G1i = !1),
  (TsInteractionUtils.WaitOpenViewName = void 0),
  (TsInteractionUtils.IsWaitForInteractOpenViewDone = !1),
  (TsInteractionUtils.O1i = (e, t) => {
    e === TsInteractionUtils.WaitOpenViewName && TsInteractionUtils.N1i();
  }),
  (TsInteractionUtils.$Ge = (e) => {
    e === TsInteractionUtils.k1i &&
      ((_a.k1i = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        _a.$Ge,
      ));
  }),
  (TsInteractionUtils.hMe = () => {
    _a.WaitOpenViewName && _a.O1i(_a.WaitOpenViewName, void 0),
      _a.k1i && _a.$Ge(_a.k1i);
  });
// # sourceMappingURL=TsInteractionUtils.js.map
