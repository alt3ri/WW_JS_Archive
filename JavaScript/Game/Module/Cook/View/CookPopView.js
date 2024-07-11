"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookPopView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  CookController_1 = require("../CookController"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CookPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$qt = void 0),
      (this.Yqt = void 0),
      (this.S9 = 0),
      (this.InitCookPopItem = (e, t, i) => {
        t = new CookPopItem(t);
        return t.Update(e), { Key: i, Value: t };
      }),
      (this.mIt = () => {
        this.Jqt();
      }),
      (this.zqt = () => {
        this.Jqt();
      }),
      (this.dIt = () => {
        CookController_1.CookController.SendFixToolRequest(
          CookController_1.CookController.GetCurrentFixId(),
          CookController_1.CookController.GetCurrentEntityId(),
        ),
          this.Jqt();
      }),
      (this.Zqt = () => {
        this.Jqt();
      }),
      (this.eGt = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MaterialShort",
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.zqt],
        [6, this.dIt],
        [8, this.Zqt],
        [9, this.eGt],
      ]);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.mIt);
    var e = this.OpenParam,
      e =
        ((this.S9 = e.CookRewardPopType),
        (this.$qt = new GenericScrollView_1.GenericScrollView(
          this.GetScrollViewWithScrollbar(1),
          this.InitCookPopItem,
        )),
        this.GetItem(2).SetUIActive(0 === this.S9 || 3 === this.S9),
        this.GetItem(4).SetUIActive(0 === this.S9),
        1 === this.S9 && CookController_1.CookController.CheckCanShowExpItem());
    this.GetItem(7).SetUIActive(e),
      1 === this.S9 && (this.Yqt = new ExpItem(this.GetItem(7))),
      this.GetButton(8)
        .GetOwner()
        .GetUIItem()
        .SetUIActive(0 !== this.S9);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FixSuccess,
      this.mIt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FixSuccess,
      this.mIt,
    );
  }
  OnBeforeDestroy() {
    this.$qt && (this.$qt.ClearChildren(), (this.$qt = void 0)),
      this.Yqt && (this.Yqt.Destroy(), (this.Yqt = void 0));
  }
  OnAfterShow() {
    switch ((this.ILt(), this.tGt(), this.S9)) {
      case 0:
        this.iGt(), this.oGt();
        break;
      case 1:
        this.rGt();
        break;
      case 3:
        this.iGt();
    }
  }
  ILt() {
    switch (this.S9) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "UnlockTitle");
        break;
      case 1:
      case 2:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "GetItem");
        break;
      case 3:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "StudyFail");
    }
  }
  tGt() {
    if (0 === this.S9) {
      var e = new Array();
      for (const i of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
        CookController_1.CookController.GetCurrentFixId(),
      ).Items) {
        var t =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            i[0],
          );
        e.push({ ItemId: i[0], ItemNum: t });
      }
      this.$qt.RefreshByData(e);
    } else
      this.$qt.RefreshByData(
        ModelManager_1.ModelManager.CookModel.GetCookItemList(),
      );
  }
  iGt() {
    if (0 === this.S9) {
      var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
          CookController_1.CookController.GetCurrentFixId(),
        ),
        s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
          i.Description,
        );
      let e = 0,
        t = "";
      for (const o of i.Items) {
        e = o[1];
        var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o[0]);
        t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(r.Name);
      }
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FixText", e, t, s);
    } else
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "MaciningStudyFail");
  }
  rGt() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookerInfo(),
      t = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
        ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel,
      );
    this.Yqt.SetExpSprite(e.TotalProficiencys, t),
      this.Yqt.SetAddText(e.AddExp),
      this.Yqt.SetLastText(e.TotalProficiencys),
      this.Yqt.SetSumText(t);
  }
  oGt() {
    var e = this.GetButton(6)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
      t = CookController_1.CookController.CheckCanFix();
    e.SetInteractable(t),
      this.GetButton(9).GetOwner().GetUIItem().SetUIActive(!t);
  }
  Jqt() {
    0 === this.S9
      ? UiManager_1.UiManager.CloseView("CookPopFixView")
      : UiManager_1.UiManager.CloseView("CookPopView");
  }
}
exports.CookPopView = CookPopView;
class CookPopItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.dqt = void 0),
      (this.Kyt = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.dqt.ItemId,
        );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [4, UE.UITexture],
      [5, UE.UISprite],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.Kyt]]);
  }
  Update(e) {
    (this.dqt = e), this.Dnt(), this._xt(), this.GIt();
  }
  Dnt() {
    this.SetItemIcon(this.GetTexture(4), this.dqt.ItemId);
  }
  _xt() {
    this.SetItemQualityIcon(this.GetSprite(5), this.dqt.ItemId);
  }
  GIt() {
    this.GetText(8).SetText(this.dqt.ItemNum.toString());
  }
}
class ExpItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  SetExpSprite(e, t) {
    e = 1 < (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) ? 1 : e;
    this.GetSprite(0).SetFillAmount(e);
  }
  SetAddText(e) {
    this.GetText(1).SetText(e.toString());
  }
  SetLastText(e) {
    this.GetText(2).SetText(e.toString());
  }
  SetSumText(e) {
    this.GetText(3).SetText(e.toString());
  }
}
//# sourceMappingURL=CookPopView.js.map
