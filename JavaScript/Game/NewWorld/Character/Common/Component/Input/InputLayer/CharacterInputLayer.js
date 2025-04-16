"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterInputLayer = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../../Core/Common/Stats"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  InputEnums_1 = require("../../../../../../Input/InputEnums"),
  InputLayer_1 = require("../../../../../../Input/InputLayer");
class CharacterInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments), (this.Aia = void 0);
  }
  Init(s, t = void 0) {
    const e = s.Entity.GetComponent(3).Actor;
    s = t ?? e.InputComponentClass?.AssetPathName.toString() ?? "";
    s
      ? ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.Class, (s) => {
          (this.Aia = e.AddComponentByClass(
            s,
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
            (this.Aia.OwnerActor = e);
        })
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Input", 67, "[CharacterInputLayer]加载BpInput失败", [
          "Role",
          e.GetName(),
        ]);
  }
  Clear() {
    this.Aia = void 0;
  }
  GetLayerType() {
    return 1;
  }
  HandlePress(t, e) {
    if (this.Aia) {
      CharacterInputLayer.b0l.Start();
      let s = void 0;
      switch (t) {
        case InputEnums_1.EInputAction.跳跃:
          s = this.Aia.跳跃按下(e);
          break;
        case InputEnums_1.EInputAction.攀爬:
          s = this.Aia.攀爬按下(e);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          s = this.Aia.走跑切换按下(e);
          break;
        case InputEnums_1.EInputAction.攻击:
          s = this.Aia.攻击按下(e);
          break;
        case InputEnums_1.EInputAction.闪避:
          s = this.Aia.闪避按下(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          s = this.Aia.技能1按下(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          s = this.Aia.幻象1按下(e);
          break;
        case InputEnums_1.EInputAction.大招:
          s = this.Aia.大招按下(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          s = this.Aia.幻象2按下(e);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          s = this.Aia.切换角色1按下(e);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          s = this.Aia.切换角色2按下(e);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          s = this.Aia.切换角色3按下(e);
          break;
        case InputEnums_1.EInputAction.瞄准:
          s = this.Aia.瞄准按下(e);
          break;
        case InputEnums_1.EInputAction.通用交互:
          s = this.Aia.通用交互按下(e);
      }
      return CharacterInputLayer.b0l.Stop(), s;
    }
  }
  HandleRelease(t, e) {
    if (this.Aia) {
      CharacterInputLayer.q0l.Start();
      let s = void 0;
      switch (t) {
        case InputEnums_1.EInputAction.跳跃:
          s = this.Aia.跳跃抬起(e);
          break;
        case InputEnums_1.EInputAction.攀爬:
          s = this.Aia.攀爬抬起(e);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          s = this.Aia.走跑切换抬起(e);
          break;
        case InputEnums_1.EInputAction.攻击:
          s = this.Aia.攻击抬起(e);
          break;
        case InputEnums_1.EInputAction.闪避:
          s = this.Aia.闪避抬起(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          s = this.Aia.技能1抬起(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          s = this.Aia.幻象1抬起(e);
          break;
        case InputEnums_1.EInputAction.大招:
          s = this.Aia.大招抬起(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          s = this.Aia.幻象2抬起(e);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          s = this.Aia.切换角色1抬起(e);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          s = this.Aia.切换角色2抬起(e);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          s = this.Aia.切换角色3抬起(e);
          break;
        case InputEnums_1.EInputAction.瞄准:
          s = this.Aia.瞄准抬起(e);
      }
      return CharacterInputLayer.q0l.Stop(), s;
    }
  }
  HandleHold(s, t) {
    if (this.Aia)
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          return this.Aia.跳跃长按(t);
        case InputEnums_1.EInputAction.攀爬:
          return this.Aia.攀爬长按(t);
        case InputEnums_1.EInputAction.走跑切换:
          return this.Aia.走跑切换长按(t);
        case InputEnums_1.EInputAction.攻击:
          return this.Aia.攻击长按(t);
        case InputEnums_1.EInputAction.闪避:
          return this.Aia.闪避长按(t);
        case InputEnums_1.EInputAction.技能1:
          return this.Aia.技能1长按(t);
        case InputEnums_1.EInputAction.幻象1:
          return this.Aia.幻象1长按(t);
        case InputEnums_1.EInputAction.大招:
          return this.Aia.大招长按(t);
        case InputEnums_1.EInputAction.幻象2:
          return this.Aia.幻象2长按(t);
        case InputEnums_1.EInputAction.切换角色1:
          return this.Aia.切换角色1长按(t);
        case InputEnums_1.EInputAction.切换角色2:
          return this.Aia.切换角色2长按(t);
        case InputEnums_1.EInputAction.切换角色3:
          return this.Aia.切换角色3长按(t);
        case InputEnums_1.EInputAction.锁定目标:
          return this.Aia.锁定目标长按(t);
        case InputEnums_1.EInputAction.瞄准:
          return this.Aia.瞄准长按(t);
      }
  }
  DispatchPressEvent(s, t) {
    if (this.Aia)
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          this.Aia.跳跃按下事件(t);
          break;
        case InputEnums_1.EInputAction.攀爬:
          this.Aia.攀爬按下事件(t);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          this.Aia.走跑切换按下事件(t);
          break;
        case InputEnums_1.EInputAction.攻击:
          this.Aia.攻击按下事件(t);
          break;
        case InputEnums_1.EInputAction.闪避:
          this.Aia.闪避按下事件(t);
          break;
        case InputEnums_1.EInputAction.技能1:
          this.Aia.技能1按下事件(t);
          break;
        case InputEnums_1.EInputAction.幻象1:
          this.Aia.幻象1按下事件(t);
          break;
        case InputEnums_1.EInputAction.大招:
          this.Aia.大招按下事件(t);
          break;
        case InputEnums_1.EInputAction.幻象2:
          this.Aia.幻象2按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          this.Aia.切换角色1按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          this.Aia.切换角色2按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          this.Aia.切换角色3按下事件(t);
          break;
        case InputEnums_1.EInputAction.锁定目标:
          this.Aia.锁定目标按下事件(t);
          break;
        case InputEnums_1.EInputAction.瞄准:
          this.Aia.瞄准按下事件(t);
      }
  }
  DispatchReleaseEvent(s, t) {
    if (this.Aia)
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          this.Aia.跳跃抬起事件(t);
          break;
        case InputEnums_1.EInputAction.攀爬:
          this.Aia.攀爬抬起事件(t);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          this.Aia.走跑切换抬起事件(t);
          break;
        case InputEnums_1.EInputAction.攻击:
          this.Aia.攻击抬起事件(t);
          break;
        case InputEnums_1.EInputAction.闪避:
          this.Aia.闪避抬起事件(t);
          break;
        case InputEnums_1.EInputAction.技能1:
          this.Aia.技能1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.幻象1:
          this.Aia.幻象1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.大招:
          this.Aia.大招抬起事件(t);
          break;
        case InputEnums_1.EInputAction.幻象2:
          this.Aia.幻象2抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          this.Aia.切换角色1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          this.Aia.切换角色2抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          this.Aia.切换角色3抬起事件(t);
          break;
        case InputEnums_1.EInputAction.锁定目标:
          this.Aia.锁定目标抬起事件(t);
          break;
        case InputEnums_1.EInputAction.瞄准:
          this.Aia.瞄准抬起事件(t);
      }
  }
  GetBpInputComp() {
    return this.Aia;
  }
  SetBpInputComp(s) {
    this.Aia = s;
  }
}
((exports.CharacterInputLayer = CharacterInputLayer).b0l = Stats_1.Stat.Create(
  "CharacterInputLayer.HandlePress",
)),
  (CharacterInputLayer.q0l = Stats_1.Stat.Create(
    "CharacterInputLayer.HandleRelease",
  ));
//# sourceMappingURL=CharacterInputLayer.js.map
