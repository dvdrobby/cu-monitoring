import React from "react"
import {
    Alert,
    AlertDescription
} from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react"

type AlertProps = {
    message?: string
}

export function AlertError({ message }: AlertProps) {

    if (!message) {
        return null
    }

    return (
        <Alert variant="destructive">
            <TriangleAlert className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
