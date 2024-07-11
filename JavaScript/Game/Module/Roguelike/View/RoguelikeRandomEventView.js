"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeRandomEventView = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeRandomEventItem extends UiComponentsAction_1.UiComponentsAction {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.OnClickEvent = () => {
        (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          this.Data),
          RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
            7,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickEvent]]);
  }
  OnStart() {
    this.Refresh(this.Data);
  }
  SetButtonState(e) {
    this.GetButton(0).SetSelfInteractive(e);
  }
  Refresh(e) {
    this.Data = e;
    var i =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueEventConfigById(
        e.ConfigId,
      );
    var i =
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
      (this.RoguelikeChooseDataResult = (e, i, t, o) => {
        const r =
          ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
            this.OpenParam.Index,
          );
        o === r?.Index && this.UpdateEventList(r, !1);
      }),
      (this.Zao = () => {
        const e =
          ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
            Protocol_1.Aki.Protocol._3s.Proto_EventRoleBuffBindId,
          );
        void 0 === e ||
          e.IsSelect ||
          e.Layer !==
            ModelManager_1.ModelManager.RoguelikeModel?.CurRoomCount ||
          UiManager_1.UiManager.OpenView("RoleBuffSelectView", e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeChooseDataResult,
      this.RoguelikeChooseDataResult,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeChooseDataNotify,
        this.Zao,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeChooseDataResult,
      this.RoguelikeChooseDataResult,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeChooseDataNotify,
        this.Zao,
      );
  }
  OnBeforeShow() {
    this.GetItem(0).SetUIActive(!1);
    const e =
      ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
        this.OpenParam.Index,
      );
    this.UpdateEventList(e);
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
  UpdateEventList(o, e = !0) {
    const i = () => {
      let t;
      const e = RoguelikeController_1.RoguelikeController.CurrentStateId !== 1;
      if (
        ((RoguelikeController_1.RoguelikeController.CurrentFlowId = -1),
        (RoguelikeController_1.RoguelikeController.CurrentStateId = -1),
        (RoguelikeController_1.RoguelikeController.CurrentFlowListName = ""),
        o.RogueGainEntryList.length !== 0)
      ) {
        let i = !1;
        for (let e = 0; e < o.RogueGainEntryList.length; e++)
          this.EventItemList[e]
            ? (this.EventActorList[e].SetUIActive(!0),
              this.EventItemList[e].Refresh(o.RogueGainEntryList[e]))
            : (this.EventActorList[e] ||
                ((t = LguiUtil_1.LguiUtil.CopyItem(
                  this.GetItem(1),
                  this.GetItem(0),
                )),
                this.EventActorList.push(t)),
              ((t = new RoguelikeRandomEventItem()).Data =
                o.RogueGainEntryList[e]),
              t
                .CreateThenShowByActorAsync(this.EventActorList[e].GetOwner())
                .then(() => {
                  this.EventItemList[e].Refresh(o.RogueGainEntryList[e]),
                    this.EventActorList[e].SetUIActive(!0);
                }),
              this.EventItemList.push(t)),
            (i = i || o.RogueGainEntryList[e].IsSelect);
        this.GetItem(1).SetUIActive(!1);
        for (
          let e = o.RogueGainEntryList.length;
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
                this.GetItem(0).SetUIActive(!0);
              }, 1e3)))
            : this.GetItem(0).SetUIActive(!0);
      }
    };
    const t =
      ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueEventConfigById(
        o.EventId,
      );
    let r = o.RogueGainEntryList.length === 0;
    this.GetItem(0).SetUIActive(!1),
      r && !StringUtils_1.StringUtils.IsEmpty(t?.FlowListName)
        ? ((r = { ViewName: this.Info?.Name, Position: 2 }),
          RoguelikeController_1.RoguelikeController.StartFlowForView(
            o.Index,
            t.FlowListName,
            t.FlowId,
            t.StateId,
            r,
          ))
        : (StringUtils_1.StringUtils.IsEmpty(t?.FlowListName) ||
            (RoguelikeController_1.RoguelikeController.CurrentFlowListName ===
              t?.FlowListName &&
              RoguelikeController_1.RoguelikeController.CurrentStateId ===
                t?.StateId &&
              RoguelikeController_1.RoguelikeController.CurrentFlowId ===
                t?.FlowId) ||
            !e ||
            ((r = { ViewName: this.Info?.Name, Position: 2 }),
            RoguelikeController_1.RoguelikeController.StartFlowForView(
              o.Index,
              t.FlowListName,
              t.FlowId,
              t.StateId,
              r,
            ),
            t?.StateId !== 1)) &&
          i();
  }
}
exports.RoguelikeRandomEventView = RoguelikeRandomEventView;
// # sourceMappingURL=RoguelikeRandomEventView.js.map
