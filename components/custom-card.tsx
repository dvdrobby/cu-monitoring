
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
    CardFooter
} from "@/components/ui/card"

type CardProps = {
    title: string
    description: string
    footer: boolean
    footerDesc?: string
    children: React.ReactNode
}

export const CustomCard = ({
    title,
    description,
    footer,
    footerDesc = "",
    children
}: CardProps) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>

            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {footer &&
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        {footerDesc}
                    </div>
                </CardFooter>
            }
        </Card>
    )
}