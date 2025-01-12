"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsCharacterComponent = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent");
class ItemTipsCharacterComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(e) {
    super(e),
      (this.Pe = void 0),
      this.CreateThenShowByResourceIdAsync("UiItem_TipsRole", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetItem(3).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.Pe &&
      ((this.Pe = void 0),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
  }
  Refresh(i) {
    var e = () => {
      (this.Pe = i),
        ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(i);
      var e = i.GetElementConfig(),
        t = this.GetTexture(1);
      this.SetElementIcon(e.Icon, t, e.Id),
        t.SetColor(UE.Color.FromHex(e.ElementColor)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          i.GetRoleIntroduction(),
        );
    };
    this.InAsyncLoading() ? this.OperationMap.set("Refresh", e) : e();
  }
}
exports.ItemTipsCharacterComponent = ItemTipsCharacterComponent;
//# sourceMappingURL=ItemTipsCharacterComponent.js.map
