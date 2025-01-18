import i18n from './i18n';

export const translate = (key, namespace = 'myComponent') => {
  return i18n.t(`${namespace}:${key}`);
};
