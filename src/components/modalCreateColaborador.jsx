import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
//Components
import ButtonForm from './buttonForm'
import CreateColaborador from './createColaborador'

function ModalCreateColaborador({value,alert,handleForm,data,type,color}) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
        <ButtonForm
            type='button'
            value={value}
            callback={openModal}
            color={color}
        />

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className='flex flex-row justify-between items-center'>
                                    <h3 className="text-2xl font-bold leading-6 text-black-900">Agregar nuevo colaborador</h3>
                                    <input
                                        onClick={closeModal} 
                                        type="button"
                                        value="x"
                                        className={`tracking-wider cursor-pointer uppercase bg-gray-200 px-2 rounded-full border border-gray-400 font-bold`}
                                    />
                                </div>
                                <div className="mt-2">
                                    <CreateColaborador/>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}

export default ModalCreateColaborador;