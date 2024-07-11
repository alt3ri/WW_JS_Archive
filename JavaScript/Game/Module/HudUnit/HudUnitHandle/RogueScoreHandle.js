"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueScoreHandle = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RogueScoreUnit_1 = require("../HudUnit/RogueScoreUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class RogueScoreHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.JIn = void 0),
      (this.zIn = !1),
      (this.IIn = 0),
      (this.gBn = 0),
      (this.fBn = void 0),
      (this.CBn = void 0),
      (this.pBn = void 0),
      (this.vBn = void 0),
      (this.oTn = (t, i) => {
        if (this.zIn) {
          t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t);
          if (t && 1 === t.Type) {
            t = t.LevelGroupId;
            if (
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  18,
                  "肉鸽战斗评分变化",
                  ["scoreActionId", t],
                  ["score", i],
                ),
              this.gBn !== t &&
                ((this.gBn = t),
                (this.fBn =
                  ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(
                    t,
                  )),
                this.rTn()),
              this.fBn && 0 !== this.fBn.length)
            ) {
              if (((this.IIn = i), this.IIn < this.pBn.LowerUpperLimits[0]))
                this.CBn = void 0;
              else if (this.IIn >= this.vBn.LowerUpperLimits[1])
                this.CBn = this.vBn;
              else {
                this.CBn = void 0;
                for (const s of this.fBn) {
                  var e = s.LowerUpperLimits;
                  if (!(e.length < 2) && this.IIn >= e[0] && this.IIn < e[1]) {
                    this.CBn = s;
                    break;
                  }
                }
              }
              !this.CBn && this.JIn
                ? this.nTn()
                : this.TryActivateRogueScoreUnit();
            }
          }
        }
      });
  }
  OnInitialize() {
    if (
      ((this.zIn =
        ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() ||
        1 === ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      this.zIn)
    )
      for (var [
        t,
        i,
      ] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap())
        0 < i && this.oTn(t, i);
  }
  OnDestroyed() {
    (this.zIn = !1), this.sTn();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleScoreChanged,
      this.oTn,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleScoreChanged,
      this.oTn,
    );
  }
  rTn() {
    if (((this.pBn = void 0), (this.vBn = void 0), this.fBn)) {
      let t = MathUtils_1.MathUtils.Int32Max,
        i = 0;
      for (const s of this.fBn) {
        var e = s.Level;
        t > e && ((t = e), (this.pBn = s)), i < e && ((i = e), (this.vBn = s));
      }
    }
  }
  TryActivateRogueScoreUnit() {
    this.JIn
      ? (this.JIn?.SetVisible(!0), this.nTn())
      : (this.JIn = this.NewHudUnitWithReturn(
          RogueScoreUnit_1.RogueScoreUnit,
          "UiItem_RogueScore",
          !1,
          () => {
            this.JIn?.SetVisible(void 0 !== this.CBn), this.nTn();
          },
          !0,
        ));
  }
  nTn() {
    this.JIn?.UpdateScore(this.IIn, this.CBn);
  }
  sTn() {
    this.JIn && (this.DestroyHudUnit(this.JIn), (this.JIn = void 0));
  }
}
exports.RogueScoreHandle = RogueScoreHandle;
//# sourceMappingURL=RogueScoreHandle.js.map
