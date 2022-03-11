import { Ref, getCurrentInstance } from 'vue';

export const getActions = (showClose: boolean, ref?: Ref) => {
  const bootstrap =
    getCurrentInstance()?.appContext.config.globalProperties.bootstrap;
  const createModal = () =>
    new bootstrap.Modal(ref?.value, {
      backdrop: 'static',
      keyboard: showClose,
    });
  const getOrCreateModal = () =>
    bootstrap.Modal.getInstance(ref?.value) || createModal();

  const open = () => getOrCreateModal()?.show();
  const close = () => getOrCreateModal()?.hide();

  return { open, close };
};
