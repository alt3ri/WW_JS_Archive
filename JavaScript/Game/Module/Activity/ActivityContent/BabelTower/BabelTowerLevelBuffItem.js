"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerLevelBuffItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerLevelBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.OnClickBtnCallBack = void 0),
      (this.nqe = () => {
        this.OnClickBtnCallBack?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.nqe]]);
  }
  OnStart() {
    this.GetItem(8).SetUIActive(!1);
  }
  RefreshItem(e, i) {
    this.GetItem(1).SetUIActive(e || !i),
      this.GetItem(2).SetUIActive(!e && 0 !== i),
      e
        ? this.SetUiActive(!1)
        : (this.SetUiActive(!0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            "BabelBuffSelectTips",
          ),
          i &&
            ((e =
              ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(
                i,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.NameText),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.DesText),
            this.SetTextureByPath(e.Texture, this.GetTexture(4))));
  }
}
exports.BabelTowerLevelBuffItem = BabelTowerLevelBuffItem;
//# sourceMappingURL=BabelTowerLevelBuffItem.js.map
