export const getActions = (showClose: boolean, bootstrap: any, ref?: any) => {
  const createModal = () =>
    new bootstrap.Modal(ref, {
      backdrop: 'static',
      keyboard: showClose,
    });
  const getOrCreateModal = () =>
    bootstrap.Modal.getInstance(ref) || createModal();

  const open = () => getOrCreateModal()?.show();
  const close = () => getOrCreateModal()?.hide();

  return { open, close };
};
