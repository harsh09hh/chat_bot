import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Selectmodel=()=>{



    return(
                <Select >
                <SelectTrigger className="w-[180px]  bg-[#1e1b25] border border-[#3a3644] rounded px-3 py-1 text-white text-sm">
                  <SelectValue placeholder="select a provider" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1b25] text-white border border-[#3a3644]">
                  <SelectGroup>
                    <SelectLabel>selct a provider</SelectLabel>
                    <SelectItem value="Gemini 2.5 Flash">Gemini 2.5 Flash</SelectItem>
                    <SelectItem value="Gemini 2.5 Flash Lite">Gemini 2.5 Flash Lite</SelectItem>
                    <SelectItem value="Gemini 2.5 Pro">Gemini 2.5 Pro</SelectItem>
                    <SelectItem value="o4-mini">o4-mini</SelectItem>
                    <SelectItem value="Claude 4 Sonnet">Claude 4 Sonnet</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
    );
    

}

export default Selectmodel;