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
      (this.Seh = 0),
      (this.TDe = void 0),
      (this.Lie = void 0),
      (this.tWr = () => {
        this.Seh < 0 ||
          (this.Seh > TimerSystem_1.MAX_TIME
            ? ((this.Seh -= TimerSystem_1.MAX_TIME),
              (this.TDe = TimerSystem_1.TimerSystem.Delay(
                this.tWr,
                TimerSystem_1.MAX_TIME,
              )))
            : this.Seh < TimerSystem_1.MIN_TIME
              ? this.Mzo()
              : (this.TDe = TimerSystem_1.TimerSystem.Delay(
                  this.Mzo,
                  this.Seh,
                )));
      }),
      (this.Mzo = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            79,
            "高亮时间结束，玩家探索技能取消高亮",
            ["Id", this.wmo],
          ),
          this.Ezo(this.pzo);
      }),
      (this.Szo = () => {
        ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
        this.wmo
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                79,
                "切换探索技能，玩家探索技能高亮",
                ["Id", this.wmo],
              ),
            this.Wxc())
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                79,
                "切换探索技能，玩家探索技能取消高亮",
                ["Id", this.wmo],
              ),
            this.Qxc());
      }),
      (this.yzo = (e, t, i) => {
        t === this.wmo - 1001 + 210001 &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelEvent",
              79,
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
      (1013 === e && ModelManager_1.ModelManager.GameModeModel.IsMulti) ||
      ((this.wmo = e),
      (this.pzo = i ?? !1),
      (this.Seh = t * TimeUtil_1.TimeUtil.InverseMillisecond),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能高亮", [
          "Id",
          this.wmo,
        ]),
      this.Izo());
  }
  HideHighlightExploreSkill() {
    this.vzo &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能取消高亮", [
          "Id",
          this.wmo,
        ]),
      this.Ezo(this.pzo));
  }
  Wxc() {
    void 0 === this.TDe
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelEvent", 79, "高亮持续时间已经结束，不再触发高亮", [
          "Id",
          this.wmo,
        ])
      : this.Lie && !this.Lie.HasTag(this.fzo) && this.Lie.AddTag(this.fzo);
  }
  Qxc() {
    this.Lie && this.Lie.HasTag(this.fzo) && this.Lie.RemoveTag(this.fzo);
  }
  Izo() {
    (this.vzo = !0),
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(
        this.wmo,
        this.pzo ? 1 : 0,
      ) ||
        RouletteController_1.RouletteController.ExploreSkillSetRequest(
          this.wmo,
        ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelEvent", 79, "开始监听高亮事件", ["Id", this.wmo]),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.yzo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.Szo,
      ),
      this.tWr(),
      ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
        this.wmo && this.Wxc();
  }
  Ezo(t = !1) {
    if (((this.vzo = !1), this.Qxc(), t)) {
      let e = !0;
      1013 === this.wmo &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (t =
          ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
            t,
          )?.GetComponent(221))) &&
        t.IsFollowerEnable() &&
        (e = !1),
        ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1),
        e
          ? ((t =
              ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId()),
            RouletteController_1.RouletteController.ExploreSkillSetRequest(t))
          : ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(
              this.wmo,
              0,
            );
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("LevelEvent", 79, "停止监听高亮事件", ["Id", this.wmo]),
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
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
      (this.Seh = 0);
  }
}
exports.HighlightExploreSkillLogic = HighlightExploreSkillLogic;
//# sourceMappingURL=HighlightExploreSkillLogic.js.map
