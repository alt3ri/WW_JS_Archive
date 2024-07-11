"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComboTeachingNode = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  CommonKeyItem_1 = require("../../BattleUi/Views/KeyItem/CommonKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ComboTeachingController_1 = require("../ComboTeachingController"),
  KeyMap = new Map([
    ["攻击", InputEnums_1.EInputAction.攻击],
    ["技能", InputEnums_1.EInputAction.技能1],
    ["大招", InputEnums_1.EInputAction.大招],
    ["跳跃", InputEnums_1.EInputAction.跳跃],
    ["瞄准", InputEnums_1.EInputAction.瞄准],
    ["闪避", InputEnums_1.EInputAction.闪避],
    ["普通#1", InputEnums_1.EInputAction.攻击],
    ["技能#1", InputEnums_1.EInputAction.技能1],
    ["大招#1", InputEnums_1.EInputAction.大招],
    ["跳跃#1", InputEnums_1.EInputAction.跳跃],
    ["瞄准#1", InputEnums_1.EInputAction.瞄准],
    ["闪避#1", InputEnums_1.EInputAction.闪避],
  ]),
  ActionMap = new Map([
    ["攻击", InputMappingsDefine_1.actionMappings.攻击],
    ["技能", InputMappingsDefine_1.actionMappings.技能1],
    ["大招", InputMappingsDefine_1.actionMappings.大招],
    ["跳跃", InputMappingsDefine_1.actionMappings.跳跃],
    ["瞄准", InputMappingsDefine_1.actionMappings.瞄准],
    ["闪避", InputMappingsDefine_1.actionMappings.闪避],
    ["普通#1", InputMappingsDefine_1.actionMappings.攻击],
    ["技能#1", InputMappingsDefine_1.actionMappings.技能1],
    ["大招#1", InputMappingsDefine_1.actionMappings.大招],
    ["跳跃#1", InputMappingsDefine_1.actionMappings.跳跃],
    ["瞄准#1", InputMappingsDefine_1.actionMappings.瞄准],
    ["闪避#1", InputMappingsDefine_1.actionMappings.闪避],
  ]);
