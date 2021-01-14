import { createRenderer } from '@vue/runtime-core';
import { Graphics, Text, Container, Sprite, Texture } from 'pixi.js'

export const renderer = createRenderer({
  createElement(type) {
    let element;
    switch(type){
      case "Container":
        element = new Container();
        break;
      case "Sprite":
        element = new Sprite();
        break;
      case 'rect':
        element = new Graphics();
        element.interactive = true
        element.beginFill(0xff0000);
        element.drawRect(0, 0, 200, 200);
        element.endFill();
        break;
    }
    return element;
  },
  
  setElementText(node, text) {
    let t = new Text(text);
    node.addChild(t);
  },
  
  patchProp(el, key, preVal, nextVal) {
    switch(key){
      case "texture":
        el.texture = Texture.from(nextVal);
        break;
      case "onClick":
        el.on("pointertap", nextVal);
        break;
      default:
        el[key] = nextVal;
    }
    
  },
  
  insert(el, parent){
    parent.addChild(el);
  },
  
  // 处理注释
  createComment() {},
  // 获取父节点
  parentNode() {},
  // 获取兄弟节点
  nextSibling() {},
  // 删除节点时调用
  remove(el) {
    const parent = el.parent;
    if(parent){
      parent.removeChild(el);
    }
  }
  
})

export function createApp(root) {
  return renderer.createApp(root);
}