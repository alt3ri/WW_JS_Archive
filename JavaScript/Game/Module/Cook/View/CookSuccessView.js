"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookSuccessView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonItemSimpleGrid_1 = require("../../Common/ItemGrid/CommonItemSimpleGrid"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class CookSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.zGt = void 0),
      (this.E9 = 0),
      (this.eOt = void 0),
      (this.Mke = () => {
        this.m2e();
      }),
      (this.m2e = () => {
        this.CloseMe();
      }),
      (this.JGe = (e, i, t) => {
        i = new CommonItemSimpleGrid_1.CommonItemSimpleGrid(i.GetOwner());
        return i.RefreshItem(e[0].ItemId, e[1]), { Key: t, Value: i };
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.m2e],
        [6, this.Mke],
      ]);
  }
  OnStart() {
    var e = this.OpenParam;
    (this.E9 = e.CookRewardPopType),
      (this.zGt = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(3),
        this.JGe,
      )),
      this.GetButton(5).GetRootComponent().SetUIActive(!1),
      (this.eOt = new ExpSliderItem(this.GetItem(4)));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FixSuccess,
      this.m2e,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FixSuccess,
      this.m2e,
    );
  }
  OnAfterShow() {
    this.mGe(), this.bqe(), this.tOt();
  }
  mGe() {
    switch (this.E9) {
      case 1:
      case 2:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "GetItem");
    }
  }
  bqe() {
    const i = [];
    ModelManager_1.ModelManager.CookModel.GetCookItemList().forEach((e) => {
      e = [{ IncId: 0, ItemId: e.ItemId }, e.ItemNum];
      i.push(e);
    }),
      this.zGt.RefreshByData(i);
  }
  tOt() {
    switch (this.E9) {
      case 1:
        this.eOt.SetActive(!0), this.eOt.Update();
        break;
      case 2:
        this.eOt.SetActive(!1);
    }
  }
  OnBeforeDestroy() {
    this.zGt.ClearChildren();
  }
}
exports.CookSuccessView = CookSuccessView;
class ExpSliderItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Update() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookerInfo(),
      i = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
        ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel,
      ),
      t =
        1 <
        (t = MathUtils_1.MathUtils.GetFloatPointFloor(
          e.TotalProficiencys / i,
          3,
        ))
          ? 1
          : t;
    this.GetSprite(0).SetFillAmount(t),
      this.GetText(1).SetText(e.AddExp.toString()),
      this.GetText(2).SetText(e.AddExp.toString()),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "CookProgressText",
        e.TotalProficiencys,
        i,
      );
  }
}
//# sourceMappingURL=CookSuccessView.js.map
