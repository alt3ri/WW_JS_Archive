"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkinItem = void 0);
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class VisionSkinItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments),
      (this.Nji = void 0),
      (this.W5e = void 0),
      (this.ETt = -1),
      (this.RFe = () => {
        this.Nji?.(this.ETt, this.GetItemGridExtendToggle()),
          this.SetNewFlagVisible(!1),
          ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
            this.ETt,
          ),
          ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
            LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
          );
      }),
      (this.A5e = () => !this.W5e || this.W5e(this.ETt));
  }
  OnRefresh(e, i, t) {
    this.ETt = e;
    var o = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
        e,
      ),
      a =
        !!ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
          e,
        ).ParentMonsterId &&
        !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(e),
      e =
        (this.Apply({
          Type: 3,
          Data: e,
          ItemConfigId: e,
          IsLockVisibleBlack: a,
          IsNewVisible: o,
          IsQualityHidden: !0,
        }),
        this.GetItemGridExtendToggle().ToggleState);
    0 !== e && this.SetSelected(!1, !0);
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.RFe),
      this.GetItemGridExtendToggle()?.CanExecuteChange.Bind(this.A5e);
  }
  OnSelected(e) {
    1 !== this.GetItemGridExtendToggle().ToggleState &&
      this.SetSelected(!0, !0);
  }
  SetClickToggleEvent(e) {
    this.Nji = e;
  }
  BindCanToggleExecuteChange(e) {
    this.W5e = e;
  }
}
exports.VisionSkinItem = VisionSkinItem;
//# sourceMappingURL=VisionSkinItem.js.map
