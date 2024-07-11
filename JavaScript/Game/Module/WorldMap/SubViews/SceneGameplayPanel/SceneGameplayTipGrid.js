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
      (this.uFo = void 0),
      (this.a_i = !1),
      (this.h_i = []),
      (this.aFo = () => {
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
      (this.BtnBindInfo = [[3, this.aFo]]);
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.h_i.length = 0), (this.OnClickPreviewCall = void 0);
  }
  Refresh(i, t, e = !1, s = !1, r = !1) {
    (this.uFo = i),
      e ? this.cFo(t) : this.qEi(t),
      this.GetItem(4)?.SetUIActive(r),
      this.Yli(s);
  }
  SetBtnPreviewVisible(i) {
    this.GetButton(3).RootUIComp.SetUIActive(i);
  }
  Yli(e = !1) {
    this.a_i = !!this.uFo && 0 < this.uFo.size;
    let s = 0;
    if (this.a_i) {
      var r = this.GetItem(2).GetOwner(),
        h = this.GetItem(1);
      let t = 0;
      for (const l of this.uFo) {
        let i = this.h_i[t];
        i ||
          ((i =
            new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
            LguiUtil_1.LguiUtil.DuplicateActor(r, h),
          ),
          this.h_i.push(i)),
          i.RefreshByConfigId(l[0], l[1], void 0, e),
          i.SetActive(!0),
          t++;
      }
      s = this.uFo.size;
    }
    for (let i = s; i < this.h_i.length; ++i) this.h_i[i].SetActive(!1);
  }
  qEi(i) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), i);
  }
  cFo(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i);
  }
}
exports.SceneGameplayTipGrid = SceneGameplayTipGrid;
//# sourceMappingURL=SceneGameplayTipGrid.js.map
