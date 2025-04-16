"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushBuffSelectInGameItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BossRushBuffSelectInGameItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ClickCallBack = void 0),
      (this.Vao = (e) => {
        this.ClickCallBack?.(1 === e ? this : void 0);
      });
  }
  SetClickCallBack(e) {
    this.ClickCallBack = e;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIText],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.Vao]]);
  }
  OnStart() {
    this.GetHorizontalLayout(3).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetSprite(7).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(10).SetUIActive(!1);
  }
  RefreshItem(e) {
    var e =
        ConfigManager_1.ConfigManager.BossRushConfig?.GetBossRushBuffConfigById(
          e,
        ),
      t = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name), []);
    for (const s of e.DescriptionParam) {
      var i = RegExp(/\[(.*?)\]/g).exec(s);
      i && 1 < i.length && t.push(...i[1].split(","));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Description, ...t),
      this.SetTextureByPath(e.Texture, this.GetTexture(1));
  }
  SetToggleUnCheck() {
    this.GetExtendToggle(5).SetToggleState(0);
  }
}
exports.BossRushBuffSelectInGameItem = BossRushBuffSelectInGameItem;
//# sourceMappingURL=BossRushBuffSelectInGameItem.js.map
