import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { useAppContext } from '../context';

const useModal = () => {
  const { actions } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  let focus = useRef(null);

  const closeModal = () => {
    actions.setCurrent(null);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const Modal = useCallback(
    ({ title, content }) => (
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={focus}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6 text-gray-600 flex-1"
                    >
                      {title}
                    </Dialog.Title>
                    <XMarkIcon
                      ref={focus}
                      className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500"
                      onClick={closeModal}
                    />
                  </div>
                  {content}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    ),
    [isOpen]
  );

  return [Modal, openModal, closeModal];
};

export default useModal;
