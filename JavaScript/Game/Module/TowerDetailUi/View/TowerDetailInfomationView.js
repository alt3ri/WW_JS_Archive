"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  TowerDetailData_1 = require("../TowerDetailData"),
  TowerDetailInformationItem_1 = require("./TowerDetailInformationItem"),
  TowerDetailSwitchItem_1 = require("./TowerDetailSwitchItem");
class TowerDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this._Lo = void 0),
      (this.uLo = void 0),
      (this.I7e = 0),
      (this.cLo = (e, t, i) => {
        t = new TowerDetailInformationItem_1.TowerDetailInformationItem(t);
        return t.Update(e), { Key: i, Value: t };
      }),
      (this.Bdo = (e, t, i) => {
        t = new TowerDetailSwitchItem_1.TowerDetailSwitchItem(t);
        return t.Update(e), { Key: i, Value: t };
      }),
      (this.SortFunc = (e, t) => e.Priority - t.Priority),
      (this.mLo = () => {
        (this.I7e =
          ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId),
          this.dLo(),
          this.CLo();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
    ];
  }
  OnStart() {
    (this._Lo = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(2),
      this.cLo,
    )),
      (this.uLo = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(4),
        this.Bdo,
      ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickSingleTimeTowerDetailSwitchBtn,
      this.mLo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickSingleTimeTowerDetailSwitchBtn,
      this.mLo,
    );
  }
  OnAfterShow() {
    (this.I7e =
      ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId),
      this.Og();
  }
  Og() {
    this.gLo(), this.dLo(), this.CLo();
  }
  dLo() {
    var e = ModelManager_1.ModelManager.TowerDetailModel.SwitchData;
    this.uLo.RebuildLayoutByDataNew(e);
  }
  CLo() {
    var e = ModelManager_1.ModelManager.TowerDetailModel.SwitchData;
    let t = void 0;
    e.forEach((e) => {
      e.Index === this.I7e && (t = e);
    });
    const i = new Array();
    ModelManager_1.ModelManager.TowerDetailModel.GetBuffs(t).forEach((e) => {
      var t = new TowerDetailData_1.TowerInformationData();
      (t.Type = 0),
        (t.TowerDetailBuffData = e),
        (t.Title = e.Title),
        (t.Priority = e.Priority),
        i.push(t);
    }),
      ModelManager_1.ModelManager.TowerDetailModel.GetMonsters(t).forEach(
        (e) => {
          var t = new TowerDetailData_1.TowerInformationData();
          (t.Type = 1),
            (t.MonsterData = e),
            (t.Title = e.Title),
            (t.Priority = e.Priority),
            i.push(t);
        },
      ),
      i.sort(this.SortFunc),
      this._Lo.RefreshByData(i);
  }
  gLo() {
    var e = ModelManager_1.ModelManager.TowerDetailModel.TowerTitle;
    this.GetText(0).SetText(e);
  }
  OnBeforeDestroy() {
    this._Lo.ClearChildren(), this.uLo.ClearChildren();
  }
}
exports.TowerDetailView = TowerDetailView;
//# sourceMappingURL=TowerDetailInfomationView.js.map
