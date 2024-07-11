"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    var o,
      r = arguments.length,
      s =
        r < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, i, n);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (s = (r < 3 ? o(s) : 3 < r ? o(e, i, s) : o(e, i)) || s);
    return 3 < r && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnHeadInfoComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
  NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent"),
  UiModel_1 = require("../../../../Ui/UiModel"),
  CharacterActorComponent_1 = require("./CharacterActorComponent"),
  CHECK_QUEST_ICON_INTERVAL = 1e3;
let PawnHeadInfoComponent = class PawnHeadInfoComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.xJr = void 0),
      (this.wJr = void 0),
      (this.BJr = void 0),
      (this.bJr = void 0),
      (this.hor = void 0),
      (this.qJr = !1),
      (this.GJr = !1),
      (this.Jia = !0),
      (this.e8 = 0),
      (this.NJr = !1),
      (this.j$s = () => {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBornFinished,
          this.j$s,
        ),
          this.W$s();
      }),
      (this.OJr = () => {
        this.kJr(), this.FJr();
      }),
      (this.OnEntityWasRecentlyRenderedOnScreenChange = (t) => {
        if (this.VJr() === Protocol_1.Aki.Protocol.wks.Proto_SceneItem) {
          var e = this.Hte;
          if (
            !e ||
            0 === e.PrefabRadius ||
            e.CurLevelPrefabShowActor?.IsA(UE.TsEffectActor_C.StaticClass())
          )
            return void this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(!0);
        }
        this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(t);
      }),
      (this.iZe = (t, e) => {
        this.HJr();
      }),
      (this.jJr = () => {
        this.hor?.SetRootItemState(!1);
      }),
      (this.WJr = () => {
        if (this.hor)
          if (this.BJr) {
            var e = this.BJr.GetInteractController();
            if (e) {
              e = e.Options.find(
                (t) =>
                  !!t.Context &&
                  (2 === t.Context.Type || 6 === t.Context.Type) &&
                  ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
                    t.Condition,
                    this.Hte.Owner,
                  ),
              );
              if (e) {
                var i = e.Context;
                let t = void 0;
                switch (i.Type) {
                  case 2:
                    var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
                      i.QuestId,
                    );
                    n && !n.HideAcceptQuestMark && (t = n.QuestMarkId);
                    break;
                  case 6:
                    var o,
                      n =
                        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
                          i.TreeIncId,
                        );
                    n &&
                      n.BtType ===
                        Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest &&
                      (o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
                        i.TreeConfigId,
                      )) &&
                      4 === o.Type &&
                      (o = n.GetNode(i.NodeId)) &&
                      o.ContainTag(0) &&
                      (t = n.GetTrackIconId());
                }
                this.hor.SetNpcQuest(t);
              } else this.hor.SetNpcQuest();
            }
          } else this.hor.SetNpcQuest();
      });
  }
  static get Dependencies() {
    return [1, 0];
  }
  OnStart() {
    return (
      (this.xJr = this.Entity.GetComponent(104)),
      (this.Hte = this.Entity.GetComponent(1)),
      (this.wJr = this.Entity.GetComponent(106)),
      (this.BJr = this.Entity.GetComponent(181)),
      (this.bJr = Vector_1.Vector.Create()),
      this.pie(),
      this.Hte instanceof CharacterActorComponent_1.CharacterActorComponent
        ? EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBornFinished,
            this.j$s,
          )
        : this.W$s(),
      !0
    );
  }
  pie() {
    var t = this.Hte.CreatureData;
    t && ((t = t.GetBaseInfo()), (this.GJr = t?.IsShowNameOnHead ?? !1));
  }
  W$s() {
    this.xJr?.GetMessageId()
      ? this.FJr()
      : (this.NJr = EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterPresentationInitRange,
          this.OJr,
        ));
  }
  FJr() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TextLanguageChange,
      this.iZe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.jJr,
      ),
      this.CreateCharacterIconComponentView();
  }
  kJr() {
    this.NJr &&
      ((this.NJr = !1),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterPresentationInitRange,
        this.OJr,
      ));
  }
  OnEnd() {
    return (
      this.kJr(),
      this.hor &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TextLanguageChange,
          this.iZe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.DisActiveBattleView,
          this.jJr,
        ),
        this.hor.Destroy()),
      !0
    );
  }
  CreateCharacterIconComponentView() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("HudUnit", 51, "开始角色头顶组件初始化", [
        "PbDataId",
        this.Hte?.CreatureData.GetPbDataId(),
      ]),
      (this.hor = new NpcIconComponent_1.NpcIconComponent(this)),
      this.hor.AddNpcIconAsync(this.xJr?.GetMessageId()).then(() => {
        this.KJr();
      });
    var t = this.Entity.GetComponent(0).GetPbDataId();
    this.hor.SetEntityPbDataId(t);
  }
  KJr() {
    this.SetCharacterIconLocation(),
      this.HJr(),
      this.SetCharacterSecondName(),
      this.hor.SetNpcQuest();
  }
  SetCharacterIconLocation() {
    this.hor?.SetCharacterIconLocation();
  }
  HJr() {
    var t = this.xJr?.PawnName;
    this.hor?.SetCharacterName(t);
  }
  SetCharacterSecondName() {
    this.hor?.SetCharacterSecondName();
  }
  OnEnable() {
    this.hor?.SetHeadItemState(!0);
  }
  OnDisable() {
    this.hor?.SetHeadItemState(!1);
  }
  VJr() {
    return this.Entity.GetComponent(0).GetEntityType();
  }
  OnTick(t) {
    super.OnTick(t),
      (this.e8 += t),
      this.e8 > CHECK_QUEST_ICON_INTERVAL &&
        ((this.e8 -= CHECK_QUEST_ICON_INTERVAL), this.WJr());
  }
  SetDialogueText(t, e = -1, i = !1) {
    t =
      ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, !0) ??
      "";
    this.hor?.SetDialogueText(t, e, i);
  }
  HideDialogueText() {
    this.hor?.HideDialogueText();
  }
  GetSelfLocation() {
    return this.Hte.ActorLocationProxy;
  }
  GetAttachToMeshComponent() {
    return this.VJr() === Protocol_1.Aki.Protocol.wks.Proto_SceneItem
      ? this.Hte.GetStaticMeshComponent()
      : this.Hte.SkeletalMesh;
  }
  GetAttachToSocketName() {
    return (
      this.xJr?.GetHeadStateSocketName() ??
      ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName()
    );
  }
  GetAttachToLocation(t) {
    var e,
      i = this.Hte;
    i
      ? ((e = i.SkeletalMesh.K2_GetComponentLocation()),
        t.Set(e.X, e.Y, e.Z + 2 * i.HalfHeight),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "HudUnit",
            51,
            "获取根头顶组件位置",
            ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
            ["RootLocation", t],
            ["ActorLocation", i.ActorLocationProxy],
            ["MeshLocation", e],
          ))
      : t.FromUeVector(this.Hte.SkeletalMesh.K2_GetComponentLocation());
  }
  GetAddOffsetZ() {
    return this.xJr?.GetHeadStateOffset() ?? 0;
  }
  IsShowNameInfo() {
    return this.GJr;
  }
  IsShowQuestInfo() {
    return this.qJr;
  }
  IsDialogTextActive() {
    return this.hor?.IsDialogueTextActive() ?? !1;
  }
  CanTick() {
    return (
      !!this.wJr &&
      (this.Jia &&
      !ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() &&
      UiModel_1.UiModel.IsInMainView
        ? (this.hor?.SetRootItemState(!0), !0)
        : (this.hor?.SetRootItemState(!1), !1))
    );
  }
  IsInHeadItemShowRange(t, e, i) {
    var n = this.Entity.GetComponent(0)?.GetPbDataId(),
      n = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(n);
    if (n && 1 !== n.TrackSource) {
      var o = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (o)
        return (
          this.bJr.DeepCopy(this.GetSelfLocation()),
          Vector_1.Vector.DistSquared(o, this.bJr) <
            n.TrackHideDis * n.TrackHideDis * 100 * 100
        );
    }
    return t < e && i < t;
  }
  GetRootItemState() {
    return !!this.hor?.GetRootItemState();
  }
  EnableHeadInfo(t) {
    this.Jia !== t && (this.Jia = t);
  }
};
(PawnHeadInfoComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(72)],
  PawnHeadInfoComponent,
)),
  (exports.PawnHeadInfoComponent = PawnHeadInfoComponent);
//# sourceMappingURL=PawnHeadInfoComponent.js.map
