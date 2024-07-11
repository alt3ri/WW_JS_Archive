"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardComponent = void 0);
const UE = require("ue"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalCardItem_1 = require("./PersonalCardItem");
class PersonalCardComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i) {
    super(),
      (this.xqe = void 0),
      (this.L0 = !1),
      (this.esa = void 0),
      (this.uHt = () => {
        this.L0 || this.P7e(this.esa);
      }),
      (this.p5t = () => {
        PersonalController_1.PersonalController.SendChangeCardRequest(
          this.esa.CardId,
        ),
          UiManager_1.UiManager.CloseView("PersonalEditView"),
          UiManager_1.UiManager.CloseView("PersonalOptionView");
      }),
      (this.tsa = () => {
        UiManager_1.UiManager.OpenView("PersonalCardPreviewView", this.esa);
      }),
      (this.Y5i = () => {
        var e = new PersonalCardItem_1.PersonalCardItem();
        return e.SetToggleCallBack(this.J5i), e;
      }),
      (this.J5i = (e, t) => {
        this.esa = t;
        var i = this.p5i.CardDataList,
          s = i.length;
        for (let e = 0; e < s; e++) {
          var r = i[e];
          if (r.CardId === t.CardId && r.IsUnLock && !r.IsRead) {
            PersonalController_1.PersonalController.SendReadCardRequest(
              t.CardId,
            );
            break;
          }
        }
        this.L0 || this.P7e(t),
          this.RefreshCardInfo(t),
          this.xqe.SelectGridProxy(e);
      }),
      (this.L0 = t),
      (this.p5i = i),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIText],
    ]),
      this.L0 ||
        (this.ComponentRegisterInfos.push(
          [7, UE.UIButtonComponent],
          [8, UE.UIText],
        ),
        (this.BtnBindInfo = [
          [7, this.p5t],
          [9, this.tsa],
        ]));
  }
  OnStart() {
    var e = this.p5i.CardDataList;
    if (
      (e.sort((e, t) =>
        e.IsUnLock !== t.IsUnLock ? (e.IsUnLock ? -1 : 1) : 0,
      ),
      (this.xqe = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.Y5i,
      )),
      this.xqe.RefreshByData(e),
      0 < e.length)
    ) {
      const i = this.p5i.CurCardId;
      var t = e.findIndex((e) => e.CardId === i);
      (this.esa = e[(t = t < 0 ? 0 : t)]),
        this.xqe.SelectGridProxy(t),
        this.xqe.ScrollToGridIndex(t),
        this.RefreshCardInfo(this.esa),
        this.P7e(this.esa);
    }
    this.GetItem(6).SetUIActive(0 < e.length),
      this.L0 ||
        ((t = this.p5i.GetUnlockCardDataCount()),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "Collected", t)),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCardChange,
      this.uHt,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCardChange,
      this.uHt,
    );
  }
  RefreshCardInfo(e) {
    e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e.CardId);
    this.SetTextureByPath(e.CardPath, this.GetTexture(2)),
      this.GetText(3).ShowTextNew(e.Title),
      this.GetText(4).ShowTextNew(e.AttributesDescription),
      this.GetText(5).ShowTextNew(e.Tips);
  }
  P7e(e) {
    var t = this.p5i.CurCardId,
      i = e.IsUnLock,
      i = t !== e.CardId && i,
      i =
        (this.GetButton(7).SetSelfInteractive(i),
        t === e.CardId ? "Text_InUse_Text" : "ConfirmBox_173_ButtonText_1");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i);
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.PersonalCardComponent = PersonalCardComponent;
//# sourceMappingURL=PersonalCardComponent.js.map
