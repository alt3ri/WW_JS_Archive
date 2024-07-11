"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeRandomEventView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiCameraManager_1 = require("../../UiCamera/UiCameraManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RogueSelectResult_1 = require("../Define/RogueSelectResult"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeRandomEventItem extends UiPanelBase_1.UiPanelBase {
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
      this.GetExtendToggle(0).OnStateChange.Add(this.OnClickEvent),
      this.Refresh(this.Data);
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
  Refresh(e) {
    this.Data = e;
    var i =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueEventConfigById(
          e.ConfigId,
        ),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i?.Title ?? ""),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i?.TextId ?? ""),
        ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
          RoguelikeDefine_1.INSIDE_CURRENCY_ID,
        ) >= (e.Cost ?? 0));
    this.GetButton(0)?.SetSelfInteractive(i);
  }
}
class RoguelikeRandomEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.EventItemList = []),
      (this.EventActorList = []),
      (this.DelayShowTimerId = void 0),
      (this.LastSelectItem = void 0),
      (this.Nfa = !1),
      (this.OnBtnConfirm = () => {
        RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
          7,
        );
      }),
      (this.RoguelikeChooseDataResult = (e, i, t, s, r) => {
        const o =
          ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
            this.OpenParam.Index,
          );
        s === o?.Index &&
          RoguelikeController_1.RoguelikeController.CreateCloseViewCallBack(
            r,
            () => {
              var e = new RogueSelectResult_1.RogueSelectResult(
                ModelManager_1.ModelManager.RoguelikeModel.RogueInfo?.PhantomEntry,
                i,
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
                    this.Nfa ||
                    this.UpdateEventList(o, !1);
            },
          )?.();
      }),
      (this.OnSelectHandle = (e, i) => {
        void 0 !== this.LastSelectItem &&
          this.LastSelectItem !== e &&
          1 === i &&
          this.LastSelectItem.SetToggleState(!1),
          (this.LastSelectItem = e);
        let t = !1;
        this.EventItemList.forEach((e) => {
          1 === e.GetToggleState() && (t = !0);
        }),
          this.GetButton(2).SetSelfInteractive(t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
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
  OnBeforeShow() {
    this.GetItem(0).SetUIActive(!1),
      this.GetButton(2).RootUIComp.SetUIActive(!1),
      this.GetButton(2).SetSelfInteractive(!1);
    const e =
      ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
        this.OpenParam.Index,
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
      (this.EventActorList.length = 0);
  }
  UpdateEventList(r, e = !0) {
    var i = async () => {
        var e = 1 !== RoguelikeController_1.RoguelikeController.CurrentStateId;
        if (
          ((RoguelikeController_1.RoguelikeController.CurrentFlowId = -1),
          (RoguelikeController_1.RoguelikeController.CurrentStateId = -1),
          (RoguelikeController_1.RoguelikeController.CurrentFlowListName = ""),
          0 !== r.RogueGainEntryList.length)
        ) {
          let i = !1;
          var t,
            s = [];
          for (let e = 0; e < r.RogueGainEntryList.length; e++)
            this.EventItemList[e]
              ? (this.EventActorList[e].SetUIActive(!0),
                this.EventItemList[e].Refresh(r.RogueGainEntryList[e]))
              : (this.EventActorList[e] ||
                  ((t = LguiUtil_1.LguiUtil.CopyItem(
                    this.GetItem(1),
                    this.GetItem(0),
                  )),
                  this.EventActorList.push(t)),
                ((t = new RoguelikeRandomEventItem()).OnSelectHandle =
                  this.OnSelectHandle),
                (t.Data = r.RogueGainEntryList[e]),
                s.push(
                  t
                    .CreateThenShowByActorAsync(
                      this.EventActorList[e].GetOwner(),
                    )
                    .then(() => {
                      this.EventItemList[e].Refresh(r.RogueGainEntryList[e]),
                        this.EventActorList[e].SetUIActive(!0);
                    }),
                ),
                this.EventItemList.push(t)),
              (i = i || r.RogueGainEntryList[e].IsSelect);
          await Promise.all(s),
            this.GetButton(2).RootUIComp.SetUIActive(!0),
            this.GetItem(1).SetUIActive(!1);
          for (
            let e = r.RogueGainEntryList.length;
            e < this.EventActorList.length;
            e++
          )
            this.EventActorList[e].SetUIActive(!1);
          i &&
            this.EventItemList.forEach((e) => {
              e.SetButtonState(!e.Data?.IsSelect);
            }),
            e
              ? (void 0 !== this.DelayShowTimerId &&
                  TimerSystem_1.TimerSystem.Remove(this.DelayShowTimerId),
                (this.DelayShowTimerId = TimerSystem_1.TimerSystem.Delay(() => {
                  this.GetButton(2).RootUIComp.SetUIActive(!0),
                    this.GetItem(0).SetUIActive(!0);
                }, 1e3)))
              : (this.GetButton(2).RootUIComp.SetUIActive(!0),
                this.GetItem(0).SetUIActive(!0));
        }
      },
      t =
        ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueEventConfigById(
          r.EventId,
        ),
      s = 0 === r.RogueGainEntryList.length;
    this.GetButton(2).RootUIComp.SetUIActive(!1),
      this.GetItem(0).SetUIActive(!1),
      s && !StringUtils_1.StringUtils.IsEmpty(t?.FlowListName)
        ? ((RoguelikeController_1.RoguelikeController.CurrentFlowId = -1),
          (RoguelikeController_1.RoguelikeController.CurrentStateId = -1),
          (RoguelikeController_1.RoguelikeController.CurrentFlowListName = ""),
          (this.Nfa = !0),
          this.CloseMe((e) => {
            e && UiCameraManager_1.UiCameraManager.Get().Exit();
          }))
        : (StringUtils_1.StringUtils.IsEmpty(t?.FlowListName) ||
            (RoguelikeController_1.RoguelikeController.CurrentFlowListName ===
              t?.FlowListName &&
              RoguelikeController_1.RoguelikeController.CurrentStateId ===
                t?.StateId &&
              RoguelikeController_1.RoguelikeController.CurrentFlowId ===
                t?.FlowId) ||
            !e ||
            ((s = { ViewName: this.Info?.Name, Position: 2 }),
            RoguelikeController_1.RoguelikeController.StartFlowForView(
              r.Index,
              t.FlowListName,
              t.FlowId,
              t.StateId,
              s,
            ),
            1 !== t?.StateId)) &&
          i();
  }
  Yho(e) {
    var i =
      ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
        Protocol_1.Aki.Protocol.Z6s.Proto_EventRoleBuffBindId,
      );
    return (
      void 0 !== i &&
      !i.IsSelect &&
      i.Layer === ModelManager_1.ModelManager.RoguelikeModel?.CurRoomCount &&
      ((i.CallBack = e),
      UiManager_1.UiManager.OpenView("RoleBuffSelectView", i),
      !0)
    );
  }
}
exports.RoguelikeRandomEventView = RoguelikeRandomEventView;
//# sourceMappingURL=RoguelikeRandomEventView.js.map
