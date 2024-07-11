"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSkillView = void 0);
const UE = require("ue");
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeSkillDetail_1 = require("./RoguelikeSkillDetail");
const RoguelikeSkillGridPanel_1 = require("./RoguelikeSkillGridPanel");
class RoguelikeSkillView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.SkillTreeConfigList = new Array()),
      (this.SkillGridList = []),
      (this.CaptionItem = void 0),
      (this.CurSelectNode = void 0),
      (this.SkillDetailPanel = void 0),
      (this.ScrollView = void 0),
      (this.SelectColumn = 0),
      (this.ExecuteCount = 1),
      (this.CreateGridPanel = () => {
        return new RoguelikeSkillGridPanel_1.RoguelikeSkillGridPanel();
      }),
      (this.OnSkillLevelUp = (e) => {
        this.ScrollView?.GetScrollItemList().forEach((e) => {
          e.NodeMap.forEach((e) => {
            e.Refresh(),
              this.CaptionItem.SetCurrencyItemList([
                RoguelikeDefine_1.SKILL_POINT_ID,
              ]);
          });
        });
      }),
      (this.OnBtnMaskClick = () => {
        this.GetButton(6)
          .GetOwner()
          .GetComponentByClass(UE.UIItem.StaticClass())
          .SetUIActive(!1),
          this.SkillDetailPanel.SetActive(!1),
          this.CurSelectNode.SetToggleState(0);
      }),
      (this.OnBtnSkillOverViewClick = () => {
        UiManager_1.UiManager.OpenView("RoguelikeSkillOverView");
      }),
      (this.OnSelectSkill = (e) => {
        this.CurSelectNode && this.CurSelectNode.SetToggleState(0),
          (ModelManager_1.ModelManager.RoguelikeModel.SelectSkillId =
            e.Data.Id),
          (this.CurSelectNode = e),
          this.CurSelectNode.SetToggleState(1),
          this.SelectColumn === -1 &&
            this.ScrollView?.ScrollTo(e.GridPanelItem),
          this.SkillDetailPanel.Refresh(e.Data),
          this.SkillDetailPanel.SetActive(!0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.OnBtnSkillOverViewClick],
        [6, this.OnBtnMaskClick],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.SkillDetailPanel = new RoguelikeSkillDetail_1.RoguelikeSkillDetail()),
      await this.SkillDetailPanel.CreateThenShowByActorAsync(
        this.GetItem(1).GetOwner(),
      ),
      (this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(3),
        this.CreateGridPanel,
        this.GetItem(5).GetOwner(),
      )),
      this.BuildSkillTreeConfig(),
      await this.ScrollView.RefreshByDataAsync(this.SkillTreeConfigList);
  }
  OnStart() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(0),
    )),
      this.CaptionItem.SetCloseCallBack(() => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      this.ScrollView.BindLateUpdate((e) => {
        let i;
        this.SelectColumn > 0 &&
          this.ExecuteCount === 2 &&
          ((i = this.ScrollView.GetItemByIndex(this.SelectColumn)),
          this.ScrollView?.ScrollTo(i),
          (this.SelectColumn = -1),
          this.ScrollView.UnBindLateUpdate()),
          this.ExecuteCount++;
      }),
      this.CaptionItem?.SetCurrencyItemList([RoguelikeDefine_1.SKILL_POINT_ID]);
  }
  OnBeforeDestroy() {
    this.ScrollView?.UnBindLateUpdate();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeSelectSkill,
      this.OnSelectSkill,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeTalentLevelUp,
        this.OnSkillLevelUp,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeSelectSkill,
      this.OnSelectSkill,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeTalentLevelUp,
        this.OnSkillLevelUp,
      );
  }
  BuildSkillTreeConfig() {
    const i = this.OpenParam;
    let e = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeConfig(),
    );
    (e = e?.filter((e) => e.SeasonId === i))?.sort(
      (e, i) => e.Column - i.Column,
    );
    for (const t of e)
      this.SkillTreeConfigList[t.Column] ||
        (this.SkillTreeConfigList[t.Column] = new Array()),
        ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
          t.Id,
        ) === 0 &&
          t.Column > this.SelectColumn &&
          (this.SelectColumn = t.Column),
        this.SkillTreeConfigList[t.Column].push(t);
    for (const s of this.SkillTreeConfigList) s?.sort((e, i) => e.Row - i.Row);
    ModelManager_1.ModelManager.RoguelikeModel.SelectSkillId =
      ModelManager_1.ModelManager.RoguelikeModel.GetNextCanUnlockSkillId();
  }
}
exports.RoguelikeSkillView = RoguelikeSkillView;
// # sourceMappingURL=RoguelikeSkillView.js.map
