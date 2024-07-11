"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleDescribeComponent = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
class RoleDescribeComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.cjt = 0),
      (this.EPe = void 0),
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
    (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.EPe.PlayLevelSequenceByName("Start"),
      (this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
        this.GetHorizontalLayout(2),
      )),
      this.GetTexture(3)?.SetUIActive(!0),
      this.GetSprite(5)?.SetUIActive(!1);
  }
  Update(e, i = !1) {
    this.cjt = e;
    let t;
    let s;
    let r;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.cjt);
    e &&
      (this.GetText(0).ShowTextNew(e.Name),
      (t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
        e.ElementId,
      )),
      (s = this.GetTexture(3)),
      (r = this.GetSprite(4)),
      this.SetTextureByPath(t.Icon, s),
      this.SetSpriteByPath(t.GachaElementBgSpritePath, r, !1),
      this.HFe(e.QualityId),
      this.GetItem(1).SetUIActive(i));
  }
  HFe(e) {
    this.$be.RebuildLayout(e);
  }
}
exports.RoleDescribeComponent = RoleDescribeComponent;
// # sourceMappingURL=RoleDescribeComponent.js.map
