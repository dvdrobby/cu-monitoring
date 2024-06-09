"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { ACTION } from "next/dist/client/components/app-router-headers"


type ModalProps = {
    title: string,
    description: string,
    button: string,
    isLoading: boolean,
    isOpen: boolean,
    onClose: () => void,
    action?: any
}
export const Modal: React.FC<ModalProps> = (
    {
        title,
        description,
        button,
        isLoading,
        isOpen,
        onClose,
        action
    }
) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onChange}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading} onClick={action} >{button}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}