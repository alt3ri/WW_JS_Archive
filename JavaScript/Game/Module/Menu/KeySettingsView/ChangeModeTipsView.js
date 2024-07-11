"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeModeTipsView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ChangeKeyModeData_1 = require("./ChangeKeyModeData"),
  ChangeModeRowView_1 = require("./ChangeModeRowView");
class ChangeModeTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Qzs = void 0),
      (this.lqe = void 0),
      (this.Kzs = 0),
      (this.ofa = new Map()),
      (this.$zs = []),
      (this.Xzs = void 0),
      (this.JGt = void 0),
      (this.x4t = () => {
        this.CloseMe();
      }),
      (this.CPi = () => {
        this.Xzs?.ChangeKeyModeRowData && this.JGt && this.JGt(this.ofa),
          this.CloseMe();
      }),
      (this.Exi = () => {
        var i = Math.max(this.Kzs - 1, 0);
        i !== this.Kzs && ((this.Kzs = i), this.bl());
      }),
      (this.yxi = () => {
        var i = this.Qzs.GetMaxGroupIndex(),
          i = Math.min(this.Kzs + 1, i);
        i !== this.Kzs && ((this.Kzs = i), this.bl());
      }),
      (this.Yzs = (i) => {
        var t = i.ChangeKeyModeRowData;
        t &&
          (this.Xzs?.SetSelected(!1),
          (this.Xzs = i),
          this.ofa.set(this.Kzs, t.Index));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIInteractionGroup],
      [4, UE.UIButtonComponent],
      [5, UE.UIInteractionGroup],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [8, this.CPi],
        [2, this.Exi],
        [4, this.yxi],
      ]);
  }
  async OnBeforeStartAsync() {
    var i = this.OpenParam,
      t =
        ((this.Qzs = new ChangeKeyModeData_1.ChangeKeyModeData(i)),
        (this.Kzs = this.Qzs.DefaultGroupIndex),
        i.ChangeKeyModeGroupList);
    for (let i = 0; i < t.length; i++) {
      var s = t[i].DefaultKeyModeRowIndex;
      this.ofa.set(i, s);
    }
    (this.JGt = i.OnConfirmCallback),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe?.SetTitleByTextIdAndArgNew(this.Qzs.TitleName),
      this.lqe?.SetCloseCallBack(this.x4t);
    var i = this.GetItem(7),
      h = (i.SetUIActive(!1), i.GetOwner()),
      e = this.GetItem(6),
      r = [];
    for (const n of this.Qzs.GetChangeKeyModeGroupDataList()[
      this.Kzs
    ].GetChangeKeyModeRowDataList()) {
      var a = LguiUtil_1.LguiUtil.DuplicateActor(h, e),
        o = new ChangeModeRowView_1.ChangeModeRowView(),
        a = (o.BindOnSelected(this.Yzs), o.CreateThenShowByActorAsync(a, n));
      this.$zs.push(o), r.push(a);
    }
    await Promise.all(r);
  }
  OnStart() {
    this.bl();
  }
  OnBeforeDestroy() {
    (this.lqe = void 0), (this.Xzs = void 0), (this.$zs.length = 0);
  }
  bl() {
    this.Jzs(),
      this.zzs(),
      this.RefreshLeftAndRightButtonEnable(),
      this.RefreshRowView();
  }
  Jzs() {
    var i;
    this.Qzs &&
      (i = this.Qzs.GetChangeKeyModeGroupDataList()[this.Kzs]) &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.GroupName);
  }
  zzs() {
    var i;
    this.Xzs?.SetSelected(!1),
      this.Qzs &&
        this.Qzs.GetChangeKeyModeGroupDataList()[this.Kzs] &&
        ((i = this.ofa.get(this.Kzs) ?? 0),
        (i = this.$zs[i]),
        (this.Xzs = i)?.SetSelected(!0));
  }
  RefreshLeftAndRightButtonEnable() {
    var i, t, s, h;
    this.Qzs &&
      ((h = this.Qzs.GetMaxGroupIndex()),
      (i = this.GetInteractionGroup(3)),
      (t = this.GetInteractionGroup(5)),
      (s = 0 < this.Kzs),
      (h = this.Kzs < h),
      i.GetInteractable() !== s && i.SetInteractable(s),
      t.GetInteractable() !== h) &&
      t.SetInteractable(h);
  }
  RefreshRowView() {
    if (this.Qzs) {
      var i = this.Qzs.GetChangeKeyModeGroupDataList()[this.Kzs];
      if (i) {
        var t = i.GetChangeKeyModeRowDataList();
        for (let i = 0; i < this.$zs.length; i++) {
          var s = this.$zs[i],
            h = t[i];
          s.Refresh(h);
        }
      }
    }
  }
}
exports.ChangeModeTipsView = ChangeModeTipsView;
//# sourceMappingURL=ChangeModeTipsView.js.map
