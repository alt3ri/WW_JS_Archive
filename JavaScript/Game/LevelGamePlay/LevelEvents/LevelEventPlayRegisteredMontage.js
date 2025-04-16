"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayRegisteredMontage = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayRegisteredMontage extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.gLe = void 0),
      (this.sDe = void 0),
      (this.zpe = (e, t) => {
        this.sDe === t &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelEvent",
              26,
              "实体被移除，PlayRegisteredMontaged保底结束",
              ["PbDataId", t.PbDataId],
            ),
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
    (this.gLe = e), this.CreateWaitEntityTask(e.EntityId);
  }
  ExecuteWhenEntitiesReady() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      this.gLe.EntityId,
    );
    if (t)
      if ((this.sDe = t).Entity.GetComponent(46)?.IsAiDriver)
        (s = t.Entity.GetComponent(1)),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              7,
              "当前实体正在由行为树AI驱动，请检查需求设计是否合理（播放蒙太奇动画）",
              ["PbDataId", t.PbDataId],
              ["Name", s.Owner.GetName()],
            ),
          this.FinishExecute(!0);
      else {
        let e = void 0;
        var i,
          s = (e = this.gLe.IsAbpMontage
            ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(
                this.gLe.MontageId,
              )
            : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(
                this.gLe.MontageId,
              ))?.ActionMontage;
        !StringUtils_1.StringUtils.IsEmpty(s) &&
        (i = t.Entity?.GetComponent(45))
          ? this.IsAsync
            ? (i.VolatileMontagePlayByLoad(
                2,
                s,
                void 0,
                void 0,
                this.gLe?.LoopDuration,
                this.gLe?.RepeatTimes,
              ),
              this.FinishExecute(!0))
            : (EventSystem_1.EventSystem.AddWithTarget(
                t,
                EventDefine_1.EEventName.RemoveEntity,
                this.zpe,
              ),
              i.VolatileMontagePlayByLoad(
                2,
                s,
                void 0,
                this.ej_,
                this.gLe?.LoopDuration,
                this.gLe?.RepeatTimes,
              ))
          : this.FinishExecute(!0);
      }
    else this.FinishExecute(!0);
  }
  OnReset() {
    (this.gLe = void 0), (this.sDe = void 0);
  }
}
exports.LevelEventPlayRegisteredMontage = LevelEventPlayRegisteredMontage;
//# sourceMappingURL=LevelEventPlayRegisteredMontage.js.map