class ComboTeachingNode extends UiPanelBase_1.UiPanelBase {
  constructor(i, t) {
    super(),
      (this.Pyt = InputEnums_1.EInputAction.None),
      (this.Xy = 0),
      (this.HoldTime = -0),
      (this.HoldTotalTime = -0),
      (this.SuccessCondition = void 0),
      (this.FailUpdateCondition = new Array()),
      (this.FailEventCondition = new Array()),
      (this.IsEmit = !1),
      (this.IsHoldAction = !1),
      (this.IsShowTag = !1),
      (this.EPe = void 0),
      (this.GuideGroupIdList = []),
      (this.KeyComponent = void 0),
      (this.CurConfig = void 0),
      (this.Xy = i),
      (this.CurConfig = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.GetItem(9).SetUIActive(
        ModelManager_1.ModelManager.PlatformModel.IsPc(),
      ),
      (this.KeyComponent = new CommonKeyItem_1.CommonKeyItem()),
      ModelManager_1.ModelManager.PlatformModel?.IsMobile()
        ? await this.KeyComponent.CreateByActorAsync(this.GetItem(9).GetOwner())
        : await this.KeyComponent.CreateThenShowByActorAsync(
            this.GetItem(9).GetOwner(),
          ),
      this.InitNode(this.Xy, this.CurConfig);
  }
  OnBeforeDestroy() {
    this.EPe.Clear(), (this.EPe = void 0), (this.KeyComponent = void 0);
  }
  InitNode(i, t) {
    const e =
      ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConditionConfig(
        t.CommandID[i],
      );
    var s, n;
    (this.GuideGroupIdList = t.guideID),
      (this.SuccessCondition =
        ComboTeachingController_1.ComboTeachingController.GetSuccessChecker(
          e.CompleteCondition,
          e.CompleteParam,
        )),
      (this.FailUpdateCondition.length = 0),
      (this.FailEventCondition.length = 0),
      e.FailedCondition.forEach((i, t) => {
        var s =
          ComboTeachingController_1.ComboTeachingController.GetFailChecker(
            i,
            e.FailedParam[t],
          );
        switch (s.Type) {
          case 0:
            this.FailEventCondition.push(s);
            break;
          case 1:
            this.FailUpdateCondition.push(s);
        }
      }),
      (this.Xy = i),
      (this.IsEmit = !1),
      0 === t.KeyID[i]?.length || void 0 === t.KeyID[i]
        ? this.RootItem.SetAlpha(0)
        : ((s = t.KeyID[i].split(";")[1]),
          (n = t.KeyID[i].split(";")[0]),
          (this.Pyt = KeyMap.get(n.split("#")[0])),
          this.KeyComponent?.RefreshAction(ActionMap.get(n.split("#")[0])),
          (this.IsHoldAction = n.includes("#")),
          (this.IsShowTag =
            t.IconTagText.length > i && "" !== t.IconTagText[i]),
          this.IsHoldAction &&
            ((this.HoldTotalTime = Number(n.split("#")[1])),
            this.EPe.PlayLevelSequenceByName("AutoLoop")),
          this.EPe.StopCurrentSequence(),
          this.EPe.PlayLevelSequenceByName("Start"),
          s &&
            ((n = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
            (n = EntitySystem_1.EntitySystem.Get(n)
              .GetComponent(33)
              .GetSkillInfo(Number(s)))) &&
            this.SetSpriteByPath(
              n.SkillIcon?.AssetPathName?.toString(),
              this.GetSprite(0),
              !1,
              "ComboTeachingView",
            ),
          t.IconTagText.length > i &&
            "" !== t.IconTagText[i] &&
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(5),
              t.IconTagText[i],
            ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.IconText[i]),
          LguiUtil_1.LguiUtil.ReplaceWildCard(this.GetText(7)),
          this.GetSprite(3).SetFillAmount(0),
          this.GetItem(4)?.SetUIActive(this.IsShowTag),
          this.GetSprite(3).SetUIActive(this.IsHoldAction),
          this.GetItem(10).SetUIActive(this.IsHoldAction));
  }
  Refresh(i) {
    i === this.Xy
      ? (this.GetSprite(1).SetUIActive(!1),
        this.GetSprite(2).SetUIActive(!1),
        this.GetItem(6).SetUIActive(!0))
      : i < this.Xy
        ? (this.GetSprite(1).SetUIActive(!1),
          this.GetSprite(2).SetUIActive(!1),
          this.GetItem(6).SetUIActive(!1))
        : i > this.Xy &&
          (this.GetSprite(1).SetUIActive(!0),
          this.GetSprite(2).SetUIActive(!1),
          this.GetItem(6).SetUIActive(!1));
  }
  PlayFailAnimation() {
    this.GetSprite(2).SetUIActive(!0),
      this.EPe.StopCurrentSequence(),
      this.EPe.PlayLevelSequenceByName("ClickRigMIs");
  }
  PlaySuccessAnimation() {
    this.GetSprite(1).SetUIActive(!0),
      this.EPe.StopCurrentSequence(),
      this.EPe.PlayLevelSequenceByName("ClickRigMIs");
  }
  OnPress(i, t) {}
  OnRelease(i, t) {
    (this.HoldTime = 0),
      this.GetSprite(3).SetFillAmount(0),
      this.EPe.StopSequenceByKey("LongPress"),
      this.IsHoldAction && this.EPe.PlayLevelSequenceByName("AutoLoop"),
      !this.IsEmit &&
        this.IsHoldAction &&
        this.GetItem(4)?.SetUIActive(this.IsShowTag),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!0);
  }
  OnHold(i, t) {
    this.IsHoldAction &&
      i === this.Pyt &&
      ((this.HoldTime = t),
      this.GetItem(4)?.SetUIActive(this.IsShowTag),
      this.GetSprite(3).SetFillAmount(this.HoldTime / this.HoldTotalTime),
      "LongPress" !== this.EPe.GetCurrentSequence()) &&
      (this.EPe.PlayLevelSequenceByName("LongPress"),
      this.GetItem(8).SetUIActive(!0),
      this.GetItem(6).SetUIActive(!1));
  }
  OnUseSkill(i) {
    0 === this.SuccessCondition.Type && this.CheckSuccessCondition(),
      this.IsHoldAction || this.CheckFailEventCondition();
  }
  CheckAllCondition() {
    if (this.SuccessCondition.Check(this))
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ComboTeachingNodeEnd,
        this,
        !0,
      ),
        (this.IsEmit = !0);
    else {
      let t = !1;
      this.FailUpdateCondition.forEach((i) => {
        t = i.Check(this) || t;
      }),
        t &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ComboTeachingNodeEnd,
            this,
            !1,
          ),
          (this.IsEmit = !0));
    }
  }
  OnTick(i) {
    this.IsEmit ||
      (1 === this.SuccessCondition.Type && this.CheckSuccessCondition()) ||
      this.CheckFailCondition();
  }
  CheckSuccessCondition() {
    return (
      !(!this.SuccessCondition.Check(this) || this.IsEmit) &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ComboTeachingNodeEnd,
        this,
        !0,
      ),
      this.EPe.StopSequenceByKey("LongPress"),
      this.EPe.StopCurrentSequence(),
      this.EPe.PlayLevelSequenceByName("ClickRigMIs"),
      this.GetItem(8).SetUIActive(!1),
      (this.IsEmit = !0))
    );
  }
  CheckFailCondition() {
    if (!this.IsEmit) {
      let t = !1;
      this.FailUpdateCondition.forEach((i) => {
        t = i.Check(this) || t;
      }),
        t &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ComboTeachingNodeEnd,
            this,
            !1,
          ),
          this.EPe.StopCurrentSequence(),
          this.EPe.PlayLevelSequenceByName("ClickRigMIs"),
          (this.IsEmit = !0));
    }
  }
  CheckFailEventCondition() {
    if (!this.IsEmit) {
      let t = !1;
      this.FailEventCondition.forEach((i) => {
        t = i.Check(this) || t;
      }),
        t &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ComboTeachingNodeEnd,
            this,
            !1,
          ),
          this.EPe.StopCurrentSequence(),
          this.EPe.PlayLevelSequenceByName("ClickRigMIs"),
          (this.IsEmit = !0));
    }
  }
  OnBulletHit(i) {
    this.CheckSuccessCondition();
  }
}
exports.ComboTeachingNode = ComboTeachingNode;
//# sourceMappingURL=ComboTeachingNode.js.map
