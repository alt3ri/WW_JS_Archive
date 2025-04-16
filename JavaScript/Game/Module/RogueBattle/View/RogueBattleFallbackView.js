"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleFallbackView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class RogueBattleFallbackView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.JGn = () => {}),
      (this.mS1 = () => {
        (ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        ).OpExecuteClientId = 0),
          ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(
            this.OpenParam,
          ),
          this.CloseMe();
      }),
      (this.fS1 = () => {
        (ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        ).OpExecuteClientId = 1),
          ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(
            this.OpenParam,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.JGn],
        [2, this.mS1],
        [3, this.fS1],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam)
      .Data.by1;
    return (
      this.GetText(1).SetText(e.F2s.toString()),
      this.GetItem(4).SetUIActive(e.Ly1),
      super.OnBeforeStartAsync()
    );
  }
}
exports.RogueBattleFallbackView = RogueBattleFallbackView;
//# sourceMappingURL=RogueBattleFallbackView.js.map
