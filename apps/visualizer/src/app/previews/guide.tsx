import { Transition } from '@headlessui/react';

export const PreviewGuide = ({
  show,
  width,
}: {
  show: boolean;
  width: number;
}) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute inset-0 rounded-lg bg-gray-900/20 dark:bg-white/20"
      style={{ width: `${width}px` }}
    >
      <div
        className="absolute top-1 left-px bottom-0 border-r-2 border-dashed border-red-500 dark:border-red-400"
        style={{ width: `${width}px` }}
      ></div>
    </Transition>
  );
};
