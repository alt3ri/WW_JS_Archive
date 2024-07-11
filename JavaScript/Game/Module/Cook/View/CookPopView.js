"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookPopView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  CookController_1 = require("../CookController");
class CookPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.zGt = void 0),
      (this.ZGt = void 0),
      (this.E9 = 0),
      (this.InitCookPopItem = (e, t, i) => {
        t = new CookPopItem(t);
        return t.Update(e), { Key: i, Value: t };
      }),
      (this.m2e = () => {
        this.eNt();
      }),
      (this.Jke = () => {
        this.eNt();
      }),
      (this.Mke = () => {
        CookController_1.CookController.SendFixToolRequest(
          CookController_1.CookController.GetCurrentFixId(),
          CookController_1.CookController.GetCurrentEntityId(),
        ),
          this.eNt();
      }),
      (this.tNt = () => {
        this.eNt();
      }),
      (this.iNt = () => {
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
        [5, this.Jke],
        [6, this.Mke],
        [8, this.tNt],
        [9, this.iNt],
      ]);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.m2e);
    var e = this.OpenParam,
      e =
        ((this.E9 = e.CookRewardPopType),
        (this.zGt = new GenericScrollView_1.GenericScrollView(
          this.GetScrollViewWithScrollbar(1),
          this.InitCookPopItem,
        )),
        this.GetItem(2).SetUIActive(0 === this.E9 || 3 === this.E9),
        this.GetItem(4).SetUIActive(0 === this.E9),
        1 === this.E9 && CookController_1.CookController.CheckCanShowExpItem());
    this.GetItem(7).SetUIActive(e),
      1 === this.E9 && (this.ZGt = new ExpItem(this.GetItem(7))),
      this.GetButton(8)
        .GetOwner()
        .GetUIItem()
        .SetUIActive(0 !== this.E9);
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
  OnBeforeDestroy() {
    this.zGt && (this.zGt.ClearChildren(), (this.zGt = void 0)),
      this.ZGt && (this.ZGt.Destroy(), (this.ZGt = void 0));
  }
  OnAfterShow() {
    switch ((this.RDt(), this.oNt(), this.E9)) {
      case 0:
        this.rNt(), this.nNt();
        break;
      case 1:
        this.sNt();
        break;
      case 3:
        this.rNt();
    }
  }
  RDt() {
    switch (this.E9) {
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
  oNt() {
    if (0 === this.E9) {
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
      this.zGt.RefreshByData(e);
    } else
      this.zGt.RefreshByData(
        ModelManager_1.ModelManager.CookModel.GetCookItemList(),
      );
  }
  rNt() {
    if (0 === this.E9) {
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
  sNt() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookerInfo(),
      t = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
        ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel,
      );
    this.ZGt.SetExpSprite(e.TotalProficiencys, t),
      this.ZGt.SetAddText(e.AddExp),
      this.ZGt.SetLastText(e.TotalProficiencys),
      this.ZGt.SetSumText(t);
  }
  nNt() {
    var e = this.GetButton(6)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
      t = CookController_1.CookController.CheckCanFix();
    e.SetInteractable(t),
      this.GetButton(9).GetOwner().GetUIItem().SetUIActive(!t);
  }
  eNt() {
    0 === this.E9
      ? UiManager_1.UiManager.CloseView("CookPopFixView")
      : UiManager_1.UiManager.CloseView("CookPopView");
  }
}
exports.CookPopView = CookPopView;
class CookPopItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.fGt = void 0),
      (this.eTt = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.fGt.ItemId,
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
      (this.BtnBindInfo = [[9, this.eTt]]);
  }
  Update(e) {
    (this.fGt = e), this.Ost(), this.dwt(), this.VTt();
  }
  Ost() {
    this.SetItemIcon(this.GetTexture(4), this.fGt.ItemId);
  }
  dwt() {
    this.SetItemQualityIcon(this.GetSprite(5), this.fGt.ItemId);
  }
  VTt() {
    this.GetText(8).SetText(this.fGt.ItemNum.toString());
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
