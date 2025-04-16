"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigMarkItemView = void 0);
const UE = require("ue"),
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
      (this.CRi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  async PlayUnlockSequence() {
    if ((await this.LoadingPromise, !this.dRi)) {
      var i = await this.LoadPrefabAsync(
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "UiItem_Mark_Prefab_Effect",
        ),
        this.RootItem,
      );
      this.dRi = i.GetComponentByClass(UE.UIItem.StaticClass());
      let e = i.GetComponentByClass(UE.UINiagara.StaticClass());
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
  OnIconPathChanged(e) {
    var i;
    this.IsViewReady &&
      ((i = this.GetSprite(1)),
      this.LoadIcon(i, e),
      this.MarkItemChildIconHandle.Update(),
      this.MarkItemChildIconHandle.ApplyModified());
  }
  UpdateIcon() {
    var e = this.Holder.IconPath;
    this.OnIconPathChanged(e);
  }
}
exports.ConfigMarkItemView = ConfigMarkItemView;
//# sourceMappingURL=ConfigMarkItemView.js.map
