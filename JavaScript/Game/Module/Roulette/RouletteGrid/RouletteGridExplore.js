"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridExplore = void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteController_1 = require("../RouletteController");
const RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridExplore extends RouletteGridBase_1.RouletteGridBase {
  Init() {
    let e, t;
    (this.IsIconTexture = !1),
      (this.Data.ShowNum = !1),
      this.IsDataValid() &&
        ((e =
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(
            this.Data.Id,
          )) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              38,
              "[ExploreTools]探索轮盘探索格子对应SkillId不存在或未解锁",
              ["SkillId", this.Data.Id],
            )),
        (this.Data.Name = e.Name),
        (t = e.Cost) &&
          t.size > 0 &&
          ((this.Data.ShowNum = !0),
          ([t] = t.keys()),
          (t =
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              t,
            )),
          (this.Data.DataNum = t)),
        this.LoadSpriteIcon(e.Icon)),
      this.Data.State === 1 && this.IsForbiddenState() && (this.Data.State = 0);
  }
  IsForbiddenState() {
    return this.Data.Id === 1001 && this.qgo();
  }
  qgo() {
    return (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        185,
      )?.HasTag(-1002623896) ?? !1
    );
  }
  OnSelect(e) {
    e &&
      this.IsDataValid() &&
      (RouletteController_1.RouletteController.ExploreSkillSetRequest(
        this.Data.Id,
        (e) => {
          e &&
            AudioSystem_1.AudioSystem.PostEvent(
              "play_ui_fx_spl_roulette_new_equip",
            );
        },
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ChangeVisionSkillByTab,
        this.Data.Id,
      ));
  }
}
exports.RouletteGridExplore = RouletteGridExplore;
// # sourceMappingURL=RouletteGridExplore.js.map
