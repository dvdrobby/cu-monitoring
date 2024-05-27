import React from "react"
import {
    Alert,
    AlertDescription
} from "@/components/ui/alert"
import { CircleCheckBig } from "lucide-react"

type AlertProps = {
    message?: string
}

export function AlertSuccess({ message }: AlertProps) {

    if (!message) {
        return null
    }

    return (
        <Alert variant="success">
            <CircleCheckBig className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
