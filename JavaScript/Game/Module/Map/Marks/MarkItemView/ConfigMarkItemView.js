"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigMarkItemView = void 0);
const UE = require("ue"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  MarkItemView_1 = require("./MarkItemView");
class ConfigMarkItemView extends MarkItemView_1.MarkItemView {
  constructor(e) {
    super(e),
      (this.MarkConfig = void 0),
      (this.dRi = void 0),
      (this.CRi = void 0),
      (this.MarkConfig = e.MarkConfig);
  }
  OnInitialize() {
    super.OnInitialize(),
      this.RootItem.SetAnchorOffset(
        Vector2D_1.Vector2D.Create(
          this.Holder.UiPosition.X,
          this.Holder.UiPosition.Y,
        ).ToUeVector2D(!0),
      ),
      (this.CRi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnIconPathChanged(e) {
    var t = this.GetSprite(1);
    this.GetSprite(1).SetUIActive(!0), this.LoadIcon(t, e);
  }
  async PlayUnlockSequence() {
    if ((await this.LoadingPromise, !this.dRi)) {
      var t = await this.LoadPrefabAsync(
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "UiItem_Mark_Prefab_Effect",
        ),
        this.RootItem,
      );
      this.dRi = t.GetComponentByClass(UE.UIItem.StaticClass());
      let e = t.GetComponentByClass(UE.UINiagara.StaticClass());
      (e =
        e ||
        this.dRi
          .GetAttachUIChild(0)
          ?.GetOwner()
          ?.GetComponentByClass(UE.UINiagara.StaticClass())) &&
        (2 === this.Holder?.MapType
          ? (e.bAdaptPosAndSizeChanged = !1)
          : (e.bAdaptPosAndSizeChanged = !0));
    }
    this.CRi.PlayLevelSequenceByName("Start");
  }
  OnBeforeDestroy() {
    this.dRi &&
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.dRi.GetOwner(), !0),
      super.OnBeforeDestroy();
  }
}
exports.ConfigMarkItemView = ConfigMarkItemView;
//# sourceMappingURL=ConfigMarkItemView.js.map
