"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLoadingView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoadingViewBase_1 = require("./LoadingViewBase");
class RoleLoadingView extends LoadingViewBase_1.LoadingViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIText],
    ];
  }
  OnStart() {
    super.OnStart(), this.Ovi();
  }
  Ovi() {
    var e = ModelManager_1.ModelManager.LoadingModel?.RoleLoading;
    e &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e?.Description),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e?.CharacterName),
      this.SetTextureByPath(
        e.IllustrationAsset,
        this.GetTexture(3),
        this.Info.Name,
      ),
      ModelManager_1.ModelManager.LoadingModel?.ClearRoleLoadingInfo());
  }
  UpdateProgressRate(e) {
    this.GetSprite(0).SetFillAmount(e);
  }
  UpdateProgressValue(e) {
    this.SetTextProgressValue(1, e, "%");
  }
}
exports.RoleLoadingView = RoleLoadingView;
//# sourceMappingURL=RoleLoadingView.js.map
