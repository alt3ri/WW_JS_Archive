"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardComponent = void 0);
const UE = require("ue"),
  BackgroundCardAll_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardAll"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalCardBaseItem_1 = require("./PersonalCardBaseItem"),
  PersonalCardItem_1 = require("./PersonalCardItem"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  UiManager_1 = require("../../../Ui/UiManager");
class PersonalCardComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super(),
      (this.xqe = void 0),
      (this.X4i = 0),
      (this.$4i = void 0),
      (this.Y4i = (e) => {
        for (const i of this.xqe.GetScrollItemMap().values())
          if (i.GetConfig().Id === e) {
            i.RefreshRedDot();
            break;
          }
      }),
      (this.u7t = () => {
        var e, i;
        this.L0 ||
          ((e = this.v4i.CurCardId),
          (i = PersonalController_1.PersonalController.CheckCardIsUnLock(
            this.X4i,
          )),
          this.GetButton(6).RootUIComp.SetUIActive(e !== this.X4i && i));
      }),
      (this.p4t = () => {
        PersonalController_1.PersonalController.SendChangeCardRequest(this.X4i),
          UiManager_1.UiManager.CloseView("PersonalEditView"),
          UiManager_1.UiManager.CloseView("PersonalOptionView");
      }),
      (this.J4i = (e, i, t) => {
        let r = void 0;
        return (
          this.L0
            ? (r = new PersonalCardBaseItem_1.PersonalCardBaseItem(i, e))
            : (r = new PersonalCardItem_1.PersonalCardItem(
                i,
                e,
              )).RefreshRedDot(),
          r.SetToggleState(e.Id === this.X4i ? 1 : 0),
          e.Id === this.X4i && (this.$4i = r),
          r.SetToggleCallBack(this.z4i),
          { Key: e.Id, Value: r }
        );
      }),
      (this.z4i = (i) => {
        this.$4i && this.$4i.SetToggleState(0), (this.X4i = i.Id);
        var e,
          t = this.v4i.CardUnlockList,
          r = t.length;
        for (let e = 0; e < r; e++) {
          var s = t[e];
          if (s.CardId === i.Id && !s.IsRead) {
            PersonalController_1.PersonalController.SendReadCardRequest(i.Id);
            break;
          }
        }
        this.L0 ||
          ((n = this.v4i.CurCardId),
          (e = PersonalController_1.PersonalController.CheckCardIsUnLock(i.Id)),
          this.GetButton(6).RootUIComp.SetUIActive(n !== this.X4i && e)),
          this.RefreshCardInfo(i);
        var n = this.xqe.GetScrollItemByKey(i.Id);
        this.$4i = n;
      }),
      (this.L0 = i),
      (this.v4i = t),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
    ]),
      this.L0 ||
        (this.ComponentRegisterInfos.push(
          [6, UE.UIButtonComponent],
          [7, UE.UIText],
        ),
        (this.BtnBindInfo = [[6, this.p4t]]));
  }
  OnStart() {
    let i = [];
    if (this.L0) {
      var t = this.v4i.CardUnlockList,
        r = t.length;
      for (let e = 0; e < r; e++) {
        var s = t[e],
          s = BackgroundCardById_1.configBackgroundCardById.GetConfig(s.CardId);
        i.push(s);
      }
    } else
      (i = ConfigCommon_1.ConfigCommon.ToList(
        BackgroundCardAll_1.configBackgroundCardAll.GetConfigList(),
      )).sort((e, i) => {
        e =
          void 0 !==
          ModelManager_1.ModelManager.PersonalModel.GetCardUnlockData(e.Id);
        return e !=
          (void 0 !==
            ModelManager_1.ModelManager.PersonalModel.GetCardUnlockData(i.Id))
          ? e
            ? -1
            : 1
          : 0;
      });
    var e;
    this.xqe ||
      (this.xqe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(0),
        this.J4i,
      )),
      0 < i.length &&
        ((e = this.v4i.CurCardId),
        (this.X4i = void 0 !== e && 0 !== e ? e : i[0].Id),
        (e = BackgroundCardById_1.configBackgroundCardById.GetConfig(this.X4i)),
        this.RefreshCardInfo(e)),
      this.xqe.ClearChildren(),
      this.xqe.RefreshByData(i),
      this.GetItem(5).SetUIActive(0 < i.length),
      this.L0 ||
        ((e = this.v4i.CardUnlockList),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(7),
          "Collected",
          e.length,
        ),
        this.GetButton(6).RootUIComp.SetUIActive(!1)),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPersonalCardRead,
      this.Y4i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCardChange,
        this.u7t,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPersonalCardRead,
      this.Y4i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCardChange,
        this.u7t,
      );
  }
  RefreshCardInfo(e) {
    this.SetTextureByPath(e.CardPath, this.GetTexture(1)),
      this.GetText(2).ShowTextNew(e.Title),
      this.GetText(3).ShowTextNew(e.AttributesDescription),
      this.GetText(4).ShowTextNew(e.Tips);
  }
  OnBeforeDestroy() {
    this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
      this.RemoveEventListener();
  }
}
exports.PersonalCardComponent = PersonalCardComponent;
//# sourceMappingURL=PersonalCardComponent.js.map
