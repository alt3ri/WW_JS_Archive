"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsWeaponItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  StarItem_1 = require("../../RoleUi/View/StarItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  UiComponentUtil_1 = require("../../Util/UiComponentUtil");
class TipsWeaponItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.tqt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [8, UE.UIText],
      [0, UE.UIText],
      [7, UE.UIText],
      [1, UE.UIText],
      [3, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    this.tqt = [];
    var i = [],
      t = this.GetItem(3).GetAttachUIChildren();
    for (let e = 0; e < t.Num(); e++) {
      var a = t.Get(e),
        r = new StarItem_1.StarItem();
      i.push(r.CreateThenShowByActorAsync(a.GetOwner())), this.tqt.push(r);
    }
    await Promise.all(i);
  }
  UpdateItem(e, i, t) {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(0),
      "WeaponResonanceItemLevelText",
      i,
    );
    var a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        e.ResonId,
        i,
      ),
      t =
        (this.GetText(8).SetText(t),
        a && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), a.Name),
        ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
          e,
          i,
        )),
      a =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Desc, ...t),
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
          e.BreachId,
          0,
        ));
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(2),
      "ShopWeaponLevelText",
      1,
      a.LevelLimit,
    ),
      UiComponentUtil_1.UiComponentUtil.SetStarActiveNew(
        this.tqt,
        0,
        void 0,
        !1,
      );
  }
}
exports.TipsWeaponItem = TipsWeaponItem;
//# sourceMappingURL=TipsWeaponItem.js.map
