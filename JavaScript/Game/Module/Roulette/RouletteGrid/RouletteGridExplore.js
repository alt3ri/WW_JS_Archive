"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridExplore = void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RouletteController_1 = require("../RouletteController"),
  RouletteGridBase_1 = require("./RouletteGridBase"),
  RouletteGridForbiddenSettings_1 = require("./RouletteGridForbiddenSettings");
class RouletteGridExplore extends RouletteGridBase_1.RouletteGridBase {
  Init() {
    if (
      ((this.IsIconTexture = !1), (this.Data.ShowNum = !1), this.IsDataValid())
    ) {
      var e =
        ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(
          this.Data.Id,
        );
      if (!e)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            38,
            "[ExploreTools]探索轮盘探索格子对应SkillId不存在或未解锁",
            ["SkillId", this.Data.Id],
          )
        );
      this.Data.Name = e.Name;
      var t = e.Cost;
      t &&
        0 < t.size &&
        ((this.Data.ShowNum = !0),
        ([t] = t.keys()),
        (t =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t)),
        (this.Data.DataNum = t)),
        this.LoadSpriteIcon(e.Icon);
    }
    1 === this.Data.State && this.IsForbiddenState() && (this.Data.State = 0);
  }
  IsForbiddenState() {
    return RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.CheckForbiddenState(
      this.Data.GridType,
      this.Data.Id,
    );
  }
  OnSelect(e) {
    e &&
      this.IsDataValid() &&
      (0 === this.Data.State
        ? RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.TipsForbiddenState(
            this.Data.GridType,
            this.Data.Id,
          )
        : (RouletteController_1.RouletteController.ExploreSkillSetRequest(
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
          )));
  }
}
exports.RouletteGridExplore = RouletteGridExplore;
//# sourceMappingURL=RouletteGridExplore.js.map
