import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidCPFOrCNPJ } from "@/lib/utils";
import { MultiSelect } from "@/components/multiSelect";
import { Farmer } from "@/App";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  cpfCnpj: z.string().refine((cpfCnpj) => isValidCPFOrCNPJ(cpfCnpj), {
    message: "CPF ou CNPJ inválido",
  }),
  name: z
    .string()
    .min(2, { message: "Nome do produtor deve ter pelo menos 2 caracteres" }),
  farmName: z.string(),
  city: z.string(),
  state: z.string(),
  totalAreaHectares: z.coerce
    .number()
    .min(0, { message: "Área total deve ser maior ou igual a 0" }),
  cultivableAreaHectares: z.coerce
    .number()
    .min(0, { message: "Área agricultável deve ser maior ou igual a 0" }),
  vegetationAreaHectares: z.coerce
    .number()
    .min(0, { message: "Área de vegetação deve ser maior ou igual a 0" }),
  crops: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos uma cultura.",
  }),
});

const cropsOptions = [
  {
    value: "uva",
    label: "uva",
  },
  {
    value: "milho",
    label: "milho",
  },
  {
    value: "algodão",
    label: "algodão",
  },
  {
    value: "cafe",
    label: "cafe",
  },
  {
    value: "cacau",
    label: "cacau",
  },
  {
    value: "arroz",
    label: "arroz",
  },
  {
    value: "soja",
    label: "soja",
  },
  {
    value: "feijão",
    label: "feijão",
  },
];

type FormValues = z.infer<typeof formSchema>;

interface Register {
  farmerToEdit?: Farmer;
  refetch: () => void;
}

export const Register: React.FC<Register> = ({ farmerToEdit, refetch }) => {
  const { toast } = useToast();

  const defaultValues = {
    name: farmerToEdit?.name || "",
    cpfCnpj: farmerToEdit?.cpfCnpj || "",
    city: farmerToEdit?.city || "",
    state: farmerToEdit?.state || "",
    totalAreaHectares: farmerToEdit?.totalAreaHectares || 0,
    cultivableAreaHectares: farmerToEdit?.cultivableAreaHectares || 0,
    vegetationAreaHectares: farmerToEdit?.vegetationAreaHectares || 0,
    crops: [],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!farmerToEdit) {
      fetch("https://farmers-api-2nhh.vercel.app/farmer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          toast({
            title: "Sucesso!",
            description: "Agricultor cadastrado",
          });
          refetch();
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Ops!",
            description: "Tente novamente mais tarde",
          });
        });
    } else {
      fetch(`https://farmers-api-2nhh.vercel.app/farmer/${farmerToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          toast({
            title: "Sucesso!",
            description: "Dados atualizados",
          });
          refetch();
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Ops!",
            description: "Tente novamente mais tarde",
          });
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome do produtor</FormLabel>
              <FormControl>
                <Input placeholder="João da silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpfCnpj"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CPF ou CNPJ</FormLabel>
              <FormControl>
                <Input placeholder="00.000.000/0000-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="farmName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome da fazenda</FormLabel>
              <FormControl>
                <Input placeholder="Rancho Fundo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="João Pessoa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="Paraíba" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalAreaHectares"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Área total em hectares da fazenda</FormLabel>
              <FormControl>
                <Input placeholder="1000" {...field} type="number" />
              </FormControl>
              <FormDescription>Apenas números</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cultivableAreaHectares"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Área agricultável em hectares</FormLabel>
              <FormControl>
                <Input placeholder="1000" {...field} type="number" />
              </FormControl>
              <FormDescription>Apenas números</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vegetationAreaHectares"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Área de vegetação em hectares</FormLabel>
              <FormControl>
                <Input placeholder="1000" {...field} type="number" />
              </FormControl>
              <FormDescription>Apenas números</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="crops"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Culturas</FormLabel>
              <MultiSelect
                selected={field.value}
                options={cropsOptions}
                {...field}
                className="sm:w-[510px]"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {farmerToEdit ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
};
