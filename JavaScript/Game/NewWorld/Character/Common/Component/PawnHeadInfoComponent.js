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
      (this.zJr = void 0),
      (this.ZJr = void 0),
      (this.ezr = void 0),
      (this.tzr = void 0),
      (this.hir = void 0),
      (this.izr = !1),
      (this.ozr = !1),
      (this.e8 = 0),
      (this.rzr = !1),
      (this.I6s = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("HudUnit", 51, "开始角色头顶组件初始化", [
            "PbDataId",
            this.Hte?.CreatureData.GetPbDataId(),
          ]),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBornFinished,
            this.I6s,
          ),
          this.T6s();
      }),
      (this.nzr = () => {
        this.szr(), this.azr();
      }),
      (this.OnEntityWasRecentlyRenderedOnScreenChange = (t) => {
        if (this.hzr() === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem) {
          var e = this.Hte;
          if (
            !e ||
            0 === e.PrefabRadius ||
            e.CurLevelPrefabShowActor?.IsA(UE.TsEffectActor_C.StaticClass())
          )
            return void this.hir?.OnNpcWasRecentlyRenderedOnScreenChange(!0);
        }
        this.hir?.OnNpcWasRecentlyRenderedOnScreenChange(t);
      }),
      (this.jJe = (t, e) => {
        this.lzr();
      }),
      (this._zr = () => {
        this.hir?.SetRootItemState(!1);
      }),
      (this.uzr = () => {
        if (this.hir)
          if (this.ezr) {
            var e = this.ezr.GetInteractController();
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
                        Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
                      (o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
                        i.TreeConfigId,
                      )) &&
                      4 === o.Type &&
                      (o = n.GetNode(i.NodeId)) &&
                      o.ContainTag(0) &&
                      (t = n.GetTrackIconId());
                }
                this.hir.SetNpcQuest(t);
              } else this.hir.SetNpcQuest();
            }
          } else this.hir.SetNpcQuest();
      });
  }
  static get Dependencies() {
    return [1, 0];
  }
  OnStart() {
    return (
      (this.zJr = this.Entity.GetComponent(102)),
      (this.Hte = this.Entity.GetComponent(1)),
      (this.ZJr = this.Entity.GetComponent(104)),
      (this.ezr = this.Entity.GetComponent(178)),
      (this.tzr = Vector_1.Vector.Create()),
      this.pie(),
      this.Hte instanceof CharacterActorComponent_1.CharacterActorComponent
        ? EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBornFinished,
            this.I6s,
          )
        : this.T6s(),
      !0
    );
  }
  pie() {
    var t = this.Hte.CreatureData;
    t && ((t = t.GetBaseInfo()), (this.ozr = t?.IsShowNameOnHead ?? !1));
  }
  T6s() {
    this.zJr?.GetMessageId()
      ? this.azr()
      : (this.rzr = EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterPresentationInitRange,
          this.nzr,
        ));
  }
  azr() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TextLanguageChange,
      this.jJe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        this._zr,
      ),
      this.CreateCharacterIconComponentView();
  }
  szr() {
    this.rzr &&
      ((this.rzr = !1),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterPresentationInitRange,
        this.nzr,
      ));
  }
  OnEnd() {
    return (
      this.szr(),
      this.hir &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TextLanguageChange,
          this.jJe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.DisActiveBattleView,
          this._zr,
        ),
        this.hir.Destroy()),
      !0
    );
  }
  CreateCharacterIconComponentView() {
    (this.hir = new NpcIconComponent_1.NpcIconComponent(this)),
      this.hir.AddNpcIconAsync(this.zJr?.GetMessageId()).then(() => {
        this.czr();
      });
    var t = this.Entity.GetComponent(0).GetPbDataId();
    this.hir.SetEntityPbDataId(t);
  }
  czr() {
    this.SetCharacterIconLocation(),
      this.lzr(),
      this.SetCharacterSecondName(),
      this.hir.SetNpcQuest();
  }
  SetCharacterIconLocation() {
    this.hir?.SetCharacterIconLocation();
  }
  lzr() {
    var t = this.zJr?.PawnName;
    this.hir?.SetCharacterName(t);
  }
  SetCharacterSecondName() {
    this.hir?.SetCharacterSecondName();
  }
  OnEnable() {
    this.hir?.SetHeadItemState(!0);
  }
  OnDisable() {
    this.hir?.SetHeadItemState(!1);
  }
  hzr() {
    return this.Entity.GetComponent(0).GetEntityType();
  }
  OnTick(t) {
    super.OnTick(t),
      (this.e8 += t),
      this.e8 > CHECK_QUEST_ICON_INTERVAL &&
        ((this.e8 -= CHECK_QUEST_ICON_INTERVAL), this.uzr());
  }
  SetDialogueText(t, e = -1, i = !1) {
    t =
      ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, !0) ??
      "";
    this.hir?.SetDialogueText(t, e, i);
  }
  HideDialogueText() {
    this.hir?.HideDialogueText();
  }
  GetSelfLocation() {
    return this.Hte.ActorLocationProxy;
  }
  GetAttachToMeshComponent() {
    return this.hzr() === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
      ? this.Hte.GetStaticMeshComponent()
      : this.Hte.SkeletalMesh;
  }
  GetAttachToSocketName() {
    return (
      this.zJr?.GetHeadStateSocketName() ??
      ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName()
    );
  }
  GetAttachToLocation(t) {
    var e,
      i,
      n = this.Hte;
    n
      ? ((e = this.Hte.SkeletalMesh.K2_GetComponentToWorld().GetLocation()),
        (i = n.ActorLocationProxy),
        t.Set(i.X, i.Y, i.Z + n.HalfHeight),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "HudUnit",
            51,
            "获取根头顶组件位置",
            ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
            ["RootLocation", t],
            ["ActorLocation", i],
            ["MeshLocation", e],
          ))
      : t.FromUeVector(this.Hte.SkeletalMesh.K2_GetComponentLocation());
  }
  GetAddOffsetZ() {
    return this.zJr?.GetHeadStateOffset() ?? 0;
  }
  IsShowNameInfo() {
    return this.ozr;
  }
  IsShowQuestInfo() {
    return this.izr;
  }
  IsDialogTextActive() {
    return this.hir?.IsDialogueTextActive() ?? !1;
  }
  CanTick() {
    return (
      !!this.ZJr &&
      (!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() &&
      UiModel_1.UiModel.IsInMainView
        ? (this.hir?.SetRootItemState(!0), !0)
        : (this.hir?.SetRootItemState(!1), !1))
    );
  }
  IsInHeadItemShowRange(t, e, i) {
    var n = this.Entity.GetComponent(0)?.GetPbDataId(),
      n = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(n);
    if (n && 1 !== n.TrackSource) {
      var o = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (o)
        return (
          this.tzr.DeepCopy(this.GetSelfLocation()),
          Vector_1.Vector.DistSquared(o, this.tzr) <
            n.TrackHideDis * n.TrackHideDis * 100 * 100
        );
    }
    return t < e && i < t;
  }
  GetRootItemState() {
    return !!this.hir?.GetRootItemState();
  }
};
(PawnHeadInfoComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(70)],
  PawnHeadInfoComponent,
)),
  (exports.PawnHeadInfoComponent = PawnHeadInfoComponent);
//# sourceMappingURL=PawnHeadInfoComponent.js.map
