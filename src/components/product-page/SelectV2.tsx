'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react";

interface CantidadSelectProps {
  setValue: Dispatch<SetStateAction<number>>;
}

function CantidadSelectV2({ setValue }: CantidadSelectProps) {
  return (
    <Select
      defaultValue="1"
      onValueChange={(value) => {
        setValue(Number(value))
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Selecciona la cantidad"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cantidad</SelectLabel>
          <SelectItem value='1'>1</SelectItem>
          <SelectItem value='2'>2</SelectItem>
          <SelectItem value='3'>3</SelectItem>
          <SelectItem value='4'>4</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

  )
}

export default CantidadSelectV2
