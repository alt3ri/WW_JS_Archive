"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundNormalItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
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
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.B8e = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.b8e,
    );
  }
  Update(e) {
    var t = e.DetectRecordData,
      i = this.GetText(0),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Conf.Name),
        this.GetTexture(1)),
      r = this.GetText(2),
      e =
        (this.Co_(e),
        ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionPreOpen(t));
    t.IsLock && !e
      ? (this.SetTextureShowUntilLoaded(t.Conf.LockBigIcon, i),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          r,
          t.Conf.AttributesDescriptionUnlock,
        ),
        this.B8e?.SetActive(!1))
      : (this.SetTextureShowUntilLoaded(t.Conf.BigIcon, i),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          r,
          t.Conf.InstanceSubTypeDescription,
        ),
        22 === t.Conf.Secondary &&
        t.Conf.PhantomId &&
        0 !== t.Conf.PhantomId.length
          ? (this.B8e?.SetActive(!0), this.B8e?.RefreshByData(t.Conf.PhantomId))
          : this.B8e?.SetActive(!1));
  }
  Co_(e) {
    e = e.TracingList?.includes(e.DetectRecordData.Conf.Id) ?? !1;
    this.GetItem(5)?.SetUIActive(e);
  }
}
exports.NewSoundNormalItem = NewSoundNormalItem;
//# sourceMappingURL=NewSoundNormalItem.js.map
