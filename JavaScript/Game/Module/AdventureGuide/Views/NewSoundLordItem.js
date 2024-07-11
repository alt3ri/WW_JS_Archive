"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundLordItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LordGymController_1 = require("../../LordGym/LordGymController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
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
    if (0 !== e.Type) {
      var r = e.Conf,
        t = this.GetText(0),
        t =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(t, r.Name), this.GetTexture(1));
      if (e.IsLock) this.SetTextureByPath(r.LockBigIcon, t);
      else {
        this.SetTextureByPath(r.BigIcon, t);
        const i = r.AdditionalId;
        LordGymController_1.LordGymController.LordGymInfoRequest().finally(
          () => {
            var e =
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
//# sourceMappingURL=NewSoundLordItem.js.map
