"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LandscapeMarkItemView = void 0);
const UE = require("ue"),
  MarkEffectByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MarkEffectByMarkId"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class LandscapeMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e), (this.gRi = void 0);
  }
  OnInitialize() {
    super.OnInitialize(), this.fRi();
  }
  GetInteractiveFlag() {
    return !1;
  }
  async fRi() {
    var e = MarkEffectByMarkId_1.configMarkEffectByMarkId.GetConfig(
      this.Holder.MarkId,
    );
    e &&
      ((e = await this.LoadPrefabAsync(e.EffectResourcePath, this.RootItem)),
      (this.gRi = e.GetComponentByClass(UE.UIItem.StaticClass())),
      (e = e.GetComponentByClass(UE.UINiagara.StaticClass())),
      2 === this.Holder?.MapType
        ? (e.bAdaptPosAndSizeChanged = !1)
        : (e.bAdaptPosAndSizeChanged = !0));
  }
  OnBeforeDestroy() {
    this.gRi &&
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.gRi.GetOwner(), !0),
      super.OnBeforeDestroy();
  }
  SetScale(e) {}
}
exports.LandscapeMarkItemView = LandscapeMarkItemView;
//# sourceMappingURL=LandscapeMarkItemView.js.map
