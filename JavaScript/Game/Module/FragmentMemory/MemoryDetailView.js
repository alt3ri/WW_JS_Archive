"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MemoryDetailView = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const NoCircleAttachView_1 = require("../AutoAttach/NoCircleAttachView");
const ButtonItem_1 = require("../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
const FragmentMemoryData_1 = require("./FragmentMemoryData");
const MemoryDetailAttachItem_1 = require("./MemoryDetailAttachItem");
const FRAGMENTMEMORYMASK = "FragmentMemoryMask";
const HIDEVIEWDELAY = 600;
class MemoryDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.ITo = void 0),
      (this.QUn = void 0),
      (this.XUn = []),
      (this.$Un = []),
      (this.p8t = void 0),
      (this.EPe = void 0),
      (this.Yao = () => {
        const t =
          ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
            this.QUn.Id,
          );
        this.EPe?.PlaySequencePurely("HideView"),
          UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !0),
          TimerSystem_1.TimerSystem.Delay(() => {
            ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
              "Start02";
            const e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
            (e.FragmentMemoryTopicData = t),
              UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e),
              UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !1);
          }, HIDEVIEWDELAY);
      }),
      (this.YUn = (e) => {
        let t = !1;
        for (const i of this.XUn)
          if (i.Id === e) {
            (this.QUn = i), (t = !0);
            break;
          }
        t || (this.QUn = void 0),
          this.EPe?.PlayLevelSequenceByName("SwitchOut");
      }),
      (this.JUn = (t) => {
        let i = 0;
        for (let e = 0; e < this.$Un.length; e++)
          if (this.$Un[e] === t) {
            i = e;
            break;
          }
        this.ITo?.AttachToIndex(i, !1);
      }),
      (this.zUn = () => {
        this.Yao();
      }),
      (this.iIn = (e) => {
        e === "SwitchOut" &&
          (this.Og(), this.EPe?.PlayLevelSequenceByName("SwitchIn"));
      }),
      (this.DTo = (e, t, i) => {
        return new MemoryDetailAttachItem_1.MemoryDetailAttachItem(e);
      }),
      (this.i2e = () => {
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
      this.YUn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFragmentTopicClick,
        this.JUn,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFragmentTopicSelect,
      this.YUn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFragmentTopicClick,
        this.JUn,
      );
  }
  OnStart() {
    (this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(3))),
      this.p8t.SetFunction(this.zUn),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.i2e),
      this.lqe.SetHelpBtnActive(!0);
    const e = this.GetItem(1);
    const t = this.GetItem(6);
    (this.ITo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner())),
      this.ITo?.SetControllerItem(t),
      this.ITo.CreateItems(this.GetItem(2).GetOwner(), 0, this.DTo, 1),
      this.GetItem(2).SetUIActive(!1),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.EPe.BindSequenceCloseEvent(this.iIn);
  }
  OnBeforeShow() {
    if (
      ((this.XUn =
        ModelManager_1.ModelManager.FragmentMemoryModel.GetAllFragmentTopic()),
      this.OpenParam)
    ) {
      const e = this.OpenParam;
      for (const t of this.XUn)
        if (t.Id === e) {
          this.QUn = t;
          break;
        }
    } else this.QUn = this.XUn[0];
    this.Og(), this.ZUn(), this.UiBlurBehaviour?.ChangeNeedBlurState(!1);
  }
  ZUn() {
    this.$Un = [];
    for (const t of this.XUn) this.$Un.push(t.Id);
    this.$Un.push(-1), this.ITo?.ReloadView(this.$Un.length, this.$Un);
    const e = this.$Un.indexOf(this.QUn.Id);
    this.ITo?.AttachToIndex(e, !0);
  }
  Og() {
    this.ZGe(), this.D6i(), this.exn(), this.BNe(), this.PWt(), this.cGn();
  }
  BNe() {
    this.p8t?.UnBindRedDot(),
      this.QUn && this.p8t?.BindRedDot("FragmentMemoryTopic", this.QUn.Id);
  }
  txn() {
    return ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicUnlockState(
      this.QUn.Id,
    );
  }
  ZGe() {
    void 0 !== this.QUn && this.p8t?.SetActive(this.txn());
  }
  D6i() {
    this.QUn && this.GetItem(4)?.SetUIActive(!this.txn());
  }
  exn() {
    let e;
    void 0 === this.QUn ||
      this.txn() ||
      ((e =
        ModelManager_1.ModelManager.FragmentMemoryModel.GetUnlockConditionText(
          this.QUn.Id,
        )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e));
  }
  PWt() {
    const e = void 0 !== this.QUn;
    this.GetItem(7)?.SetUIActive(e), this.GetItem(8)?.SetUIActive(!e);
  }
  cGn() {
    let e;
    void 0 !== this.QUn &&
      ((e = this.QUn.TopicTexture),
      this.SetTextureByPath(e, this.GetTexture(9)));
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
      "ShowView02";
  }
}
exports.MemoryDetailView = MemoryDetailView;
// # sourceMappingURL=MemoryDetailView.js.map
