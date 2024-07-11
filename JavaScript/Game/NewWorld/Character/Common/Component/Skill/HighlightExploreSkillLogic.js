"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HighlightExploreSkillLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RouletteController_1 = require("../../../../../Module/Roulette/RouletteController");
class HighlightExploreSkillLogic {
  constructor() {
    (this.fzo = -2028614394),
      (this.wmo = 1001),
      (this.pzo = !1),
      (this.vzo = !1),
      (this.TDe = void 0),
      (this.Lie = void 0),
      (this.Mzo = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            43,
            "高亮时间结束，玩家探索技能取消高亮",
            ["Id", this.wmo],
          ),
          this.Ezo(this.pzo);
      }),
      (this.Szo = () => {
        ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !==
          this.wmo &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelEvent",
              43,
              "切换探索技能，玩家探索技能取消高亮",
              ["Id", this.wmo],
            ),
          this.Ezo(!1));
      }),
      (this.yzo = (e, t, i) => {
        t === this.wmo - 1001 + 210001 &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelEvent",
              43,
              "使用高亮技能，玩家探索技能取消高亮",
              ["Id", this.wmo],
            ),
          this.Ezo(this.pzo));
      });
  }
  Init(e) {
    this.Lie = e;
  }
  Clear() {
    this.vzo && this.Ezo(), (this.Lie = void 0);
  }
  ShowHighlightExploreSkill(e, t, i) {
    this.vzo ||
      ((this.wmo = e),
      (this.pzo = i ?? !1),
      (e = t * TimeUtil_1.TimeUtil.InverseMillisecond),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelEvent", 43, "主动触发玩家探索技能高亮", [
          "Id",
          this.wmo,
        ]),
      this.Izo(e));
  }
  HideHighlightExploreSkill() {
    this.vzo &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelEvent", 43, "主动触发玩家探索技能取消高亮", [
          "Id",
          this.wmo,
        ]),
      this.Ezo(this.pzo));
  }
  Izo(e) {
    (this.vzo = !0),
      this.Lie && !this.Lie.HasTag(this.fzo) && this.Lie.AddTag(this.fzo),
      RouletteController_1.RouletteController.ExploreSkillSetRequest(this.wmo),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.yzo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.Szo,
      ),
      (this.TDe = TimerSystem_1.TimerSystem.Delay(this.Mzo, e));
  }
  Ezo(t = !1) {
    if (
      ((this.vzo = !1),
      this.Lie && this.Lie.HasTag(this.fzo) && this.Lie.RemoveTag(this.fzo),
      t)
    ) {
      let e = !0;
      (e =
        1013 === this.wmo &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (t =
          ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
            t,
          )?.GetComponent(204))) &&
        t.IsFollowerEnable()
          ? !1
          : e) && RouletteController_1.RouletteController.SetLastSkillId();
    }
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharUseSkill,
      this.yzo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.Szo,
      ),
      this.TDe &&
        TimerSystem_1.TimerSystem.Has(this.TDe) &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.HighlightExploreSkillLogic = HighlightExploreSkillLogic;
//# sourceMappingURL=HighlightExploreSkillLogic.js.map
