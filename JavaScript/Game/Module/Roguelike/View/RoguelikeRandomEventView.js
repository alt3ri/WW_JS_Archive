"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeRandomEventView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RogueSelectResult_1 = require("../Define/RogueSelectResult"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeRandomEventItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.OnSelectHandle = void 0),
      (this.OnClickEvent = (e) => {
        (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          1 === e ? this.Data : void 0),
          this.OnSelectHandle && this.OnSelectHandle(this, e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    this.GetExtendToggle(0).OnStateChange.Clear(),
      this.GetExtendToggle(0).OnStateChange.Add(this.OnClickEvent);
  }
  SetButtonState(e) {
    this.GetExtendToggle(0).SetSelfInteractive(e);
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, !1);
  }
  GetToggleState() {
    return this.GetExtendToggle(0).GetToggleState();
  }
  Refresh(e, t, i) {
    this.Data = e;
    var s =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueEventConfigById(
          e.ConfigId,
        ),
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s?.Title ?? ""),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s?.TextId ?? ""),
        this.SetButtonState(!this.Data.IsSelect),
        ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
          RoguelikeDefine_1.INSIDE_CURRENCY_ID,
        ) >= (e.Cost ?? 0));
    this.GetExtendToggle(0)?.SetSelfInteractive(s);
  }
}
class RoguelikeRandomEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.EventItemList = []),
      (this.EventActorList = []),
      (this.DelayShowTimerId = void 0),
      (this.LastSelectItem = void 0),
      (this.GenericLayout = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.sSa = !1),
      (this.OnBtnConfirm = () => {
        RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
          7,
        );
      }),
      (this.Fao = () => {
        var e = new RoguelikeRandomEventItem();
        return (e.OnSelectHandle = this.OnSelectHandle), e;
      }),
      (this.RoguelikeChooseDataResult = (e, t, i, s, r) => {
        const o =
          ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
            -2,
          );
        s === o?.Index &&
          RoguelikeController_1.RoguelikeController.CreateCloseViewCallBack(
            r,
            () => {
              var e = new RogueSelectResult_1.RogueSelectResult(
                ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry,
                t,
                void 0,
                !1,
              );
              (e.CallBack = () => {
                this.UpdateEventList(o, !1);
              }),
                0 < e.GetNewUnlockAffixEntry().size
                  ? UiManager_1.UiManager.OpenView("CommonSelectResultView", e)
                  : this.Yho(() => {
                      this.UpdateEventList(o, !1);
                    }) ||
                    this.sSa ||
                    this.UpdateEventList(o, !1);
            },
          )?.();
      }),
      (this.OnSelectHandle = (e, t) => {
        void 0 !== this.LastSelectItem &&
          this.LastSelectItem !== e &&
          1 === t &&
          this.LastSelectItem.SetToggleState(!1),
          (this.LastSelectItem = e);
        let i = !1;
        this.GenericLayout?.GetLayoutItemList().forEach((e) => {
          1 === e.GetToggleState() && (i = !0);
        }),
          this.GetButton(2).SetSelfInteractive(i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.OnBtnConfirm]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeChooseDataResult,
      this.RoguelikeChooseDataResult,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeChooseDataResult,
      this.RoguelikeChooseDataResult,
    );
  }
  OnStart() {
    (this.GenericLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.Fao,
    )),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  OnBeforeShow() {
    this.GetButton(2).RootUIComp.SetUIActive(!1),
      this.GetButton(2).SetSelfInteractive(!1);
    const e =
      ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
        -2,
      );
    this.Yho(() => {
      this.UpdateEventList(e);
    }) || this.UpdateEventList(e);
  }
  OnBeforeDestroy() {
    this.EventItemList.forEach((e) => {
      e.Destroy();
    }),
      void 0 !== this.DelayShowTimerId &&
        TimerSystem_1.TimerSystem.Remove(this.DelayShowTimerId),
      (this.EventItemList.length = 0),
      ((this.EventActorList.length = 0), this.OpenParam.SelectCallback)?.(
        void 0 !== this.LastSelectItem ? this.LastSelectItem.GridIndex : 0,
      );
  }
  UpdateEventList(i, e = 0) {
    var t = 0 === i.RogueGainEntryList.length;
    this.SOa(!1),
      t
        ? this.CloseMe()
        : (async () => {
            let e = !1;
            for (const t of i.RogueGainEntryList) e = e || t.IsSelect;
            this.GetItem(1).SetUIActive(!1),
              await this.GenericLayout?.RefreshByDataAsync(
                i.RogueGainEntryList,
              ),
              this.SOa(!0),
              this.LevelSequencePlayer?.PlaySequencePurely("ShowPanel");
          })();
  }
  SOa(e) {
    this.GetItem(3).SetUIActive(e), this.GetButton(2).RootUIComp.SetUIActive(e);
  }
  Yho(e) {
    var t =
      ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
        Protocol_1.Aki.Protocol.s8s.Proto_EventRoleBuffBindId,
      );
    return (
      void 0 !== t &&
      !t.IsSelect &&
      t.Layer === ModelManager_1.ModelManager.RoguelikeModel?.CurRoomCount &&
      ((t.CallBack = e),
      UiManager_1.UiManager.OpenView("RoleBuffSelectView", t),
      !0)
    );
  }
}
exports.RoguelikeRandomEventView = RoguelikeRandomEventView;
//# sourceMappingURL=RoguelikeRandomEventView.js.map
