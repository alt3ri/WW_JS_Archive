"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkinItem = void 0);
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class VisionSkinItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments),
      (this.kHi = void 0),
      (this.A4e = void 0),
      (this.gIt = -1),
      (this.c2e = () => {
        this.kHi?.(this.gIt, this.GetItemGridExtendToggle()),
          this.SetNewFlagVisible(!1),
          ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
            this.gIt,
          ),
          ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
            LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
          );
      }),
      (this.d4e = () => !this.A4e || this.A4e(this.gIt));
  }
  OnRefresh(e, i, t) {
    this.gIt = e;
    const o = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
      e,
    );
    const a =
      !!ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e)
        .ParentMonsterId &&
      !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(e);
    var e =
      (this.Apply({
        Type: 3,
        Data: e,
        ItemConfigId: e,
        IsLockVisibleBlack: a,
        IsNewVisible: o,
        IsQualityHidden: !0,
      }),
      this.GetItemGridExtendToggle().ToggleState);
    e !== 0 && this.SetSelected(!1, !0);
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.c2e),
      this.GetItemGridExtendToggle()?.CanExecuteChange.Bind(this.d4e);
  }
  OnSelected(e) {
    this.GetItemGridExtendToggle().ToggleState !== 1 &&
      this.SetSelected(!0, !0);
  }
  SetClickToggleEvent(e) {
    this.kHi = e;
  }
  BindCanToggleExecuteChange(e) {
    this.A4e = e;
  }
}
exports.VisionSkinItem = VisionSkinItem;
// # sourceMappingURL=VisionSkinItem.js.map
