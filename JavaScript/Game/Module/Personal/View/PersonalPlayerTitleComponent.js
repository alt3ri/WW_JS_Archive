"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalPlayerTitleComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  PlayerTitleById_1 = require("../../../../Core/Define/ConfigQuery/PlayerTitleById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalPlayerTitleItem_1 = require("./PersonalPlayerTitleItem");
class PersonalPlayerTitleComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.epc = void 0),
      (this.p5i = void 0),
      (this.P7e = void 0),
      (this.tpc = () => {
        this.RefreshConfirmBtnState();
      }),
      (this.ipc = () => {
        var e = new PersonalPlayerTitleItem_1.PersonalPlayerTitleItem();
        return e.SetToggleCallBack(this.opc), e;
      }),
      (this.opc = (e, i) => {
        (this.epc = i),
          this.RefreshPlayerTitleInfo(),
          this.xqe.SelectGridProxy(e);
      }),
      (this.OnClickConfirm = () => {
        let e = this.epc.PlayerTitleId;
        this.p5i.CurPlayerTitleId === e && (e = 0),
          PersonalController_1.PersonalController.SendChangePlayerTitleRequest(
            e,
          ),
          UiManager_1.UiManager.CloseView("PersonalEditView"),
          UiManager_1.UiManager.CloseView("PersonalOptionView");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  OnStart() {
    (this.xqe = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.ipc,
      !0,
    )),
      this.AddEventListener();
  }
  async OnBeforeShowAsyncImplement() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleList();
    await this.xqe.RefreshByDataAsync(e);
    let i = 0;
    const t = this.p5i.CurPlayerTitleId;
    t && 0 < t && (i = e.findIndex((e) => e.PlayerTitleId === t)) < 0
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Personal", 71, "称号id错误", ["playerTitleId", t])
      : ((this.epc = e[i]),
        this.xqe.SelectGridProxy(i),
        this.xqe.ScrollToGridIndex(i),
        this.RefreshPlayerTitleInfo());
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlayerTitleChange,
      this.tpc,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayerTitleChange,
      this.tpc,
    );
  }
  SetPersonalInfoData(e) {
    this.p5i = e;
  }
  SetRefreshConfirmBtn(e) {
    this.P7e = e;
  }
  RefreshPlayerTitleInfo() {
    var e, i, t, r;
    this.GetItem(7)?.SetActive(void 0 !== this.epc),
      this.epc &&
        ((e = PlayerTitleById_1.configPlayerTitleById.GetConfig(
          this.epc.PlayerTitleId,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TitleName),
        (i = this.GetText(3)),
        this.epc.IsUnLock
          ? (i.SetUIActive(!0),
            (r = e.Id),
            (t =
              ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleStarLevel(
                r,
              )),
            (r =
              ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleInfoString(
                r,
                t,
                !0,
              )),
            i.SetText(r))
          : i.SetUIActive(!1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Description),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.ItemAccess),
        (t = this.epc.UnlockTime),
        (r = this.GetItem(8)),
        t
          ? (r.SetUIActive(!0),
            this.GetText(6).SetText(
              TimeUtil_1.TimeUtil.DateFormat4String(t / 1e3),
            ))
          : r.SetUIActive(!1),
        this.RefreshConfirmBtnState());
  }
  RefreshConfirmBtnState() {
    var e = this.p5i.CurPlayerTitleId,
      i = this.epc.IsUnLock;
    this.P7e && this.P7e(i, e === this.epc.PlayerTitleId);
  }
}
exports.PersonalPlayerTitleComponent = PersonalPlayerTitleComponent;
//# sourceMappingURL=PersonalPlayerTitleComponent.js.map
