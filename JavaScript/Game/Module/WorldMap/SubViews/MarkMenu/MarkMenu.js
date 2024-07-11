"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkMenu = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  MarkMenuItem_1 = require("./MarkMenuItem");
class MarkMenu extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments), (this.Yko = void 0);
  }
  GetResourceId() {
    return "UiItem_MarkList_Prefab";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Close]]);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.Yko = [];
    for (const r of e) {
      var t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(2));
      const n = new MarkMenuItem_1.MarkMenuItem();
      n.Init(t, r).finally(() => {
        n.SetOnClick((e) => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MarkMenuClickItem,
            r,
          );
        }),
          this.Yko.push(n),
          this.RootItem.SetUIActive(!0);
      });
    }
  }
  OnCloseWorldMapSecondaryUi() {
    for (const e of this.Yko) e.Destroy();
  }
  GetNeedBgItem() {
    return !1;
  }
}
exports.MarkMenu = MarkMenu;
//# sourceMappingURL=MarkMenu.js.map
