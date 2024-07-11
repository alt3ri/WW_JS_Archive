"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleDescribeComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
class RoleDescribeComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.cWt = 0),
      (this.SPe = void 0),
      (this.$be = void 0),
      (this.OpenRolePreview = () => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UISprite],
      [2, UE.UIHorizontalLayout],
      [5, UE.UISprite],
    ];
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.PlayLevelSequenceByName("Start"),
      (this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
        this.GetHorizontalLayout(2),
      )),
      this.GetTexture(3)?.SetUIActive(!0),
      this.GetSprite(5)?.SetUIActive(!1);
  }
  Update(e, i = !1) {
    this.cWt = e;
    var t,
      s,
      r,
      e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.cWt);
    e &&
      (this.GetText(0).ShowTextNew(e.Name),
      (t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
        e.ElementId,
      )),
      (s = this.GetTexture(3)),
      (r = this.GetSprite(4)),
      this.SetTextureByPath(t.Icon, s),
      this.SetSpriteByPath(t.GachaElementBgSpritePath, r, !1),
      this.n4e(e.QualityId),
      this.GetItem(1).SetUIActive(i));
  }
  n4e(e) {
    this.$be.RebuildLayout(e);
  }
}
exports.RoleDescribeComponent = RoleDescribeComponent;
//# sourceMappingURL=RoleDescribeComponent.js.map
