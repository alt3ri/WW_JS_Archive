"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeModeTipsView = void 0);
const UE = require("ue"),
  Platform_1 = require("../../../../Launcher/Platform/Platform"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ChangeKeyModeData_1 = require("./ChangeKeyModeData"),
  ChangeModeRowView_1 = require("./ChangeModeRowView");
class ChangeModeTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Xea = void 0),
      (this.lqe = void 0),
      (this.Yea = 0),
      (this.LMa = new Map()),
      (this.Jea = []),
      (this.zea = void 0),
      (this.JGt = void 0),
      (this.x4t = () => {
        this.CloseMe();
      }),
      (this.CPi = () => {
        this.zea?.ChangeKeyModeRowData && this.JGt && this.JGt(this.LMa),
          this.CloseMe();
      }),
      (this.Exi = () => {
        var i = Math.max(this.Yea - 1, 0);
        i !== this.Yea && ((this.Yea = i), this.bl());
      }),
      (this.yxi = () => {
        var i = this.Xea.GetMaxGroupIndex(),
          i = Math.min(this.Yea + 1, i);
        i !== this.Yea && ((this.Yea = i), this.bl());
      }),
      (this.Zea = (i) => {
        var t = i.ChangeKeyModeRowData;
        t &&
          (this.zea?.SetSelected(!1),
          (this.zea = i),
          this.LMa.set(this.Yea, t.Index));
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
        ((this.Xea = new ChangeKeyModeData_1.ChangeKeyModeData(i)),
        (this.Yea = this.Xea.DefaultGroupIndex),
        i.ChangeKeyModeGroupList);
    for (let i = 0; i < t.length; i++) {
      var s = t[i].DefaultKeyModeRowIndex;
      this.LMa.set(i, s);
    }
    (this.JGt = i.OnConfirmCallback),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe?.SetTitleByTextIdAndArgNew(this.Xea.TitleName),
      this.lqe?.SetCloseCallBack(this.x4t);
    var i = this.GetItem(7),
      h = (i.SetUIActive(!1), i.GetOwner()),
      e = this.GetItem(6),
      r = [];
    for (const n of this.Xea.GetChangeKeyModeGroupDataList()[
      this.Yea
    ].GetChangeKeyModeRowDataList()) {
      var a = LguiUtil_1.LguiUtil.DuplicateActor(h, e),
        o = new ChangeModeRowView_1.ChangeModeRowView(),
        a = (o.BindOnSelected(this.Zea), o.CreateThenShowByActorAsync(a, n));
      this.Jea.push(o), r.push(a);
    }
    await Promise.all(r);
    i = Platform_1.Platform.IsPs5Platform();
    this.GetButton(2)?.RootUIComp.SetUIActive(!i),
      this.GetButton(4)?.RootUIComp.SetUIActive(!i);
  }
  OnStart() {
    this.bl();
  }
  OnBeforeDestroy() {
    (this.lqe = void 0), (this.zea = void 0), (this.Jea.length = 0);
  }
  bl() {
    this.eta(),
      this.tta(),
      this.RefreshLeftAndRightButtonEnable(),
      this.RefreshRowView();
  }
  eta() {
    var i;
    this.Xea &&
      (i = this.Xea.GetChangeKeyModeGroupDataList()[this.Yea]) &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.GroupName);
  }
  tta() {
    var i;
    this.zea?.SetSelected(!1),
      this.Xea &&
        this.Xea.GetChangeKeyModeGroupDataList()[this.Yea] &&
        ((i = this.LMa.get(this.Yea) ?? 0),
        (i = this.Jea[i]),
        (this.zea = i)?.SetSelected(!0));
  }
  RefreshLeftAndRightButtonEnable() {
    var i, t, s, h;
    this.Xea &&
      ((h = this.Xea.GetMaxGroupIndex()),
      (i = this.GetInteractionGroup(3)),
      (t = this.GetInteractionGroup(5)),
      (s = 0 < this.Yea),
      (h = this.Yea < h),
      i.GetInteractable() !== s && i.SetInteractable(s),
      t.GetInteractable() !== h) &&
      t.SetInteractable(h);
  }
  RefreshRowView() {
    if (this.Xea) {
      var i = this.Xea.GetChangeKeyModeGroupDataList()[this.Yea];
      if (i) {
        var t = i.GetChangeKeyModeRowDataList();
        for (let i = 0; i < this.Jea.length; i++) {
          var s = this.Jea[i],
            h = t[i];
          s.Refresh(h);
        }
      }
    }
  }
}
exports.ChangeModeTipsView = ChangeModeTipsView;
//# sourceMappingURL=ChangeModeTipsView.js.map
