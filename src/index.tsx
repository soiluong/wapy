import { invariant } from 'hey-listen';

const defaultOptions: KeyframeEffectOptions = {
  delay: 0,
  direction: 'normal',
  duration: 300,
  easing: 'linear',
  endDelay: 0,
  fill: 'none',
  iterationStart: 0.0,
  iterations: 1
}

const cache = new WeakMap<Element>();

const isHTMLElement = (node: Element): node is HTMLElement =>
  node instanceof HTMLElement;

const setDom = (node: Element) => {
  let element: Element;

  if (isHTMLElement(node)) {
    element = node;
  }

  // @ts-ignore
  invariant(element !== undefined, 'Node must be HTMLElement');
  // @ts-ignore
  cache.set(node, element);
  // @ts-ignore
  return { element };
};

const getElement = (node: Element) =>
  cache.has(node) ? cache.get(node) : setDom(node);

const getEffectOptions = (options?: number | KeyframeEffectOptions): number | KeyframeEffectOptions => {
  if (typeof options === 'number') {
    return options;
  }

  if (typeof options === 'object') {
    return {
      ...defaultOptions,
      ...options
    };
  }

  return defaultOptions;
}

type Animations = {
  initial?: {} | boolean,
  animate?: {},
  exit?: {}
}

export default function (nodeOrSelector: Element | string, animations: Animations, options?: number | KeyframeEffectOptions) {
  // @ts-ignore
  const node: Element =
    typeof nodeOrSelector === 'string'
      ? document.querySelector(nodeOrSelector)
      : nodeOrSelector;

  const { element } = getElement(node);
  const effectOptions = getEffectOptions(options);

  const keyframes: Keyframe[] | PropertyIndexedKeyframes | null = {
    transform: [`translateX(0)`, `translateX(100px)`],
  }

  const animation = element.animate(keyframes, effectOptions);

  animation.pause();

  animation.finished.then(() => {
    element.style.setProperty('transform', 'translateX(100px)');
    animation.cancel();
  });

  const animator = {
    element,
    animation
  }

  return animator;
}