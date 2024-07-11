"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharBodyInfo = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharMaterialInfo_1 = require("./CharMaterialInfo");
class CharBodyInfo {
  constructor() {
    (this.ActorName = ""),
      (this.BodyName = ""),
      (this.BodyType = void 0),
      (this.MaterialSlotList = void 0),
      (this.SpecifiedSlotList = void 0),
      (this.SkeletalComp = void 0),
      (this.SkeletalMesh = void 0),
      (this.bar = void 0),
      (this.qar = !1),
      (this.Gar = !1),
      (this.Nar = !1),
      (this.Oar = !1),
      (this.kar = 0),
      (this.Far = 0),
      (this.Har = 0),
      (this.jar = 0),
      (this.War = void 0),
      (this.Kar = void 0),
      (this.Qar = void 0),
      (this.Xar = void 0),
      (this.$ar = void 0),
      (this.Yar = void 0),
      (this.Jar = void 0),
      (this.zar = void 0),
      (this.Zar = void 0),
      (this.Aar = void 0);
  }
  Init(t, i, e, s, h) {
    (this.Aar = h),
      (this.ActorName = t),
      (this.BodyName = i),
      (this.BodyType = RenderConfig_1.RenderConfig.GetBodyTypeByName(i)),
      (this.SkeletalComp = e),
      (this.SkeletalMesh = e.SkeletalMesh),
      (this.SpecifiedSlotList = new Array(4)),
      (this.SpecifiedSlotList[0] = new Array()),
      (this.SpecifiedSlotList[2] = new Array()),
      (this.SpecifiedSlotList[1] = new Array()),
      (this.SpecifiedSlotList[3] = new Array());
    const r = e.GetMaterialSlotNames();
    const a = r.Num();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "RenderCharacter",
        41,
        "CharBodyInfo.Init",
        ["Actor", this.ActorName],
        ["materialCount", a],
        ["SkeletalName", i],
      ),
      (this.MaterialSlotList = new Array(a));
    for (let i = 0; i < a; i++) {
      const o =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSkeletalMaterialInterface(
          e.SkeletalMesh,
          i,
        );
      if (
        ((this.MaterialSlotList[i] = new CharMaterialInfo_1.CharMaterialSlot()),
        o?.IsValid())
      ) {
        let t = void 0;
        if (
          (t =
            s && o instanceof UE.MaterialInstanceDynamic
              ? o
              : e.CreateDynamicMaterialInstance(i, o))?.IsValid()
        )
          switch (
            (this.MaterialSlotList[i].Init(i, r.Get(i).toString(), t),
            this.SpecifiedSlotList[0].push(i),
            this.MaterialSlotList[i].SlotType)
          ) {
            case 1:
            case 4:
              this.SpecifiedSlotList[2].push(i),
                this.SpecifiedSlotList[1].push(i);
              break;
            case 2:
              this.SpecifiedSlotList[3].push(i),
                this.SpecifiedSlotList[1].push(i);
          }
        else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderCharacter",
              41,
              "CharBodyInfo.Init: dynamicMaterial is not valid",
            );
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderCharacter",
            41,
            "CharBodyInfo.Init: originalMat is not valid",
          );
    }
    const n = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionCount(
      this.SkeletalMesh,
    );
    (this.bar = new Array(n)),
      (this.War = new Array(n)),
      (this.Kar = new Array(n)),
      (this.Qar = new Array(n)),
      (this.Xar = new Array(n));
    for (let t = 0; t < n; t++) {
      const l =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionMaterialIndex(
          this.SkeletalMesh,
          t,
        );
      (this.MaterialSlotList[l].SectionIndex = t),
        (this.bar[t] = l),
        (this.War[t] = 0),
        (this.Kar[t] = 0),
        (this.Qar[t] = 0),
        (this.Xar[t] = 0);
    }
    (this.qar = !0),
      (this.Gar = !0),
      (this.Nar = !0),
      (this.Oar = !0),
      (this.kar = 0),
      (this.Far = 0),
      (this.Har = 0),
      (this.jar = 0);
    this.ActorName, this.BodyName;
    (this.$ar = void 0),
      (this.Yar = void 0),
      (this.Zar = void 0),
      (this.Jar = void 0),
      (this.zar = void 0);
  }
  UseBattleMaskCommon() {
    ++this.jar,
      (this.Oar = !0),
      this.jar >= RenderConfig_1.RenderConfig.RefErrorCount &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "Battle类型引用异常，检查UseBattleMask调用情况",
            ["Battle Mask Reference Count", this.jar],
            ["Actor", this.ActorName],
          ),
        this.ehr());
  }
  UseBattleMask(t) {
    const i = this.Xar.length;
    t < i
      ? (++this.Xar[t],
        (this.Oar = !0),
        this.Xar[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "BattleMask类型引用异常，检查UseBattleMask调用情况",
            ["Battle Mask Reference Count", this.Xar[t]],
            ["Actor", this.ActorName],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseBattleMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertBattleMaskCommon() {
    this.jar > 0 && (--this.jar, (this.Oar = !0)), this.UpdateBattleMask();
  }
  RevertBattleMask(t) {
    const i = this.Xar.length;
    t < i
      ? this.Xar[t] > 0 && (--this.Xar[t], (this.Oar = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertBattleMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  UseBattleCommon() {
    ++this.Har,
      (this.Nar = !0),
      this.Har >= RenderConfig_1.RenderConfig.RefErrorCount &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "Battle类型引用异常，检查UseBattleCommon调用情况",
            ["Battle Reference Count", this.Har],
            ["Actor", this.ActorName],
          ),
        this.ehr());
  }
  UseBattle(t) {
    const i = this.Qar.length;
    t < i
      ? (++this.Qar[t],
        (this.Nar = !0),
        this.Qar[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "Battle类型引用异常，检查UseBattle调用情况",
              ["Battle Reference Count", this.Qar[t]],
              ["Actor", this.ActorName],
            ),
          this.ehr()))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseBattle索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertBattleCommon() {
    this.Har > 0 && (--this.Har, (this.Nar = !0)), this.UpdateBattle();
  }
  RevertBattle(t) {
    const i = this.Qar.length;
    t < i
      ? this.Qar[t] > 0 && (--this.Qar[t], (this.Nar = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertBattle索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  UseAlphaTestCommon() {
    ++this.kar,
      (this.qar = !0),
      this.kar >= RenderConfig_1.RenderConfig.RefErrorCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "AlphaTest类型引用异常，检查UseAlphaTest调用情况",
          ["AlphaTest Reference Count", this.kar],
          ["Actor", this.ActorName],
        );
  }
  UseAlphaTest(t) {
    const i = this.War.length;
    t < i
      ? (++this.War[t],
        (this.qar = !0),
        this.War[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "AlphaTestMask类型引用异常，检查UseAlphaTest调用情况",
            ["AlphaTest Reference Count", this.War[t]],
            ["Actor", this.ActorName],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseAlphaTestMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertAlphaTestCommon() {
    this.kar > 0 && (--this.kar, (this.qar = !0)), this.UpdateAlphaTest();
  }
  RevertAlphaTest(t) {
    const i = this.War.length;
    t < i
      ? this.War[t] > 0 && (--this.War[t], (this.qar = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertAlphaTestMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  UseOutlineStencilTestCommon() {
    ++this.Far,
      (this.Gar = !0),
      this.Far >= RenderConfig_1.RenderConfig.RefErrorCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "StencilOutline类型引用异常，检查UseAlphaTest调用情况",
          ["StencilOutline Reference Count", this.kar],
          ["Actor", this.ActorName],
        );
  }
  UseOutlineStencilTest(t) {
    const i = this.Kar.length;
    t < i
      ? (++this.Kar[t],
        (this.Gar = !0),
        this.Kar[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "StencilOutlineMask类型引用异常，检查UseStencilOutline调用情况",
            ["StencilOutline Reference Count", this.Kar[t]],
            ["Actor", this.ActorName],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseStencilOutlineMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertOutlineStencilTestCommon() {
    this.Far > 0 && (--this.Far, (this.Gar = !0)),
      this.UpdateStencilOutlineTest();
  }
  RevertOutlineStencilTest(t) {
    const i = this.Kar.length;
    t < i
      ? this.Kar[t] > 0 && (--this.Kar[t], (this.Gar = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertOutlineStencilMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  SetColor(i, e, t) {
    const s = this.SpecifiedSlotList[t];
    const h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetColor(i, e);
  }
  RevertColor(t, i) {
    const e = this.SpecifiedSlotList[i];
    const s = e.length;
    const h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[e[t]].RevertColor(h);
  }
  SetFloat(i, e, t) {
    const s = this.SpecifiedSlotList[t];
    const h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetFloat(i, e);
  }
  RevertFloat(t, i) {
    const e = this.SpecifiedSlotList[i];
    const s = e.length;
    const h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[e[t]].RevertFloat(h);
  }
  SetTexture(i, e, t) {
    const s = this.SpecifiedSlotList[t];
    const h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetTexture(i, e);
  }
  RevertTexture(t, i) {
    const e = this.SpecifiedSlotList[i];
    const s = e.length;
    const h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[e[t]].RevertTexture(h);
  }
  SetStarScarEnergy(i) {
    const e = this.MaterialSlotList.length;
    for (let t = 0; t < e; t++) this.MaterialSlotList[t].SetStarScarEnergy(i);
  }
  Update(t = void 0) {
    void 0 !== t &&
      this.SkeletalComp.IsValid() &&
      this.SkeletalComp.SetMeshShadingRate(t),
      this.thr(),
      this.UpdateAlphaTest(),
      this.UpdateStencilOutlineTest(),
      this.UpdateBattle(),
      this.UpdateBattleMask();
  }
  ResetAllState() {
    (this.qar = !0),
      (this.Gar = !0),
      (this.kar = 0),
      (this.Far = 0),
      this.War.fill(0),
      this.Kar.fill(0),
      this.Qar.fill(0),
      this.Xar.fill(0),
      this.Kar.fill(0),
      this.UpdateAlphaTest(),
      this.UpdateStencilOutlineTest(),
      this.UpdateBattle(),
      this.UpdateBattleMask();
  }
  ehr() {
    const t = this.Aar.GetRenderingComponent().GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialController,
    );
    t && t.PrintCurrentInfo();
  }
  thr() {
    if (this.SkeletalComp && this.SkeletalComp.IsValid()) {
      const i = this.MaterialSlotList.length;
      for (let t = 0; t < i; t++) {
        const e = this.MaterialSlotList[t];
        e.UpdateMaterialParam(), e.SetSkeletalMeshMaterial(this.SkeletalComp);
      }
    }
  }
  UpdateBattleMask() {
    if (this.Oar) {
      let t = (this.Oar = !1);
      let i = !1;
      const e = UE.NewArray(UE.BuiltinInt);
      if (this.jar > 0) (t = !0), (i = !1);
      else {
        const s = this.Xar.length;
        for (let t = 0; t < s; t++) this.Xar[t] > 0 && e.Add(t);
        (t = e.Num() > 0), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseEnableBattleMask(t),
        this.SkeletalComp.SetUseEnableBattleMaskSectionMask(i, e));
    }
  }
  UpdateBattle() {
    if (this.Nar) {
      let t = (this.Nar = !1);
      let i = !1;
      const e = UE.NewArray(UE.BuiltinInt);
      if (this.Har > 0) (t = !0), (i = !1);
      else {
        const s = this.Qar.length;
        for (let t = 0; t < s; t++) this.Qar[t] > 0 && e.Add(t);
        (t = e.Num() > 0), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseEnableBattle(t),
        this.SkeletalComp.SetUseEnableBattleSectionMask(i, e));
    }
  }
  UpdateAlphaTest() {
    if (this.qar) {
      let t = (this.qar = !1);
      let i = !1;
      const e = UE.NewArray(UE.BuiltinInt);
      if (this.kar > 0) (t = !0), (i = !1);
      else {
        const s = this.War.length;
        for (let t = 0; t < s; t++) this.War[t] > 0 && e.Add(t);
        (t = e.Num() > 0), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseCustomAlphaTest(t),
        this.SkeletalComp.SetUseCustomAlphaTestSectionMask(i, e));
    }
  }
  UpdateStencilOutlineTest() {
    if (this.Gar) {
      let t = (this.Gar = !1);
      let i = !1;
      const e = UE.NewArray(UE.BuiltinInt);
      if (this.Far > 0) (t = !0), (i = !1);
      else {
        const s = this.Kar.length;
        for (let t = 0; t < s; t++) this.Kar[t] > 0 && e.Add(t);
        (t = e.Num() > 0), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseOutlineStencilTest(t),
        this.SkeletalComp.SetUseOutlineStencilTestSectionMask(i, e));
    }
  }
}
exports.CharBodyInfo = CharBodyInfo;
// # sourceMappingURL=CharBodyInfo.js.map
