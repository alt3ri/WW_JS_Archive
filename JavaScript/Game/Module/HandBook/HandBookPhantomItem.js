"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookPhantomItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  HandBookCommonItem_1 = require("../HandBook/HandBookCommonItem"),
  HandBookDefine_1 = require("../HandBook/HandBookDefine");
class HandBookPhantomItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.jZt = void 0),
      (this.kzt = void 0),
      (this.Gzt = void 0),
      (this.Ozt = (e) => {
        this.Gzt && this.Gzt(this.kzt, 0);
      });
  }
  Initialize(e, o) {
    (this.kzt = e), o && this.CreateThenShowByActor(o.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    (this.jZt = new HandBookCommonItem_1.HandBookCommonItem()),
      this.jZt.Initialize(this.GetItem(0).GetOwner());
    var e = this.kzt.Config,
      o = new HandBookDefine_1.HandBookCommonItemData(),
      i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
        1,
        e.MonsterId,
      ),
      t = void 0 === i,
      i = void 0 !== i && !i.IsRead,
      i =
        ((o.Icon = e.Icon),
        (o.IsLock = t),
        (o.IsNew = i),
        this.jZt.Refresh(o, !1, 0),
        this.jZt.BindOnExtendToggleClicked(this.Ozt),
        this.jZt.SetNewFlagVisible(!1),
        this.GetText(1));
    this.GetText(3).SetUIActive(!1),
      t
        ? ((o =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "Unknown",
            )),
          i.ShowTextNew(o))
        : i.ShowTextNew(e.MonsterName);
  }
  BindToggleCallback(e) {
    this.Gzt = e;
  }
  SetToggleStateForce(e, o = 0) {
    this.jZt.SetSelected(1 === e);
  }
  OnSelected(e) {
    this.jZt.OnSelected(e);
  }
  OnBeforeDestroy() {
    (this.jZt = void 0), (this.kzt = void 0), (this.Gzt = void 0);
  }
}
exports.HandBookPhantomItem = HandBookPhantomItem;
//# sourceMappingURL=HandBookPhantomItem.js.map
