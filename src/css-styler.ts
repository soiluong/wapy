export type CssValueTypes = {
  [k: string]: string | number | undefined
}

const createCssStyler = (element: HTMLElement) => {
  const cache = new Map();

  function setValue(key: string, value: any) {

  }

  const cssStyler = {
    get(key: string): string | number {
      // TODO: read from cache
      return window
        .getComputedStyle(element, null)
        .getPropertyValue(key) || 0;
    },
    set(values: string | CssValueTypes, value?: any) {
      if (typeof values === 'string') {
        setValue(values, value);
      } else {
        for (const key in values) {
          setValue(key, values[key]);
        }
      }

      return this;
    }
  }

  return cssStyler
}

export default createCssStyler;