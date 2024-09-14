"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundBoxMarkItemView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class SoundBoxMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e), (this.GRi = void 0), (this.zbn = !1);
  }
  async OnCreateAsync() {
    var e, t;
    !this.GRi &&
      ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_Mark_Radar_Effect",
      )),
      (e = await this.LoadPrefabAsync(e)),
      (this.GRi = e.GetComponentByClass(UE.UIItem.StaticClass())),
      (e = 2 === this.Holder.MapType),
      (t = this.GRi.GetChildComponent(0))) &&
      ((t.bAdaptPosAndSizeChanged = e), (t.bResetNiagara = !0));
  }
  OnInitialize() {
    super.OnInitialize(),
      this.OnIconPathChanged(this.Holder.IconPath),
      this.GRi?.SetUIParent(this.GetRootItem());
  }
  OnSafeUpdate(e, t, r) {
    var i = this.Holder.GetSoundBoxEntityId();
    i &&
      ((i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)),
      this.SwitchSleepState(void 0 === i));
  }
  SwitchSleepState(e) {
    this.zbn !== e &&
      ((this.zbn = e)
        ? (this.SetSpriteByPath(
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              e ? "SP_MarkSleep" : "SP_MarkNormal",
            ),
            this.GetSprite(2),
            !1,
          ),
          this.GetSprite(2).SetUIActive(!0))
        : this.GetSprite(2).SetUIActive(!1));
  }
  GetInteractiveFlag() {
    return !1;
  }
  OnBeforeDestroy() {
    this.GRi &&
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.GRi.GetOwner(), !0),
      (this.GRi = void 0),
      super.OnBeforeDestroy();
  }
}
exports.SoundBoxMarkItemView = SoundBoxMarkItemView;
//# sourceMappingURL=SoundBoxMarkItemView.js.map
