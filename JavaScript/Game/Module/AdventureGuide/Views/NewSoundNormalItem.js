"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundNormalItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  NewSoundNormaPhantomItem_1 = require("./NewSoundNormaPhantomItem");
class NewSoundNormalItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.B8e = void 0),
      (this.b8e = () =>
        new NewSoundNormaPhantomItem_1.NewSoundNormaPhantomItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
    ];
  }
  OnStart() {
    this.B8e = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.b8e,
    );
  }
  Update(e) {
    var t = this.GetText(0),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Conf.Name),
        this.GetTexture(1)),
      i = this.GetText(2);
    e.IsLock
      ? (this.SetTextureByPath(e.Conf.LockBigIcon, t),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          i,
          e.Conf.AttributesDescriptionUnlock,
        ),
        this.B8e?.SetActive(!1))
      : (this.SetTextureByPath(e.Conf.BigIcon, t),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          i,
          e.Conf.InstanceSubTypeDescription,
        ),
        22 === e.Conf.Secondary &&
        e.Conf.PhantomId &&
        0 !== e.Conf.PhantomId.length
          ? (this.B8e?.SetActive(!0), this.B8e?.RefreshByData(e.Conf.PhantomId))
          : this.B8e?.SetActive(!1));
  }
}
exports.NewSoundNormalItem = NewSoundNormalItem;
//# sourceMappingURL=NewSoundNormalItem.js.map
