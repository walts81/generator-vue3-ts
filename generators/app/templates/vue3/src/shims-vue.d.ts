/// <reference types="vite/client" />
import { Store } from 'vuex';

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<Record<string,unknown>, Record<string,unknown>, unknown>
//   export default component
// }

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<import('./store/root-state').RootState>;
  }
}

declare module 'sentencer' {
  interface Actions {
    noun(): string;
    a_noun(): string;
    nouns(): string;
    adjective(): string;
    an_adjective(): string;
  }

  interface Options {
    nounList?: string[];
    adjectiveList?: string[];
  }

  const actions: Actions;
  function make(sentence: string): string;
  function configure(options: Options): void;
}