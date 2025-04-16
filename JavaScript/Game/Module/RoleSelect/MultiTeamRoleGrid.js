"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiTeamRoleGrid = exports.MultiTeamRoleGridContentData = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout");
class MultiTeamRoleGridContentData {
  constructor() {
    (this.ShowGridAnimation = !1),
      (this.Data = void 0),
      (this.CurrentSelectedRoleList = []),
      (this.OnToggleCallBack = () => {}),
      (this.CanExecuteChangeCallBack = () => !0);
  }
}
exports.MultiTeamRoleGridContentData = MultiTeamRoleGridContentData;
class MultiTeamRoleGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.Bqe = () => {
        return new RoleGrid();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(1),
      this.Bqe,
    )),
      (this.eGe.GetUiAnimController().PlayFromIndex = 1);
  }
  Refresh(t, e, i) {
    this.GetText(0).ShowTextNew(t.Data.GetTitle());
    var s = [];
    for (const o of t.Data.GetShowMultiTeamRoleGridDataList()) {
      var r = new RoleGridContentData();
      (r.Data = o),
        (r.CurrentSelectedRoleList = t.CurrentSelectedRoleList),
        (r.OnToggleCallBack = t.OnToggleCallBack),
        (r.CanExecuteChangeCallBack = t.CanExecuteChangeCallBack),
        s.push(r);
    }
    this.eGe.RefreshByData(s, void 0, t.ShowGridAnimation);
  }
}
exports.MultiTeamRoleGrid = MultiTeamRoleGrid;
class RoleGridContentData {
  constructor() {
    (this.Data = void 0),
      (this.CurrentSelectedRoleList = []),
      (this.OnToggleCallBack = () => {}),
      (this.CanExecuteChangeCallBack = () => !0);
  }
}
class RoleGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.TBt = void 0), (this.UB_ = void 0);
  }
  OnStart() {}
  Refresh(t, e, i) {
    this.DB_(t);
  }
  async DB_(t) {
    this.TBt
      ? await this.TBt.Promise
      : ((this.TBt = new CustomPromise_1.CustomPromise()),
        (this.UB_ = new MediumItemGrid_1.MediumItemGrid()),
        await this.UB_.CreateByActorAsync(this.GetRootItem().GetOwner()),
        this.TBt.SetResult()),
      this.UB_.SetActive(!0);
    var e = t.Data.GetRole(),
      i = e.GetLevelData(),
      s = e.GetDataId(),
      r = e.IsTrialRole(),
      o = t.Data.GetIsHighlight(),
      a = t.Data.GetIsRecommend(),
      d = t.CurrentSelectedRoleList.indexOf(s),
      h = t.Data.GetIsLock(),
      s = {
        Type: 2,
        ItemConfigId: s,
        SkinId: e.GetRoleSkinId(),
        IsTrialRoleVisible: r,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [i.GetLevel()],
        HighlightIndex: o,
        ElementId: e.GetRoleConfig().ElementId,
        Data: t.Data,
        IsRecommendVisible: a,
        Index: 0 <= d ? d + 1 : void 0,
        IsShowLock: h,
      };
    this.UB_.Apply(s),
      this.UB_.BindOnExtendToggleStateChanged(t.OnToggleCallBack),
      this.UB_.UnBindOnCanExecuteChange(),
      this.UB_.SetSelected(0 <= d),
      this.UB_.BindOnCanExecuteChange(t.CanExecuteChangeCallBack);
  }
}
//# sourceMappingURL=MultiTeamRoleGrid.js.map
