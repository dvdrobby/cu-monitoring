import React, { useEffect } from "react"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"

type FilterButtonProps = {
    contents: string[]
    isChecked: string
}

export const FilterButton = ({
    contents,
    isChecked
}: FilterButtonProps
) => {

    return (
        <div >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {
                        contents.map((content) => {
                            return (
                                <DropdownMenuCheckboxItem key={content} >{content}</DropdownMenuCheckboxItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}

