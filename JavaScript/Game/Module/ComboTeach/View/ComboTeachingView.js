"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComboTeachingView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  InputController_1 = require("../../../Input/InputController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GuideController_1 = require("../../Guide/GuideController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ComboTeachingInputHandler_1 = require("../ComboTeachingInputHandler"),
  ComboTeachingNode_1 = require("./ComboTeachingNode"),
  SHOW_TIP_ID = "12900001",
  BEFORE_JUMP_TIME = 100;
class ComboTeachingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.HIt = void 0),
      (this.jIt = 0),
      (this.WIt = 0),
      (this.KIt = void 0),
      (this.QIt = new Map()),
      (this.XIt = []),
      (this.$It = !1),
      (this.YIt = !1),
      (this.JIt = 0),
      (this.OnPress = (e, t) => {
        this.XIt[this.WIt]?.OnPress(e, t);
      }),
      (this.OnRelease = (e, t) => {
        this.XIt[this.WIt]?.OnRelease(e, t);
      }),
      (this.OnHold = (e, t) => {
        this.XIt[this.WIt]?.OnHold(e, t);
      }),
      (this.OnNodeEnd = (e, t) => {
        const i = this.GetItem(0);
        (ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = !0),
          t
            ? ((t = this.XIt[this.WIt + 1]),
              e.Refresh(this.WIt + 1),
              t
                ? ((this.WIt = this.WIt + 1),
                  this.PlayMoveLeftTweenAnimation(),
                  t.Refresh(this.WIt))
                : ((this.WIt = this.WIt + 1),
                  0 < this.KIt.NextRoleGuideID
                    ? 0 ===
                      ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(
                        this.KIt.NextRoleGuideID,
                      ).KeyID.length
                      ? TimerSystem_1.TimerSystem.Delay(() => {
                          (ModelManager_1.ModelManager.ComboTeachingModel.IsClose =
                            !0),
                            EventSystem_1.EventSystem.Emit(
                              EventDefine_1.EEventName.ComboTeachingCloseGuide,
                            ),
                            (UiManager_1.UiManager.IsViewOpen(
                              "ComboTeachingView",
                            ) ||
                              UiManager_1.UiManager.IsViewHide(
                                "ComboTeachingView",
                              )) &&
                              this.CloseMe((e) => {
                                e &&
                                  UiManager_1.UiManager.OpenView(
                                    "ComboTeachingView",
                                    this.KIt.NextRoleGuideID,
                                  );
                              });
                        }, 200)
                      : ((ModelManager_1.ModelManager.ComboTeachingModel.IsClose =
                          !0),
                        EventSystem_1.EventSystem.Emit(
                          EventDefine_1.EEventName.ComboTeachingCloseGuide,
                        ),
                        (UiManager_1.UiManager.IsViewOpen(
                          "ComboTeachingView",
                        ) ||
                          UiManager_1.UiManager.IsViewHide(
                            "ComboTeachingView",
                          )) &&
                          this.CloseMe((e) => {
                            e &&
                              UiManager_1.UiManager.OpenView(
                                "ComboTeachingView",
                                this.KIt.NextRoleGuideID,
                              );
                          }))
                    : this.$It ||
                      ((this.$It = !0),
                      (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0),
                      (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0),
                      (ModelManager_1.ModelManager.ComboTeachingModel.HitSkillId = 0),
                      (ModelManager_1.ModelManager.ComboTeachingModel.NextAttr =
                        !1),
                      (ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr =
                        !1),
                      this.PlayMoveLeftTweenAnimation(() => {
                        i?.SetUIActive(!1);
                        var e =
                            ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(
                              SHOW_TIP_ID,
                            ),
                          t =
                            ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(
                              SHOW_TIP_ID,
                            );
                        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
                          e.TypeId,
                          t,
                          void 0,
                          void 0,
                          void 0,
                          Number(SHOW_TIP_ID),
                          () => {
                            EventSystem_1.EventSystem.Emit(
                              EventDefine_1.EEventName.ComboTeachingFinish,
                            ),
                              (UiManager_1.UiManager.IsViewOpen(
                                "ComboTeachingView",
                              ) ||
                                UiManager_1.UiManager.IsViewHide(
                                  "ComboTeachingView",
                                )) &&
                                this.CloseMe(),
                              (ModelManager_1.ModelManager.ComboTeachingModel.IsClose =
                                !0),
                              EventSystem_1.EventSystem.Emit(
                                EventDefine_1.EEventName
                                  .ComboTeachingCloseGuide,
                              );
                          },
                        );
                      }))))
            : (e.PlayFailAnimation(),
              this.OnRemoveEventListener(),
              (this.YIt = !0),
              TimerSystem_1.TimerSystem.Delay(() => {
                UE.LGUIBPLibrary.AnchorOffsetXTo(i, this.JIt, 0, 0, 0),
                  (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0),
                  (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0),
                  (ModelManager_1.ModelManager.ComboTeachingModel.HitSkillId = 0),
                  (ModelManager_1.ModelManager.ComboTeachingModel.NextAttr =
                    !1),
                  (ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr =
                    !1),
                  (this.WIt = 0),
                  (ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !0),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ComboTeachingCloseGuide,
                  ),
                  UiManager_1.UiManager.IsViewOpen("ComboTeachingView") &&
                    (this.CloseMe(),
                    TimerSystem_1.TimerSystem.Delay(() => {
                      UiManager_1.UiManager.OpenView(
                        "ComboTeachingView",
                        ModelManager_1.ModelManager.ComboTeachingModel
                          .RecoveryComboId,
                      );
                    }, 100));
              }, 1e3));
      }),
      (this.OnCharUseSkill = (e, t, i) => {
        if (!this.$It) {
          e = EntitySystem_1.EntitySystem.Get(e);
          if (e)
            if (
              e.GetComponent(0)?.GetEntityType() !==
              Protocol_1.Aki.Protocol.kks.Proto_Player
            )
              return;
          (ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = !1),
            (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = t),
            (ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr = !1),
            (ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = !1),
            this.XIt[this.WIt]?.OnUseSkill(t);
        }
      }),
      (this.OnCharEndSkill = (e, t) => {
        e = EntitySystem_1.EntitySystem.Get(e);
        if (
          e &&
          e.GetComponent(0)?.GetEntityType() !==
            Protocol_1.Aki.Protocol.kks.Proto_Player
        )
          return;
        (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0),
          (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0);
      }),
      (this.OnNextAttrChanged = (e, t) => {
        this.$It ||
          ((ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = t),
          (ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId = e));
      }),
      (this.OnHit = (e) => {
        var t;
        this.$It ||
          ((t = e.Attacker.GetComponent(34)),
          (ModelManager_1.ModelManager.ComboTeachingModel.HitSkillId =
            t?.CurrentSkill?.SkillId ?? 0),
          this.XIt[this.WIt]?.OnBulletHit(e));
      }),
      (this.OnOpenLoading = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    (this.WIt = 0),
      this.QIt.set("普攻", [
        "战斗状态.输入限制.禁止攻击",
        "功能.功能制作.隐藏按钮功能.隐藏普攻按键",
      ]),
      this.QIt.set("技能", [
        "战斗状态.输入限制.禁止技能",
        "功能.功能制作.隐藏按钮功能.隐藏技能按键",
      ]),
      this.QIt.set("大招", [
        "战斗状态.输入限制.禁止大招",
        "功能.功能制作.隐藏按钮功能.隐藏大招按键",
      ]),
      this.QIt.set("跳跃", [
        "战斗状态.输入限制.禁止跳跃",
        "功能.功能制作.隐藏按钮功能.隐藏跳跃按键",
      ]),
      this.QIt.set("瞄准", ["战斗状态.输入限制.禁止瞄准开镜"]),
      this.QIt.set("幻象", [
        "战斗状态.输入限制.禁止幻象1",
        "战斗状态.输入限制.禁止幻象2",
        "功能.功能制作.隐藏按钮功能.隐藏探索幻象按键",
        "功能.功能制作.隐藏按钮功能.隐藏攻击幻象按键",
      ]),
      this.QIt.set("闪避", [
        "战斗状态.输入限制.禁止闪避",
        "功能.功能制作.隐藏按钮功能.隐藏冲刺按键",
      ]),
      (ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !1),
      this.RefreshComboList(this.OpenParam),
      this.InitComboInputHandler();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ComboTeachingPress,
      this.OnPress,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComboTeachingRelease,
        this.OnRelease,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComboTeachingHold,
        this.OnHold,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComboTeachingNodeEnd,
        this.OnNodeEnd,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.OnCharUseSkill,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillEnd,
        this.OnCharEndSkill,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SkillAcceptChanged,
        this.OnNextAttrChanged,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BulletHit,
        this.OnHit,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.OnOpenLoading,
      );
  }
  OnRemoveEventListener() {
    this.YIt ||
      (EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComboTeachingPress,
        this.OnPress,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComboTeachingRelease,
        this.OnRelease,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComboTeachingHold,
        this.OnHold,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComboTeachingNodeEnd,
        this.OnNodeEnd,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharUseSkill,
        this.OnCharUseSkill,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SkillAcceptChanged,
        this.OnNextAttrChanged,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BulletHit,
        this.OnHit,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.OnOpenLoading,
      ));
  }
  OnBeforeDestroy() {
    if (
      (InputController_1.InputController.RemoveInputHandler(this.HIt),
      void 0 === Global_1.Global.BaseCharacter)
    )
      (ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.length = 0),
        (ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.length = 0);
    else {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
        e = EntitySystem_1.EntitySystem.Get(e);
      const t = e?.GetComponent(190),
        i =
          (ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.forEach(
            (e) => {
              t?.RemoveTag(
                GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
              );
            },
          ),
          (ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.length = 0),
          e?.GetComponent(160));
      ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.forEach(
        (e) => {
          i?.GetBuffTotalStackById(BigInt(e)) &&
            0 < i?.GetBuffTotalStackById(BigInt(e)) &&
            i?.RemoveBuff(BigInt(e), -1, "ComboTeachingView.OnBeforeDestroy");
        },
      ),
        (ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.length = 0);
    }
  }
  RefreshComboList(e) {
    (this.WIt = 0),
      (this.jIt = e),
      (this.KIt =
        ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(
          this.jIt,
        ));
    (e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
      (e = EntitySystem_1.EntitySystem.Get(e));
    const t = e?.GetComponent(190),
      i = e?.GetComponent(160);
    ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.forEach((e) => {
      t?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
    }),
      (ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.length = 0),
      this.QIt.forEach((e, t) => {
        this.KIt.InputEnums.includes(t) ||
          ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.push(...e);
      }),
      ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.forEach((e) => {
        e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
        t.HasTag(e) || t?.AddTag(e);
      }),
      ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.forEach(
        (e) => {
          i?.GetBuffTotalStackById(BigInt(e)) &&
            0 < i?.GetBuffTotalStackById(BigInt(e)) &&
            i?.RemoveBuff(BigInt(e), -1, "ComboTeachingView.RefreshComboList");
        },
      ),
      (ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.length = 0),
      this.KIt.AddBuffID.forEach((e) => {
        ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.push(e);
      }),
      ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.forEach(
        (e) => {
          i?.AddBuff(e, {
            InstigatorId: i?.CreatureDataId,
            Reason: "CombatTeachingView.RefreshComboList",
          });
        },
      ),
      this.KIt.guideID.forEach((e, t) => {
        GuideController_1.GuideController.TryStartGuide(e);
      }),
      this.GetItem(3).SetUIActive(!0);
    for (let e = 0; e < this.KIt.CommandID.length; e++)
      if (this.XIt.length > e)
        (this.XIt[e].CurConfig = this.KIt), this.XIt[e].Refresh(this.WIt);
      else {
        var n = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(0));
        const s = new ComboTeachingNode_1.ComboTeachingNode(e, this.KIt);
        s.CreateThenShowByActorAsync(n.GetOwner()).then(() => {
          s.Refresh(this.WIt);
        }),
          this.XIt.push(s);
      }
    var e = this.GetItem(3).GetWidth() + 220 * (this.XIt.length - 1),
      a = this.GetItem(0).GetParentAsUIItem().GetWidth();
    a < e &&
      ((this.JIt = (e - a) / 2), this.GetItem(0).SetAnchorOffsetX(this.JIt)),
      this.GetItem(3).SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        this.KIt.DescriptionTitle,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        this.KIt.DescriptionContent,
      );
  }
  InitComboInputHandler() {
    (this.HIt = new ComboTeachingInputHandler_1.ComboTeachingInputHandler()),
      InputController_1.InputController.AddInputHandler(this.HIt);
  }
  PlayMoveLeftTweenAnimation(e) {
    var t = this.GetItem(0);
    let i = !1,
      n = 0;
    for (let e = 0; e < this.KIt.KeyID.length; e++)
      if ((0 < this.KIt.KeyID[e].length && n++, 1 < n)) {
        i = !0;
        break;
      }
    i
      ? ((t = UE.LGUIBPLibrary.AnchorOffsetXTo(
          t,
          -100 * this.WIt + this.JIt,
          0.25,
          0,
          14,
        )),
        e && t.OnCompleteCallBack.Bind(e))
      : e &&
        TimerSystem_1.TimerSystem.Delay(() => {
          e();
        }, 1e3);
  }
  OnTick(e) {
    var t;
    0 !== ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId &&
      (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime += e),
      (ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime -= e),
      ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime < 0 &&
        (ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime = 0),
      Global_1.Global.BaseCharacter &&
        ((t = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
        (EntitySystem_1.EntitySystem.Get(t)?.GetComponent(164)).IsJump) &&
        0 === ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime &&
        (ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime =
          BEFORE_JUMP_TIME),
      this.XIt[this.WIt]?.OnTick(e);
  }
}
exports.ComboTeachingView = ComboTeachingView;
//# sourceMappingURL=ComboTeachingView.js.map
