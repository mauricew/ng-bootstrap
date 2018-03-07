import { NgbdToastBasic } from './basic/toast-basic';
import { NgbdToastRegular } from './regular/toast-regular';

export const DEMO_DIRECTIVES = [
    NgbdToastBasic, NgbdToastRegular
];

export const DEMO_SNIPPETS = {
  'basic': {
    'code': require('!!prismjs-loader?lang=typescript!./basic/toast-basic'),
    'markup': require('!!prismjs-loader?lang=markup!./basic/toast-basic.html')
  },
  'regular': {
    'code': require('!!prismjs-loader?lang=typescript!./regular/toast-regular'),
    'markup': require('!!prismjs-loader?lang=markup!./regular/toast-regular.html')
  },
};