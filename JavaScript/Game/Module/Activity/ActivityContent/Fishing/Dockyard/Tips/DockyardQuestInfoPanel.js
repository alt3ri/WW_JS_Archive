"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardQuestInfoPanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class DockyardQuestInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.ListLayout = void 0),
      (this.ExitFunc = void 0),
      (this.LockState = !1),
      (this.Bqe = () => {
        return new QuestInfoItem();
      }),
      (this.d4e = () => {
        if (ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust) {
          var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
            ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust,
          );
          if (e) {
            var t,
              i,
              r = e.EntrustTarget,
              s = [],
              n = e.TargetDesText;
            for ([t, i] of r) {
              var o =
                  ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(
                    t,
                  ),
                o = { MaxCount: i, CurrentCount: o, DesText: n.get(t) ?? "" };
              s.push(o);
            }
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name),
              this.ListLayout.RefreshByData(s),
              this.GetVerticalLayout(1).RootUIComp.SetUIActive(!0);
          }
        } else
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(0),
            "Fishing_NotTraceEntrustInShip",
          ),
            this.GetVerticalLayout(1).RootUIComp.SetUIActive(!1);
      }),
      (this.b5_ = () => {
        ControllerHolder_1.ControllerHolder.FishingController.OpenFishingQuestView();
      }),
      (this.ti_ = () => {
        this.ExitFunc?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [3, this.b5_],
        [4, this.ti_],
      ]);
  }
  OnStart() {
    (this.ListLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.Bqe,
    )),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceCloseEvent((e) => {
        "Hide" === e && this.SetActive(!1);
      });
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingRefreshBackpackData,
      this.d4e,
    ),
      this.Refresh();
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingRefreshBackpackData,
      this.d4e,
    );
  }
  SetPanelVisible(e) {
    this.LockState ||
      (e
        ? (this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
          this.LevelSequencePlayer.PlaySequencePurely("Show"),
          this.SetActive(!0))
        : (this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
          this.LevelSequencePlayer.PlaySequencePurely("Hide")));
  }
  Refresh() {
    this.d4e();
  }
  SetButtonQuestVisible(e) {
    this.GetButton(3).RootUIComp.SetUIActive(e);
  }
  SetButtonExitVisible(e) {
    this.GetButton(4).RootUIComp.SetUIActive(e);
  }
}
exports.DockyardQuestInfoPanel = DockyardQuestInfoPanel;
class QuestInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.DesText, e.MaxCount);
    var t = this.GetText(1),
      i = e.CurrentCount >= e.MaxCount;
    t.SetText(`(${Math.min(e.CurrentCount, e.MaxCount)}/${e.MaxCount})`),
      t.SetChangeColor(i, t.changeColor);
  }
}
//# sourceMappingURL=DockyardQuestInfoPanel.js.map
