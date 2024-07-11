"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundLordItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LordGymController_1 = require("../../LordGym/LordGymController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundLordItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.GetText(3)?.SetUIActive(!1);
  }
  Update(e) {
    if (e.Type !== 0) {
      const r = e.Conf;
      var t = this.GetText(0);
      var t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(t, r.Name), this.GetTexture(1));
      if (e.IsLock) this.SetTextureByPath(r.LockBigIcon, t);
      else {
        this.SetTextureByPath(r.BigIcon, t);
        const i = r.AdditionalId;
        LordGymController_1.LordGymController.LordGymInfoRequest().finally(
          () => {
            const e =
              ModelManager_1.ModelManager.LordGymModel?.GetLordGymEntranceFinish(
                i,
              );
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(2),
              "LordGymDifficulty",
              e ?? "0/0",
            );
          },
        );
      }
    }
  }
}
exports.NewSoundLordItem = NewSoundLordItem;
// # sourceMappingURL=NewSoundLordItem.js.map
