import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
//Components
import ButtonForm from './buttonForm'

function ModalDeleteTarea({value,color,callDelete}) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    const handlerDelete=()=>{
        callDelete()
        closeModal()
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h3 className="text-2xl font-bold leading-6 text-black-900 text-center">¿Quiere eliminar la tarea?</h3>

                                <div className="mt-2 flex flex-row justify-center gap-5">
                                    <ButtonForm
                                        type='button'
                                        value='Eliminar'
                                        callback={handlerDelete}
                                        color='bg-red-500'
                                    />
                                    <ButtonForm
                                        type='button'
                                        value='Cancelar'
                                        callback={closeModal}
                                    />
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

export default ModalDeleteTarea
