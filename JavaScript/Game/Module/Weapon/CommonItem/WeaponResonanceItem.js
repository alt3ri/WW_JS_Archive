"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponResonanceItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeaponResonanceItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [2, UE.UIText],
      [0, UE.UIText],
      [1, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
    ];
  }
  UpdateItem(e) {
    const i = e.GetWeaponConfig();
    var a =
      (LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "WeaponResonanceItemLevelText",
        e.GetResonanceLevel(),
      ),
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        i.ResonId,
        e.GetResonanceLevel(),
      ));
    var a =
      (this.GetText(1).SetUIActive(void 0 !== a),
      this.GetText(3).SetUIActive(void 0 !== a),
      a &&
        this.GetText(3).SetText(
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(
            a.Name,
          ),
        ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        e.GetItemConfig().BgDescription,
      ),
      ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
        i,
        e.GetResonanceLevel(),
      ));
    const t =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Desc, ...a),
      i.WeaponType);
    for (const n of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
      if (t === n.Value) {
        this.SetSpriteByPath(n.Icon, this.GetSprite(4), !1);
        break;
      }
  }
}
exports.WeaponResonanceItem = WeaponResonanceItem;
// # sourceMappingURL=WeaponResonanceItem.js.map
