"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LandscapeMarkView = void 0);
const UE = require("ue"),
  MarkEffectByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MarkEffectByMarkId"),
  MarkItemView_1 = require("./MarkItemView");
class LandscapeMarkView extends MarkItemView_1.MarkItemView {
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
      (this.gRi = e.GetComponentByClass(UE.UIItem.StaticClass())));
  }
  OnBeforeDestroy() {
    this.gRi &&
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.gRi.GetOwner(), !0),
      super.OnBeforeDestroy();
  }
}
exports.LandscapeMarkView = LandscapeMarkView;
//# sourceMappingURL=MapLandscapeView.js.map
