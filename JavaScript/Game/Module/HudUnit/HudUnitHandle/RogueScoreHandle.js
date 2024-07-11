"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueScoreHandle = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RogueScoreUnit_1 = require("../HudUnit/RogueScoreUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class RogueScoreHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Byn = void 0),
      (this.byn = !1),
      (this.ayn = 0),
      (this.Gxn = 0),
      (this.Oxn = void 0),
      (this.qxn = void 0),
      (this.Nxn = void 0),
      (this.kxn = void 0),
      (this.kyn = (t, i) => {
        if (this.byn) {
          t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t);
          if (t && t.Type === 1) {
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
              this.Gxn !== t &&
                ((this.Gxn = t),
                (this.Oxn =
                  ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(
                    t,
                  )),
                this.Fyn()),
              this.Oxn && this.Oxn.length !== 0)
            ) {
              if (((this.ayn = i), this.ayn < this.Nxn.LowerUpperLimits[0]))
                this.qxn = void 0;
              else if (this.ayn >= this.kxn.LowerUpperLimits[1])
                this.qxn = this.kxn;
              else {
                this.qxn = void 0;
                for (const s of this.Oxn) {
                  const e = s.LowerUpperLimits;
                  if (!(e.length < 2) && this.ayn >= e[0] && this.ayn < e[1]) {
                    this.qxn = s;
                    break;
                  }
                }
              }
              !this.qxn && this.Byn
                ? this.Vyn()
                : this.TryActivateRogueScoreUnit();
            }
          }
        }
      });
  }
  OnInitialize() {
    if (
      ((this.byn =
        ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() ||
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === 1),
      this.byn)
    )
      for (const [
        t,
        i,
      ] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap())
        i > 0 && this.kyn(t, i);
  }
  OnDestroyed() {
    (this.byn = !1), this.Hyn();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleScoreChanged,
      this.kyn,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleScoreChanged,
      this.kyn,
    );
  }
  Fyn() {
    if (((this.Nxn = void 0), (this.kxn = void 0), this.Oxn)) {
      let t = MathUtils_1.MathUtils.Int32Max;
      let i = 0;
      for (const s of this.Oxn) {
        const e = s.Level;
        t > e && ((t = e), (this.Nxn = s)), i < e && ((i = e), (this.kxn = s));
      }
    }
  }
  TryActivateRogueScoreUnit() {
    this.Byn
      ? (this.Byn?.SetVisible(!0), this.Vyn())
      : (this.Byn = this.NewHudUnitWithReturn(
          RogueScoreUnit_1.RogueScoreUnit,
          "UiItem_RogueScore",
          !1,
          () => {
            this.Byn?.SetVisible(void 0 !== this.qxn), this.Vyn();
          },
        ));
  }
  Vyn() {
    this.Byn?.UpdateScore(this.ayn, this.qxn);
  }
  Hyn() {
    this.Byn && (this.DestroyHudUnit(this.Byn), (this.Byn = void 0));
  }
}
exports.RogueScoreHandle = RogueScoreHandle;
// # sourceMappingURL=RogueScoreHandle.js.map
