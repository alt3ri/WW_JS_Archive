"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MemoryDetailView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  NoCircleAttachView_1 = require("../AutoAttach/NoCircleAttachView"),
  ButtonItem_1 = require("../Common/Button/ButtonItem"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  FragmentMemoryData_1 = require("./FragmentMemoryData"),
  MemoryDetailAttachItem_1 = require("./MemoryDetailAttachItem"),
  FRAGMENTMEMORYMASK = "FragmentMemoryMask",
  HIDEVIEWDELAY = 600;
class MemoryDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.ELo = void 0),
      (this.Twn = void 0),
      (this.Lwn = []),
      (this.Dwn = []),
      (this.p9t = void 0),
      (this.SPe = void 0),
      (this.Qho = () => {
        const t =
          ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
            this.Twn.Id,
          );
        this.SPe?.PlaySequencePurely("HideView"),
          UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !0),
          TimerSystem_1.TimerSystem.Delay(() => {
            ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
              "Start02";
            var e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
            (e.FragmentMemoryTopicData = t),
              UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e),
              UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !1);
          }, HIDEVIEWDELAY);
      }),
      (this.Uwn = (e) => {
        let t = !1;
        this.Ovt();
        for (const i of this.Lwn)
          if (i.Id === e) {
            (this.Twn = i), (t = !0);
            break;
          }
        t || (this.Twn = void 0),
          ModelManager_1.ModelManager.FragmentMemoryModel.SaveTopicOpened(e),
          this.SPe?.PlayLevelSequenceByName("SwitchOut");
      }),
      (this.Awn = (t) => {
        let i = 0;
        for (let e = 0; e < this.Dwn.length; e++)
          if (this.Dwn[e] === t) {
            i = e;
            break;
          }
        this.ELo?.AttachToIndex(i, !1);
      }),
      (this.Rwn = () => {
        this.Qho();
      }),
      (this.yTn = (e) => {
        "SwitchOut" === e &&
          (this.Og(), this.SPe?.PlayLevelSequenceByName("SwitchIn"));
      }),
      (this.ILo = (e, t, i) => {
        return new MemoryDetailAttachItem_1.MemoryDetailAttachItem(e);
      }),
      (this.pFe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UITexture],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFragmentTopicSelect,
      this.Uwn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFragmentTopicClick,
        this.Awn,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFragmentTopicSelect,
      this.Uwn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFragmentTopicClick,
        this.Awn,
      );
  }
  OnStart() {
    (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(3))),
      this.p9t.SetFunction(this.Rwn),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.pFe),
      this.lqe.SetHelpBtnActive(!0);
    var e = this.GetItem(1),
      t = this.GetItem(6);
    (this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner())),
      this.ELo?.SetControllerItem(t),
      this.ELo.CreateItems(this.GetItem(2).GetOwner(), 0, this.ILo, 1),
      this.GetItem(2).SetUIActive(!1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.yTn);
  }
  OnBeforeShow() {
    if (
      ((this.Lwn =
        ModelManager_1.ModelManager.FragmentMemoryModel.GetAllFragmentTopic()),
      this.OpenParam)
    ) {
      var e = this.OpenParam;
      for (const t of this.Lwn)
        if (t.Id === e) {
          this.Twn = t;
          break;
        }
    } else this.Twn = this.Lwn[0];
    this.Og(), this.xwn(), this.UiBlurBehaviour?.ChangeNeedBlurState(!1);
  }
  xwn() {
    this.Dwn = [];
    for (const t of this.Lwn) this.Dwn.push(t.Id);
    this.Dwn.push(-1);
    var e = this.Dwn.indexOf(this.Twn.Id);
    this.ELo?.ReloadView(this.Dwn.length, this.Dwn),
      this.ELo?.AttachToIndex(e, !0);
  }
  Og() {
    this.ZGe(), this.L8i(), this.Pwn(), this.BNe(), this.PKt(), this.LNn();
  }
  Ovt() {
    this.Twn && this.p9t?.UnBindGivenUid(this.Twn.Id);
  }
  BNe() {
    this.Twn && this.p9t?.BindGivenUid("FragmentMemoryTopic", this.Twn.Id);
  }
  wwn() {
    return ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicUnlockState(
      this.Twn.Id,
    );
  }
  ZGe() {
    void 0 !== this.Twn && this.p9t?.SetActive(this.wwn());
  }
  L8i() {
    this.Twn && this.GetItem(4)?.SetUIActive(!this.wwn());
  }
  Pwn() {
    var e;
    void 0 === this.Twn ||
      this.wwn() ||
      ((e =
        ModelManager_1.ModelManager.FragmentMemoryModel.GetUnlockConditionText(
          this.Twn.Id,
        )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e));
  }
  PKt() {
    var e = void 0 !== this.Twn;
    this.GetItem(7)?.SetUIActive(e), this.GetItem(8)?.SetUIActive(!e);
  }
  LNn() {
    var e;
    void 0 !== this.Twn &&
      ((e = this.Twn.TopicTexture),
      this.SetTextureByPath(e, this.GetTexture(9)));
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
      "ShowView02";
  }
}
exports.MemoryDetailView = MemoryDetailView;
//# sourceMappingURL=MemoryDetailView.js.map
