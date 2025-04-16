"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridExplore = void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RouletteController_1 = require("../RouletteController"),
  RouletteGridBase_1 = require("./RouletteGridBase"),
  RouletteGridForbiddenSettings_1 = require("./RouletteGridForbiddenSettings");
class RouletteGridExplore extends RouletteGridBase_1.RouletteGridBase {
  async Init() {
    var e, t;
    (this.IsIconTexture = !1),
      (this.Data.ShowNum = !1),
      this.IsDataValid() &&
        ((e =
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(
            this.Data.Id,
          ))
          ? ((this.Data.Name = e.Name),
            (t = e.Cost) &&
              0 < t.size &&
              ((this.Data.ShowNum = !0),
              ([t] = t.keys()),
              (t =
                ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                  t,
                )),
              (this.Data.DataNum = t)),
            await this.LoadSpriteIcon(e.Icon))
          : ((this.Data.Name = "Fishing_SkillUnlock"),
            (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_RouletteGridLock",
            )),
            await this.LoadSpriteIcon(t)));
  }
  OnSelect(e) {
    e &&
      this.IsDataValid() &&
      (0 === this.Data.State
        ? RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.TipsForbiddenState(
            this.Data.GridType,
            this.Data.Id,
          )
        : 5 === this.Data.State
          ? RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.TipsLockState(
              this.Data.GridType,
              this.Data.Id,
            )
          : ((e = this.Data.Id),
            ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e),
            RouletteController_1.RouletteController.ExploreSkillSetRequest(
              e,
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
