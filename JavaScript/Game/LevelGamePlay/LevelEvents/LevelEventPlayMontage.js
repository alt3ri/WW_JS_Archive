"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayMontage = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  DEFAULT_WAIT_ENTITY_TIMEOUT = 1e4;
class LevelEventPlayMontage extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.E0 = 0),
      (this.sDe = void 0),
      (this.gLe = void 0),
      (this.zpe = (e, t) => {
        this.sDe === t &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("LevelEvent", 26, "实体被移除,PlayMontage保底结束", [
              "PbDataId",
              t.PbDataId,
            ]),
          EventSystem_1.EventSystem.HasWithTarget(
            this.sDe,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.sDe,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ),
          this.FinishExecute(!0));
      }),
      (this.ej_ = () => {
        EventSystem_1.EventSystem.HasWithTarget(
          this.sDe,
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.sDe,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ),
          this.FinishExecute(!0);
      });
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, t) {
    if (e)
      if (
        "Normal" !== e.ActionMontage.MontageType ||
        StringUtils_1.StringUtils.IsEmpty(e.ActionMontage.Path)
      )
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            50,
            "[LevelEventPlayMontage]蒙太奇类型错误或路径为空",
            ["MontageType", e.ActionMontage.MontageType],
            ["Path", e.ActionMontage.Path],
          ),
          this.FinishExecute(!1);
      else {
        if (
          ((this.E0 = e.EntityId), (this.gLe = e), !this.E0 && 1 === t.Type)
        ) {
          e = EntitySystem_1.EntitySystem.Get(t.EntityId ?? 0)
            ?.GetComponent(1)
            ?.CreatureData.GetPbDataId();
          if (!e)
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelEvent",
                  50,
                  "[LevelEventPlayMontage] 无法从行为上下文中获取PbDataId",
                  ["EntityId", t.EntityId],
                ),
              void this.FinishExecute(!1)
            );
          this.E0 = e;
        }
        this.E0
          ? ((this.sDe =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                this.E0,
              )),
            this.sDe?.Entity?.IsInit
              ? this.zCa()
              : WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
                  "LevelEventPlayMontage.ExecuteNew",
                  this.E0,
                  (e) => {
                    e
                      ? this.zCa()
                      : (Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "Event",
                            50,
                            "[LevelEventPlayMontage] 等待实体加载超时",
                            ["PbDataId", this.E0],
                            ["Timeout", DEFAULT_WAIT_ENTITY_TIMEOUT],
                          ),
                        this.FinishExecute(!1));
                  },
                  DEFAULT_WAIT_ENTITY_TIMEOUT,
                  !1,
                ))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                50,
                "[LevelEventPlayMontage] 无法获取执行Montage的实体",
                ["PbDataId", this.E0],
              ),
            this.FinishExecute(!1));
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          50,
          "[LevelEventPlayMontage]关卡事件参数为空",
        ),
        this.FinishExecute(!1);
  }
  zCa() {
    var e, t;
    (this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      this.E0,
    )),
      this.sDe?.Valid
        ? this.sDe.Entity.GetComponent(46)?.IsAiDriver
          ? ((e = this.sDe.Entity.GetComponent(1)),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                7,
                "当前实体正在由行为树AI驱动，请检查需求设计是否合理（播放蒙太奇动画）",
                ["PbDataId", this.E0],
                ["Name", e.Owner.GetName()],
              ),
            this.FinishExecute(!0))
          : (e = this.sDe.Entity?.GetComponent(45))
            ? ((t =
                void 0 === this.gLe.Duration ||
                (0 <= this.gLe.Duration &&
                  this.gLe.Duration < TimerSystem_1.MIN_TIME)),
              this.IsAsync
                ? (e.PlayPerformMontage(2, {
                    MontagePath: this.gLe.ActionMontage.Path,
                    IsLoop: !t,
                    Duration: this.gLe.Duration,
                  }),
                  this.FinishExecute(!0))
                : (EventSystem_1.EventSystem.AddWithTarget(
                    this.sDe,
                    EventDefine_1.EEventName.RemoveEntity,
                    this.zpe,
                  ),
                  e.PlayPerformMontage(2, {
                    MontagePath: this.gLe.ActionMontage.Path,
                    IsLoop: !t,
                    Duration: this.gLe.Duration,
                    OnEndCallback: this.ej_,
                  })))
            : this.FinishExecute(!0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 50, "播放蒙太奇时找不到Entity", [
              "PbDataId",
              this.E0,
            ]),
          this.FinishExecute(!1));
  }
}
exports.LevelEventPlayMontage = LevelEventPlayMontage;
//# sourceMappingURL=LevelEventPlayMontage.js.map
