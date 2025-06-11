import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import {Check} from "lucide-react"

import {cn} from "@/lib/utils"

const Checkbox = React.forwardRef(({className, ...props}, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "peer h-4 w-4 shrink-0 p-0 rounded-sm border border-white bg-transparent hover:border-teal-300 data-[state=checked]:border-transparent data-[state=checked]:bg-teal-800 ransition-colors focus:outline-none focus:ring-1 focus:ring-teal-800",
            className
        )}
        {...props}>
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
            <Check className="h-4 w-4"/>
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export {Checkbox}
