"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayTipGrid = void 0);
const ue_1 = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class SceneGameplayTipGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.OnClickPreviewCall = void 0),
      (this.d2o = void 0),
      (this.a1i = !1),
      (this.h1i = []),
      (this._2o = () => {
        this.OnClickPreviewCall?.();
      });
  }
  Initialize(i) {
    this.CreateThenShowByActor(i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, ue_1.UIItem],
      [2, ue_1.UIItem],
      [0, ue_1.UIText],
      [3, ue_1.UIButtonComponent],
      [4, ue_1.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this._2o]]);
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.h1i.length = 0), (this.OnClickPreviewCall = void 0);
  }
  Refresh(i, t, e = !1, s = !1, r = !1) {
    (this.d2o = i),
      e ? this.C2o(t) : this.qMi(t),
      this.GetItem(4)?.SetUIActive(r),
      this.Yhi(s);
  }
  SetBtnPreviewVisible(i) {
    this.GetButton(3).RootUIComp.SetUIActive(i);
  }
  Yhi(e = !1) {
    this.a1i = !!this.d2o && 0 < this.d2o.size;
    let s = 0;
    if (this.a1i) {
      var r = this.GetItem(2).GetOwner(),
        h = this.GetItem(1);
      let t = 0;
      for (const l of this.d2o) {
        let i = this.h1i[t];
        i ||
          ((i =
            new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
            LguiUtil_1.LguiUtil.DuplicateActor(r, h),
          ),
          this.h1i.push(i)),
          i.RefreshByConfigId(l[0], l[1], void 0, e),
          i.SetActive(!0),
          t++;
      }
      s = this.d2o.size;
    }
    for (let i = s; i < this.h1i.length; ++i) this.h1i[i].SetActive(!1);
  }
  qMi(i) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), i);
  }
  C2o(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i);
  }
}
exports.SceneGameplayTipGrid = SceneGameplayTipGrid;
//# sourceMappingURL=SceneGameplayTipGrid.js.map
