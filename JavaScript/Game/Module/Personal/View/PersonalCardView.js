"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalCardItem_1 = require("./PersonalCardItem");
class PersonalCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.L0 = !0),
      (this.bha = void 0),
      (this.p5i = void 0),
      (this.lqe = void 0),
      (this.uHt = () => {
        var e, i;
        this.L0 ||
          ((e = this.p5i.CurCardId),
          (i = PersonalController_1.PersonalController.CheckCardIsUnLock(
            this.bha.CardId,
          )),
          this.GetButton(9).RootUIComp.SetUIActive(e !== this.bha.CardId && i));
      }),
      (this.p5t = () => {
        PersonalController_1.PersonalController.SendChangeCardRequest(
          this.bha.CardId,
        ),
          UiManager_1.UiManager.CloseView("PersonalEditView"),
          UiManager_1.UiManager.CloseView("PersonalOptionView");
      }),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this.qha = () => {
        UiManager_1.UiManager.OpenView("PersonalCardPreviewView", this.bha);
      }),
      (this.Y5i = () => {
        var e = new PersonalCardItem_1.PersonalCardItem();
        return e.SetToggleCallBack(this.Oha), e.SetNeedShowRedDot(!1), e;
      }),
      (this.Oha = (e, i) => {
        this.bha = i;
        var t,
          s,
          r = this.p5i.CardDataList,
          o = r.length;
        for (let e = 0; e < o; e++) {
          var n = r[e];
          if (n.CardId === i.CardId && n.IsUnLock && !n.IsRead) {
            PersonalController_1.PersonalController.SendReadCardRequest(
              i.CardId,
            );
            break;
          }
        }
        this.L0 ||
          ((t = this.p5i.CurCardId),
          (s = PersonalController_1.PersonalController.CheckCardIsUnLock(
            i.CardId,
          )),
          this.GetButton(9).RootUIComp.SetUIActive(t !== this.bha.CardId && s)),
          this.RefreshCardInfo(i),
          this.xqe.SelectGridProxy(e);
      });
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
      [7, UE.UIItem],
      [9, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [9, this.p5t],
        [8, this.qha],
      ]);
  }
  OnStart() {
    if (((this.p5i = this.OpenParam), this.p5i)) {
      let e = this.p5i.CardDataList;
      (e = e.filter((e) => e.IsUnLock)),
        (this.xqe = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(0),
          this.GetItem(1).GetOwner(),
          this.Y5i,
        )),
        this.xqe.RefreshByData(e),
        0 < e.length &&
          ((this.bha = e[0]),
          this.RefreshCardInfo(this.bha),
          this.xqe.SelectGridProxy(0)),
        (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7))),
        this.lqe.SetCloseCallBack(this.Jvt),
        this.GetItem(6).SetUIActive(0 < e.length),
        this.L0 || this.GetButton(9).RootUIComp.SetUIActive(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Personal", 59, "PersonalCardView Invalid OpenParam");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCardChange,
      this.uHt,
    );
  }
  OnRemoveEventListener() {
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
  OnBeforeDestroy() {
    this.xqe && (this.xqe.ClearGridProxies(), (this.xqe = void 0));
  }
}
exports.PersonalCardView = PersonalCardView;
//# sourceMappingURL=PersonalCardView.js.map
